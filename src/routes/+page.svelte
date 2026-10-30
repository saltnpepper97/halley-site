<script lang="ts">
  import { base } from "$app/paths";
  import SiteHeader from "$lib/components/SiteHeader.svelte";

  const withBase = (href: string) => `${base}${href}`;
</script>

<svelte:head>
  <title>Halley | Spatial Wayland Compositor</title>
  <meta
    name="description"
    content="Halley is a spatial Wayland compositor with per-monitor fields, focus rings, decaying windows, nodes, clusters, and bearings."
  />
</svelte:head>

<div class="page-container">
  <SiteHeader />

  <main class="home-shell" aria-labelledby="home-title">
    <section class="hero-section">
      <div class="hero-copy">
        <p class="eyebrow">Wayland compositor</p>
        <h1 id="home-title">Periodic. Precise. Returning.</h1>
        <p class="lede">
          Windows as nodes, displays as fields, clusters as deliberate workspaces.
        </p>

        <div class="hero-actions" aria-label="Primary actions">
          <a class="primary-action" href={withBase("/wiki/install")}>Install Halley</a>
          <a class="secondary-action" href={withBase("/wiki")}>Read the wiki</a>
        </div>

        <a class="release-link" href={withBase("/news/v0-8-0-field-first")}>
          <span class="release-version">v0.8.0</span>
          The Field comes first
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <figure class="hero-scene">
        <div class="demo-field" aria-hidden="true">
          <div class="demo-focus-ring"></div>
          <div class="demo-window window-a"></div>
          <div class="demo-window window-b"></div>
          <div class="demo-node node-a"></div>
          <div class="demo-node node-b"></div>
          <div class="demo-bearing bearing-left">W 420</div>
          <div class="demo-bearing bearing-right">E 180</div>
        </div>
        <figcaption class="scene-caption">A field with a focus ring, two windows, and decayed nodes.</figcaption>
      </figure>
    </section>

    <section class="feature-intro" aria-labelledby="features-heading">
      <h2 id="features-heading">The desktop is a field, not a stack of boxes.</h2>
      <p>
        Halley keeps spatial context visible. Instead of hiding everything behind workspaces, it lets
        windows live on per-monitor fields, decay when they leave attention, and gather into clusters
        you intentionally build.
      </p>
    </section>

    <section class="feature-row" aria-labelledby="focus-ring-heading">
      <div class="feature-art focus-art" aria-hidden="true">
        <div class="eye-ring"></div>
        <div class="art-window active-one"></div>
        <div class="art-window active-two"></div>
        <div class="art-window fading-one"></div>
      </div>

      <div class="feature-copy">
        <p class="eyebrow">Focus ring</p>
        <h3 id="focus-ring-heading">An adjustable attention zone.</h3>
        <p>
          The focus ring is an eye-shaped region on each field. Windows inside it stay prominent;
          windows outside it can begin to fade, collapse, or wait for you to return.
        </p>
        <a href={withBase("/wiki/config/viewport#viewport-connector-focus-ring")}>Configure focus rings →</a>
      </div>
    </section>

    <section class="feature-row reverse" aria-labelledby="nodes-heading">
      <div class="feature-copy">
        <p class="eyebrow">Decay and nodes</p>
        <h3 id="nodes-heading">Windows can drift out of focus without disappearing.</h3>
        <p>
          Halley lets inactive or offscreen windows decay into compact nodes. The field keeps their
          location and identity, but reduces visual noise until you need them again.
        </p>
        <a href={withBase("/wiki/config/node")}>Tune node behavior →</a>
      </div>

      <div class="feature-art node-art" aria-hidden="true">
        <div class="art-window decay-active"></div>
        <div class="art-window decay-mid"></div>
        <div class="art-node decay-node-one"></div>
        <div class="art-node decay-node-two"></div>
      </div>
    </section>

    <section class="feature-row" aria-labelledby="clusters-heading">
      <div class="feature-art cluster-art" aria-hidden="true">
        <div class="cluster-core"></div>
        <div class="art-window petal petal-one"></div>
        <div class="art-window petal petal-two"></div>
        <div class="art-window petal petal-three"></div>
        <div class="art-window petal petal-four"></div>
      </div>

      <div class="feature-copy">
        <p class="eyebrow">Clusters</p>
        <h3 id="clusters-heading">Workspaces you create on purpose.</h3>
        <p>
          Clusters gather related windows into a core that can reopen into tiling or stacking layouts.
          They are spatial, visible, and per-monitor instead of hidden behind abstract workspace numbers.
        </p>
        <a href={withBase("/wiki/config/clusters")}>Explore cluster settings →</a>
      </div>
    </section>

    <section class="feature-row reverse" aria-labelledby="bearings-heading">
      <div class="feature-copy">
        <p class="eyebrow">Bearings</p>
        <h3 id="bearings-heading">A HUD for finding your way back.</h3>
        <p>
          Bearings are directional cues for spatial navigation. They behave like a lightweight game HUD,
          pointing toward useful context when the field is bigger than the visible monitor.
        </p>
        <a href={withBase("/wiki/config/bearings")}>Adjust bearings →</a>
      </div>

      <div class="feature-art bearings-art" aria-hidden="true">
        <div class="hud-frame"></div>
        <div class="demo-bearing arrow-n">N 960</div>
        <div class="demo-bearing arrow-e">E 320</div>
        <div class="demo-bearing arrow-s">S 540</div>
        <div class="art-window hud-window-one"></div>
        <div class="art-window hud-window-two"></div>
      </div>
    </section>

    <section class="feature-row" aria-labelledby="fields-heading">
      <div class="feature-art fields-art" aria-hidden="true">
        <div class="monitor-field field-left"><div class="art-node"></div></div>
        <div class="monitor-field field-right"><div class="art-node"></div></div>
      </div>

      <div class="feature-copy">
        <p class="eyebrow">Per-monitor fields</p>
        <h3 id="fields-heading">Each display gets its own world.</h3>
        <p>
          Multi-monitor is not an afterthought. Each output has its own field, camera, focus behavior,
          and cluster slots, so moving between displays feels deliberate instead of chaotic.
        </p>
        <a href={withBase("/wiki/config/viewport")}>Set up monitors →</a>
      </div>
    </section>
  </main>
