<script>
  import { page } from "$app/stores";

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];
  const ACTIVE_LINK_CLASS = "bg-brand-highlight/20 text-brand-text";
  const INACTIVE_LINK_CLASS = "text-brand-text/85 hover:bg-brand-surface-alt hover:text-brand-text";

  let mobileOpen = false;

  function normalizePath(pathname) {
    if (!pathname || pathname === "/") {
      return "/";
    }

    return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  }

  function normalizeRouteId(routeId) {
    if (!routeId || routeId === "/") {
      return "/";
    }

    return routeId.endsWith("/") ? routeId.slice(0, -1) : routeId;
  }

  $: currentRouteId = normalizeRouteId($page.route?.id);
  $: currentPath = normalizePath($page.url.pathname);
  $: activeHref = resolveActiveHref(currentRouteId, currentPath);
  $: if (currentPath) {
    mobileOpen = false;
  }

  function resolveActiveHref(routeId, path) {
    const nonRootHrefs = navItems.map((item) => item.href).filter((href) => href !== "/");

    function matchRoute(candidate) {
      if (!candidate) {
        return null;
      }
      if (candidate === "/") {
        return "/";
      }

      for (const href of nonRootHrefs) {
        if (candidate === href || candidate.startsWith(`${href}/`)) {
          return href;
        }
      }

      return null;
    }

    return matchRoute(routeId) ?? matchRoute(path) ?? "/";
  }
</script>

<header class="sticky top-0 z-50 border-b border-brand-border/80 bg-brand-surface/90 backdrop-blur">
  <div class="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <a href="/" class="inline-flex items-center gap-3 rounded-full px-2 py-1 text-brand-text">
      <img
        src="/brand/logo-mark.png"
        alt=""
        aria-hidden="true"
        class="h-16 w-16 rounded-xl border border-brand-primary/55 object-contain brightness-110 contrast-125 saturate-150 shadow-[0_10px_24px_rgba(0,0,0,0.12)] bg-black"
      />
      <span class="hidden text-sm font-bold tracking-wide sm:block">Midas Web Development</span>
    </a>

    <nav class="hidden items-center gap-1 md:flex">
      {#each navItems as item}
        <a
          class={`rounded-full px-3 py-2 text-sm font-semibold transition ${activeHref === item.href ? ACTIVE_LINK_CLASS : INACTIVE_LINK_CLASS}`}
          href={item.href}
          aria-current={activeHref === item.href ? "page" : undefined}
        >
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
          <a
            class={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${activeHref === item.href ? ACTIVE_LINK_CLASS : INACTIVE_LINK_CLASS}`}
            href={item.href}
            aria-current={activeHref === item.href ? "page" : undefined}
          >
            {item.label}
          </a>
        {/each}
      </nav>
    </div>
  {/if}
</header>
