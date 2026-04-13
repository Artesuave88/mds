<script>
  import { setMeta } from "$lib/seo";

  const meta = setMeta({
    title: "About Midas Web",
    description: "Midas Web builds straightforward, professional websites for UK businesses that need more trust and more enquiries online.",
    url: "/about"
  });
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

<section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
  <div class="section-panel p-8 sm:p-10">
  <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-brand-text/65">About</p>
  <h1 class="mt-3 max-w-3xl text-4xl font-extrabold text-brand-text sm:text-5xl">Why businesses hire Midas Web</h1>
  <p class="mt-6 max-w-3xl text-base leading-relaxed text-brand-text/85 sm:text-lg">
    Businesses usually come to Midas Web because they need a website that looks more professional, feels easier to trust, and
    helps turn visits into real enquiries.
  </p>
  </div>

  <div class="mt-10 grid gap-6 md:grid-cols-3">
    <article class="rounded-[1.75rem] border border-brand-border/75 bg-brand-surface/85 p-6 shadow-[0_20px_55px_rgba(23,18,13,0.08)]">

      <h2 class="mt-3 text-xl font-bold text-brand-text">Customers understand what you do quickly</h2>
      <p class="mt-3 text-sm leading-relaxed text-brand-text/75">
        The site is laid out so people can quickly see your services, where you work, and how to contact you.
      </p>
    </article>

    <article class="rounded-[1.75rem] border border-brand-border/75 bg-brand-surface/85 p-6 shadow-[0_20px_55px_rgba(23,18,13,0.08)]">

      <h2 class="mt-3 text-xl font-bold text-brand-text">You get a proper site without a drawn-out process</h2>
      <p class="mt-3 text-sm leading-relaxed text-brand-text/75">
        The work moves quickly, but the end result still feels polished and built properly for your business.
      </p>
    </article>

    <article class="rounded-[1.75rem] border border-brand-border/75 bg-brand-surface/85 p-6 shadow-[0_20px_55px_rgba(23,18,13,0.08)]">

      <h2 class="mt-3 text-xl font-bold text-brand-text">It is built to fit your business, not just fill a template</h2>
      <p class="mt-3 text-sm leading-relaxed text-brand-text/75">
        You get a website that matches how you work now and gives you room to improve it later without starting again.
      </p>
    </article>
  </div>

  <div class="mt-12 rounded-[2rem] border border-brand-border/75 bg-[linear-gradient(145deg,rgba(255,253,248,0.74),rgba(239,226,210,0.72))] p-8 shadow-[0_20px_60px_rgba(23,18,13,0.08)] sm:p-10">
    <h2 class="text-2xl font-bold text-brand-text">What that means for your business</h2>
    <ul class="mt-5 space-y-3 text-sm leading-relaxed text-brand-text/85">
      <li class="flex gap-3">
        <span class="mt-1 h-2 w-2 rounded-full bg-brand-highlight"></span>
        <span>A website that gives customers a better first impression of your business.</span>
      </li>
      <li class="flex gap-3">
        <span class="mt-1 h-2 w-2 rounded-full bg-brand-highlight"></span>
        <span>A simpler route to launch without needing to manage lots of technical details.</span>
      </li>
      <li class="flex gap-3">
        <span class="mt-1 h-2 w-2 rounded-full bg-brand-highlight"></span>
        <span>A site that is easier for customers to use and more likely to turn visits into enquiries.</span>
      </li>
    </ul>
  </div>
</section>
