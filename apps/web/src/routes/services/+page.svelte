<script>
  import { services } from "../../lib/data/services";
</script>

<section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
  <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-slate-500">Services</p>
  <h1 class="mt-3 max-w-3xl text-4xl font-extrabold text-slate-900 sm:text-5xl">Flexible engagement across strategy, design, and front-end delivery.</h1>
  <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-700">
    We adapt to in-house teams, founder-led orgs, and product groups that need senior execution without agency overhead.
  </p>

  <div class="mt-10 grid gap-6 md:grid-cols-3">
    {#each services as service}
      <article class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">{service.id}</p>
        <h2 class="mt-3 text-xl font-bold text-slate-900">{service.title}</h2>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">{service.summary}</p>
        <ul class="mt-5 space-y-2 text-sm text-slate-700">
          {#each service.deliverables as deliverable}
            <li class="flex items-start gap-2">
              <span class="mt-1 h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>{deliverable}</span>
            </li>
          {/each}
        </ul>
      </article>
    {/each}
  </div>

  <div class="mt-12 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-slate-100 sm:p-10">
    <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">How we work</p>
    <h2 class="mt-3 max-w-2xl text-2xl font-bold sm:text-3xl">Small team, direct communication, weekly shipping cadence.</h2>
    <p class="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
      Every engagement starts with a practical scope and clear success metrics. You get execution partners, not layers of account management.
    </p>
    <a class="mt-8 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400" href="/contact">
      Discuss your project
    </a>
  </div>
</section>
