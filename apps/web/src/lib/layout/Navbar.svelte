<script>
  import { page } from "$app/stores";
  let mobileOpen = false;
  const links = [
    ["/work", "Work"],
    ["/services", "Services"],
    ["/about", "Studio"]
  ];
  $: if ($page.url.pathname) mobileOpen = false;
</script>

<header class="site-nav">
  <div class="nav-inner">
    <a class="wordmark" href="/" aria-label="Midas home">
      <span class="wordmark-dot"></span>
      <strong>MIDAS</strong><small>WEB STUDIO</small>
    </a>
    <nav class:open={mobileOpen}>
      {#each links as link}
        <a href={link[0]} class:active={$page.url.pathname.startsWith(link[0])}>{link[1]}</a>
      {/each}
      <a class="nav-cta" href="/contact">Start a project <span>↗</span></a>
    </nav>
    <button class="menu-button" type="button" aria-label="Toggle menu" aria-expanded={mobileOpen} on:click={() => mobileOpen = !mobileOpen}>
      <span></span><span></span>
    </button>
  </div>
</header>
