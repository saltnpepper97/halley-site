<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { slide } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  let { label, id, open, nested = false, ontoggle, children }: {
    label: string;
    id: string;
    open: boolean;
    nested?: boolean;
    ontoggle: () => void;
    children: Snippet;
  } = $props();
  let reducedMotion = $state(false);
  onMount(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { reducedMotion = preference.matches; };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  });
</script>

<div class="nav-disclosure" class:nested>
  <button type="button" class="nav-toggle" aria-expanded={open} aria-controls={id} onclick={ontoggle}>
    <span>{label}</span><span class="indicator" aria-hidden="true">{open ? "−" : "+"}</span>
  </button>
  {#if open}
    <div id={id} class="group-content" inert={!open}
      transition:slide={{ duration: reducedMotion ? 0 : 260, easing: cubicOut }}>
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .nav-disclosure { min-width: 0; }
  .nav-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    min-height: 2.25rem;
    padding: 0.35rem 0.55rem;
    border: 0;
    border-radius: var(--radius-sm);
    color: var(--text-1);
    background: transparent;
    font: inherit;
    font-weight: 800;
    line-height: 1.25;
    text-align: left;
    overflow-wrap: anywhere;
    cursor: pointer;
    transition: color 160ms ease, background 160ms ease;
  }
  .nav-toggle:hover { color: var(--text-1); background: rgba(246, 239, 231, 0.06); }
  .nav-toggle:focus-visible { outline: 2px solid var(--accent-soft); outline-offset: 2px; }
  .indicator { flex: 0 0 auto; color: var(--text-3); }
  .nested .nav-toggle { padding: 0.25rem 0.55rem; color: var(--text-2); font-size: 0.94rem; font-weight: 650; }
  .group-content { overflow: hidden; padding-top: 0.3rem; }
  :global(:root[data-theme="light"]) .nav-toggle:hover { background: rgba(255, 255, 255, 0.42); }
  @media (max-width: 880px) { .nav-toggle { min-height: 2.4rem; } }
  @media (max-width: 520px) { .nested .nav-toggle { font-size: 0.9rem; } }
  @media (prefers-reduced-motion: reduce) { .nav-toggle { transition: none; } }
</style>
