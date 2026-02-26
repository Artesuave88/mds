<script>
  import { link } from "svelte-spa-router";
  import { workItems } from "../lib/data/work";

  export let params = {};

  $: item = workItems.find((workItem) => workItem.slug === params.slug);
</script>

{#if !item}
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
        <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-slate-500">{item.year} - {item.category}</p>
        <h1 class="mt-3 text-4xl font-extrabold text-slate-900 sm:text-5xl">{item.title}</h1>
        <p class="mt-6 text-base leading-relaxed text-slate-700 sm:text-lg">{item.summary}</p>
      </div>
      <aside class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Outcome Snapshot</p>
        <ul class="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
          {#each item.results as result}
            <li class="flex gap-3">
              <span class="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>{result}</span>
            </li>
          {/each}
        </ul>
      </aside>
    </div>

    <div class="mt-12 grid gap-6 lg:grid-cols-2">
      <article class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Challenge</p>
        <p class="mt-4 leading-relaxed text-slate-700">{item.challenge}</p>
      </article>

      <article class="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Approach</p>
        <p class="mt-4 leading-relaxed text-slate-700">{item.approach}</p>
      </article>
    </div>

    <div class="mt-12 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-slate-100 sm:p-10">
      <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Need similar results?</p>
      <h2 class="mt-3 max-w-2xl text-2xl font-bold sm:text-3xl">We can help map your next release and ship the right experience faster.</h2>
      <a class="mt-7 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400" href="/contact" use:link>
        Talk with us
      </a>
    </div>
  </section>
{/if}
