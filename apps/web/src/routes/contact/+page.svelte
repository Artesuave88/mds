<script>
  import Button from "$lib/ui/Button.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Select from "$lib/ui/Select.svelte";
  import Textarea from "$lib/ui/Textarea.svelte";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const timelineOptions = [
    { value: "ASAP (1-2 weeks)", label: "ASAP (1-2 weeks)" },
    { value: "This month", label: "This month" },
    { value: "Next 1-2 months", label: "Next 1-2 months" },
    { value: "Exploring options", label: "Exploring options" }
  ];

  const initialForm = {
    name: "",
    email: "",
    timeline: "",
    message: "",
    website: "",
    honeypot: "",
    consent: false
  };

  let form = { ...initialForm };
  let fieldErrors = {};
  let submitError = "";
  let submitSuccess = "";
  let submitting = false;

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
    if (!trimmed) {
      return true;
    }

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
    const timeline = form.timeline.trim();
    const message = form.message.trim();
    const website = form.website.trim();

    if (!name) {
      errors.name = "Name is required.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      errors.email = "Please provide a valid email address.";
    }

    if (!timeline) {
      errors.timeline = "Please choose a timeline.";
    }

    if (!message) {
      errors.message = "Message is required.";
    } else if (message.length < 20) {
      errors.message = "Message must be at least 20 characters.";
    }

    if (website && !isValidWebsite(website)) {
      errors.website = "Website must be a valid URL (include http:// or https://).";
    }

    if (!form.consent) {
      errors.consent = "Consent is required.";
    }

    fieldErrors = errors;
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    submitError = "";
    submitSuccess = "";

    if (!validateForm()) {
      return;
    }

    submitting = true;

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        timeline: form.timeline.trim(),
        message: form.message.trim(),
        website: form.website.trim(),
        honeypot: form.honeypot,
        consent: form.consent
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

<section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
  <div class="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
    <div>
      <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-brand-text/65">Contact</p>
      <h1 class="mt-3 text-4xl font-extrabold text-brand-text sm:text-5xl">Let us map the next release.</h1>
      <p class="mt-6 max-w-md text-base leading-relaxed text-brand-text/85">
        Share your context, timeline, and goals. We will respond with next steps and a recommended engagement model.
      </p>

      <div class="mt-8 rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-sm">
        <p class="font-semibold text-brand-text">Typical kickoff window</p>
        <p class="mt-1 text-sm text-brand-text/75">1 to 2 weeks depending on scope</p>
        <p class="mt-5 font-semibold text-brand-text">Preferred project length</p>
        <p class="mt-1 text-sm text-brand-text/75">4 to 10 weeks for focused outcomes</p>
      </div>
    </div>

    <form class="relative rounded-3xl border border-brand-border bg-brand-surface p-7 shadow-sm sm:p-8" on:submit={handleSubmit} novalidate>
      <div class="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label for="contact-company">Company</label>
        <input id="contact-company" type="text" autocomplete="off" tabindex="-1" bind:value={form.honeypot} />
      </div>

      <Input
        label="Name"
        placeholder="Jane Doe"
        bind:value={form.name}
        error={fieldErrors.name}
        on:input={() => clearFieldError("name")}
        required
      />

      <Input
        wrapperClass="mt-5"
        type="email"
        label="Email"
        placeholder="jane@company.com"
        bind:value={form.email}
        error={fieldErrors.email}
        on:input={() => clearFieldError("email")}
        required
      />

      <Select
        wrapperClass="mt-5"
        label="Timeline"
        placeholder="Select a timeline"
        options={timelineOptions}
        bind:value={form.timeline}
        error={fieldErrors.timeline}
        on:change={() => clearFieldError("timeline")}
        required
      />

      <Textarea
        wrapperClass="mt-5"
        label="Message"
        placeholder="Tell us what you need, goals, and constraints."
        bind:value={form.message}
        error={fieldErrors.message}
        hint={`${messageLength}/20 minimum characters`}
        rows={6}
        on:input={() => clearFieldError("message")}
        required
      />

      <Input
        wrapperClass="mt-5"
        type="url"
        label="Website (optional)"
        placeholder="https://example.com"
        bind:value={form.website}
        error={fieldErrors.website}
        on:input={() => clearFieldError("website")}
      />

      <label class="mt-5 flex items-start gap-3 rounded-xl border border-brand-border bg-brand-surface-alt/40 p-4">
        <input
          class="mt-0.5 h-4 w-4 rounded border-brand-border text-brand-primary focus:ring-brand-accent"
          type="checkbox"
          bind:checked={form.consent}
          on:change={() => clearFieldError("consent")}
          required
        />
        <span class="text-sm text-brand-text/85">I consent to being contacted by Midas Web Development regarding this inquiry.</span>
      </label>
      {#if fieldErrors.consent}
        <p class="mt-2 text-xs font-semibold text-brand-accent">{fieldErrors.consent}</p>
      {/if}

      <Button class="mt-6 rounded-full px-6" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send inquiry"}
      </Button>

      {#if submitError}
        <p class="mt-4 rounded-xl border border-brand-accent/30 bg-brand-accent/10 px-4 py-3 text-sm text-brand-text" role="alert">
          {submitError}
        </p>
      {/if}

      {#if submitSuccess}
        <p class="mt-4 rounded-xl border border-brand-highlight/40 bg-brand-highlight/20 px-4 py-3 text-sm text-brand-text" role="status" aria-live="polite">
          {submitSuccess}
        </p>
      {/if}
    </form>
  </div>
</section>
