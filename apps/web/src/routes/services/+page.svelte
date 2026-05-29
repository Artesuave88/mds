<script>
  import { fade, fly, scale } from "svelte/transition";
  import { reveal } from "$lib/actions/reveal";
  import { services } from "$lib/data/services";
  import { setMeta } from "$lib/seo";
  import Badge from "$lib/ui/Badge.svelte";

  const meta = setMeta({
    title: "Website Design and Development Services in Derbyshire",
    description:
      "Explore custom website services for UK businesses that want a more professional online presence and more enquiries.",
    url: "/services"
  });

  const packageRows = [
    ["Planning", "Pages, message, customer journey, and content structure."],
    ["Design", "A visual direction that makes the business feel sharper and more trustworthy."],
    ["Build", "Responsive pages, enquiry routes, hosting setup, and launch checks."],
    ["Improve", "Post-launch refinements for wording, calls to action, and page clarity."]
  ];
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

<section class="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8" use:reveal={{ distance: 22, duration: 540, threshold: 0.1 }}>
  <div class="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
    <div in:fly={{ y: 16, duration: 480 }}>
      <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.14em] text-brand-highlight">Services</p>
      <h1 class="mt-4 max-w-4xl text-5xl font-bold leading-[1.03] text-brand-text sm:text-6xl">
        The website, shaped from rough idea to launch.
      </h1>
    </div>
    <p class="max-w-2xl text-lg leading-relaxed text-brand-text/76">
      Everything is built around one commercial job: help your business look more professional online and make it easier for
      the right people to contact you.
    </p>
  </div>

  <div class="mt-14 grid gap-5 md:grid-cols-3">
    {#each services as service, index}
      <article
        class="border border-brand-border/75 bg-white/88 p-6 shadow-[0_18px_55px_rgba(16,17,20,0.08)]"
        in:scale={{ start: 0.96, duration: 320, delay: index * 70 }}
      >
        <p class="font-['Space_Mono'] text-sm font-bold text-brand-primary">{service.id}</p>
        <h2 class="mt-4 text-2xl font-bold text-brand-text">{service.title}</h2>
        <p class="mt-4 text-sm leading-relaxed text-brand-text/72">{service.summary}</p>
        <div class="mt-6 flex flex-wrap gap-2">
          {#each service.deliverables as deliverable}
            <Badge variant="subtle">{deliverable}</Badge>
          {/each}
        </div>
      </article>
    {/each}
  </div>

  <div
    class="mt-16 grid gap-8 border border-brand-text bg-brand-text p-6 text-white shadow-[0_28px_80px_rgba(16,17,20,0.18)] sm:p-8 lg:grid-cols-[0.82fr_1.18fr]"
    use:reveal={{ distance: 18, duration: 460, threshold: 0.2 }}
    in:fade={{ duration: 420 }}
  >
    <div>
      <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.14em] text-brand-primary">How we work</p>
      <h2 class="mt-3 text-3xl font-bold sm:text-4xl">You bring the business knowledge. I turn it into the site.</h2>
      <a
        class="mt-8 inline-flex rounded-lg bg-brand-primary px-6 py-3 text-sm font-bold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-white"
        href="/contact"
      >
        Tell me about your business
      </a>
    </div>

    <div class="divide-y divide-white/16 border-y border-white/16">
      {#each packageRows as row}
        <div class="grid gap-3 py-5 sm:grid-cols-[0.3fr_0.7fr]">
          <p class="font-semibold text-white">{row[0]}</p>
          <p class="text-sm leading-relaxed text-white/72">{row[1]}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
