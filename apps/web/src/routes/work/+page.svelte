<script lang="ts">
  import { getProjects } from "$lib/content";
  import { setMeta } from "$lib/seo";
  import SeoHead from "$lib/seo/SeoHead.svelte";
  import type { ProjectSort } from "$lib/types";

  let selectedService = "";
  let selectedTool = "";
  let selectedSort: ProjectSort = "newest";

  const meta = setMeta({
    title: "Website Design Case Studies",
    description: "See website design case studies for UK small businesses and local organisations, showing the problems solved, work delivered and outcomes for each client.",
    openGraphTitle: "Website design work for businesses and communities",
    openGraphDescription: "Explore Midas Web case studies showing how clearer content, purposeful design and simpler customer journeys support local organisations.",
    image: "/case-studies/love-long-eaton/trent-lock.webp",
    url: "/work"
  });

  $: projects = getProjects({
    service: selectedService || undefined,
    tool: selectedTool || undefined,
    sort: selectedSort
  });

  function resetFilters() {
    selectedService = "";
    selectedTool = "";
    selectedSort = "newest";
  }
</script>

<SeoHead {meta} />

<section class="border-b border-brand-border/70 bg-white/72">
  <div class="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
    <div>
      <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.14em] text-brand-highlight">Work</p>
      <h1 class="mt-4 max-w-3xl text-5xl font-bold leading-[1.03] text-brand-text sm:text-6xl">Recent websites and products.</h1>
    </div>
    <div class="content-end">
      <p class="max-w-2xl text-lg leading-relaxed text-brand-text/76">
        A small portfolio of live launches and product work. The thread is the same across each project: clearer message,
        stronger visual standard, and easier next steps for visitors.
      </p>
    </div>
  </div>
</section>

<section class="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
  {#if projects.length === 0}
    <div class="border border-dashed border-brand-border bg-white px-6 py-12 text-center">
      <h2 class="text-xl font-bold text-brand-text">No matching projects</h2>
      <p class="mt-2 text-sm text-brand-text/75">Try removing one of the filters to broaden results.</p>
      <button class="mt-5 rounded-lg border border-brand-border px-4 py-2 text-sm font-semibold" on:click={resetFilters} type="button">
        Reset filters
      </button>
    </div>
  {:else}
    <div class="grid gap-6 lg:grid-cols-2">
      {#each projects as project}
        <a
          class="group grid overflow-hidden border border-brand-border/75 bg-white/88 shadow-[0_20px_60px_rgba(16,17,20,0.08)] transition hover:-translate-y-1 hover:border-brand-primary/70 hover:shadow-[0_28px_70px_rgba(16,17,20,0.12)]"
          href={`/work/${project.slug}`}
        >
          <div class="aspect-[16/10] overflow-hidden border-b border-brand-border/75 bg-brand-surface-alt">
            <img
              alt={`${project.title} hero`}
              class="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              src={project.heroImage}
            />
          </div>

          <div class="p-6">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.14em] text-brand-highlight">{project.year}</p>
              <span class="rounded-md bg-brand-surface-alt px-3 py-1 text-xs font-semibold text-brand-text/78">{project.client}</span>
            </div>

            <h2 class="mt-4 text-3xl font-bold text-brand-text group-hover:text-brand-highlight">{project.title}</h2>
            <p class="mt-3 text-sm leading-relaxed text-brand-text/72">{project.summary}</p>

            <div class="mt-5 flex flex-wrap gap-2">
              {#each project.services.slice(0, 3) as service}
                <span class="rounded-md border border-brand-border/80 px-3 py-1 text-xs font-semibold text-brand-text/70">{service}</span>
              {/each}
            </div>

            <p class="mt-6 text-sm font-bold text-brand-text">View case study -></p>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>
