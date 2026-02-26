<script>
  import { cn } from "./cn";

  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 ease-out motion-safe:transform-gpu motion-safe:will-change-transform motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60";

  const variantClasses = {
    primary: "bg-slate-900 text-white hover:bg-slate-700",
    secondary: "bg-emerald-600 text-white hover:bg-emerald-500",
    outline: "border border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:text-slate-900",
    ghost: "bg-transparent text-slate-800 hover:bg-slate-100",
    danger: "bg-rose-600 text-white hover:bg-rose-500"
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
