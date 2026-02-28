<script lang="ts">
  import { getProjects, getServiceOptions, getToolOptions } from "../../lib/content";
  import type { ProjectSort } from "../../lib/types";

  const serviceOptions = getServiceOptions();
  const toolOptions = getToolOptions();

  let selectedService = "";
  let selectedTool = "";
  let selectedSort: ProjectSort = "newest";

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

<section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
  <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-brand-text/65">Portfolio</p>
  <h1 class="mt-3 max-w-3xl text-4xl font-extrabold text-brand-text sm:text-5xl">Here are some of our recent projects.</h1>


  <div class="mt-8 rounded-2xl border border-brand-border bg-brand-surface p-4 shadow-sm sm:p-5">
    <div class="grid gap-4 md:grid-cols-4">
      <label class="block">
        <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-brand-text/65">Service</span>
        <select
          bind:value={selectedService}
          class="w-full rounded-xl border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-text/85 outline-none focus:border-brand-accent"
        >
          <option value="">All services</option>
          {#each serviceOptions as service}
            <option value={service}>{service}</option>
          {/each}
        </select>
      </label>

      <label class="block">
        <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-brand-text/65">Tool</span>
        <select
          bind:value={selectedTool}
          class="w-full rounded-xl border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-text/85 outline-none focus:border-brand-accent"
        >
          <option value="">All tools</option>
          {#each toolOptions as tool}
            <option value={tool}>{tool}</option>
          {/each}
        </select>
      </label>

      <label class="block">
        <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-brand-text/65">Sort</span>
        <select
          bind:value={selectedSort}
          class="w-full rounded-xl border border-brand-border bg-brand-surface px-3 py-2 text-sm text-brand-text/85 outline-none focus:border-brand-accent"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A-Z</option>
        </select>
      </label>

      <div class="flex items-end">
        <button
          class="w-full rounded-xl border border-brand-border px-3 py-2 text-sm font-semibold text-brand-text/85 transition hover:border-brand-accent/60 hover:text-brand-text"
          on:click={resetFilters}
          type="button"
        >
          Reset filters
        </button>
      </div>
    </div>

    <p class="mt-4 text-sm text-brand-text/75">{projects.length} project{projects.length === 1 ? "" : "s"} found</p>
  </div>

  {#if projects.length === 0}
    <div class="mt-10 rounded-2xl border border-dashed border-brand-border bg-brand-surface px-6 py-12 text-center">
      <h2 class="text-xl font-bold text-brand-text">No matching projects</h2>
      <p class="mt-2 text-sm text-brand-text/75">Try removing one of the filters to broaden results.</p>
    </div>
  {:else}
    <div class="mt-10 grid gap-6 md:grid-cols-2">
      {#each projects as project}
        <a
          class="group overflow-hidden rounded-2xl border border-brand-border bg-brand-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          href={`/work/${project.slug}`}
        >
          <div class="aspect-[16/10] overflow-hidden bg-brand-surface-alt">
            <img
              alt={`${project.title} hero`}
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              src={project.heroImage}
            />
          </div>

          <div class="p-6">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">{project.year}</p>
              <span class="rounded-full bg-brand-surface-alt px-3 py-1 text-xs font-semibold text-brand-text/85">{project.client}</span>
            </div>

            <h2 class="mt-4 text-2xl font-bold text-brand-text group-hover:text-brand-text/85">{project.title}</h2>
            <p class="mt-3 text-sm leading-relaxed text-brand-text/75">{project.summary}</p>

            <div class="mt-4 flex flex-wrap gap-2">
              {#each project.services.slice(0, 2) as service}
                <span class="rounded-full border border-brand-border px-3 py-1 text-xs font-medium text-brand-text/75">{service}</span>
              {/each}
            </div>

            <p class="mt-5 text-sm font-semibold text-brand-text">View case study →</p>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>
