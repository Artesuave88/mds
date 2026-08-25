<script>
  import { browser } from "$app/environment";
  import { afterNavigate } from "$app/navigation";
  import { page } from "$app/stores";
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

  const siteUrl = "https://www.midasweb.org";
  const organizationDescription = "UK-based custom web developer for high-performance websites";
  const socialLinks = [
    "https://facebook.com/midasweborg",
    "https://twitter.com/midasweborg",
    "https://instagram.com/midasweborg",
    "https://linkedin.com/company/midasweborg"
  ];

  const escapeJsonLd = (value) =>
    value.replace(/[<>&]/g, (char) => {
      if (char === "<") return "\\u003c";
      if (char === ">") return "\\u003e";
      return "\\u0026";
    });

  const organizationJsonLd = escapeJsonLd(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "Midas Web Development",
      url: siteUrl,
      description: organizationDescription,
      telephone: "+44 7345 825946",
      email: "info@midasweb.org",
      logo: `${siteUrl}/brand/logo-full.png`,
      sameAs: socialLinks
    })
  );

  const localBusinessJsonLd = escapeJsonLd(
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${siteUrl}#localbusiness`,
      name: "Midas Web Development",
      url: siteUrl,
      description: organizationDescription,
      telephone: "+44 7345 825946",
      email: "info@midasweb.org",
      address: {
        "@type": "PostalAddress",
        addressCountry: "UK"
      },
      sameAs: socialLinks
    })
  );

  const organizationScript = `<script type="application/ld+json">${organizationJsonLd}<\/script>`;
  const localBusinessScript = `<script type="application/ld+json">${localBusinessJsonLd}<\/script>`;

  const noIndexPaths = ["/preview", "/test", "/staging"];
  $: isNoIndex = noIndexPaths.some((path) => $page.url.pathname.startsWith(path));
</script>

<svelte:head>
  <meta name="theme-color" content="#111111" />
  <meta name="robots" content={isNoIndex ? "noindex, nofollow" : "index, follow"} key="robots" />
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="icon" href="/favicon-48x48.png" sizes="48x48" type="image/png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
  <link rel="manifest" href="/site.webmanifest" />
  <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Midas Web Development" />
  {@html organizationScript}
  {@html localBusinessScript}
</svelte:head>

<AppShell>
  <slot />
</AppShell>
