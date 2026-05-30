<script>
  import { fade, fly, scale } from "svelte/transition";
  import { reveal } from "$lib/actions/reveal";
  import { getProjects } from "$lib/content";
  import { services } from "$lib/data/services";
  import { setMeta } from "$lib/seo";
  import StarterPackageSection from "$lib/sections/StarterPackageSection.svelte";
  import Badge from "$lib/ui/Badge.svelte";
  import Button from "$lib/ui/Button.svelte";
  import Card from "$lib/ui/Card.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Section from "$lib/ui/Section.svelte";

  const allProjects = getProjects({ sort: "newest" });
  const featuredWork = allProjects.slice(0, 3);
  const featuredServices = services.slice(0, 3);
  const latestProject = featuredWork[0];
  const proofPoints = [
    { value: "5 pages", label: "included in the starter build" },
    { value: "£799", label: "clear starting price" },
    { value: "UK", label: "based design and build" }
  ];
  const buildSignals = [
    "Designed around your business, not a template",
    "Mobile-first structure for local search traffic",
    "Fast handover with hosting and launch handled"
  ];
  const businessTypes = [
    {
      title: "Plumbers",
      summary: "Clear, professional websites that help homeowners and landlords get in touch quickly."
    },
    {
      title: "Electricians",
      summary: "Trust-building websites that showcase services, coverage areas, and make enquiries simple."
    },
    {
      title: "Decorators",
      summary: "Modern brochure sites that present your work properly and support more quote requests."
    },
    {
      title: "Dog groomers",
      summary: "Friendly, polished websites that make it easy for pet owners to learn more and book."
    },
    {
      title: "Personal trainers",
      summary: "Focused websites that explain your offer clearly and help turn interest into leads."
    },
    {
      title: "Martial arts clubs",
      summary: "Professional club websites for classes, memberships, and first enquiries from new students."
    },
    {
      title: "Local trades",
      summary: "Straightforward websites that show what you do, where you work, and why people should choose you."
    },
    {
      title: "Service businesses",
      summary: "Custom sites built to give your business a stronger online presence without the template feel."
    }
  ];
  const comparisonItems = [
    {
      label: "Look and feel",
      diy: "Often starts from a generic template that can feel similar to countless other sites.",
      custom: "Designed around your business so it looks professional, trustworthy, and specific to what you offer."
    },
    {
      label: "Speed",
      diy: "Can feel weighed down by builder features and layouts you do not really need.",
      custom: "Built with a clear purpose, helping pages feel faster and more focused for visitors."
    },
    {
      label: "Mobile experience",
      diy: "Usually responsive, but not always shaped around how your customers actually browse on phones.",
      custom: "Planned to work properly on mobile from the start, where most local service searches happen."
    },
    {
      label: "Fit for your business",
      diy: "You adapt your business to the template and work around its limits.",
      custom: "Your website is built around your services, service area, customer journey, and enquiry goals."
    },
    {
      label: "Long-term flexibility",
      diy: "You usually keep paying yearly platform fees, and the site still lives inside someone else's system.",
      custom: "You own the website outright, with no yearly builder fees just to keep your site."
    }
  ];
  const processSteps = [
    {
      step: "01",
      title: "Tell me about your business",
      summary: "Send over the basics in whatever form you have, from rough notes to an existing Facebook page. You do not need to know any technical details."
    },
    {
      step: "02",
      title: "I plan and build your site",
      summary: "I turn your services, key information, and goals into a clean, professional website built around your business."
    },
    {
      step: "03",
      title: "You review and approve",
      summary: "You check the draft, request any changes, and make sure everything feels right before launch."
    },
    {
      step: "04",
      title: "Your website goes live",
      summary: "Once approved, the site is launched properly so you have a polished online presence ready to bring in enquiries."
    }
  ];


  const meta = setMeta({
    title: "Custom Websites for UK Businesses | Midas Web",
    description:
      "Midas Web builds fast, modern websites for UK businesses that want to look more professional, work well on mobile, and win more enquiries.",
    url: "/",
    includeSiteName: false
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
          "Business Website Design",
          "Custom Website Development",
          "Website Launch Support"
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
  {@html structuredDataScript}
</svelte:head>

<section class="relative overflow-hidden border-b border-brand-text bg-brand-text text-white" use:reveal={{ distance: 20, duration: 550, threshold: 0.1 }}>
  <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(212,160,23,0.22),transparent_26%),linear-gradient(290deg,rgba(35,181,211,0.24),transparent_34%),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:auto,auto,72px_72px,72px_72px]"></div>
  <div class="kinetic-strip absolute inset-x-0 top-0 h-3"></div>

  <div class="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8 lg:pb-18 lg:pt-24">
    <div class="grid gap-10 lg:grid-cols-[1fr_0.92fr] lg:items-end">
      <div in:fly={{ y: 18, duration: 500 }}>
        <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.18em] text-brand-primary">Custom websites for UK service businesses</p>
        <h1 class="mt-5 max-w-5xl text-6xl font-bold leading-[0.95] sm:text-7xl lg:text-8xl">
          Look established before they call.
        </h1>
      </div>

      <div class="border-l border-white/18 pl-6" in:fly={{ y: 20, duration: 520, delay: 70 }}>
        <p class="max-w-xl text-lg leading-relaxed text-white/76">
          Midas Web designs and builds fast, custom websites that make local businesses feel sharper, clearer, and easier to trust.
        </p>
        <div class="mt-6 flex flex-wrap gap-2">
          <span class="rounded-md border border-white/18 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/78">Design</span>
          <span class="rounded-md border border-white/18 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/78">Build</span>
          <span class="rounded-md border border-white/18 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/78">Launch</span>
          <span class="rounded-md border border-white/18 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-white/78">Own it</span>
        </div>
      </div>
    </div>

    <div class="mt-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
      <div class="flex flex-col justify-between border border-white/16 bg-white/8 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl" in:fly={{ y: 24, duration: 540, delay: 100 }}>
        <div>
          <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.18em] text-brand-primary">Free homepage mockup</p>
          <p class="mt-4 text-3xl font-bold leading-tight">Send rough details. See a proper direction before you commit.</p>
        </div>
        <div class="mt-8 flex flex-wrap items-center gap-3">
        <a
          class="inline-flex items-center rounded-lg bg-brand-primary px-6 py-3 text-sm font-bold text-brand-text shadow-[0_18px_42px_rgba(212,160,23,0.28)] transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-text"
          href="/contact"
        >
          Request a free mockup
        </a>
        <a
          class="inline-flex items-center rounded-lg border border-white/24 bg-white/8 px-6 py-3 text-sm font-bold text-white backdrop-blur transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:border-brand-accent hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-text"
          href="/work"
        >
          See recent work
        </a>
        <Button
          variant="ghost"
          class="text-white hover:bg-white/10"
          on:click={() => (showEngagementModal = true)}
          aria-haspopup="dialog"
          aria-expanded={showEngagementModal}
        >
          View process
        </Button>
        </div>
      </div>

      <div class="relative min-h-[390px] overflow-hidden border border-white/16 bg-white/6 shadow-[0_30px_90px_rgba(0,0,0,0.24)]" in:fly={{ y: 24, duration: 550, delay: 140 }}>
        <div class="absolute inset-x-0 top-0 grid h-16 grid-cols-12 border-b border-white/12">
          {#each Array(12) as _, index}
            <span class={`border-r border-white/12 ${index === 1 || index === 8 ? "bg-brand-primary" : index === 4 ? "bg-brand-accent" : "bg-white/4"}`}></span>
          {/each}
        </div>

        <div class="absolute left-6 top-24 h-40 w-40 border-[22px] border-brand-accent/80"></div>
        <div class="absolute right-8 top-28 h-48 w-48 bg-brand-primary"></div>
        <div class="absolute bottom-8 left-14 h-28 w-[58%] border border-white/20 bg-brand-text shadow-[0_24px_70px_rgba(0,0,0,0.28)]"></div>
        <div class="absolute bottom-14 left-20 right-16 grid grid-cols-3 gap-3">
          {#each proofPoints as point}
            <div class="border border-white/14 bg-white/10 p-4 backdrop-blur">
              <p class="text-2xl font-extrabold text-white">{point.value}</p>
              <p class="mt-1 text-xs leading-relaxed text-white/58">{point.label}</p>
            </div>
          {/each}
        </div>
        <p class="absolute right-8 top-20 font-['Space_Mono'] text-[11px] uppercase tracking-[0.18em] text-white/58">No templates / no rented builder</p>
        <p class="absolute bottom-24 right-8 text-7xl font-extrabold leading-none text-white/10 sm:text-8xl">MW</p>
      </div>
    </div>
  </div>
</section>

<div class="overflow-hidden border-b border-brand-text bg-brand-primary py-4 text-brand-text">
  <div class="marquee-track flex w-max gap-8 whitespace-nowrap font-['Space_Mono'] text-sm font-bold uppercase tracking-[0.14em]">
    {#each Array(2) as _}
      <span>Free mockup</span>
      <span>/</span>
      <span>Custom design</span>
      <span>/</span>
      <span>Mobile first</span>
      <span>/</span>
      <span>Fast launch</span>
      <span>/</span>
      <span>Your website, not a rented template</span>
      <span>/</span>
    {/each}
  </div>
</div>

<StarterPackageSection />

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
  <Section eyebrow="Recent Work" title="Real launches, not template demos" containerClass="py-20">
    <p slot="description" class="max-w-3xl text-base leading-relaxed text-brand-text/75">
      Latest launch: <span class="font-semibold text-brand-text">{latestProject.client}</span> is now live at
      <a
        class="font-semibold text-brand-text underline decoration-brand-accent/55 underline-offset-4 transition hover:text-brand-text/80"
        href={latestProject.links?.[0]?.url}
        rel="noreferrer"
        target="_blank"
      >
        {latestProject.links?.[0]?.url?.replace("https://", "").replace(/\/$/, "")}
      </a>.
    </p>

    <a slot="actions" class="text-sm font-semibold text-brand-text/85 transition hover:text-brand-text" href="/work">
      See example websites
    </a>

    <div class="grid gap-6 md:grid-cols-2">
      {#each featuredWork as item, index}
        <a class="block" href={`/work/${item.slug}`} in:scale={{ start: 0.96, duration: 320, delay: index * 70 }}>
          <Card class="group h-full overflow-hidden border-brand-text/20 bg-brand-text p-0 text-white" interactive>
            <img src={item.heroImage} alt="{item.client} website preview" class="h-72 w-full border-b border-white/15 object-cover object-top saturate-[1.08] transition duration-500 group-hover:scale-[1.03]" loading="lazy" />
            <div class="p-6">
              <Badge size="sm" variant="subtle" class="border-white/20 bg-white/10 text-white">{item === latestProject ? "Latest project" : item.year + " · " + item.client}</Badge>
              <h3 class="mt-3 text-2xl font-bold text-white transition group-hover:text-brand-primary">{item.title}</h3>
              <p class="mt-3 text-sm leading-relaxed text-white/72">{item.summary}</p>
              <p class="mt-5 text-sm font-semibold text-brand-primary">View website details -></p>
            </div>
          </Card>
        </a>
      {/each}
    </div>
  </Section>
</div>

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
  <Section
    class="border-y border-brand-border/60 bg-white/62"
    eyebrow="Who We Build For"
    title="Built for businesses where trust wins the enquiry"
    containerClass="py-16"
  >
    <p slot="description" class="max-w-3xl text-base leading-relaxed text-brand-text/75">
      This is a good fit if your business relies on trust, local visibility, and enquiries. The aim is simple: help people
      understand what you do, trust you quickly, and contact you.
    </p>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {#each businessTypes as business, index}
        <div in:scale={{ start: 0.96, duration: 300, delay: index * 45 }}>
          <Card class="h-full border-l-4 border-l-brand-primary bg-white/86" interactive>
            <h3 class="text-lg font-bold text-brand-text">{business.title}</h3>
            <p class="mt-3 text-sm leading-relaxed text-brand-text/75">{business.summary}</p>
          </Card>
        </div>
      {/each}
    </div>
  </Section>
</div>

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
    <Section
    eyebrow="Built Properly From The Start"
    title="A custom site should look better and work harder"
    containerClass="py-20"
  >
    <p slot="description" class="max-w-3xl text-base leading-relaxed text-brand-text/75">
      If you just need something basic online, a builder might do. If you want a site that makes your business look properly
      established and brings in better enquiries, a custom build is usually the better call.
    </p>

    <div class="grid gap-5 lg:grid-cols-2">
      <Card variant="muted" class="h-full">
        <Badge size="sm" variant="subtle">DIY builder</Badge>
        <h3 class="mt-3 text-xl font-bold text-brand-text">DIY website builders</h3>
        <p class="mt-3 text-sm leading-relaxed text-brand-text/75">
          Fine for getting a page live, but often frustrating when you want it to actually look right and fit your business.
        </p>

        <div class="mt-6 space-y-4">
          {#each comparisonItems as item}
            <div class="rounded-lg border border-brand-border/70 bg-brand-bg/55 p-4">
              <p class="text-sm font-semibold text-brand-text">{item.label}</p>
              <div class="mt-2 flex items-start gap-3">
                <span class="mt-0.5 inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-brand-border text-xs font-bold text-brand-text/70">
                  -
                </span>
                <p class="text-sm leading-relaxed text-brand-text/75">{item.diy}</p>
              </div>
            </div>
          {/each}
        </div>
      </Card>

      <Card variant="contrast" class="h-full">
        <Badge size="sm" variant="subtle" class="border-brand-accent/40 bg-brand-primary/25 text-brand-text/70">
          Custom website by Midas Web
        </Badge>
        <h3 class="mt-3 text-xl font-bold">A website built around your business</h3>
        <p class="mt-3 text-sm leading-relaxed text-brand-text/70">
          A site built for the way your business actually works, so customers get the right impression and know what to do next.
        </p>

        <div class="mt-6 space-y-4">
          {#each comparisonItems as item}
            <div class="rounded-lg border border-brand-accent/25 bg-brand-accent/10 p-4">
              <p class="text-sm font-semibold text-brand-text">{item.label}</p>
              <div class="mt-2 flex items-start gap-3">
                <span class="mt-0.5 inline-flex min-h-6 min-w-6 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-brand-text">
                  ✓
                </span>
                <p class="text-sm leading-relaxed text-brand-text/75">{item.custom}</p>
              </div>
            </div>
          {/each}
        </div>
      </Card>
    </div>
  </Section>
</div>

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
  <Section
    class="border-y border-brand-border/60 bg-brand-highlight text-white"
    eyebrow="Simple Process"
    title="You send the basics, I turn it into a proper website"
    containerClass="py-16"
    headerClass="[&_*]:text-white"
  >
    <p slot="description" class="max-w-3xl text-base leading-relaxed text-white/74">
      You do not need a full brief, polished copy, or any technical knowledge. If you can explain your business and what you
      want the site to do, I can turn that into something clear, professional, and ready to go live.
    </p>

    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {#each processSteps as item, index}
        <div in:scale={{ start: 0.96, duration: 300, delay: index * 55 }}>
          <Card class="h-full border-white/18 bg-white/8 text-white shadow-[0_18px_55px_rgba(0,0,0,0.16)]" interactive>
            <div class="flex items-center justify-between gap-3">
              <Badge size="sm" variant="subtle" class="border-white/20 bg-white/10 text-white">Step {item.step}</Badge>
            </div>
            <h3 class="mt-4 text-lg font-bold text-white">{item.title}</h3>
            <p class="mt-3 text-sm leading-relaxed text-white/72">{item.summary}</p>
          </Card>
        </div>
      {/each}
    </div>
  </Section>
</div>


<div use:reveal={{ distance: 24, duration: 520, threshold: 0.1 }} in:fade={{ duration: 430 }}>
  <Section containerClass="py-16">
    <Card padding="lg" class="bg-white/92" interactive>
      <div class="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <Badge variant="subtle">Ready to look more professional online?</Badge>
          <h2 class="mt-4 max-w-2xl text-3xl font-bold text-brand-text">
            If your current website is holding the business back, I can fix that
          </h2>
          <p class="mt-3 max-w-2xl text-base leading-relaxed text-brand-text/75">
            You will get a modern custom website that makes the business look more credible, works properly on mobile, and helps
            more of the right people get in touch.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a
              class="rounded-lg bg-brand-highlight px-6 py-3 text-sm font-semibold text-brand-surface transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-highlight/50 focus-visible:ring-offset-2"
              href="/contact"
            >
              Get a website quote
            </a>
            <a
              class="rounded-lg border border-brand-border px-6 py-3 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:border-brand-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35 focus-visible:ring-offset-2"
              href="/work"
            >
              See example websites
            </a>
          </div>
        </div>

        <div class="grid gap-3">
          {#each buildSignals as signal}
            <div class="rounded-lg border border-brand-border/70 bg-brand-bg/72 px-4 py-3 text-sm font-semibold text-brand-text/78">
              {signal}
            </div>
          {/each}
        </div>
      </div>
    </Card>
  </Section>
</div>

<Modal
  bind:open={showEngagementModal}
  title="Simple process"
  description="Most projects move from planning to launch in a focused few weeks, with clear check-ins and a simple path to going live."
  on:close={() => (showEngagementModal = false)}
>
  <div class="grid gap-4 sm:grid-cols-3">
    <div in:scale={{ start: 0.95, duration: 280 }}>
      <Card variant="muted" padding="sm" class="h-full">
        <Badge size="sm" variant="success">Step 1</Badge>
        <p class="mt-3 text-sm font-semibold text-brand-text">Plan the right website</p>
        <p class="mt-2 text-sm text-brand-text/75">We map out what your business needs, what pages matter, and what should drive enquiries.</p>
      </Card>
    </div>

    <div in:scale={{ start: 0.95, duration: 280, delay: 80 }}>
      <Card variant="muted" padding="sm" class="h-full">
        <Badge size="sm" variant="warning">Step 2</Badge>
        <p class="mt-3 text-sm font-semibold text-brand-text">Build with quick feedback</p>
        <p class="mt-2 text-sm text-brand-text/75">You review progress as the site takes shape, so changes stay simple and the build stays on track.</p>
      </Card>
    </div>

    <div in:scale={{ start: 0.95, duration: 280, delay: 140 }}>
      <Card variant="muted" padding="sm" class="h-full">
        <Badge size="sm" variant="neutral">Launch</Badge>
        <p class="mt-3 text-sm font-semibold text-brand-text">Go live with confidence</p>
        <p class="mt-2 text-sm text-brand-text/75">We handle the final checks, launch setup, and handover so your new site is ready to work for your business.</p>
      </Card>
    </div>
  </div>

  <div slot="footer" class="flex flex-wrap justify-end gap-3">
    <Button variant="ghost" on:click={() => (showEngagementModal = false)}>Close</Button>
    <a
      class="inline-flex h-11 items-center rounded-lg bg-brand-primary px-5 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-accent"
      href="/contact"
    >
      Get a website quote
    </a>
  </div>
</Modal>
