<script>
  import { cn } from "./cn";

  const uid = `textarea-${Math.random().toString(36).slice(2, 10)}`;

  export let id = "";
  export let value = "";
  export let label = "";
  export let hint = "";
  export let error = "";
  export let rows = 5;
  export let disabled = false;
  export let wrapperClass = "";
  export let labelClass = "";
  export let hintClass = "";
  export let errorClass = "";

  let className = "";
  export { className as class };

  $: textareaId = id || uid;
  $: hintId = hint ? `${textareaId}-hint` : "";
  $: errorId = error ? `${textareaId}-error` : "";
  $: describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  $: textareaClass = cn(
    "w-full rounded-2xl border bg-brand-surface/85 px-4 py-3 text-sm text-brand-text shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] outline-none transition placeholder:text-brand-text/45 focus-visible:ring-2 focus-visible:ring-brand-accent/30 focus-visible:ring-offset-1",
    error ? "border-brand-accent focus:border-brand-accent" : "border-brand-border focus:border-brand-accent",
    disabled && "cursor-not-allowed bg-brand-surface-alt text-brand-text/65",
    className
  );
</script>

<div class={cn("w-full", wrapperClass)}>
  {#if label}
    <label for={textareaId} class={cn("mb-2 block text-sm font-semibold text-brand-text/85", labelClass)}>{label}</label>
  {/if}

  <textarea
    {...$$restProps}
    id={textareaId}
    {rows}
    {disabled}
    bind:value
    class={textareaClass}
    aria-invalid={error ? "true" : undefined}
    aria-describedby={describedBy}
  ></textarea>

  {#if hint}
    <p id={hintId} class={cn("mt-2 text-xs text-brand-text/65", hintClass)}>{hint}</p>
  {/if}

  {#if error}
    <p id={errorId} class={cn("mt-2 text-xs font-semibold text-brand-accent", errorClass)}>{error}</p>
  {/if}
</div>
