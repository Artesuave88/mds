<script>
  import { fade, fly, scale } from "svelte/transition";
  import { reveal } from "$lib/actions/reveal";
  import { getProjects } from "$lib/content";
  import { services } from "$lib/data/services";
  import { setMeta } from "$lib/seo";
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
      diy: "Changes can become awkward once you want something beyond the builder’s standard options.",
      custom: "Easier to grow, refine, and tailor as your business changes over time."
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
  class="border-b border-black bg-[#050505]"
  use:reveal={{ distance: 20, duration: 550, threshold: 0.1 }}
>
  <div class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
    <div in:fly={{ y: 18, duration: 500 }}>
      <Badge variant="subtle" class="border-brand-primary/55 bg-brand-primary/15 text-black">Custom websites for UK businesses</Badge>
      <h1 class="mt-5 max-w-xl text-4xl font-bold text-center leading-tight text-white sm:text-5xl lg:text-left">
        Modern websites that help UK businesses win more enquiries
      </h1>
      <p class="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
        We build custom websites for UK businesses that want to look more professional, build trust quickly, and make it
        easier for customers to get in touch. Fast turnaround, mobile-friendly design, and a simple process from start to
        launch.
      </p>
      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a
          class="inline-flex items-center rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2"
          href="/contact"
        >
          Get a website quote
        </a>
        <a
          class="inline-flex items-center rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:border-brand-accent hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35 focus-visible:ring-offset-2"
          href="/work"
        >
          See example websites
        </a>
        <Button
          variant="outline"
          class="border-white/30 bg-white/5 text-white hover:border-brand-accent hover:bg-white/10 hover:text-white"
          on:click={() => (showEngagementModal = true)}
          aria-haspopup="dialog"
          aria-expanded={showEngagementModal}
        >
          See the process
        </Button>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2" in:fly={{ y: 24, duration: 550, delay: 80 }}>
      <div in:scale={{ start: 0.96, duration: 320, delay: 100 }}>
        <Card class="bg-brand-surface/90" interactive>
          <Badge size="sm" variant="subtle">Fast turnaround</Badge>
          <p class="mt-3 text-lg font-bold text-brand-text">A clear route from idea to launch</p>
          <p class="mt-2 text-sm text-brand-text/75">Straightforward planning, quick feedback, and a website built without unnecessary delays.</p>
        </Card>
      </div>

      <div in:scale={{ start: 0.96, duration: 320, delay: 170 }}>
        <Card class="bg-brand-surface/90" interactive>
          <Badge size="sm" variant="subtle">Mobile-friendly</Badge>
          <p class="mt-3 text-lg font-bold text-brand-text">Designed to work properly on every screen</p>
          <p class="mt-2 text-sm text-brand-text/75">Your customers should get a smooth experience whether they find you on mobile or desktop.</p>
        </Card>
      </div>

      <div class="sm:col-span-2" in:scale={{ start: 0.97, duration: 360, delay: 240 }}>
        <Card variant="contrast">
          <Badge size="sm" variant="subtle" class="border-brand-accent/40 bg-brand-primary/25 text-brand-text/70">Custom built</Badge>
          <p class="mt-3 text-xl font-bold">Built around your business, not a template</p>
          <p class="mt-2 text-sm text-brand-text/70">A sharper online presence with pages shaped around your services, your customers, and the enquiries you want to bring in.</p>
        </Card>
      </div>
    </div>
  </div>
</section>



