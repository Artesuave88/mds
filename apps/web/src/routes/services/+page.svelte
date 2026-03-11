<script>
  import { fade, fly, scale } from "svelte/transition";
  import { reveal } from "../../lib/actions/reveal";
  import { services } from "../../lib/data/services";
  import { setMeta } from "$lib/seo";
  import Card from "../../lib/ui/Card.svelte";

  const meta = setMeta({
    title: "Website Design and Development Services in Derbyshire",
    description: "Explore custom website services for UK businesses that want a more professional online presence and more enquiries.",
    url: "/services"
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

<section
  class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
  use:reveal={{ distance: 22, duration: 540, threshold: 0.1 }}
>
  <div in:fly={{ y: 16, duration: 480 }}>
    <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-brand-text/65">Services</p>
    <h1 class="mt-3 max-w-3xl text-4xl font-extrabold text-brand-text sm:text-5xl">What you get when you hire Midas Web</h1>
    <p class="mt-5 max-w-2xl text-base leading-relaxed text-brand-text/85">
      Everything is built around a simple goal: help your business look more professional online and make it easier for the
      right people to contact you.
    </p>
  </div>

  <div class="mt-10 grid gap-6 md:grid-cols-3">
    {#each services as service, index}
      <div in:scale={{ start: 0.96, duration: 320, delay: index * 70 }}>
        <Card interactive>
          <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">{service.id}</p>
          <h2 class="mt-3 text-xl font-bold text-brand-text">{service.title}</h2>
          <p class="mt-3 text-sm leading-relaxed text-brand-text/75">{service.summary}</p>
          <ul class="mt-5 space-y-2 text-sm text-brand-text/85">
            {#each service.deliverables as deliverable}
              <li class="flex items-start gap-2">
                <span class="mt-1 h-2 w-2 rounded-full bg-brand-highlight"></span>
                <span>{deliverable}</span>
              </li>
            {/each}
          </ul>
        </Card>
      </div>
    {/each}
  </div>

  <div
    class="mt-12 rounded-3xl border border-brand-border bg-brand-bg p-8 text-brand-text sm:p-10"
    use:reveal={{ distance: 18, duration: 460, threshold: 0.2 }}
    in:fade={{ duration: 420 }}
  >
    <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">How we work</p>
    <h2 class="mt-3 max-w-2xl text-2xl font-bold sm:text-3xl">You do not need to know the website side of things</h2>
    <p class="mt-4 max-w-2xl text-sm leading-relaxed text-brand-text/70">
      You explain the business, I handle the planning and build, and you review it as it comes together. Simple, direct, and
      built to keep moving.
    </p>
    <a
      class="mt-8 inline-flex rounded-full bg-brand-highlight px-6 py-3 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-highlight/90"
      href="/contact"
    >
      Tell me about your business
    </a>
  </div>
</section>
