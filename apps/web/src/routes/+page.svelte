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
  import LazyPicture from "$lib/ui/LazyPicture.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Section from "$lib/ui/Section.svelte";

  const allProjects = getProjects({ sort: "newest" });
  const featuredWork = allProjects.slice(0, 3);
  const featuredServices = services.slice(0, 3);
  const latestProject = featuredWork[0];
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

<section
  class="relative overflow-hidden border-b border-brand-border/40 bg-[linear-gradient(180deg,#fffdf7_0%,#f8f3e8_52%,#f6f3ed_100%)]"
  use:reveal={{ distance: 20, duration: 550, threshold: 0.1 }}
>
  <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,160,23,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(13,13,13,0.06),transparent_24%)]"></div>
  <div class="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent"></div>
  <div class="relative mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
    <div in:fly={{ y: 18, duration: 500 }}>
      <div class="inline-flex items-center rounded-full border border-brand-primary/40 bg-brand-primary/10 px-4 py-2">
        <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.28em] text-brand-highlight">Fresh websites, same message</p>
      </div>
      <h1 class="mt-6 max-w-xl text-center text-4xl font-bold leading-tight text-brand-text sm:text-5xl lg:text-left lg:text-[3.65rem]">
        Get a free website mockup for your business
      </h1>
      <p class="mt-6 max-w-xl text-base leading-relaxed text-brand-text/78 sm:text-lg">
        Send us your business name and we'll show you how your website could look. It's a simple way to see a custom
        direction before committing to anything.
      </p>
      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a
          class="inline-flex items-center rounded-2xl bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-text shadow-[0_16px_36px_rgba(212,160,23,0.28)] transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2"
          href="/contact"
        >
