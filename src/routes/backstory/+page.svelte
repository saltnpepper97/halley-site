<script lang="ts">
  import SiteHeader from "$lib/components/SiteHeader.svelte";
</script>

<svelte:head>
  <title>Backstory | Halley</title>
  <meta
    name="description"
    content="Why Halley exists: the thinking behind spatial fields, nodes, clusters, and living workspaces."
  />
</svelte:head>

<div class="backstory-page">
  <SiteHeader />

  <main class="backstory-shell">
    <section class="story-hero surface">
      <div class="story-copy">
        <p class="eyebrow">Backstory</p>
        <h1>Why Halley Exists</h1>
        <p class="lede">A different answer to the old desktop problem: keeping context alive.</p>
      </div>

      <div class="field-visual" aria-hidden="true">
        <div class="focus-ring"></div>
        <div class="trail trail-one"></div>
        <div class="trail trail-two"></div>
        <span class="node node-one"></span>
        <span class="node node-two"></span>
        <span class="node node-three"></span>
        <span class="core-node"></span>
      </div>
    </section>

    <article class="story-body surface hud-corners">
      <p>Halley began as a frustration with the traditional desktop.</p>

      <p>
        For decades, graphical interfaces have treated work like a pile of overlapping paper: windows
        stacked, minimized, hidden, tiled, or pushed into virtual workspaces. These systems are
        familiar, but they often make large, messy, real-world workflows harder to understand. The
        more things you open, the easier it is to lose the shape of what you were doing.
      </p>

      <p>Halley tries a different approach.</p>

      <p>
        Instead of forcing every task into fixed workspaces or rigid layouts, Halley gives each
        monitor an open field. Windows live as spatial objects inside that field. They can expand
        when active, collapse into readable nodes when they move out of focus, and gather into
        clusters that behave more like living workspaces than static desktops.
      </p>

      <blockquote>The idea is simple: your computer should help you keep context.</blockquote>

      <p>
        You should be able to move through your work the way you move through a place. A browser
        belongs near the notes it supports. A terminal belongs near the editor it controls. A project
        should be something you can find, recognize, enter, leave, and return to without rebuilding
        your mental map every time.
      </p>

      <p>
        Halley is built on Wayland and written in Rust, but its purpose is not just technical. It is
        about exploring a better interaction model for personal computing: one where navigation,
        memory, focus, and motion are treated as first-class parts of the desktop.
      </p>

      <p>It is not trying to recreate the past.</p>

      <p class="final-line">It is trying to make the workspace feel alive again.</p>
    </article>
  </main>
</div>

