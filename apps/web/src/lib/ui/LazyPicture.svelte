<script>
  import { onMount } from "svelte";

  const PLACEHOLDER =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  export let src = "";
  export let webpSrc = "";
  export let alt = "";
  export let width = 400;
  export let height = 300;
  export let className = "";
  export let loading = "lazy";
  export let sizes = "";

  let imageEl;
  let isVisible = false;

  $: imageAttributes = sizes ? { sizes } : {};

  onMount(() => {
    if (!imageEl || typeof IntersectionObserver === "undefined") {
      isVisible = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible = true;
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(imageEl);

    return () => observer.disconnect();
  });
</script>

<picture>
  {#if webpSrc}
    <source type="image/webp" srcset={isVisible ? webpSrc : undefined} />
  {/if}
  <img
    bind:this={imageEl}
    src={isVisible ? src : PLACEHOLDER}
    width={width}
    height={height}
    alt={alt}
    loading={loading}
    decoding="async"
    class={className}
    {...imageAttributes}
  />
</picture>
