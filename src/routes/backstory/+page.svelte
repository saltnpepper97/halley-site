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
        <h1>Why Halley exists</h1>
        <p class="lede">A different answer to the old desktop problem: keeping context alive.</p>
      </div>

      <div class="field-visual" aria-hidden="true">
        <span class="map-readout readout-origin">Context map · 01</span>
        <span class="map-readout readout-return">Return vector</span>
        <div class="map-focus"></div>
        <div class="map-route route-one"></div>
        <div class="map-route route-two"></div>
        <div class="map-window window-notes"><b>Notes</b></div>
        <div class="map-window window-editor"><b>Editor</b></div>
        <div class="map-window window-browser"><b>Browser</b></div>
        <span class="map-node node-one"></span>
        <span class="map-node node-two"></span>
        <span class="map-node node-three"></span>
        <span class="map-core">Focus</span>
      </div>
    </section>

    <article class="story-body surface">
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
    grid-template-columns: minmax(0, 0.86fr) minmax(22rem, 1.14fr);
    align-items: center;
    gap: clamp(2rem, 6vw, 4rem);
    min-height: clamp(24rem, 48vh, 35rem);
    padding: clamp(1.5rem, 5vw, 4rem);
    background:
      rgba(16, 23, 34, 0.68);
  }


  .story-copy {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 0.95rem;
    max-width: 48rem;
  }

  h1 {
    max-width: 12ch;
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
    width: min(33rem, 48vw);
    aspect-ratio: 1.35;
    overflow: hidden;
    background:
      linear-gradient(rgba(125, 220, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(125, 220, 255, 0.035) 1px, transparent 1px),
      rgba(3, 7, 12, 0.82);
    background-size: 2.2rem 2.2rem, 2.2rem 2.2rem, auto, auto;
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
  }


  .map-readout {
    position: absolute;
    z-index: 4;
    color: var(--text-3);
    font-family: var(--font-mono);
    font-size: 0.68rem;
  }

  .readout-origin { top: 0.85rem; left: 0.85rem; }
  .readout-return { right: 0.85rem; bottom: 0.85rem; }

  .map-focus {
    position: absolute;
    left: 18%;
    top: 27%;
    width: 60%;
    height: 40%;
    border: 1.5px solid rgba(var(--accent-rgb), 0.7);
    border-radius: 50%;
    transform: rotate(-8deg);
    animation: map-breathe 6s ease-in-out infinite;
  }

  .map-route {
    position: absolute;
    z-index: 1;
    height: 1px;
    background: rgba(var(--ion-rgb), 0.4);
    transform-origin: left center;
  }

  .route-one { left: 22%; top: 55%; width: 58%; transform: rotate(-17deg); }
  .route-two { left: 42%; top: 38%; width: 42%; background: rgba(var(--accent-rgb), 0.45); transform: rotate(24deg); }

  .map-window {
    position: absolute;
    z-index: 2;
    display: grid;
    align-content: end;
    padding: 0.45rem;
    color: rgba(246, 239, 231, 0.65);
    background:
      linear-gradient(180deg, rgba(125, 220, 255, 0.1) 0 1rem, transparent 1rem),
      rgba(9, 15, 24, 0.94);
    border: 1px solid rgba(125, 220, 255, 0.22);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 0.55rem;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .map-window b { font-weight: 700; }
  .window-notes { left: 17%; top: 34%; width: 26%; height: 22%; animation: map-drift 8s ease-in-out infinite; }
  .window-editor { left: 45%; top: 49%; width: 27%; height: 23%; animation: map-drift 9s ease-in-out -4s infinite reverse; }
  .window-browser { right: 8%; top: 18%; width: 21%; height: 18%; opacity: 0.58; }

  .map-node {
    position: absolute;
    z-index: 2;
    width: 1.25rem;
    height: 1.25rem;
    background: rgba(125, 220, 255, 0.14);
    border: 1px solid rgba(125, 220, 255, 0.38);
    border-radius: var(--radius-sm);
  }

  .node-one { left: 10%; bottom: 20%; }
  .node-two { right: 13%; top: 48%; }
  .node-three { left: 49%; top: 16%; background: rgba(255, 106, 42, 0.15); border-color: rgba(255, 155, 84, 0.42); }

  .map-core {
    position: absolute;
    left: 46%;
    top: 39%;
    z-index: 3;
    display: grid;
    width: 3.25rem;
    height: 3.25rem;
    place-items: center;
    color: var(--on-accent);
    background: var(--accent);
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 0.47rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
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
    border-left: 2px solid var(--accent);
    font-family: var(--font-display);
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  :global(:root[data-theme="light"]) .story-hero {
    background:
      rgba(255, 250, 244, 0.9);
  }



  :global(:root[data-theme="light"]) .field-visual {
    background:
      linear-gradient(rgba(40, 95, 115, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(40, 95, 115, 0.05) 1px, transparent 1px),
      rgba(255, 255, 255, 0.54);
    background-size: 2.2rem 2.2rem, 2.2rem 2.2rem, auto, auto;
    border-color: var(--border-1);
  }

  :global(:root[data-theme="light"]) .map-window {
    color: rgba(38, 27, 20, 0.72);
    background:
      linear-gradient(180deg, rgba(40, 95, 115, 0.12) 0 1rem, transparent 1rem),
      rgba(255, 255, 255, 0.72);
    border-color: rgba(40, 95, 115, 0.3);
    box-shadow: 0 12px 26px rgba(54, 37, 26, 0.12);
  }

  :global(:root[data-theme="light"]) .map-node {
    background: rgba(40, 95, 115, 0.12);
    border-color: rgba(40, 95, 115, 0.42);
    box-shadow: 0 0 16px rgba(40, 95, 115, 0.12);
  }

  :global(:root[data-theme="light"]) .node-three {
    background: rgba(184, 63, 17, 0.12);
    border-color: rgba(184, 63, 17, 0.4);
  }

  :global(:root[data-theme="light"]) .story-body {
    background: rgba(255, 250, 244, 0.88);
  }

  .final-line {
    color: var(--text-1);
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 3vw, 2rem) !important;
    font-weight: 650;
    letter-spacing: -0.02em;
  }

  @keyframes map-breathe {
    0%,
    100% {
      opacity: 0.68;
      transform: rotate(-8deg) scale(0.97);
    }

    50% {
      opacity: 1;
      transform: rotate(-8deg) scale(1.03);
    }
  }

  @keyframes map-drift {
    50% {
      transform: translate(0.22rem, -0.28rem);
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

  @media (max-width: 880px) {
    .backstory-shell {
      width: min(100% - 1rem, var(--page-max-width));
      padding-top: 4.5rem;
      padding-bottom: 4rem;
    }

    .story-hero {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    .field-visual {
      order: -1;
      width: min(30rem, 90vw);
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
      width: min(22rem, 90vw);
    }

    blockquote {
      padding: 0.85rem 0.95rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .map-focus,
    .map-window,
    .map-core {
      animation: none;
    }
  }
</style>
