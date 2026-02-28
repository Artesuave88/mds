<script>
  const year = new Date().getFullYear();
</script>

<footer class="border-t border-brand-border bg-brand-surface">
  <div class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
    <div>
      <img
        src="/brand/logo-full.png"
        alt="Midas Web Development logo"
        class="h-auto w-36"
        loading="lazy"
      />
      <h2 class="mt-3 max-w-md text-xl font-bold text-brand-text">
        Website engineering support for teams that need speed, clarity, and results.
      </h2>
      <p class="mt-4 max-w-lg text-sm leading-relaxed text-brand-text/75">
        We build, launch, and improve production websites with clean code and measurable business intent.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-6 text-sm">
      <div>
        <p class="font-semibold text-brand-text">Navigate</p>
        <div class="mt-3 space-y-2">
          <a class="block text-brand-text/75 hover:text-brand-text" href="/">Home</a>
          <a class="block text-brand-text/75 hover:text-brand-text" href="/work">Work</a>
          <a class="block text-brand-text/75 hover:text-brand-text" href="/services">Services</a>
        </div>
      </div>

      <div>
        <p class="font-semibold text-brand-text">Company</p>
        <div class="mt-3 space-y-2">
          <a class="block text-brand-text/75 hover:text-brand-text" href="/about">About</a>
          <a class="block text-brand-text/75 hover:text-brand-text" href="/contact">Contact</a>
          <a class="block text-brand-text/75 hover:text-brand-text" href="/api/health" target="_blank" rel="noreferrer">API Health</a>
        </div>
      </div>
    </div>
  </div>

  <div class="border-t border-brand-border">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <p class="text-xs text-brand-text/65">© {year} Midas Web Development</p>
      <p class="font-['Space_Mono'] text-[10px] uppercase tracking-[0.2em] text-brand-text/55">Built with Svelte + Tailwind</p>
    </div>
  </div>
</footer>
