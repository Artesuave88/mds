<script>
  let form = {
    name: "",
    email: "",
    message: ""
  };
  let status = "";
  let submitting = false;

  async function handleSubmit(event) {
    event.preventDefault();
    status = "";
    submitting = true;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) {
        status = data.error || "Something went wrong.";
      } else {
        status = "Message received. We will follow up within one business day.";
        form = { name: "", email: "", message: "" };
      }
    } catch (error) {
      status = "Network error. Please try again.";
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

    <form class="rounded-3xl border border-brand-border bg-brand-surface p-7 shadow-sm sm:p-8" on:submit={handleSubmit}>
      <label class="block">
        <span class="mb-2 block text-sm font-semibold text-brand-text/85">Name</span>
        <input
          bind:value={form.name}
          class="w-full rounded-xl border border-brand-border px-4 py-3 text-sm outline-none transition focus:border-brand-accent"
          placeholder="Jane Doe"
          required
          type="text"
        />
      </label>

      <label class="mt-5 block">
        <span class="mb-2 block text-sm font-semibold text-brand-text/85">Email</span>
        <input
          bind:value={form.email}
          class="w-full rounded-xl border border-brand-border px-4 py-3 text-sm outline-none transition focus:border-brand-accent"
          placeholder="jane@company.com"
          required
          type="email"
        />
      </label>

      <label class="mt-5 block">
        <span class="mb-2 block text-sm font-semibold text-brand-text/85">Project brief</span>
        <textarea
          bind:value={form.message}
          class="h-36 w-full rounded-xl border border-brand-border px-4 py-3 text-sm outline-none transition focus:border-brand-accent"
          placeholder="What are you building and what outcome do you need?"
          required
        ></textarea>
      </label>

      <button
        class="mt-6 inline-flex rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-70"
        disabled={submitting}
        type="submit"
      >
        {submitting ? "Sending..." : "Send inquiry"}
      </button>

      {#if status}
        <p class="mt-4 rounded-xl bg-brand-surface-alt px-4 py-3 text-sm text-brand-text/85">{status}</p>
      {/if}
    </form>
  </div>
</section>
