<script>
  import { link } from "svelte-spa-router";
  import { workItems } from "../lib/data/work";
</script>

<section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
  <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-slate-500">Portfolio</p>
  <h1 class="mt-3 max-w-3xl text-4xl font-extrabold text-slate-900 sm:text-5xl">Work that connects design decisions to business results.</h1>
  <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-700">
    A selection of projects across fintech, healthcare, public sector, and ecommerce. Each case study breaks down the challenge, execution, and outcomes.
  </p>

  <div class="mt-10 grid gap-6 md:grid-cols-2">
    {#each workItems as item}
      <a
        class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        href={`/work/${item.slug}`}
        use:link
      >
        <div class="flex items-center justify-between gap-4">
          <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">{item.year}</p>
          <span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{item.category}</span>
        </div>
        <h2 class="mt-4 text-2xl font-bold text-slate-900 group-hover:text-slate-700">{item.title}</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
        <p class="mt-5 text-sm font-semibold text-slate-800">View case study →</p>
      </a>
    {/each}
  </div>
</section>