<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
  <Section eyebrow="Recent Work" title="Websites built for real businesses" containerClass="py-16">
    <a slot="actions" class="text-sm font-semibold text-brand-text/85 transition hover:text-brand-text" href="/work">
      See example websites
    </a>

    <div class="grid gap-5 md:grid-cols-3">
      {#each featuredWork as item, index}
        <a class="block" href={`/work/${item.slug}`} in:scale={{ start: 0.96, duration: 320, delay: index * 70 }}>
          <Card class="group h-full" interactive>
            <Badge size="sm" variant="subtle">{item.year} · {item.client}</Badge>
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
    class="border-y border-brand-border bg-brand-surface"
    eyebrow="Who We Build For"
    title="A good fit for service-led businesses"
    containerClass="py-16"
  >
    <p slot="description" class="max-w-3xl text-base leading-relaxed text-brand-text/75">
      We build custom websites for businesses that need a more professional online presence, a clear message, and a site that
      helps turn visits into genuine enquiries.
    </p>

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {#each businessTypes as business, index}
        <div in:scale={{ start: 0.96, duration: 300, delay: index * 45 }}>
          <Card class="h-full bg-brand-bg/70" interactive>
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
    title="Why businesses choose custom over website builders"
    containerClass="py-16"
  >
    <p slot="description" class="max-w-3xl text-base leading-relaxed text-brand-text/75">
      Website builders can be useful for getting something online, but businesses that want to look more established usually
      need a site that feels more polished, works better on mobile, and fits the business properly from day one.
    </p>

    <div class="grid gap-5 lg:grid-cols-2">
      <Card variant="muted" class="h-full">
        <Badge size="sm" variant="subtle">DIY builder</Badge>
        <h3 class="mt-3 text-xl font-bold text-brand-text">DIY website builders</h3>
        <p class="mt-3 text-sm leading-relaxed text-brand-text/75">
          Useful for getting started, but often harder to shape into something that feels properly polished and tailored.
        </p>

        <div class="mt-6 space-y-4">
          {#each comparisonItems as item}
            <div class="rounded-2xl border border-brand-border bg-brand-bg/65 p-4">
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
          A cleaner, more confident website shaped around your services, your customers, and the kind of enquiries you want
          to attract.
        </p>

        <div class="mt-6 space-y-4">
          {#each comparisonItems as item}
            <div class="rounded-2xl border border-brand-accent/20 bg-brand-primary/10 p-4">
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
    class="border-y border-brand-border bg-brand-surface"
    eyebrow="Simple Process"
    title="A straightforward process from first message to launch"
    containerClass="py-16"
  >
    <p slot="description" class="max-w-3xl text-base leading-relaxed text-brand-text/75">
      The process is clear, low stress, and built for busy business owners. You do not need technical knowledge or perfectly
      prepared content. I can take rough information and turn it into a polished website that looks professional and gets
      online quickly.
    </p>

    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {#each processSteps as item, index}
        <div in:scale={{ start: 0.96, duration: 300, delay: index * 55 }}>
          <Card class="h-full bg-brand-bg/70" interactive>
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
    <Card padding="lg" class="rounded-3xl" interactive>
      <Badge variant="subtle">Ready to look more professional online?</Badge>
      <h2 class="mt-4 max-w-2xl text-3xl font-bold text-brand-text">
        Need a website that gives customers confidence to contact you?
      </h2>
      <p class="mt-3 max-w-2xl text-base leading-relaxed text-brand-text/75">
        Midas Web builds modern, custom websites for UK businesses that want a stronger first impression, better visibility,
        and more enquiries from the right customers.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a
          class="rounded-xl bg-brand-highlight px-6 py-3 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-highlight/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-highlight/50 focus-visible:ring-offset-2"
          href="/contact"
        >
          Get a website quote
        </a>
        <a
          class="rounded-xl border border-brand-border px-6 py-3 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:border-brand-accent/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35 focus-visible:ring-offset-2"
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
        <Badge size="sm" variant="success">Week 1</Badge>
        <p class="mt-3 text-sm font-semibold text-brand-text">Plan the right website</p>
        <p class="mt-2 text-sm text-brand-text/75">We map out what your business needs, what pages matter, and what should drive enquiries.</p>
      </Card>
    </div>

    <div in:scale={{ start: 0.95, duration: 280, delay: 80 }}>
      <Card variant="muted" padding="sm" class="h-full">
        <Badge size="sm" variant="warning">Weeks 2+</Badge>
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
      class="inline-flex h-11 items-center rounded-xl bg-brand-primary px-5 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-accent"
      href="/contact"
    >
      Get a website quote
    </a>
  </div>
</Modal>
