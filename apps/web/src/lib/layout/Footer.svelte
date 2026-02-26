<script>
  const year = new Date().getFullYear();
</script>

<footer class="border-t border-slate-200 bg-white">
  <div class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
    <div>
      <img
        src="/brand/logo-full.svg"
        alt="Michael Design Studio logo"
        class="h-auto w-36"
        loading="lazy"
      />
      <h2 class="mt-3 max-w-md text-xl font-bold text-slate-900">
        Design and engineering support for ambitious product and brand teams.
      </h2>
      <p class="mt-4 max-w-lg text-sm leading-relaxed text-slate-600">
        We build clear systems and polished interfaces that help teams launch faster and grow with confidence.
      </p>
    </div>

    <div class="grid grid-cols-2 gap-6 text-sm">
      <div>
        <p class="font-semibold text-slate-900">Navigate</p>
        <div class="mt-3 space-y-2">
          <a class="block text-slate-600 hover:text-slate-900" href="/">Home</a>
          <a class="block text-slate-600 hover:text-slate-900" href="/work">Work</a>
          <a class="block text-slate-600 hover:text-slate-900" href="/services">Services</a>
        </div>
      </div>

      <div>
        <p class="font-semibold text-slate-900">Company</p>
        <div class="mt-3 space-y-2">
          <a class="block text-slate-600 hover:text-slate-900" href="/about">About</a>
          <a class="block text-slate-600 hover:text-slate-900" href="/contact">Contact</a>
          <a class="block text-slate-600 hover:text-slate-900" href="/api/health" target="_blank" rel="noreferrer">API Health</a>
        </div>
      </div>
    </div>
  </div>

  <div class="border-t border-slate-200">
    <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <p class="text-xs text-slate-500">© {year} Michael Design Studio</p>
      <p class="font-['Space_Mono'] text-[10px] uppercase tracking-[0.2em] text-slate-400">Built with Svelte + Tailwind</p>
    </div>
  </div>
</footer>
