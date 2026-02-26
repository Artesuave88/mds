<script>
  import { cn } from "./cn";

  const uid = `section-${Math.random().toString(36).slice(2, 10)}`;

  export let as = "section";
  export let eyebrow = "";
  export let title = "";
  export let description = "";
  export let centered = false;
  export let containerClass = "";
  export let headerClass = "";
  export let contentClass = "";

  let className = "";
  export { className as class };

  $: headingId = title ? `${uid}-title` : undefined;
  $: descriptionId = description ? `${uid}-description` : undefined;

  $: sectionClass = cn("w-full", className);
  $: innerClass = cn("mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8", containerClass);
  $: computedHeaderClass = cn(
    "mb-8 flex flex-wrap items-end justify-between gap-4",
    centered && "text-center",
    headerClass
  );
  $: computedContentClass = cn(contentClass);
</script>

<svelte:element
  this={as}
  {...$$restProps}
  class={sectionClass}
  aria-labelledby={headingId}
  aria-describedby={descriptionId}
>
  <div class={innerClass}>
    {#if eyebrow || title || description || $$slots.actions}
      <header class={computedHeaderClass}>
        <div class={centered ? "mx-auto max-w-3xl" : ""}>
          {#if eyebrow}
            <p class="font-['Space_Mono'] text-xs uppercase tracking-[0.2em] text-slate-500">{eyebrow}</p>
          {/if}
          {#if title}
            <h2 id={headingId} class="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
          {/if}
          {#if description}
            <p id={descriptionId} class="mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>
          {/if}
        </div>

        {#if $$slots.actions}
          <div class={centered ? "mx-auto" : ""}>
            <slot name="actions" />
          </div>
        {/if}
      </header>
    {/if}

    <div class={computedContentClass}>
      <slot />
    </div>
  </div>
</svelte:element>
