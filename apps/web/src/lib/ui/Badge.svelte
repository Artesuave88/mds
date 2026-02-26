<script>
  import { cn } from "./cn";

  const baseClass = "inline-flex items-center rounded-full border font-['Space_Mono'] uppercase tracking-[0.18em]";

  const variantClasses = {
    neutral: "border-brand-border bg-brand-surface text-brand-text/75",
    subtle: "border-brand-border bg-brand-surface-alt text-brand-text/75",
    success: "border-brand-highlight/40 bg-brand-highlight/20 text-brand-highlight",
    warning: "border-brand-accent/35 bg-brand-accent/20 text-brand-text",
    danger: "border-brand-accent/35 bg-brand-accent/20 text-brand-text"
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
