<script>
  import { cn } from "./cn";

  const variantClasses = {
    default: "border-brand-border/80 bg-brand-surface/82 backdrop-blur-sm",
    muted: "border-brand-border/70 bg-brand-surface-alt/72 backdrop-blur-sm",
    contrast: "border-brand-primary/40 bg-[linear-gradient(145deg,rgba(212,160,23,0.18),rgba(255,255,255,0.96))] text-brand-text backdrop-blur-sm"
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
    "rounded-[1.75rem] border shadow-[0_18px_55px_rgba(13,13,13,0.08)] focus-within:ring-2 focus-within:ring-brand-accent/25 motion-safe:transform-gpu motion-safe:transition-[transform,box-shadow,border-color] motion-safe:duration-200 motion-safe:ease-out motion-safe:will-change-transform",
    variantClasses[variant] ?? variantClasses.default,
    paddingClasses[padding] ?? paddingClasses.md,
    interactive && "motion-safe:hover:-translate-y-1.5 motion-safe:hover:border-brand-primary/55 motion-safe:hover:shadow-[0_26px_65px_rgba(13,13,13,0.12)]",
    className
  );
</script>

<svelte:element this={as} {...$$restProps} class={cardClass}>
  <slot />
</svelte:element>
