<script lang="ts">
  import { getProjectBySlug, getProjects } from "$lib/content";
  import { setMeta } from "$lib/seo";
  import type { PageData } from "./$types";

  export let data: PageData;

  const orderedProjects = getProjects({ sort: "newest" });
  const fallbackMeta = setMeta({
    title: "Website Case Study Not Found",
    description: "The requested case study could not be found. Explore more website projects from Midas Web Development.",
    url: "/work"
  });

  $: slug = data.slug ?? "";
  $: project = slug ? getProjectBySlug(slug) : undefined;
  $: currentIndex = orderedProjects.findIndex((entry) => entry.slug === slug);
  $: nextProject = currentIndex >= 0 ? orderedProjects[(currentIndex + 1) % orderedProjects.length] : undefined;
  $: siteScreenshots = (project?.siteScreenshots ?? []).slice(0, 2);
  $: previewImages = project ? [project.heroImage, ...siteScreenshots].slice(0, 3) : [];
  $: meta = project
    ? setMeta({
        title: `${project.client} Website Case Study`,
        description: project.summary,
        image: project.heroImage,
        url: `/work/${project.slug}`
      })
    : fallbackMeta;
</script>

<svelte:head>
  <title>{meta.title}</title>
  <meta name="description" content={meta.description} />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content={meta.siteName} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:url" content={meta.url} />
  <meta property="og:image" content={meta.image} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={meta.title} />
  <meta name="twitter:description" content={meta.description} />
  <meta name="twitter:image" content={meta.image} />
  {#if !project}
    <meta name="robots" content="noindex,follow" />
  {/if}
</svelte:head>

{#if !project}
  <section class="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
    <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.14em] text-brand-highlight">Case Study</p>
    <h1 class="mt-3 text-3xl font-bold text-brand-text">Project not found</h1>
    <p class="mt-4 text-brand-text/75">The case study you are looking for does not exist or may have moved.</p>
    <a class="mt-8 inline-flex rounded-lg bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-text hover:bg-brand-accent" href="/work">
      Back to work
    </a>
  </section>
{:else}
  <section class="relative overflow-hidden bg-brand-text text-white">
    <img src={project.heroImage} alt="" class="absolute inset-0 h-full w-full object-cover object-top opacity-25 saturate-[1.12]" />
    <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,17,20,0.96),rgba(16,17,20,0.74),rgba(16,17,20,0.2))]"></div>
    <div class="kinetic-strip absolute inset-x-0 top-0 h-3"></div>

    <div class="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
      <div>
        <a class="inline-flex text-sm font-semibold text-white/76 hover:text-white" href="/work">← Back to all work</a>
        <p class="mt-8 font-['Space_Mono'] text-xs uppercase tracking-[0.14em] text-brand-primary">{project.year} / {project.client}</p>
        <h1 class="mt-4 max-w-4xl text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">{project.title}</h1>
      </div>

      <div class="content-end">
        <p class="max-w-2xl text-lg leading-relaxed text-white/78">{project.summary}</p>
        <div class="mt-6 flex flex-wrap gap-2">
          {#each project.services as service}
            <span class="rounded-md border border-white/18 bg-white/10 px-3 py-1 text-xs font-semibold text-white/82">{service}</span>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <section class="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
    <div class="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div class={`grid gap-5 ${previewImages.length > 1 ? "md:grid-cols-2" : ""}`}>
        {#each previewImages as image, index}
          <figure class={`overflow-hidden border border-brand-border/75 bg-white p-3 shadow-[0_20px_60px_rgba(16,17,20,0.1)] ${index === 0 ? "md:col-span-2" : ""}`}>
            <img
              alt={index === 0 ? `${project.title} hero image` : `${project.title} website screenshot ${index}`}
              class="block h-full max-h-[620px] w-full object-cover object-top"
              loading={index === 0 ? "eager" : "lazy"}
              src={image}
            />
          </figure>
        {/each}
      </div>

      <aside class="border border-brand-text bg-brand-text p-6 text-white shadow-[0_24px_70px_rgba(16,17,20,0.16)]">
        <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.14em] text-brand-primary">Build notes</p>
        <div class="mt-5">
          <p class="font-semibold text-white">Tools</p>
          <div class="mt-3 flex flex-wrap gap-2">
            {#each project.tools as tool}
              <span class="rounded-md bg-white/10 px-3 py-1 text-xs font-semibold text-white/82">{tool}</span>
            {/each}
          </div>
        </div>

        <div class="mt-8">
          <p class="font-semibold text-white">Impact</p>
          <ul class="mt-3 space-y-4 text-sm leading-relaxed text-white/74">
            {#each project.metrics as metric}
              <li class="border-l-2 border-brand-primary pl-4">{metric}</li>
            {/each}
          </ul>
        </div>
      </aside>
    </div>

    <div class="mt-14 grid gap-5 lg:grid-cols-3">
      <article class="border border-brand-border/75 bg-white/88 p-7 shadow-[0_18px_50px_rgba(16,17,20,0.08)]">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.14em] text-brand-highlight">Problem</p>
        <p class="mt-4 leading-relaxed text-brand-text/82">{project.problem}</p>
      </article>

      <article class="border border-brand-border/75 bg-white/88 p-7 shadow-[0_18px_50px_rgba(16,17,20,0.08)]">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.14em] text-brand-highlight">Approach</p>
        <p class="mt-4 leading-relaxed text-brand-text/82">{project.approach}</p>
      </article>

      <article class="border border-brand-border/75 bg-white/88 p-7 shadow-[0_18px_50px_rgba(16,17,20,0.08)]">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.14em] text-brand-highlight">Outcome</p>
        <p class="mt-4 leading-relaxed text-brand-text/82">{project.outcome}</p>
      </article>
    </div>

    {#if project.links && project.links.length > 0}
      <div class="mt-10 border border-brand-border/75 bg-white/88 p-6 shadow-[0_18px_50px_rgba(16,17,20,0.08)]">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.14em] text-brand-highlight">Related links</p>
        <div class="mt-4 flex flex-wrap gap-3">
          {#each project.links as item}
            <a
              class="inline-flex rounded-lg border border-brand-border px-4 py-2 text-sm font-semibold text-brand-text/85 hover:border-brand-accent/60 hover:text-brand-text"
              href={item.url}
              rel="noreferrer"
              target="_blank"
            >
              {item.label}
            </a>
          {/each}
        </div>
      </div>
    {/if}

    {#if nextProject && nextProject.slug !== project.slug}
      <nav class="mt-12 border border-brand-text bg-brand-primary p-6 text-brand-text shadow-[0_18px_50px_rgba(16,17,20,0.08)]">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.14em]">Next project</p>
        <a class="mt-2 inline-flex text-2xl font-bold hover:text-brand-highlight" href={`/work/${nextProject.slug}`}>
          {nextProject.title} ->
        </a>
      </nav>
    {/if}
  </section>
{/if}
