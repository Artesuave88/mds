<script>
  import { link } from "svelte-spa-router";
  import { getProjects } from "../lib/content";
  import { services } from "../lib/data/services";

  const allProjects = getProjects({ sort: "newest" });
  const featuredWork = allProjects.slice(0, 3);
  const featuredServices = services.slice(0, 3);
  const latestProject = featuredWork[0];
</script>

<section class="border-b border-slate-200 bg-gradient-to-br from-emerald-100/70 via-amber-50 to-cyan-100/60">
  <div class="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
    <div>
      <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.25em] text-slate-500">Independent Studio</p>
      <h1 class="mt-5 max-w-xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">
        We build digital experiences that feel sharp, useful, and unmistakably yours.
      </h1>
      <p class="mt-6 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
        Michael Design Studio helps teams ship stronger brands, faster websites, and high-conviction product moments.
      </p>
      <div class="mt-8 flex flex-wrap items-center gap-3">
        <a
          class="inline-flex items-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          href="/work"
          use:link
        >
          Explore work
        </a>
        <a
          class="inline-flex items-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:text-slate-900"
          href="/contact"
          use:link
        >
          Start a project
        </a>
      </div>
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <article class="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Projects</p>
        <p class="mt-2 text-3xl font-extrabold text-slate-900">{allProjects.length}</p>
        <p class="mt-2 text-sm text-slate-600">Published case study currently in portfolio.</p>
      </article>
      <article class="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Latest Client</p>
        <p class="mt-2 text-lg font-bold text-slate-900">{latestProject?.client ?? "TBD"}</p>
        <p class="mt-2 text-sm text-slate-600">Most recently documented web project.</p>
      </article>
      <article class="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-slate-100 shadow-sm sm:col-span-2">
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">Current Build</p>
        <p class="mt-2 text-xl font-bold">{latestProject?.title ?? "No case study added yet"}</p>
        <p class="mt-2 text-sm text-slate-300">{latestProject?.summary ?? "Add your first project in src/content/projects.json."}</p>
      </article>
    </div>
  </div>
</section>

<section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
  <div class="flex flex-wrap items-end justify-between gap-4">
    <div>
      <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-slate-500">Featured Work</p>
      <h2 class="mt-2 text-3xl font-bold text-slate-900">Selected case studies</h2>
    </div>
    <a class="text-sm font-semibold text-slate-700 hover:text-slate-900" href="/work" use:link>
      View all projects
    </a>
  </div>

  <div class="mt-8 grid gap-5 md:grid-cols-3">
    {#each featuredWork as item}
      <a
        class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        href={`/work/${item.slug}`}
        use:link
      >
        <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">{item.year} - {item.client}</p>
        <h3 class="mt-3 text-lg font-bold text-slate-900 group-hover:text-slate-700">{item.title}</h3>
        <p class="mt-3 text-sm leading-relaxed text-slate-600">{item.summary}</p>
        <p class="mt-5 text-sm font-semibold text-slate-800">Read case study →</p>
      </a>
    {/each}
  </div>
</section>

<section class="border-y border-slate-200 bg-white">
  <div class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-slate-500">Services</p>
        <h2 class="mt-2 text-3xl font-bold text-slate-900">What we help with</h2>
      </div>
      <a class="text-sm font-semibold text-slate-700 hover:text-slate-900" href="/services" use:link>
        See service details
      </a>
    </div>

    <div class="mt-8 grid gap-5 md:grid-cols-3">
      {#each featuredServices as service}
        <article class="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-slate-400">{service.id}</p>
          <h3 class="mt-3 text-lg font-bold text-slate-900">{service.title}</h3>
          <p class="mt-3 text-sm leading-relaxed text-slate-600">{service.summary}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<section class="bg-slate-900 text-slate-100">
  <div class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
    <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.25em] text-slate-400">Client Voice</p>
    {#if latestProject?.testimonial}
      <p class="mt-4 max-w-4xl text-2xl font-bold leading-snug sm:text-3xl">
        "{latestProject.testimonial.quote}"
      </p>
      <p class="mt-4 text-sm text-slate-300">{latestProject.testimonial.author} · {latestProject.testimonial.role}</p>
    {:else}
      <p class="mt-4 max-w-4xl text-2xl font-bold leading-snug sm:text-3xl">Add a project testimonial in your local JSON to feature it here.</p>
    {/if}
  </div>
</section>

<section class="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
  <div class="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
    <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-slate-500">Ready to build</p>
    <h2 class="mt-3 max-w-2xl text-3xl font-bold text-slate-900">
      If you need a high-quality web presence with clear business intent, we can start quickly.
    </h2>
    <div class="mt-8 flex flex-wrap gap-3">
      <a class="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500" href="/contact" use:link>
        Book a discovery call
      </a>
      <a class="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 hover:border-slate-400" href="/work" use:link>
        Review case studies
      </a>
    </div>
  </div>
</section>
