<script>
  import Button from "$lib/ui/Button.svelte";
  import Input from "$lib/ui/Input.svelte";
  import { setMeta } from "$lib/seo";
  import SeoHead from "$lib/seo/SeoHead.svelte";
  import Textarea from "$lib/ui/Textarea.svelte";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const initialForm = {
    name: "",
    email: "",
    message: "",
    website: "",
    honeypot: ""
  };

  let form = { ...initialForm };
  let fieldErrors = {};
  let submitError = "";
  let submitSuccess = "";
  let submitting = false;

  const meta = setMeta({
    title: "Website Quote for Your UK Business",
    description: "Tell Midas Web what your small business or local organisation needs from its website, and start a practical conversation about scope, timing and next steps.",
    openGraphTitle: "Start your website project with Midas Web",
    openGraphDescription: "Share what needs to change online and get a straightforward conversation about the right website scope, timing and next steps for your organisation.",
    image: "/brand/logo-full.png",
    url: "/contact"
  });

  const checkpoints = [
    ["Start", "Usually 1 to 2 days depending on scope."],
    ["Build", "A focused couple of weeks for most starter websites."],
    ["First step", "Send your business name, current link if you have one, and what you want the site to help with."]
  ];

  $: messageLength = form.message.trim().length;

  function clearFieldError(field) {
    if (fieldErrors[field]) {
      fieldErrors = { ...fieldErrors, [field]: "" };
    }
    submitError = "";
    submitSuccess = "";
  }

  function isValidWebsite(value) {
    const trimmed = value.trim();
    if (!trimmed) return true;

    try {
      const url = new URL(trimmed);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  function validateForm() {
    const errors = {};
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    const website = form.website.trim();

    if (!name) errors.name = "Name is required.";
    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      errors.email = "Please provide a valid email address.";
    }
    if (!message) errors.message = "Message is required.";
    if (website && !isValidWebsite(website)) errors.website = "Website must be a valid URL (include http:// or https://).";

    fieldErrors = errors;
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    submitError = "";
    submitSuccess = "";

    if (!validateForm()) return;

    submitting = true;

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        website: form.website.trim(),
        honeypot: form.honeypot
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data?.fieldErrors && typeof data.fieldErrors === "object") {
          fieldErrors = { ...fieldErrors, ...data.fieldErrors };
        }
        submitError = data?.error || "Failed to send your message. Please try again.";
        return;
      }

      submitSuccess = "Thanks. Your message has been sent and we will follow up within one business day.";
      fieldErrors = {};
      form = { ...initialForm };
    } catch {
      submitError = "Network error. Please try again.";
    } finally {
      submitting = false;
    }
  }
</script>

<SeoHead {meta} />

<section class="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
  <div class="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
    <div class="bg-brand-text p-7 text-white shadow-[0_28px_80px_rgba(16,17,20,0.18)] sm:p-8">
      <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.14em] text-brand-primary">Contact</p>
      <h1 class="mt-4 text-5xl font-bold leading-[1.04] sm:text-6xl">Tell me what needs to change.</h1>
      <p class="mt-6 max-w-md text-base leading-relaxed text-white/74">
        Send the rough version. The business, the current site if there is one, what feels wrong, and what you want people to do next.
      </p>

      <div class="mt-10 divide-y divide-white/14 border-y border-white/14">
        {#each checkpoints as checkpoint}
          <div class="py-5">
            <p class="font-semibold text-white">{checkpoint[0]}</p>
            <p class="mt-1 text-sm leading-relaxed text-white/68">{checkpoint[1]}</p>
          </div>
        {/each}
      </div>
    </div>

    <form
      class="relative border border-brand-border/75 bg-white/90 p-7 shadow-[0_24px_70px_rgba(16,17,20,0.1)] backdrop-blur-sm sm:p-8"
      on:submit={handleSubmit}
      novalidate
    >
      <div class="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label for="contact-company">Company</label>
        <input id="contact-company" type="text" autocomplete="off" tabindex="-1" bind:value={form.honeypot} />
      </div>

      <div class="grid gap-5 sm:grid-cols-2">
        <Input label="Name" placeholder="Jane Doe" bind:value={form.name} error={fieldErrors.name} on:input={() => clearFieldError("name")} required />

        <Input
          type="email"
          label="Email"
          placeholder="jane@company.com"
          bind:value={form.email}
          error={fieldErrors.email}
          on:input={() => clearFieldError("email")}
          required
        />
      </div>

      <Textarea
        wrapperClass="mt-5"
        label="Message"
        placeholder="Tell me about your business, what feels wrong with the current website, and what the new site needs to do."
        bind:value={form.message}
        error={fieldErrors.message}
        hint={`${messageLength}/20 minimum characters`}
        rows={8}
        on:input={() => clearFieldError("message")}
        required
      />

      <Input
        wrapperClass="mt-5"
        type="url"
        label="Current Website (optional)"
        placeholder="https://example.com"
        bind:value={form.website}
        error={fieldErrors.website}
        on:input={() => clearFieldError("website")}
      />

      <Button class="mt-6 px-6" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Get my website quote"}
      </Button>

      {#if submitError}
        <p class="mt-4 rounded-lg border border-brand-accent/30 bg-brand-accent/10 px-4 py-3 text-sm text-brand-text" role="alert">
          {submitError}
        </p>
      {/if}

      {#if submitSuccess}
        <p
          class="mt-4 rounded-lg border border-brand-highlight/40 bg-brand-highlight/10 px-4 py-3 text-sm text-brand-text"
          role="status"
          aria-live="polite"
        >
          {submitSuccess}
        </p>
      {/if}
    </form>
  </div>
</section>
