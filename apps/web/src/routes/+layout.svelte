<script>
  import "../app.css";
  import AppShell from "$lib/layout/AppShell.svelte";
</script>

<svelte:head>
  <title>Michael Design Studio</title>
  <meta
    name="description"
    content="Design and engineering support for ambitious product and brand teams."
  />
  <meta name="theme-color" content="#0a3e74" />
  <meta property="og:title" content="Michael Design Studio" />
  <meta
    property="og:description"
    content="Design and engineering support for ambitious product and brand teams."
  />
  <meta property="og:image" content="/brand/logo-full.svg" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Michael Design Studio" />
  <meta
    name="twitter:description"
    content="Design and engineering support for ambitious product and brand teams."
  />
  <meta name="twitter:image" content="/brand/logo-full.svg" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/brand/logo-mark.svg" />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<AppShell>
  <slot />
</AppShell>
