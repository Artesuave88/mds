import { browser } from "$app/environment";
import type { Action } from "svelte/action";

export type RevealOptions = {
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: number;
  easing?: string;
  once?: boolean;
  threshold?: number | number[];
  root?: Element | Document | null;
  rootMargin?: string;
};

const defaultOptions: Required<Omit<RevealOptions, "root">> & { root: Element | Document | null } = {
  delay: 0,
  duration: 500,
  distance: 18,
  scale: 0.98,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  once: true,
  threshold: 0.18,
  root: null,
  rootMargin: "0px 0px -10% 0px"
};

function buildTransition(options: Required<Omit<RevealOptions, "root">> & { root: Element | Document | null }) {
  return [
    `opacity ${options.duration}ms ${options.easing} ${options.delay}ms`,
    `transform ${options.duration}ms ${options.easing} ${options.delay}ms`
  ].join(", ");
}

function setHidden(node: HTMLElement, options: Required<Omit<RevealOptions, "root">> & { root: Element | Document | null }) {
  node.style.opacity = "0";
  node.style.transform = `translate3d(0, ${options.distance}px, 0) scale(${options.scale})`;
}

function setVisible(node: HTMLElement, options: Required<Omit<RevealOptions, "root">> & { root: Element | Document | null }) {
  node.style.transition = buildTransition(options);
  node.style.opacity = "1";
  node.style.transform = "translate3d(0, 0, 0) scale(1)";
}

function reset(node: HTMLElement, options: Required<Omit<RevealOptions, "root">> & { root: Element | Document | null }) {
  node.style.transition = "none";
  setHidden(node, options);
  void node.offsetHeight;
  node.style.transition = buildTransition(options);
}

export const reveal: Action<HTMLElement, RevealOptions> = (node, params = {}) => {
  let options = { ...defaultOptions, ...params };
  let observer: IntersectionObserver | null = null;

  const prefersReducedMotion = () =>
    browser && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const disconnect = () => {
    observer?.disconnect();
    observer = null;
  };

  const setup = () => {
    if (!browser) {
      return;
    }

    node.style.willChange = "opacity, transform";

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      node.style.transition = "none";
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }

    setHidden(node, options);
    node.style.transition = buildTransition(options);

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            if (!options.once) {
              reset(node, options);
            }
            continue;
          }

          requestAnimationFrame(() => setVisible(node, options));

          if (options.once) {
            observer?.unobserve(node);
          }
        }
      },
      {
        threshold: options.threshold,
        root: options.root,
        rootMargin: options.rootMargin
      }
    );

    observer.observe(node);
  };

  setup();

  return {
    update(nextParams = {}) {
      options = { ...defaultOptions, ...nextParams };
      disconnect();
      setup();
    },
    destroy() {
      disconnect();
      node.style.willChange = "";
    }
  };
};
