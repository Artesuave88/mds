<script lang="ts">
  import type { MetaOutput } from "$lib/seo";

  export let meta: MetaOutput;
  export let type: "website" | "article" = "website";
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.canonicalUrl} />
  <meta property="og:type" content={type} />
  <meta property="og:site_name" content={meta.siteName} />
  <meta property="og:title" content={meta.openGraphTitle} />
  <meta property="og:description" content={meta.openGraphDescription} />
  <meta property="og:url" content={meta.canonicalUrl} />
  <meta property="og:image" content={meta.image} />
  <meta name="twitter:card" content={meta.twitterCard} />
  <meta name="twitter:title" content={meta.openGraphTitle} />
  <meta name="twitter:description" content={meta.openGraphDescription} />
  <meta name="twitter:image" content={meta.image} />
</svelte:head>
