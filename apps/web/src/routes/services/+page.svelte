<script>
  import { fade, fly, scale } from "svelte/transition";
  import { reveal } from "../../lib/actions/reveal";
  import { services } from "../../lib/data/services";
  import Card from "../../lib/ui/Card.svelte";
</script>

<section
  class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
  use:reveal={{ distance: 22, duration: 540, threshold: 0.1 }}
>
  <div in:fly={{ y: 16, duration: 480 }}>
    <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-slate-500">Services</p>
    <h1 class="mt-3 max-w-3xl text-4xl font-extrabold text-slate-900 sm:text-5xl">Flexible engagement across website planning, development, and optimization.</h1>
    <p class="mt-5 max-w-2xl text-base leading-relaxed text-slate-700">
      We adapt to in-house teams, founder-led orgs, and product groups that need senior execution without agency overhead.
    </p>
  </div>

  <div class="mt-10 grid gap-6 md:grid-cols-3">
    {#each services as service, index}
      <div in:scale={{ start: 0.96, duration: 320, delay: index * 70 }}>
        <Card interactive>
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
        </Card>
      </div>
    {/each}
  </div>

  <div
    class="mt-12 rounded-3xl border border-slate-200 bg-slate-900 p-8 text-slate-100 sm:p-10"
    use:reveal={{ distance: 18, duration: 460, threshold: 0.2 }}
    in:fade={{ duration: 420 }}
  >
    <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">How we work</p>
    <h2 class="mt-3 max-w-2xl text-2xl font-bold sm:text-3xl">Small team, direct communication, weekly shipping cadence.</h2>
    <p class="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300">
      Every engagement starts with a practical scope and clear success metrics. You get execution partners, not layers of account management.
    </p>
    <a
      class="mt-8 inline-flex rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-emerald-400"
      href="/contact"
    >
      Discuss your project
    </a>
  </div>
</section>
