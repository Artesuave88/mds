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
    title: "Midas Web Development",
    description: "UK-based custom web developer building high-performance websites for ambitious businesses.",
    url: "/"
  });
  const logoUrl = new URL("/icon-512.png", meta.url).toString();

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${meta.url}#organization`,
        name: "Midas Web Development",
        url: meta.url,
        description: meta.description,
        image: meta.image,
        logo: {
          "@type": "ImageObject",
          url: logoUrl
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${meta.url}#professional-service`,
        name: "Midas Web Development",
        url: meta.url,
        image: meta.image,
        logo: {
          "@type": "ImageObject",
          url: logoUrl
        },
        description: meta.description,
        areaServed: {
          "@type": "Country",
          name: "United Kingdom"
        },
        serviceType: [
          "Custom Website Development",
          "Website Strategy and UX",
          "Performance Optimisation"
        ]
      }
    ]
  }).replace(/[<>&]/g, (char) => {
    if (char === "<") return "\\u003c";
    if (char === ">") return "\\u003e";
    return "\\u0026";
  });
  const structuredDataScript = `<script type="application/ld+json">${structuredData}<\/script>`;

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
  {@html structuredDataScript}
</svelte:head>

<section
  class="border-b border-black bg-[#050505]"
  use:reveal={{ distance: 20, duration: 550, threshold: 0.1 }}
>
  <div class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
    <div in:fly={{ y: 18, duration: 500 }}>
      <Badge variant="subtle" class="border-brand-primary/55 bg-brand-primary/15 text-black">UK-based custom web development</Badge>
      <h1 class="mt-5 max-w-xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">
        High-performance custom websites built to convert.
      </h1>
      <p class="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
        We help UK businesses design and build custom websites that load fast, communicate clearly, and drive enquiries.
      </p>
      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a
          class="inline-flex items-center rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2"
          href="/work"
        >
          Explore work
        </a>
        <a
          class="inline-flex items-center rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:border-brand-accent hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35 focus-visible:ring-offset-2"
          href="/contact"
        >
          Start a project
        </a>
        <Button
          variant="outline"
          class="border-white/30 bg-white/5 text-white hover:border-brand-accent hover:bg-white/10 hover:text-white"
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
        <Card class="bg-brand-surface/90" interactive>
          <Badge size="sm" variant="subtle">Projects</Badge>
          <p class="mt-3 text-3xl font-extrabold text-brand-text">{allProjects.length}</p>
          <p class="mt-2 text-sm text-brand-text/75">Published case study currently in portfolio.</p>
        </Card>
      </div>

      <div in:scale={{ start: 0.96, duration: 320, delay: 170 }}>
        <Card class="bg-brand-surface/90" interactive>
          <Badge size="sm" variant="subtle">Latest Client</Badge>
          <p class="mt-3 text-lg font-bold text-brand-text">{latestProject?.client ?? "TBD"}</p>
          <p class="mt-2 text-sm text-brand-text/75">Most recently documented web project.</p>
        </Card>
      </div>

      <div class="sm:col-span-2" in:scale={{ start: 0.97, duration: 360, delay: 240 }}>
        <Card variant="contrast">
          <Badge size="sm" variant="subtle" class="border-brand-accent/40 bg-brand-primary/25 text-brand-text/70">Current Build</Badge>
          <p class="mt-3 text-xl font-bold">{latestProject?.title ?? "No case study added yet"}</p>
          <p class="mt-2 text-sm text-brand-text/70">{latestProject?.summary ?? "Add your first project in src/content/projects.json."}</p>
        </Card>
      </div>
    </div>
  </div>
