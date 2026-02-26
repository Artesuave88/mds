<script>
  import { cn } from "./cn";

  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 ease-out motion-safe:transform-gpu motion-safe:will-change-transform motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg disabled:cursor-not-allowed disabled:opacity-60";

  const variantClasses = {
    primary: "bg-brand-primary text-brand-text hover:bg-brand-accent",
    secondary: "bg-brand-highlight text-brand-bg hover:bg-brand-highlight/90",
    outline: "border border-brand-border bg-brand-surface text-brand-text hover:border-brand-accent/60 hover:text-brand-text",
    ghost: "bg-transparent text-brand-text hover:bg-brand-surface-alt",
    danger: "bg-brand-accent text-brand-text hover:bg-brand-primary"
  };

  const sizeClasses = {
    sm: "h-9 rounded-lg px-3 text-sm",
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

<button {...$$restProps} {type} {disabled} class={buttonClass}>
  <slot />
</button>
