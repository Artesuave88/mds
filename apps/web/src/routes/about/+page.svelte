<script>
  import Badge from "$lib/ui/Badge.svelte";
  import { setMeta } from "$lib/seo";

  const meta = setMeta({
    title: "About Midas Web",
    description:
      "Midas Web builds straightforward, professional websites for UK businesses that need more trust and more enquiries online.",
    url: "/about"
  });

  const principles = [
    {
      title: "Make the offer obvious",
      text: "People should understand what you do, where you work, and why they should trust you before they have to think."
    },
    {
      title: "Use design as proof",
      text: "A strong site makes a small business feel established. The layout, images, words, and speed all have a job."
    },
    {
      title: "Keep the process moving",
      text: "You should not need a perfect brief or technical confidence. Rough notes are enough to start shaping the site."
    }
  ];

  const outcomes = ["Better first impression", "Clearer enquiry path", "Mobile pages that feel deliberate", "A website you own"];
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta property="og:type" content="website" key="og:type" />
  <meta property="og:site_name" content={meta.siteName} key="og:site_name" />
  <meta property="og:title" content={meta.title} key="og:title" />
  <meta property="og:description" content={meta.description} key="og:description" />
  <meta property="og:url" content={meta.url} key="og:url" />
  <meta property="og:image" content={meta.image} key="og:image" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.image} />
</svelte:head>

<section class="border-b border-brand-border/70 bg-brand-text text-white">
  <div class="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-24">
    <div>
      <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.14em] text-brand-primary">About Midas Web</p>
      <h1 class="mt-4 max-w-4xl text-5xl font-bold leading-[1.03] sm:text-6xl">
        Websites for businesses that need to look credible fast.
      </h1>
    </div>

    <div class="grid content-end gap-6">
      <p class="max-w-2xl text-lg leading-relaxed text-white/76">
        Businesses usually come to Midas Web because the current site, Facebook page, or DIY builder does not match the quality
        of the work they actually do.
      </p>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {#each outcomes as outcome}
          <div class="border-t border-white/18 pt-3 text-sm font-semibold text-white/82">{outcome}</div>
        {/each}
      </div>
    </div>
  </div>
</section>

<section class="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
  <div class="grid gap-5 md:grid-cols-3">
    {#each principles as principle}
      <article class="border border-brand-border/75 bg-white/88 p-6 shadow-[0_18px_55px_rgba(16,17,20,0.08)]">
        <Badge variant="subtle">Principle</Badge>
        <h2 class="mt-5 text-2xl font-bold text-brand-text">{principle.title}</h2>
        <p class="mt-4 text-sm leading-relaxed text-brand-text/72">{principle.text}</p>
      </article>
    {/each}
  </div>

  <div class="mt-16 grid gap-8 border-y border-brand-border/75 py-12 lg:grid-cols-[0.8fr_1.2fr]">
    <div>
      <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.14em] text-brand-highlight">The point</p>
      <h2 class="mt-3 text-3xl font-bold text-brand-text sm:text-4xl">A good website should reduce doubt.</h2>
    </div>
    <p class="text-lg leading-relaxed text-brand-text/76">
      Your visitors are asking quiet questions: is this business real, are they good, do they work near me, and how do I start?
      The site is built to answer those questions quickly, with a visual standard that makes the business feel trustworthy
      before anyone reads every word.
    </p>
  </div>
</section>
