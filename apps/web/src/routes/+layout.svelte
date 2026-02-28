<script>
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import "../app.css";
  import AppShell from "$lib/layout/AppShell.svelte";

  if (browser) {
    afterNavigate(({ from, to }) => {
      if (!from || to.url.hash) {
        return;
      }

      const fromPath = `${from.url.pathname}${from.url.search}`;
      const toPath = `${to.url.pathname}${to.url.search}`;

      if (fromPath !== toPath) {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    });
  }
</script>

<svelte:head>
  <meta name="theme-color" content="#111111" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/brand/logo-mark.png" />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<AppShell>
  <slot />
</AppShell>
