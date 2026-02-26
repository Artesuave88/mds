<script>
  let status = "";
  let submitting = false;
  let form = {
    name: "",
    email: "",
    message: ""
  };

  async function pingHealth() {
    status = "Checking /api/health...";
    try {
      const response = await fetch("/api/health");
      const data = await response.json();
      status = `Health OK: ${data.timestamp}`;
    } catch (error) {
      status = "Health check failed.";
    }
  }

  async function submitContact(event) {
    event.preventDefault();
    submitting = true;
    status = "Submitting to /api/contact...";

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
        status = `Error: ${data.error ?? "Request failed"}`;
      } else {
        status = `Sent! Message length: ${data.received.messageLength}`;
      }
    } catch (error) {
      status = "Network error while submitting form.";
    } finally {
      submitting = false;
    }
  }
</script>

<main class="min-h-screen bg-slate-50 px-6 py-10">
  <div class="mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
    <h1 class="text-2xl font-bold tracking-tight text-slate-900">Vercel + pnpm Monorepo</h1>
    <p class="mt-2 text-slate-600">
      Svelte app in <code>apps/web</code> with TypeScript serverless functions in <code>/api</code>.
    </p>

    <div class="mt-6">
      <button
        class="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        on:click={pingHealth}
        type="button"
      >
        Check API Health
      </button>
    </div>

    <form class="mt-8 space-y-4" on:submit={submitContact}>
      <label class="block">
        <span class="mb-1 block text-sm font-medium text-slate-700">Name</span>
        <input
          bind:value={form.name}
          class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-slate-500"
          placeholder="Jane Doe"
          required
          type="text"
        />
      </label>

      <label class="block">
        <span class="mb-1 block text-sm font-medium text-slate-700">Email</span>
        <input
          bind:value={form.email}
          class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-slate-500"
          placeholder="jane@example.com"
          required
          type="email"
        />
      </label>

      <label class="block">
        <span class="mb-1 block text-sm font-medium text-slate-700">Message</span>
        <textarea
          bind:value={form.message}
          class="h-28 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-slate-500"
          placeholder="Hello from Svelte"
          required
        ></textarea>
      </label>

      <button
        class="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={submitting}
        type="submit"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>

    {#if status}
      <p class="mt-6 rounded-md bg-slate-100 px-3 py-2 text-sm text-slate-700">{status}</p>
    {/if}
  </div>
</main>
