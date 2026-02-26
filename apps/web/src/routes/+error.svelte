<script>
  export let status;
  export let error;
</script>

{#if status === 404}
  <section class="mx-auto w-full max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
    <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-brand-text/65">404</p>
    <h1 class="mt-3 text-4xl font-extrabold text-brand-text sm:text-5xl">Page not found</h1>
    <p class="mx-auto mt-5 max-w-lg text-base text-brand-text/75">
      The page you requested does not exist. You can head back to the homepage or explore recent work.
    </p>
    <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
      <a class="rounded-full bg-brand-bg px-6 py-3 text-sm font-semibold text-white hover:bg-brand-accent" href="/">
        Go home
      </a>
      <a class="rounded-full border border-brand-border px-6 py-3 text-sm font-semibold text-brand-text hover:border-brand-accent/60" href="/work">
        Browse work
      </a>
    </div>
  </section>
{:else}
  <section class="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
    <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-brand-text/65">Error {status}</p>
    <h1 class="mt-3 text-3xl font-bold text-brand-text">Something went wrong</h1>
    <p class="mt-4 text-brand-text/75">{error?.message ?? "Unexpected application error."}</p>
    <a class="mt-8 inline-flex rounded-full bg-brand-bg px-6 py-3 text-sm font-semibold text-white hover:bg-brand-accent" href="/">
      Go home
    </a>
  </section>
{/if}
