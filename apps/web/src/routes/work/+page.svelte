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
  <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-slate-500">Portfolio</p>
  <h1 class="mt-3 max-w-3xl text-4xl font-extrabold text-slate-900 sm:text-5xl">Case studies built from local structured content.</h1>
  <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-700">
    Filter by service or tool, then sort to find relevant projects quickly. Every case study is rendered from `projects.json`.
  </p>

  <div class="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
    <div class="grid gap-4 md:grid-cols-4">
      <label class="block">
        <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Service</span>
        <select
          bind:value={selectedService}
          class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-500"
        >
          <option value="">All services</option>
          {#each serviceOptions as service}
            <option value={service}>{service}</option>
          {/each}
        </select>
      </label>

      <label class="block">
        <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Tool</span>
        <select
          bind:value={selectedTool}
          class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-500"
        >
          <option value="">All tools</option>
          {#each toolOptions as tool}
            <option value={tool}>{tool}</option>
          {/each}
        </select>
      </label>

      <label class="block">
        <span class="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Sort</span>
        <select
          bind:value={selectedSort}
          class="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-500"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A-Z</option>
        </select>
      </label>

      <div class="flex items-end">
        <button
          class="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          on:click={resetFilters}
          type="button"
        >
          Reset filters
        </button>
      </div>
    </div>

    <p class="mt-4 text-sm text-slate-600">{projects.length} project{projects.length === 1 ? "" : "s"} found</p>
  </div>

  {#if projects.length === 0}
    <div class="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <h2 class="text-xl font-bold text-slate-900">No matching projects</h2>
      <p class="mt-2 text-sm text-slate-600">Try removing one of the filters to broaden results.</p>
    </div>
  {:else}
    <div class="mt-10 grid gap-6 md:grid-cols-2">
      {#each projects as project}
        <a
          class="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          href={`/work/${project.slug}`}
        >
          <div class="aspect-[16/10] overflow-hidden bg-slate-100">
            <img
              alt={`${project.title} hero`}
              class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              src={project.heroImage}
            />
          </div>

          <div class="p-6">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">{project.year}</p>
              <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{project.client}</span>
            </div>

            <h2 class="mt-4 text-2xl font-bold text-slate-900 group-hover:text-slate-700">{project.title}</h2>
            <p class="mt-3 text-sm leading-relaxed text-slate-600">{project.summary}</p>

            <div class="mt-4 flex flex-wrap gap-2">
              {#each project.services.slice(0, 2) as service}
                <span class="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">{service}</span>
              {/each}
            </div>

            <p class="mt-5 text-sm font-semibold text-slate-800">View case study →</p>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</section>