</section>

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
  <Section eyebrow="Featured Work" title="Selected case studies" containerClass="py-16">
    <a slot="actions" class="text-sm font-semibold text-brand-text/85 transition hover:text-brand-text" href="/work">
      View all projects
    </a>

    <div class="grid gap-5 md:grid-cols-3">
      {#each featuredWork as item, index}
        <a class="block" href={`/work/${item.slug}`} in:scale={{ start: 0.96, duration: 320, delay: index * 70 }}>
          <Card class="group h-full" interactive>
            <Badge size="sm" variant="subtle">{item.year} · {item.client}</Badge>
            <h3 class="mt-3 text-lg font-bold text-brand-text transition group-hover:text-brand-text/85">{item.title}</h3>
            <p class="mt-3 text-sm leading-relaxed text-brand-text/75">{item.summary}</p>
            <p class="mt-5 text-sm font-semibold text-brand-text">Read case study -></p>
          </Card>
        </a>
      {/each}
    </div>
  </Section>
</div>

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
  <Section
    class="border-y border-brand-border bg-brand-surface"
    eyebrow="Services"
    title="What we help with"
    containerClass="py-16"
  >
    <a slot="actions" class="text-sm font-semibold text-brand-text/85 transition hover:text-brand-text" href="/services">
      See service details
    </a>

    <div class="grid gap-5 md:grid-cols-3">
      {#each featuredServices as service, index}
        <div in:scale={{ start: 0.96, duration: 300, delay: index * 65 }}>
          <Card variant="muted" interactive>
            <Badge size="sm" variant="subtle">{service.id}</Badge>
            <h3 class="mt-3 text-lg font-bold text-brand-text">{service.title}</h3>
            <p class="mt-3 text-sm leading-relaxed text-brand-text/75">{service.summary}</p>
          </Card>
        </div>
      {/each}
    </div>
  </Section>
</div>

<section class="bg-brand-bg text-brand-text" use:reveal={{ distance: 18, duration: 500, threshold: 0.08 }}>
  <div class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8" in:fade={{ duration: 460 }}>
    <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.25em] text-brand-text/55">Client Voice</p>
    {#if latestProject?.testimonial}
      <p class="mt-4 max-w-4xl text-2xl font-bold leading-snug sm:text-3xl">
        "{latestProject.testimonial.quote}"
      </p>
      <p class="mt-4 text-sm text-brand-text/70">{latestProject.testimonial.author} · {latestProject.testimonial.role}</p>
    {:else}
      <p class="mt-4 max-w-4xl text-2xl font-bold leading-snug sm:text-3xl">Add a project testimonial in your local JSON to feature it here.</p>
    {/if}
  </div>
</section>

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.1 }} in:fade={{ duration: 430 }}>
  <Section containerClass="py-16">
    <Card padding="lg" class="rounded-3xl" interactive>
      <Badge variant="subtle">Ready to build</Badge>
      <h2 class="mt-4 max-w-2xl text-3xl font-bold text-brand-text">
        Need a custom website that performs as well as it looks?
      </h2>
      <div class="mt-8 flex flex-wrap gap-3">
        <a
          class="rounded-xl bg-brand-highlight px-6 py-3 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-highlight/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-highlight/50 focus-visible:ring-offset-2"
          href="/contact"
        >
          Book a discovery call
        </a>
        <a
          class="rounded-xl border border-brand-border px-6 py-3 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:border-brand-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35 focus-visible:ring-offset-2"
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
        <p class="mt-3 text-sm font-semibold text-brand-text">Discovery and requirements</p>
        <p class="mt-2 text-sm text-brand-text/75">Align on goals, constraints, and measurable outcomes.</p>
      </Card>
    </div>

    <div in:scale={{ start: 0.95, duration: 280, delay: 80 }}>
      <Card variant="muted" padding="sm" class="h-full">
        <Badge size="sm" variant="warning">Weeks 2-4</Badge>
        <p class="mt-3 text-sm font-semibold text-brand-text">Build and iteration</p>
        <p class="mt-2 text-sm text-brand-text/75">Implement pages and components with fast weekly review loops.</p>
      </Card>
    </div>

    <div in:scale={{ start: 0.95, duration: 280, delay: 140 }}>
      <Card variant="muted" padding="sm" class="h-full">
        <Badge size="sm" variant="neutral">Weeks 5+</Badge>
        <p class="mt-3 text-sm font-semibold text-brand-text">Build and ship</p>
        <p class="mt-2 text-sm text-brand-text/75">Production implementation, QA, launch prep, and handoff.</p>
      </Card>
    </div>
  </div>

  <div slot="footer" class="flex flex-wrap justify-end gap-3">
    <Button variant="ghost" on:click={() => (showEngagementModal = false)}>Close</Button>
    <a
      class="inline-flex h-11 items-center rounded-xl bg-brand-primary px-5 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-accent"
      href="/contact"
    >
      Start a project
    </a>
  </div>
</Modal>
