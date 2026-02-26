<script>
  import { fade, fly, scale } from "svelte/transition";
  import { reveal } from "$lib/actions/reveal";
  import { getProjects } from "$lib/content";
  import { services } from "$lib/data/services";
  import { setMeta } from "$lib/seo";
  import Badge from "$lib/ui/Badge.svelte";
  import Button from "$lib/ui/Button.svelte";
  import Card from "$lib/ui/Card.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Section from "$lib/ui/Section.svelte";

  const allProjects = getProjects({ sort: "newest" });
  const featuredWork = allProjects.slice(0, 3);
  const featuredServices = services.slice(0, 3);
  const latestProject = featuredWork[0];

  const meta = setMeta({
    title: "MDS",
    description: "MDS builds fast, reliable, and conversion-focused websites.",
    url: "/"
  });

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "MDS",
    url: meta.url,
    image: meta.image,
    description: meta.description,
    areaServed: "Worldwide",
    serviceType: ["Website Strategy", "Website Development", "Growth Optimization"]
  });

  let showEngagementModal = false;
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <link rel="canonical" href={meta.url} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={meta.siteName} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={meta.url} />
  <meta property="og:image" content={meta.image} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.image} />
  <script type="application/ld+json">{structuredData}</script>
</svelte:head>

<section
  class="border-b border-slate-200 bg-gradient-to-br from-emerald-100/70 via-amber-50 to-cyan-100/60"
  use:reveal={{ distance: 20, duration: 550, threshold: 0.1 }}
>
  <div class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
    <div in:fly={{ y: 18, duration: 500 }}>
      <Badge variant="subtle" class="border-white/80 bg-white/70 text-slate-600">MDS</Badge>
      <h1 class="mt-5 max-w-xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
        We build websites that are fast, clear, and built to convert.
      </h1>
      <p class="mt-6 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
        MDS helps teams launch and improve production websites with strong performance and business intent.
      </p>
      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a
          class="inline-flex items-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40 focus-visible:ring-offset-2"
          href="/work"
        >
          Explore work
        </a>
        <a
          class="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:border-slate-400 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 focus-visible:ring-offset-2"
          href="/contact"
        >
          Start a project
        </a>
        <Button
          variant="outline"
          on:click={() => (showEngagementModal = true)}
          aria-haspopup="dialog"
          aria-expanded={showEngagementModal}
        >
          See engagement model
        </Button>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2" in:fly={{ y: 24, duration: 550, delay: 80 }}>
      <div in:scale={{ start: 0.96, duration: 320, delay: 100 }}>
        <Card class="bg-white/90" interactive>
          <Badge size="sm" variant="subtle">Projects</Badge>
          <p class="mt-3 text-3xl font-extrabold text-slate-900">{allProjects.length}</p>
          <p class="mt-2 text-sm text-slate-600">Published case study currently in portfolio.</p>
        </Card>
      </div>

      <div in:scale={{ start: 0.96, duration: 320, delay: 170 }}>
        <Card class="bg-white/90" interactive>
          <Badge size="sm" variant="subtle">Latest Client</Badge>
          <p class="mt-3 text-lg font-bold text-slate-900">{latestProject?.client ?? "TBD"}</p>
          <p class="mt-2 text-sm text-slate-600">Most recently documented web project.</p>
        </Card>
      </div>

      <div class="sm:col-span-2" in:scale={{ start: 0.97, duration: 360, delay: 240 }}>
        <Card variant="contrast">
          <Badge size="sm" variant="subtle" class="border-slate-700 bg-slate-800 text-slate-300">Current Build</Badge>
          <p class="mt-3 text-xl font-bold">{latestProject?.title ?? "No case study added yet"}</p>
          <p class="mt-2 text-sm text-slate-300">{latestProject?.summary ?? "Add your first project in src/content/projects.json."}</p>
        </Card>
      </div>
    </div>
  </div>