<style>
  .backstory-page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  .backstory-shell {
    display: grid;
    gap: clamp(1rem, 3vw, 1.5rem);
    width: min(100% - 2rem, var(--page-max-width));
    margin-inline: auto;
    padding: 1.25rem 0 6rem;
  }

  .story-hero {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(16rem, 0.48fr);
    align-items: center;
    gap: clamp(2rem, 6vw, 4rem);
    min-height: clamp(24rem, 48vh, 35rem);
    padding: clamp(1.5rem, 5vw, 4rem);
    background:
      radial-gradient(circle at 78% 28%, rgba(255, 106, 42, 0.22), transparent 18rem),
      radial-gradient(circle at 10% 10%, rgba(125, 220, 255, 0.1), transparent 20rem),
      rgba(16, 23, 34, 0.68);
  }

  .story-hero::before {
    position: absolute;
    inset: 1rem;
    pointer-events: none;
    content: "";
    border: 1px solid rgba(246, 239, 231, 0.06);
    border-radius: calc(var(--radius-xl) + 0.25rem);
  }

  .story-copy {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.95rem;
    max-width: 48rem;
  }

  h1 {
    max-width: 11ch;
    font-size: clamp(3.1rem, 7vw, 6.4rem);
    text-wrap: balance;
  }

  .lede {
    max-width: 36rem;
    color: var(--text-2);
    font-size: clamp(1.15rem, 2vw, 1.45rem);
    line-height: 1.45;
  }

  .field-visual {
    position: relative;
    justify-self: center;
    width: min(24rem, 58vw);
    aspect-ratio: 1;
  }

  .focus-ring,
  .trail,
  .node,
  .core-node {
    position: absolute;
    inset: 0;
    margin: auto;
  }

  .focus-ring {
    width: 78%;
    height: 46%;
    border: 1px solid rgba(125, 220, 255, 0.38);
    border-radius: 50%;
    box-shadow:
      0 0 42px rgba(125, 220, 255, 0.12),
      inset 0 0 24px rgba(125, 220, 255, 0.08);
    transform: rotate(-18deg);
    animation: ring-breathe 5.8s ease-in-out infinite;
  }

  .trail {
    width: 90%;
    height: 90%;
    border: 1px solid transparent;
    border-top-color: rgba(255, 106, 42, 0.5);
    border-right-color: rgba(255, 106, 42, 0.15);
    border-radius: 50%;
    animation: orbit-spin 18s linear infinite;
  }

  .trail-two {
    width: 64%;
    height: 64%;
    border-top-color: rgba(125, 220, 255, 0.38);
    border-right-color: rgba(125, 220, 255, 0.14);
    animation-duration: 13s;
    animation-direction: reverse;
  }

  .node,
  .core-node {
    width: 2.25rem;
    height: 2.25rem;
    background:
      linear-gradient(135deg, rgba(246, 239, 231, 0.18), rgba(246, 239, 231, 0.05)),
      rgba(9, 13, 18, 0.88);
    border: 1px solid rgba(255, 106, 42, 0.55);
    border-radius: var(--radius-sm);
    box-shadow: 0 0 22px rgba(255, 106, 42, 0.24);
  }

  .node-one {
    transform: translate(-7rem, -3.8rem);
    animation: node-drift-one 7s ease-in-out infinite;
  }

  .node-two {
    border-color: rgba(125, 220, 255, 0.48);
    box-shadow: 0 0 22px rgba(125, 220, 255, 0.18);
    transform: translate(7.6rem, -1.4rem);
    animation: node-drift-two 6.2s ease-in-out infinite;
  }

  .node-three {
    transform: translate(2.4rem, 7.2rem);
    animation: node-drift-three 8s ease-in-out infinite;
  }

  .core-node {
    width: 3.3rem;
    height: 3.3rem;
    background:
      radial-gradient(circle at 35% 30%, rgba(255, 155, 84, 0.35), transparent 48%),
      rgba(9, 13, 18, 0.92);
    border-color: var(--accent);
    border-radius: var(--radius-md);
    box-shadow:
      0 0 34px rgba(255, 106, 42, 0.42),
      inset 0 1px 0 rgba(246, 239, 231, 0.14);
    animation: core-pulse 4.2s ease-in-out infinite;
  }

  .story-body {
    display: grid;
    gap: 1.15rem;
    max-width: 58rem;
    padding: clamp(1.4rem, 4vw, 2.4rem);
    margin-inline: auto;
    background: rgba(16, 23, 34, 0.74);
  }

  .story-body p,
  blockquote {
    font-size: clamp(1.02rem, 1.6vw, 1.18rem);
    line-height: 1.75;
  }

  blockquote {
    margin: 0.35rem 0;
    padding: 1rem 1.2rem;
    color: var(--text-1);
    background: rgba(255, 106, 42, 0.1);
    border-left: 3px solid var(--accent);
    border-radius: var(--radius-md);
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  :global(:root[data-theme="light"]) .story-hero {
    background:
      radial-gradient(circle at 78% 28%, rgba(184, 63, 17, 0.08), transparent 18rem),
      radial-gradient(circle at 10% 10%, rgba(40, 95, 115, 0.06), transparent 20rem),
      rgba(255, 250, 244, 0.9);
  }

  :global(:root[data-theme="light"]) .story-hero::before {
    border-color: rgba(38, 27, 20, 0.11);
  }

  :global(:root[data-theme="light"]) .focus-ring {
    border-color: rgba(40, 95, 115, 0.34);
    box-shadow:
      0 0 34px rgba(40, 95, 115, 0.08),
      inset 0 0 22px rgba(40, 95, 115, 0.06);
  }

  :global(:root[data-theme="light"]) .trail {
    border-top-color: rgba(40, 95, 115, 0.28);
    border-right-color: rgba(40, 95, 115, 0.09);
  }

  :global(:root[data-theme="light"]) .trail-two {
    border-top-color: rgba(77, 67, 142, 0.24);
    border-right-color: rgba(77, 67, 142, 0.08);
  }

  :global(:root[data-theme="light"]) .node,
  :global(:root[data-theme="light"]) .core-node {
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.62), rgba(255, 250, 244, 0.24)),
      rgba(92, 68, 51, 0.16);
    border-color: rgba(184, 63, 17, 0.45);
    box-shadow: 0 0 20px rgba(184, 63, 17, 0.12);
  }

  :global(:root[data-theme="light"]) .core-node {
    background:
      radial-gradient(circle at 35% 30%, rgba(40, 95, 115, 0.18), transparent 48%),
      rgba(255, 250, 244, 0.86);
    border-color: rgba(40, 95, 115, 0.4);
    box-shadow:
      0 0 30px rgba(40, 95, 115, 0.13),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
  }

  :global(:root[data-theme="light"]) .story-body {
    background: rgba(255, 250, 244, 0.88);
  }

  .final-line {
    color: var(--text-1);
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 3vw, 2rem) !important;
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  @keyframes orbit-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes ring-breathe {
    0%,
    100% {
      opacity: 0.52;
      transform: rotate(-18deg) scale(0.96);
    }

    50% {
      opacity: 1;
      transform: rotate(-18deg) scale(1.04);
    }
  }

  @keyframes core-pulse {
    0%,
    100% {
      transform: scale(0.96);
    }

    50% {
      transform: scale(1.05);
    }
  }

  @keyframes node-drift-one {
    50% {
      transform: translate(-6.3rem, -4.5rem);
    }
  }

  @keyframes node-drift-two {
    50% {
      transform: translate(6.9rem, -0.6rem);
    }
  }

  @keyframes node-drift-three {
    50% {
      transform: translate(3.1rem, 6.5rem);
    }
  }

  @media (max-width: 780px) {
    .backstory-shell {
      width: min(100% - 1rem, var(--page-max-width));
      padding-bottom: 4rem;
    }

    .story-hero {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    .field-visual {
      order: -1;
      width: min(18rem, 76vw);
    }
  }

  @media (max-width: 520px) {
    .story-hero,
    .story-body {
      padding: 1rem;
      border-radius: var(--radius-md);
    }

    h1 {
      font-size: clamp(2.35rem, 14vw, 3.4rem);
    }

    .field-visual {
      width: min(14rem, 70vw);
    }

    .node {
      width: 1.85rem;
      height: 1.85rem;
    }

    .core-node {
      width: 2.7rem;
      height: 2.7rem;
    }

    blockquote {
      padding: 0.85rem 0.95rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .focus-ring,
    .trail,
    .node,
    .core-node {
      animation: none;
    }
  }
</style>
