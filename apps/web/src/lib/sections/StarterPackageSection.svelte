<script>
  import { fade, fly, scale } from "svelte/transition";
  import { reveal } from "$lib/actions/reveal";
  import { starterPackageFeatures } from "$lib/data/starterPackage";
  import Card from "$lib/ui/Card.svelte";
  import Section from "$lib/ui/Section.svelte";
</script>

<div use:reveal={{ distance: 24, duration: 520, threshold: 0.12 }} in:fade={{ duration: 420 }}>
  <Section class="border-b border-brand-border bg-brand-surface" containerClass="py-16">
    <Card
      variant="contrast"
      padding="lg"
      class="rounded-3xl border-brand-accent/25 bg-brand-surface-alt/95 shadow-sm"
    >
      <div class="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
        <div in:fly={{ y: 16, duration: 440 }}>
          <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">
            Clear starting price
          </p>
          <h2 class="mt-3 text-3xl font-bold text-brand-text sm:text-4xl">Starter Website</h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-brand-text/75 sm:text-lg">
            Ideal for local service businesses that need a strong online presence without unnecessary complexity. It covers
            the essentials properly, keeps the process straightforward, and gives you a clear starting point if you want to
            get online with confidence.
          </p>

          <div class="mt-8 rounded-2xl border border-brand-accent/20 bg-brand-primary/10 p-5 sm:p-6">
            <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">Starting from</p>
            <p class="mt-3 text-4xl font-bold tracking-tight text-brand-text sm:text-5xl">£799</p>
            <p class="mt-3 max-w-lg text-sm leading-relaxed text-brand-text/75 sm:text-base">
              A professional small-business website with everything needed to start bringing in enquiries online.
            </p>
          </div>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              class="inline-flex items-center rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-text transition duration-200 ease-out motion-safe:transform-gpu motion-safe:hover:-translate-y-0.5 hover:bg-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2"
              href="/contact"
            >
              Get a free mockup
            </a>
            <a
              class="text-sm font-semibold text-brand-text/80 transition hover:text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35 focus-visible:ring-offset-2"
              href="/contact"
            >
              Request a quote
            </a>
          </div>

          <p class="mt-4 text-sm text-brand-text/55">Free homepage mockup available before you commit</p>
        </div>

        <div in:scale={{ start: 0.97, duration: 320, delay: 70 }}>
          <div class="rounded-2xl border border-brand-border bg-brand-bg/75 p-6 sm:p-7">
            <p class="font-['Space_Mono'] text-[11px] uppercase tracking-[0.2em] text-brand-text/55">Included</p>
            <ul class="mt-5 grid gap-3 sm:grid-cols-2" aria-label="Starter Website package features">
              {#each starterPackageFeatures as feature}
                <li class="flex items-start gap-3 rounded-xl border border-brand-border/80 bg-brand-surface/70 px-4 py-3">
                  <span
                    class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-brand-text"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span class="text-sm leading-relaxed text-brand-text/80">{feature}</span>
                </li>
              {/each}
            </ul>

            <p class="mt-6 text-sm leading-relaxed text-brand-text/65">
              Need something larger or more custom? We also build fully bespoke websites around your business.
            </p>
          </div>
        </div>
      </div>
    </Card>
  </Section>
</div>