Request a free mockup
        </a>
        <a
          class="inline-flex items-center rounded-2xl border border-brand-border bg-white/80 px-6 py-3 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:border-brand-accent hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35 focus-visible:ring-offset-2"
          href="/work"
        >
          See example websites
        </a>
        <Button
          variant="outline"
          class="border-brand-border bg-white/80 text-brand-text hover:border-brand-accent hover:bg-white hover:text-brand-text"
          on:click={() => (showEngagementModal = true)}
          aria-haspopup="dialog"
          aria-expanded={showEngagementModal}
        >
          See the process
        </Button>
      </div>
    </div>

    <div class="relative" in:fly={{ y: 24, duration: 550, delay: 80 }}>
      <div class="space-y-4">
        <div in:scale={{ start: 0.96, duration: 320, delay: 100 }}>
          <Card class="border-brand-primary/40 bg-white/96" interactive>
            <Badge size="sm" variant="subtle" class="border-brand-primary/35 bg-brand-primary/10 text-brand-text/70">Fast turnaround</Badge>
            <p class="mt-3 text-lg font-bold text-brand-text">You do not need months of back and forth</p>
            <p class="mt-2 text-sm leading-relaxed text-brand-text/75">If you need a good website soon, the process stays focused and moves quickly from brief to launch.</p>
          </Card>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div in:scale={{ start: 0.96, duration: 320, delay: 170 }}>
            <Card class="h-full border-brand-border bg-white/96" interactive>
              <Badge size="sm" variant="subtle" class="border-brand-border bg-brand-surface-alt/70 text-brand-text/70">Mobile-friendly</Badge>
              <p class="mt-3 text-base font-bold text-brand-text">Your customers can use it easily on their phone</p>
              <p class="mt-2 text-sm leading-relaxed text-brand-text/75">Most people will find your business on mobile, so the site is built to look right and work properly there.</p>
            </Card>
          </div>

          <div in:scale={{ start: 0.97, duration: 360, delay: 240 }}>
            <Card variant="contrast" class="h-full border-brand-primary/45 bg-[linear-gradient(135deg,rgba(212,160,23,0.18),rgba(255,255,255,0.98))]">
              <Badge size="sm" variant="subtle" class="border-brand-primary/45 bg-brand-primary/18 text-brand-text/78">You own it</Badge>
              <p class="mt-3 text-lg font-bold text-brand-text">Your website is yours, not a rented builder subscription</p>
              <p class="mt-2 text-sm leading-relaxed text-brand-text/74">You get a custom site built around your business, without being locked into yearly builder fees just to keep it online.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<StarterPackageSection />

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
  <Section eyebrow="Recent Work" title="The kind of websites I build for businesses like yours" containerClass="py-20">
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

    <div class="grid gap-5 md:grid-cols-3">
      {#each featuredWork as item, index}
        <a class="block" href={`/work/${item.slug}`} in:scale={{ start: 0.96, duration: 320, delay: index * 70 }}>
          <Card class="group h-full" interactive>
            <Badge size="sm" variant="subtle">{item === latestProject ? "Latest project" : item.year + " · " + item.client}</Badge>
            <h3 class="mt-3 text-lg font-bold text-brand-text transition group-hover:text-brand-text/85">{item.title}</h3>
            <p class="mt-3 text-sm leading-relaxed text-brand-text/75">{item.summary}</p>
            <p class="mt-5 text-sm font-semibold text-brand-text">View website details -></p>
          </Card>
        </a>
      {/each}
    </div>
  </Section>
</div>

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
  <Section
    class="border-y border-brand-border/60 bg-[linear-gradient(180deg,rgba(255,253,248,0.55),rgba(239,226,210,0.45))]"
    eyebrow="Who We Build For"
    title="If you run a service business, this is built for you"
    containerClass="py-16"
  >
    <p slot="description" class="max-w-3xl text-base leading-relaxed text-brand-text/75">
      This is a good fit if your business relies on trust, local visibility, and enquiries. The aim is simple: help people
      understand what you do, trust you quickly, and contact you.
    </p>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {#each businessTypes as business, index}
        <div in:scale={{ start: 0.96, duration: 300, delay: index * 45 }}>
          <Card class="h-full bg-brand-bg/55" interactive>
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
    title="Why hiring me makes more sense than wrestling with a website builder"
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
            <div class="rounded-[1.5rem] border border-brand-border/70 bg-brand-bg/55 p-4">
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
            <div class="rounded-[1.5rem] border border-brand-accent/20 bg-brand-primary/10 p-4">
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
    class="border-y border-brand-border/60 bg-[linear-gradient(180deg,rgba(255,253,248,0.35),rgba(239,226,210,0.38))]"
    eyebrow="Simple Process"
    title="You send the basics, I turn it into a proper website"
    containerClass="py-16"
  >
    <p slot="description" class="max-w-3xl text-base leading-relaxed text-brand-text/75">
      You do not need a full brief, polished copy, or any technical knowledge. If you can explain your business and what you
      want the site to do, I can turn that into something clear, professional, and ready to go live.
    </p>

    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {#each processSteps as item, index}
        <div in:scale={{ start: 0.96, duration: 300, delay: index * 55 }}>
          <Card class="h-full bg-brand-bg/55" interactive>
            <div class="flex items-center justify-between gap-3">
              <Badge size="sm" variant="subtle">Step {item.step}</Badge>
            </div>
            <h3 class="mt-4 text-lg font-bold text-brand-text">{item.title}</h3>
            <p class="mt-3 text-sm leading-relaxed text-brand-text/75">{item.summary}</p>
          </Card>
        </div>
      {/each}
    </div>
  </Section>
</div>


<div use:reveal={{ distance: 24, duration: 520, threshold: 0.1 }} in:fade={{ duration: 430 }}>
  <Section containerClass="py-16">
    <Card padding="lg" class="rounded-[2rem] bg-[linear-gradient(145deg,rgba(255,253,248,0.88),rgba(239,226,210,0.72))]" interactive>
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
          class="rounded-2xl bg-brand-highlight px-6 py-3 text-sm font-semibold text-brand-surface transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-highlight/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-highlight/50 focus-visible:ring-offset-2"
          href="/contact"
        >
          Get a website quote
        </a>
        <a
          class="rounded-2xl border border-brand-border px-6 py-3 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:border-brand-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35 focus-visible:ring-offset-2"
          href="/work"
        >
          See example websites
        </a>
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
      class="inline-flex h-11 items-center rounded-2xl bg-brand-primary px-5 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-accent"
      href="/contact"
    >
      Get a website quote
    </a>
  </div>
</Modal>
