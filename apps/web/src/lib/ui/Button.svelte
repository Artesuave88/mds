<script>
  import { cn } from "./cn";

  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition duration-200 ease-out motion-safe:transform-gpu motion-safe:will-change-transform motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-surface disabled:cursor-not-allowed disabled:opacity-60";

  const variantClasses = {
    primary: "bg-brand-primary text-brand-text shadow-[0_12px_32px_rgba(212,160,23,0.28)] hover:bg-brand-accent",
    secondary: "bg-brand-highlight text-brand-surface shadow-[0_12px_30px_rgba(13,13,13,0.18)] hover:bg-brand-highlight/90",
    outline: "border border-brand-border/80 bg-brand-surface/80 text-brand-text hover:border-brand-accent/60 hover:bg-brand-surface hover:text-brand-text",
    ghost: "bg-transparent text-brand-text hover:bg-brand-surface-alt/60",
    danger: "bg-brand-accent text-brand-text hover:bg-brand-primary"
  };

  const sizeClasses = {
    sm: "h-9 rounded-xl px-3 text-sm",
    md: "h-11 px-5 text-sm",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10"
  };

  export let variant = "primary";
  export let size = "md";
  export let type = "button";
  export let disabled = false;

  let className = "";
  export { className as class };

  $: buttonClass = cn(
    baseClass,
    variantClasses[variant] ?? variantClasses.primary,
    sizeClasses[size] ?? sizeClasses.md,
    className
  );
</script>

<button {...$$restProps} {type} {disabled} class={buttonClass} on:click>
  <slot />
</button>
