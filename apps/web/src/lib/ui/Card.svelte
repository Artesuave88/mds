<script>
  import { cn } from "./cn";

  const variantClasses = {
    default: "border-slate-200 bg-white",
    muted: "border-slate-200 bg-slate-50",
    contrast: "border-slate-900 bg-slate-900 text-slate-100"
  };

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  export let as = "article";
  export let variant = "default";
  export let padding = "md";
  export let interactive = false;

  let className = "";
  export { className as class };

  $: cardClass = cn(
    "rounded-2xl border shadow-sm focus-within:ring-2 focus-within:ring-slate-900/20 motion-safe:transform-gpu motion-safe:transition-[transform,box-shadow] motion-safe:duration-200 motion-safe:ease-out motion-safe:will-change-transform",
    variantClasses[variant] ?? variantClasses.default,
    paddingClasses[padding] ?? paddingClasses.md,
    interactive && "motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md",
    className
  );
</script>

<svelte:element this={as} {...$$restProps} class={cardClass}>
  <slot />
</svelte:element>
