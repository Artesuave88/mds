<script lang="ts">
  import { getProjectBySlug, getProjects } from "$lib/content";
  import type { PageData } from "./$types";

  export let data: PageData;

  const orderedProjects = getProjects({ sort: "newest" });

  $: slug = data.slug ?? "";
  $: project = slug ? getProjectBySlug(slug) : undefined;
  $: currentIndex = orderedProjects.findIndex((entry) => entry.slug === slug);
  $: nextProject = currentIndex >= 0 ? orderedProjects[(currentIndex + 1) % orderedProjects.length] : undefined;
</script>

{#if !project}
  <section class="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
    <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-brand-text/65">Case Study</p>
    <h1 class="mt-3 text-3xl font-bold text-brand-text">Project not found</h1>
    <p class="mt-4 text-brand-text/75">The case study you are looking for does not exist or may have moved.</p>
    <a class="mt-8 inline-flex rounded-full bg-brand-bg px-6 py-3 text-sm font-semibold text-white hover:bg-brand-accent" href="/work">
      Back to work
    </a>
  </section>
{:else}
  <section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
    <a class="inline-flex items-center text-sm font-semibold text-brand-text/85 hover:text-brand-text" href="/work">
      ← Back to all work
    </a>

    <div class="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-brand-text/65">{project.year} - {project.client}</p>
        <h1 class="mt-3 text-4xl font-extrabold text-brand-text sm:text-5xl">{project.title}</h1>
        <p class="mt-5 max-w-2xl text-base leading-relaxed text-brand-text/85 sm:text-lg">{project.summary}</p>

        <div class="mt-6 flex flex-wrap gap-2">
          {#each project.services as service}
            <span class="rounded-full border border-brand-border bg-brand-surface px-3 py-1 text-xs font-semibold text-brand-text/85">{service}</span>
          {/each}
        </div>
      </div>

      <aside class="rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">Tools</p>
        <div class="mt-3 flex flex-wrap gap-2">
          {#each project.tools as tool}
            <span class="rounded-full bg-brand-surface-alt px-3 py-1 text-xs font-semibold text-brand-text/85">{tool}</span>
          {/each}
        </div>

        <p class="mt-6 font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">Impact metrics</p>
        <ul class="mt-3 space-y-3 text-sm leading-relaxed text-brand-text/85">
          {#each project.metrics as metric}
            <li class="flex gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-brand-highlight"></span>
              <span>{metric}</span>
            </li>
          {/each}
        </ul>
      </aside>
    </div>

    <div class="mt-10 overflow-hidden rounded-2xl border border-brand-border bg-brand-surface shadow-sm">
      <img alt={`${project.title} hero image`} class="h-full w-full object-cover" src={project.heroImage} />
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-3">
      <article class="rounded-2xl border border-brand-border bg-brand-surface p-7 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">Problem</p>
        <p class="mt-4 leading-relaxed text-brand-text/85">{project.problem}</p>
      </article>

      <article class="rounded-2xl border border-brand-border bg-brand-surface p-7 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">Approach</p>
        <p class="mt-4 leading-relaxed text-brand-text/85">{project.approach}</p>
      </article>

      <article class="rounded-2xl border border-brand-border bg-brand-surface p-7 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">Outcome</p>
        <p class="mt-4 leading-relaxed text-brand-text/85">{project.outcome}</p>
      </article>
    </div>

    <div class="mt-12">
      <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/65">Gallery</p>
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {#each project.galleryImages as image, index}
          <figure class={`overflow-hidden rounded-xl border border-brand-border bg-brand-surface ${index === 0 ? "sm:col-span-2" : ""}`}>
            <img
              alt={`${project.title} gallery ${index + 1}`}
              class="h-full w-full object-cover"
              loading="lazy"
              src={image}
            />
          </figure>
        {/each}
      </div>
    </div>

    {#if project.testimonial}
      <div class="mt-12 rounded-3xl border border-brand-border bg-brand-bg p-8 text-brand-text sm:p-10">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">Client testimonial</p>
        <p class="mt-4 text-xl font-bold leading-relaxed sm:text-2xl">"{project.testimonial.quote}"</p>
        <p class="mt-4 text-sm text-brand-text/70">{project.testimonial.author} - {project.testimonial.role}</p>
      </div>
    {/if}

    {#if project.links && project.links.length > 0}
      <div class="mt-10 rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/65">Related links</p>
        <div class="mt-4 flex flex-wrap gap-3">
          {#each project.links as item}
            <a
              class="inline-flex rounded-full border border-brand-border px-4 py-2 text-sm font-semibold text-brand-text/85 hover:border-brand-accent/60 hover:text-brand-text"
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
      <nav class="mt-12 rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/65">Next project</p>
        <a class="mt-2 inline-flex text-xl font-bold text-brand-text hover:text-brand-text/85" href={`/work/${nextProject.slug}`}>
          {nextProject.title} →
        </a>
      </nav>
    {/if}
  </section>
{/if}
