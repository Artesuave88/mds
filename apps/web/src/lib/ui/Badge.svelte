<script>
  import { cn } from "./cn";

  const baseClass = "inline-flex items-center rounded-full border font-['Space_Mono'] uppercase tracking-[0.18em]";

  const variantClasses = {
    neutral: "border-slate-200 bg-white text-slate-600",
    subtle: "border-slate-200 bg-slate-50 text-slate-600",
    success: "border-emerald-200 bg-emerald-100/80 text-emerald-800",
    warning: "border-amber-200 bg-amber-100/80 text-amber-800",
    danger: "border-rose-200 bg-rose-100/80 text-rose-800"
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
