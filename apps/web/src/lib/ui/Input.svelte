<script>
  import { cn } from "./cn";

  const uid = `input-${Math.random().toString(36).slice(2, 10)}`;

  export let id = "";
  export let type = "text";
  export let value = "";
  export let label = "";
  export let hint = "";
  export let error = "";
  export let disabled = false;
  export let wrapperClass = "";
  export let labelClass = "";
  export let hintClass = "";
  export let errorClass = "";

  let className = "";
  export { className as class };

  $: inputId = id || uid;
  $: hintId = hint ? `${inputId}-hint` : "";
  $: errorId = error ? `${inputId}-error` : "";
  $: describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  $: inputClass = cn(
    "w-full rounded-xl border px-4 py-3 text-sm text-brand-text outline-none transition placeholder:text-brand-text/55 focus-visible:ring-2 focus-visible:ring-brand-accent/30 focus-visible:ring-offset-1",
    error ? "border-brand-accent focus:border-brand-accent" : "border-brand-border focus:border-brand-accent",
    disabled && "cursor-not-allowed bg-brand-surface-alt text-brand-text/65",
    className
  );
</script>

<div class={cn("w-full", wrapperClass)}>
  {#if label}
    <label for={inputId} class={cn("mb-2 block text-sm font-semibold text-brand-text/85", labelClass)}>{label}</label>
  {/if}

  <input
    {...$$restProps}
    id={inputId}
    {type}
    {disabled}
    bind:value
    class={inputClass}
    aria-invalid={error ? "true" : undefined}
    aria-describedby={describedBy}
  />

  {#if hint}
    <p id={hintId} class={cn("mt-2 text-xs text-brand-text/65", hintClass)}>{hint}</p>
  {/if}

  {#if error}
    <p id={errorId} class={cn("mt-2 text-xs font-semibold text-brand-accent", errorClass)}>{error}</p>
  {/if}
</div>
