<script>
  import { cn } from "./cn";

  const uid = `select-${Math.random().toString(36).slice(2, 10)}`;

  export let id = "";
  export let value = "";
  export let label = "";
  export let hint = "";
  export let error = "";
  export let options = [];
  export let placeholder = "";
  export let disabled = false;
  export let wrapperClass = "";
  export let labelClass = "";
  export let hintClass = "";
  export let errorClass = "";

  let className = "";
  export { className as class };

  $: selectId = id || uid;
  $: hintId = hint ? `${selectId}-hint` : "";
  $: errorId = error ? `${selectId}-error` : "";
  $: describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  $: normalizedOptions = options.map((option) => {
    if (typeof option === "string" || typeof option === "number") {
      return {
        value: String(option),
        label: String(option),
        disabled: false
      };
    }

    return {
      value: String(option?.value ?? ""),
      label: String(option?.label ?? option?.value ?? ""),
      disabled: Boolean(option?.disabled)
    };
  });

  $: selectClass = cn(
    "w-full appearance-none rounded-xl border px-4 py-3 pr-10 text-sm text-brand-text outline-none transition focus-visible:ring-2 focus-visible:ring-brand-accent/30 focus-visible:ring-offset-1",
    error ? "border-brand-accent focus:border-brand-accent" : "border-brand-border focus:border-brand-accent",
    disabled && "cursor-not-allowed bg-brand-surface-alt text-brand-text/65",
    className
  );
</script>

<div class={cn("w-full", wrapperClass)}>
  {#if label}
    <label for={selectId} class={cn("mb-2 block text-sm font-semibold text-brand-text/85", labelClass)}>{label}</label>
  {/if}

  <div class="relative">
    <select
      {...$$restProps}
      id={selectId}
      {disabled}
      bind:value
      class={selectClass}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={describedBy}
    >
      {#if placeholder}
        <option value="" disabled>{placeholder}</option>
      {/if}

      {#each normalizedOptions as option}
        <option value={option.value} disabled={option.disabled}>{option.label}</option>
      {/each}
    </select>

    <span class="pointer-events-none absolute inset-y-0 right-3 flex items-center text-brand-text/65" aria-hidden="true">
      v
    </span>
  </div>

  {#if hint}
    <p id={hintId} class={cn("mt-2 text-xs text-brand-text/65", hintClass)}>{hint}</p>
  {/if}

  {#if error}
    <p id={errorId} class={cn("mt-2 text-xs font-semibold text-brand-accent", errorClass)}>{error}</p>
  {/if}
</div>
