<script>
  import { cn } from "./cn";

  const baseClass = "inline-flex items-center rounded-full border font-['Space_Mono'] uppercase tracking-[0.2em]";

  const variantClasses = {
    neutral: "border-brand-border/80 bg-brand-surface/75 text-brand-text/72",
    subtle: "border-brand-border/65 bg-brand-surface-alt/72 text-brand-text/72",
    success: "border-brand-highlight/35 bg-brand-highlight/15 text-brand-text",
    warning: "border-brand-accent/35 bg-brand-accent/18 text-brand-text",
    danger: "border-brand-accent/35 bg-brand-accent/18 text-brand-text"
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-[10px]",
    md: "px-2.5 py-1 text-[11px]"
  };

  export let variant = "neutral";
  export let size = "md";

  let className = "";
  export { className as class };

  $: badgeClass = cn(
    baseClass,
    variantClasses[variant] ?? variantClasses.neutral,
    sizeClasses[size] ?? sizeClasses.md,
    className
  );
</script>

<span {...$$restProps} class={badgeClass}>
  <slot />
</span>