</div>

<style>
  .page-container {
    min-height: 100vh;
  }

  .home-shell {
    display: grid;
    width: min(100% - 2rem, var(--page-max-width));
    margin-inline: auto;
    padding: clamp(3rem, 8vw, 6rem) 0 clamp(4rem, 9vw, 7rem);
  }

  /* Hero */

  .hero-section {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
    align-items: center;
    gap: clamp(2rem, 5vw, 4rem);
    padding-bottom: clamp(3rem, 8vw, 6rem);
  }

  .hero-copy {
    display: grid;
    gap: 1.25rem;
    justify-items: start;
  }

  h1 {
    max-width: 12ch;
    font-size: clamp(2.75rem, 5.6vw, 4.6rem);
    letter-spacing: -0.035em;
    text-wrap: balance;
  }

  .lede {
    max-width: 30rem;
    font-size: clamp(1.08rem, 1.7vw, 1.25rem);
    line-height: 1.55;
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .primary-action,
  .secondary-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    padding: 0.65rem 1.15rem;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    font-family: var(--font-display);
    font-weight: 600;
    transition:
      background 160ms ease,
      border-color 160ms ease,
      color 160ms ease;
  }

  .primary-action {
    color: var(--on-accent);
    background: var(--accent);
  }

  .primary-action:hover {
    color: var(--on-accent);
    background: var(--accent-soft);
  }

  .secondary-action {
    color: var(--text-1);
    background: var(--chip-base);
    border-color: var(--border-1);
  }

  .secondary-action:hover {
    color: var(--text-1);
    border-color: var(--text-3);
  }

  .release-link {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    color: var(--text-2);
    font-size: 0.92rem;
  }

  .release-version {
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: 0.85rem;
    font-weight: 600;
  }

  .release-link:hover {
    color: var(--text-1);
  }

  .hero-scene {
    display: grid;
    gap: 0.75rem;
    margin: 0;
    min-width: 0;
  }

  .demo-field {
    position: relative;
    aspect-ratio: 16 / 11;
    overflow: hidden;
    background: var(--panel-tint);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1);
  }

  .scene-caption {
    color: var(--text-3);
    font-size: 0.85rem;
  }

  .demo-focus-ring {
    position: absolute;
    left: 16%;
    top: 22%;
    width: 56%;
    height: 44%;
    border: 1.5px solid rgba(var(--accent-rgb), 0.7);
    border-radius: 50%;
  }

  .demo-window,
  .art-window,
  .monitor-field {
    position: absolute;
    background: var(--bg-3);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-sm);
  }

  /* Title bar strip, so the shapes read as windows. */
  .demo-window::before,
  .art-window::before {
    position: absolute;
    inset: 0 0 auto;
    height: 0.9rem;
    content: "";
    border-bottom: 1px solid var(--border-1);
  }

  .window-a { left: 24%; top: 30%; width: 27%; height: 22%; }
  .window-b { left: 48%; top: 50%; width: 22%; height: 18%; }

  .demo-node,
  .art-node {
    position: absolute;
    width: 1.9rem;
    height: 1.9rem;
    background: rgba(var(--accent-rgb), 0.16);
    border: 1px solid rgba(var(--accent-rgb), 0.5);
    border-radius: var(--radius-sm);
  }

  .node-a { left: 78%; top: 22%; }
  .node-b { left: 10%; top: 72%; opacity: 0.6; }

  .demo-bearing {
    position: absolute;
    padding: 0.2rem 0.45rem;
    color: var(--text-2);
    background: var(--bg-2);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 0.72rem;
  }

  .bearing-left { left: 0.9rem; top: 46%; }
  .bearing-right { right: 0.9rem; top: 30%; }

  /* Intro */

  .feature-intro {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(1.5rem, 5vw, 4rem);
    align-items: end;
    padding-block: clamp(3rem, 7vw, 5rem);
    border-top: 1px solid var(--border-1);
  }

  .feature-intro h2 {
    max-width: 16ch;
    text-wrap: balance;
  }

  .feature-intro p {
    max-width: 34rem;
    font-size: clamp(1rem, 1.5vw, 1.12rem);
    line-height: 1.65;
  }

  /* Feature rows */

  .feature-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    align-items: center;
    gap: clamp(1.5rem, 5vw, 4rem);
    padding-block: clamp(2.5rem, 6vw, 4rem);
    border-top: 1px solid var(--border-1);
  }

  .feature-copy {
    display: grid;
    gap: 0.85rem;
    justify-items: start;
    max-width: 32rem;
  }

  .feature-copy h3 {
    font-size: clamp(1.6rem, 2.8vw, 2.2rem);
    text-wrap: balance;
  }

  .feature-copy p:not(.eyebrow) {
    line-height: 1.65;
  }

  .feature-copy a {
    margin-top: 0.25rem;
    color: var(--accent);
    font-weight: 600;
  }

  .feature-copy a:hover {
    color: var(--accent-soft);
  }

  .feature-art {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: var(--panel-tint);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
  }

  /* Focus ring */

  .eye-ring {
    position: absolute;
    left: 12%;
    top: 26%;
    width: 76%;
    height: 46%;
    border: 1.5px solid rgba(var(--accent-rgb), 0.7);
    border-radius: 50%;
  }

  .active-one { left: 24%; top: 34%; width: 26%; height: 20%; }
  .active-two { right: 22%; bottom: 30%; width: 24%; height: 18%; }
  .fading-one { right: 7%; top: 10%; width: 18%; height: 14%; opacity: 0.4; }

  /* Decay */

  .decay-active { left: 10%; top: 18%; width: 30%; height: 24%; }
  .decay-mid { left: 38%; top: 40%; width: 24%; height: 19%; opacity: 0.55; }
  .decay-node-one { right: 16%; top: 30%; }
  .decay-node-two { right: 30%; bottom: 20%; opacity: 0.6; }

  /* Clusters */

  .cluster-core {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1;
    width: 3.5rem;
    height: 3.5rem;
    background: var(--accent);
    border-radius: 999px;
    transform: translate(-50%, -50%);
  }

  .petal { width: 24%; height: 20%; }
  .petal-one { left: 16%; top: 20%; }
  .petal-two { right: 16%; top: 20%; }
  .petal-three { right: 16%; bottom: 20%; }
  .petal-four { left: 16%; bottom: 20%; }

  /* Bearings */

  .hud-frame {
    position: absolute;
    inset: 14%;
    border: 1px dashed var(--border-1);
    border-radius: var(--radius-md);
  }

  .arrow-n { left: 50%; top: 7%; transform: translateX(-50%); }
  .arrow-e { right: 4%; top: 50%; transform: translateY(-50%); }
  .arrow-s { left: 50%; bottom: 7%; transform: translateX(-50%); }

  .hud-window-one { left: 24%; top: 30%; width: 24%; height: 20%; }
  .hud-window-two { right: 24%; bottom: 28%; width: 22%; height: 18%; }

  /* Fields */

  .monitor-field {
    top: 24%;
    display: grid;
    place-items: center;
    width: 38%;
    height: 50%;
  }

  .monitor-field .art-node {
    position: static;
  }

  .field-left { left: 8%; }
  .field-right { right: 8%; }

  @media (max-width: 880px) {
    .home-shell {
      width: min(100% - 1.5rem, var(--page-max-width));
      padding-top: 5rem;
    }

    .hero-section,
    .feature-intro,
    .feature-row {
      grid-template-columns: 1fr;
    }

    .feature-row.reverse .feature-copy {
      order: 2;
    }
  }

  @media (max-width: 560px) {
    h1 {
      font-size: clamp(2.3rem, 11vw, 3rem);
    }

    .demo-node,
    .art-node {
      width: 1.4rem;
      height: 1.4rem;
    }

    .demo-bearing {
      font-size: 0.64rem;
    }
  }
</style>
