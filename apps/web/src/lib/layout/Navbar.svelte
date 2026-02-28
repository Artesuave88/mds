<script>
  import { page } from "$app/stores";

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  let mobileOpen = false;

  $: currentPath = $page.url.pathname || "/";
  $: if (currentPath) {
    mobileOpen = false;
  }

  function isActive(href) {
    if (href === "/") {
      return currentPath === "/";
    }
    if (href === "/work") {
      return currentPath === "/work" || currentPath.startsWith("/work/");
    }
    return currentPath === href;
  }

  function desktopLinkClasses(href) {
    return `rounded-full px-3 py-2 text-sm font-semibold transition ${
      isActive(href)
        ? "bg-brand-highlight/20 text-brand-text"
        : "text-brand-text/85 hover:bg-brand-surface-alt hover:text-brand-text"
    }`;
  }

  function mobileLinkClasses(href) {
    return `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
      isActive(href)
        ? "bg-brand-highlight/20 text-brand-text"
        : "text-brand-text/85 hover:bg-brand-surface-alt hover:text-brand-text"
    }`;
  }
</script>

<header class="sticky top-0 z-50 border-b border-brand-border/80 bg-brand-surface/90 backdrop-blur">
  <div class="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <a href="/" class="inline-flex items-center gap-2 rounded-full px-2 py-1 text-brand-text">
      <img src="/brand/logo-mark.png" alt="" aria-hidden="true" class="h-8 w-8 rounded-full bg-brand-surface" />
      <span class="text-sm font-bold tracking-wide">Midas Web Development</span>
    </a>

    <nav class="hidden items-center gap-1 md:flex">
      {#each navItems as item}
        <a class={desktopLinkClasses(item.href)} href={item.href}>
          {item.label}
        </a>
      {/each}
    </nav>

    <button
      aria-controls="mobile-nav"
      aria-expanded={mobileOpen}
      class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border text-brand-text/85 md:hidden"
      on:click={() => {
        mobileOpen = !mobileOpen;
      }}
      type="button"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24">
        {#if mobileOpen}
          <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" stroke-linejoin="round"></path>
        {:else}
          <path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round" stroke-linejoin="round"></path>
        {/if}
      </svg>
    </button>
  </div>

  {#if mobileOpen}
    <div class="border-t border-brand-border bg-brand-surface md:hidden" id="mobile-nav">
      <nav class="mx-auto w-full max-w-6xl space-y-2 px-4 py-4 sm:px-6 lg:px-8">
        {#each navItems as item}
          <a class={mobileLinkClasses(item.href)} href={item.href}>
            {item.label}
          </a>
        {/each}
      </nav>
    </div>
  {/if}
</header>
