<script lang="ts">
  import { link } from "svelte-spa-router";
  import { getProjectBySlug, getProjects } from "../lib/content";

  export let params: { slug?: string } = {};

  const orderedProjects = getProjects({ sort: "newest" });

  $: slug = params.slug ?? "";
  $: project = slug ? getProjectBySlug(slug) : undefined;
  $: currentIndex = orderedProjects.findIndex((entry) => entry.slug === slug);
  $: nextProject = currentIndex >= 0 ? orderedProjects[(currentIndex + 1) % orderedProjects.length] : undefined;
</script>

{#if !project}
  <section class="mx-auto w-full max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
    <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-slate-500">Case Study</p>
    <h1 class="mt-3 text-3xl font-bold text-slate-900">Project not found</h1>
    <p class="mt-4 text-slate-600">The case study you are looking for does not exist or may have moved.</p>
    <a class="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-700" href="/work" use:link>
      Back to work
    </a>
  </section>
{:else}
  <section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
    <a class="inline-flex items-center text-sm font-semibold text-slate-700 hover:text-slate-900" href="/work" use:link>
      ← Back to all work
    </a>

    <div class="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
      <div>
        <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-slate-500">{project.year} - {project.client}</p>
        <h1 class="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">{project.title}</h1>
        <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">{project.summary}</p>

        <div class="mt-6 flex flex-wrap gap-2">
          {#each project.services as service}
            <span class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">{service}</span>
          {/each}
        </div>
      </div>

      <aside class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Tools</p>
        <div class="mt-3 flex flex-wrap gap-2">
          {#each project.tools as tool}
            <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{tool}</span>
          {/each}
        </div>

        <p class="mt-6 font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Impact metrics</p>
        <ul class="mt-3 space-y-3 text-sm leading-relaxed text-slate-700">
          {#each project.metrics as metric}
            <li class="flex gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>{metric}</span>
            </li>
          {/each}
        </ul>
      </aside>
    </div>

    <div class="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <img alt={`${project.title} hero image`} class="h-full w-full object-cover" src={project.heroImage} />
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-3">
      <article class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Problem</p>
        <p class="mt-4 leading-relaxed text-slate-700">{project.problem}</p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Approach</p>
        <p class="mt-4 leading-relaxed text-slate-700">{project.approach}</p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Outcome</p>
        <p class="mt-4 leading-relaxed text-slate-700">{project.outcome}</p>
      </article>
    </div>

    <div class="mt-12">
      <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-500">Gallery</p>
      <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {#each project.galleryImages as image, index}
          <figure class={`overflow-hidden rounded-xl border border-slate-200 bg-white ${index === 0 ? "sm:col-span-2" : ""}`}>
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
      <div class="mt-12 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-slate-100 sm:p-10">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Client testimonial</p>
        <p class="mt-4 text-xl font-bold leading-relaxed sm:text-2xl">"{project.testimonial.quote}"</p>
        <p class="mt-4 text-sm text-slate-300">{project.testimonial.author} - {project.testimonial.role}</p>
      </div>
    {/if}

    {#if project.links && project.links.length > 0}
      <div class="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-500">Related links</p>
        <div class="mt-4 flex flex-wrap gap-3">
          {#each project.links as item}
            <a
              class="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400 hover:text-slate-900"
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
      <nav class="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-500">Next project</p>
        <a class="mt-2 inline-flex text-xl font-bold text-slate-900 hover:text-slate-700" href={`/work/${nextProject.slug}`} use:link>
          {nextProject.title} →
        </a>
      </nav>
    {/if}
  </section>
{/if}