</section>

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
  <Section eyebrow="Featured Work" title="Selected case studies" containerClass="py-16">
    <a slot="actions" class="text-sm font-semibold text-slate-700 transition hover:text-slate-900" href="/work">
      View all projects
    </a>

    <div class="grid gap-5 md:grid-cols-3">
      {#each featuredWork as item, index}
        <a class="block" href={`/work/${item.slug}`} in:scale={{ start: 0.96, duration: 320, delay: index * 70 }}>
          <Card class="group h-full" interactive>
            <Badge size="sm" variant="subtle">{item.year} · {item.client}</Badge>
            <h3 class="mt-3 text-lg font-bold text-slate-900 transition group-hover:text-slate-700">{item.title}</h3>
            <p class="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
            <p class="mt-5 text-sm font-semibold text-slate-800">Read case study -></p>
          </Card>
        </a>
      {/each}
    </div>
  </Section>
</div>

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
  <Section
    class="border-y border-slate-200 bg-white"
    eyebrow="Services"
    title="What we help with"
    containerClass="py-16"
  >
    <a slot="actions" class="text-sm font-semibold text-slate-700 transition hover:text-slate-900" href="/services">
      See service details
    </a>

    <div class="grid gap-5 md:grid-cols-3">
      {#each featuredServices as service, index}
        <div in:scale={{ start: 0.96, duration: 300, delay: index * 65 }}>
          <Card variant="muted" interactive>
            <Badge size="sm" variant="subtle">{service.id}</Badge>
            <h3 class="mt-3 text-lg font-bold text-slate-900">{service.title}</h3>
            <p class="mt-3 text-sm leading-relaxed text-slate-600">{service.summary}</p>
          </Card>
        </div>
      {/each}
    </div>
  </Section>
</div>

<section class="bg-slate-900 text-slate-100" use:reveal={{ distance: 18, duration: 500, threshold: 0.08 }}>
  <div class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8" in:fade={{ duration: 460 }}>
    <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.25em] text-slate-400">Client Voice</p>
    {#if latestProject?.testimonial}
      <p class="mt-4 max-w-4xl text-2xl font-bold leading-snug sm:text-3xl">
        "{latestProject.testimonial.quote}"
      </p>
      <p class="mt-4 text-sm text-slate-300">{latestProject.testimonial.author} · {latestProject.testimonial.role}</p>
    {:else}
      <p class="mt-4 max-w-4xl text-2xl font-bold leading-snug sm:text-3xl">Add a project testimonial in your local JSON to feature it here.</p>
    {/if}
  </div>
</section>

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.1 }} in:fade={{ duration: 430 }}>
  <Section containerClass="py-16">
    <Card padding="lg" class="rounded-3xl" interactive>
      <Badge variant="subtle">Ready to build</Badge>
      <h2 class="mt-4 max-w-2xl text-3xl font-bold text-slate-900">
        If you need a high-quality web presence with clear business intent, we can start quickly.
      </h2>
      <div class="mt-8 flex flex-wrap gap-3">
        <a
          class="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/50 focus-visible:ring-offset-2"
          href="/contact"
        >
          Book a discovery call
        </a>
        <a
          class="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/30 focus-visible:ring-offset-2"
          href="/work"
        >
          Review case studies
        </a>
      </div>
    </Card>
  </Section>
</div>

<Modal
  bind:open={showEngagementModal}
  title="Engagement model"
  description="A typical project combines planning, development, and launch support in a focused 4-10 week sprint."
  on:close={() => (showEngagementModal = false)}
>
  <div class="grid gap-4 sm:grid-cols-3">
    <div in:scale={{ start: 0.95, duration: 280 }}>
      <Card variant="muted" padding="sm" class="h-full">
        <Badge size="sm" variant="success">Week 1</Badge>
        <p class="mt-3 text-sm font-semibold text-slate-900">Discovery and requirements</p>
        <p class="mt-2 text-sm text-slate-600">Align on goals, constraints, and measurable outcomes.</p>
      </Card>
    </div>

    <div in:scale={{ start: 0.95, duration: 280, delay: 80 }}>
      <Card variant="muted" padding="sm" class="h-full">
        <Badge size="sm" variant="warning">Weeks 2-4</Badge>
        <p class="mt-3 text-sm font-semibold text-slate-900">Build and iteration</p>
        <p class="mt-2 text-sm text-slate-600">Implement pages and components with fast weekly review loops.</p>
      </Card>
    </div>

    <div in:scale={{ start: 0.95, duration: 280, delay: 140 }}>
      <Card variant="muted" padding="sm" class="h-full">
        <Badge size="sm" variant="neutral">Weeks 5+</Badge>
        <p class="mt-3 text-sm font-semibold text-slate-900">Build and ship</p>
        <p class="mt-2 text-sm text-slate-600">Production implementation, QA, launch prep, and handoff.</p>
      </Card>
    </div>
  </div>

  <div slot="footer" class="flex flex-wrap justify-end gap-3">
    <Button variant="ghost" on:click={() => (showEngagementModal = false)}>Close</Button>
    <a
      class="inline-flex h-11 items-center rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-slate-700"
      href="/contact"
    >
      Start a project
    </a>
  </div>
</Modal>
