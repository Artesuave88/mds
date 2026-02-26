<script>
  import "../app.css";
  import AppShell from "$lib/layout/AppShell.svelte";
</script>

<svelte:head>
  <title>MDS</title>
  <meta
    name="description"
    content="MDS builds fast, reliable, and conversion-focused websites."
  />
  <meta name="theme-color" content="#0a3e74" />
  <meta property="og:title" content="MDS" />
  <meta
    property="og:description"
    content="MDS builds fast, reliable, and conversion-focused websites."
  />
  <meta property="og:image" content="/brand/logo-full.svg" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="MDS" />
  <meta
    name="twitter:description"
    content="MDS builds fast, reliable, and conversion-focused websites."
  />
  <meta name="twitter:image" content="/brand/logo-full.svg" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/brand/logo-mark.svg" />
  <link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<AppShell>
  <slot />
</AppShell>
