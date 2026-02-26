<script>
  import { createEventDispatcher, onDestroy, tick } from "svelte";
  import { cn } from "./cn";

  const uid = `modal-${Math.random().toString(36).slice(2, 10)}`;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl"
  };

  export let open = false;
  export let title = "";
  export let description = "";
  export let closeOnOverlay = true;
  export let closeOnEscape = true;
  export let showCloseButton = true;
  export let size = "md";

  let className = "";
  export { className as class };

  const dispatch = createEventDispatcher();

  let dialogEl;
  let previousActiveElement = null;

  $: titleId = title ? `${uid}-title` : undefined;
  $: descriptionId = description ? `${uid}-description` : undefined;

  $: panelClass = cn(
    "relative z-10 w-full rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-xl sm:p-7",
    sizeClasses[size] ?? sizeClasses.md,
    className
  );

  function getFocusableElements() {
    if (!dialogEl) {
      return [];
    }

    return Array.from(
      dialogEl.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  }

  async function focusFirstElement() {
    await tick();

    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
      return;
    }

    dialogEl?.focus();
  }

  function requestClose(reason = "dismiss") {
    open = false;
    dispatch("close", { reason });
  }

  function handleOverlayClick() {
    if (closeOnOverlay) {
      requestClose("overlay");
    }
  }

  function handleKeydown(event) {
    if (!open) {
      return;
    }

    if (event.key === "Escape" && closeOnEscape) {
      event.preventDefault();
      requestClose("escape");
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) {
      event.preventDefault();
      dialogEl?.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  $: if (typeof document !== "undefined") {
    if (open) {
      previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      document.body.classList.add("overflow-hidden");
      focusFirstElement();
    } else {
      document.body.classList.remove("overflow-hidden");

      if (previousActiveElement && typeof previousActiveElement.focus === "function") {
        previousActiveElement.focus();
      }

      previousActiveElement = null;
    }
  }

  onDestroy(() => {
    if (typeof document !== "undefined") {
      document.body.classList.remove("overflow-hidden");
    }
  });
</script>

<svelte:window on:keydown={handleKeydown} />

{#if open}
  <div class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 py-8 sm:items-center sm:px-6">
    <div class="absolute inset-0 bg-brand-bg/55 backdrop-blur-sm" aria-hidden="true" on:click={handleOverlayClick}></div>

    <div
      bind:this={dialogEl}
      class={panelClass}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      tabindex="-1"
      on:click|stopPropagation
      {...$$restProps}
    >
      {#if showCloseButton}
        <button
          type="button"
          class="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-brand-text/65 transition hover:bg-brand-surface-alt hover:text-brand-text/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35 focus-visible:ring-offset-2"
          on:click={() => requestClose("button")}
          aria-label="Close modal"
        >
          <span aria-hidden="true">x</span>
        </button>
      {/if}

      {#if title}
        <h2 id={titleId} class="pr-10 text-2xl font-bold text-brand-text">{title}</h2>
      {/if}

      {#if description}
        <p id={descriptionId} class="mt-2 text-sm leading-relaxed text-brand-text/75">{description}</p>
      {/if}

      <div class={cn((title || description) && "mt-6")}>
        <slot />
      </div>

      {#if $$slots.footer}
        <div class="mt-6 border-t border-brand-border pt-5">
          <slot name="footer" />
        </div>
      {/if}
    </div>
  </div>
{/if}
