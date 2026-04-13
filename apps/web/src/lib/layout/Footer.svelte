<script>
  const year = new Date().getFullYear();
</script>

<footer class="mt-12 border-t border-brand-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.94))]">
  <div class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
    <div>
      <img
        src="/brand/logo-full.png"
        alt="Midas Web Development logo"
        class="h-auto w-44 rounded-[1.75rem] border border-brand-primary/40 bg-black p-2 brightness-110 contrast-125 saturate-150 shadow-[0_18px_48px_rgba(13,13,13,0.12)]"
        loading="lazy"
      />
      <h2 class="mt-3 max-w-md text-xl font-bold text-brand-text">
        UK-based custom websites for businesses that want to look professional online.
      </h2>
      <p class="mt-4 max-w-lg text-sm leading-relaxed text-brand-text/75">
        We design and build fast, modern websites that improve trust, visibility, and enquiries.
      </p>
    </div>

    <div class="section-panel grid grid-cols-2 gap-6 p-6 text-sm">
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
          <a class="block text-brand-text/75 hover:text-brand-text" href="/contact">Get a website quote</a>
          <a class="block text-brand-text/75 hover:text-brand-text" href="/api/health" target="_blank" rel="noreferrer">API Health</a>
        </div>
      </div>
    </div>
  </div>

  <div class="border-t border-brand-border/70">
    <div class="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 lg:px-8">
      <p class="text-xs text-brand-text/65">© {year} Midas Web Development</p>
      <!-- <div class="flex justify-center space-x-4 text-2xl">
        <a
          class="text-brand-text/70 hover:text-blue-500"
          href="https://facebook.com/midasweborg"
          target="_blank"
          rel="noreferrer"
          aria-label="Midas Web Development on Facebook"
        >
          Facebook
        </a>
        <a
          class="text-brand-text/70 hover:text-blue-500"
          href="https://twitter.com/midasweborg"
          target="_blank"
          rel="noreferrer"
          aria-label="Midas Web Development on X"
        >
          X
        </a>
        <a
          class="text-brand-text/70 hover:text-blue-500"
          href="https://instagram.com/midasweborg"
          target="_blank"
          rel="noreferrer"
          aria-label="Midas Web Development on Instagram"
        >
          Instagram
        </a>
        <a
          class="text-brand-text/70 hover:text-blue-500"
          href="https://linkedin.com/company/midasweborg"
          target="_blank"
          rel="noreferrer"
          aria-label="Midas Web Development on LinkedIn"
        >
          LinkedIn
        </a>
      </div> -->
      <p class="font-['Space_Mono'] text-[10px] uppercase tracking-[0.2em] text-brand-text/55">Built with Svelte + Tailwind</p>
    </div>
  </div>
</footer>
