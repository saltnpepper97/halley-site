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
        <h1 id="home-title">
          <span>Periodic.</span>
          <span class="title-flare">Precise.</span>
          <span>Returning.</span>
        </h1>
        <p class="lede">Windows as nodes, displays as fields, clusters as deliberate workspaces.</p>
        <a class="release-link" href={withBase("/news/halley-rewritten")}>
          <span>Current</span>
          Halley v0.6.0 — rewritten
        </a>

        <div class="hero-actions" aria-label="Primary actions">
          <a class="primary-action" href={withBase("/wiki/install")}>Install Halley</a>
          <a class="secondary-action" href={withBase("/wiki")}>Read the wiki</a>
        </div>

        <dl class="hero-telemetry" aria-label="Halley at a glance">
          <div><dt>Version</dt><dd>0.6 current</dd></div>
          <div><dt>Protocol</dt><dd>Wayland</dd></div>
          <div><dt>Model</dt><dd>Spatial</dd></div>
        </dl>
      </div>

      <div class="hero-scene">
        <div class="scene-orbit orbit-near" aria-hidden="true"></div>
        <div class="scene-orbit orbit-far" aria-hidden="true"></div>
        <div class="demo-field" aria-hidden="true">
          <div class="demo-focus-ring"></div>
          <div class="demo-window window-a" data-label="ACTIVE"></div>
          <div class="demo-window window-b" data-label="RETURNING"></div>
          <div class="demo-node node-a"></div>
          <div class="demo-node node-b"></div>
          <div class="demo-bearing bearing-left">W 420</div>
          <div class="demo-bearing bearing-right">E 180</div>
          <div class="demo-reticle"></div>
        </div>

        <span class="coord scene-readout readout-tl" aria-hidden="true">Field 01</span>
        <span class="coord scene-readout readout-tr" aria-hidden="true">Zoom 1.0×</span>

        <p class="scene-caption">
          <span class="scene-live" aria-hidden="true"></span>
          Field model — focus, decay, bearings.
        </p>
      </div>
    </section>

    <div class="hud-divider" aria-hidden="true"><span>Field Systems</span></div>

    <section class="feature-intro hud-corners" aria-labelledby="features-heading">
      <div>
        <p class="eyebrow">How Halley thinks</p>
        <h2 id="features-heading">The desktop is a field, not a stack of boxes.</h2>
      </div>
      <p class="feature-intro-copy">
        Halley keeps spatial context visible. Instead of hiding everything behind workspaces, it lets
        windows live on per-monitor fields, decay when they leave attention, and gather into clusters
        you intentionally build.
      </p>
    </section>

    <section class="feature-row system-focus" aria-labelledby="focus-ring-heading">
      <span class="system-index" aria-hidden="true">01</span>
      <div class="feature-art focus-art" aria-hidden="true">
        <div class="eye-ring"></div>
        <div class="eye-core"></div>
        <div class="art-window active-one"></div>
        <div class="art-window active-two"></div>
        <div class="art-window fading-one"></div>
        <div class="art-measure measure-x"></div>
        <div class="art-measure measure-y"></div>
      </div>

      <div class="feature-copy">
        <p class="eyebrow">Focus Ring</p>
        <h2 id="focus-ring-heading">An adjustable attention zone.</h2>
        <p>
          The focus ring is an eye-shaped region on each field. Windows inside it stay prominent;
          windows outside it can begin to fade, collapse, or wait for you to return.
        </p>
        <a href={withBase("/wiki/config/viewport#viewport-connector-focus-ring")}>Configure focus rings</a>
      </div>
    </section>

    <section class="feature-row system-nodes reverse" aria-labelledby="nodes-heading">
      <span class="system-index" aria-hidden="true">02</span>
      <div class="feature-copy">
        <p class="eyebrow">Decay and Nodes</p>
        <h2 id="nodes-heading">Windows can drift out of focus without disappearing.</h2>
        <p>
          Halley lets inactive or offscreen windows decay into compact nodes. The field keeps their
          location and identity, but reduces visual noise until you need them again.
        </p>
        <a href={withBase("/wiki/config/node")}>Tune node behavior</a>
      </div>

      <div class="feature-art node-art" aria-hidden="true">
        <div class="decay-window decay-active"></div>
        <div class="decay-window decay-mid"></div>
        <div class="decay-node decay-node-one"></div>
        <div class="decay-node decay-node-two"></div>
        <div class="decay-line line-one"></div>
        <div class="decay-line line-two"></div>
      </div>
    </section>

    <section class="feature-row system-clusters" aria-labelledby="clusters-heading">
      <span class="system-index" aria-hidden="true">03</span>
      <div class="feature-art cluster-art" aria-hidden="true">
        <div class="cluster-core"></div>
        <div class="cluster-petal petal-one"></div>
        <div class="cluster-petal petal-two"></div>
        <div class="cluster-petal petal-three"></div>
        <div class="cluster-petal petal-four"></div>
        <div class="cluster-orbit orbit-one"></div>
        <div class="cluster-orbit orbit-two"></div>
      </div>

      <div class="feature-copy">
        <p class="eyebrow">Clusters</p>
        <h2 id="clusters-heading">Workspaces you create on purpose.</h2>
        <p>
          Clusters gather related windows into a core that can reopen into tiling or stacking layouts.
          They are spatial, visible, and per-monitor instead of hidden behind abstract workspace numbers.
        </p>
        <a href={withBase("/wiki/config/clusters")}>Explore cluster settings</a>
      </div>
    </section>

    <section class="feature-row system-bearings reverse" aria-labelledby="bearings-heading">
      <span class="system-index" aria-hidden="true">04</span>
      <div class="feature-copy">
        <p class="eyebrow">Bearings</p>
        <h2 id="bearings-heading">A HUD for finding your way back.</h2>
        <p>
          Bearings are directional cues for spatial navigation. They behave like a lightweight game HUD,
          pointing toward useful context when the field is bigger than the visible monitor.
        </p>
        <a href={withBase("/wiki/config/bearings")}>Adjust bearings</a>
      </div>

      <div class="feature-art bearings-art" aria-hidden="true">
        <div class="hud-frame"></div>
        <div class="hud-reticle"></div>
        <div class="hud-arrow arrow-n">N 960</div>
        <div class="hud-arrow arrow-e">E 320</div>
        <div class="hud-arrow arrow-s">S 540</div>
        <div class="hud-dot dot-one"></div>
        <div class="hud-dot dot-two"></div>
      </div>
    </section>

    <section class="feature-row system-fields final-row" aria-labelledby="fields-heading">
      <span class="system-index" aria-hidden="true">05</span>
      <div class="feature-art fields-art" aria-hidden="true">
        <div class="monitor-field field-left"></div>
        <div class="monitor-field field-right"></div>
        <div class="field-node field-node-one"></div>
        <div class="field-node field-node-two"></div>
        <div class="field-link"></div>
      </div>

      <div class="feature-copy">
        <p class="eyebrow">Per-monitor Fields</p>
        <h2 id="fields-heading">Each display gets its own world.</h2>
        <p>
          Multi-monitor is not an afterthought. Each output has its own field, camera, focus behavior,
          and cluster slots, so moving between displays feels deliberate instead of chaotic.
        </p>
        <a href={withBase("/wiki/config/viewport")}>Set up monitors</a>
      </div>
    </section>
  </main>
</div>

<style>
  .page-container {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  .home-shell {
    display: grid;
    gap: clamp(1.5rem, 5vw, 3.75rem);
    width: min(100% - 2rem, var(--page-max-width));
    margin-inline: auto;
    padding: clamp(2.5rem, 7vw, 5.5rem) 0 clamp(4rem, 9vw, 7rem);
  }

  .home-shell :global(.hud-divider) {
    margin-block: clamp(0.75rem, 2vw, 1.5rem);
  }

  .hero-section,
  .feature-intro,
  .feature-row {
    position: relative;
    overflow: hidden;
    background:
      var(--panel-hairline) 0 0 / 100% 2px no-repeat,
      var(--panel-sheen),
      var(--panel-tint);
    border: 1px solid var(--border-1);
    border-top-color: var(--hud-line-faint);
    border-radius: var(--radius-xl);
    box-shadow:
      var(--shadow-1),
      inset 0 1px 0 var(--hud-line-soft),
      inset 0 -1px 0 rgba(0, 0, 0, 0.3);
    backdrop-filter: var(--panel-blur);
    -webkit-backdrop-filter: var(--panel-blur);
  }

  .hero-section {
    --panel-tint: rgba(9, 15, 25, 0.7);
    display: grid;
    grid-template-columns: minmax(0, 0.92fr) minmax(19rem, 1.08fr);
    align-items: center;
    gap: clamp(2rem, 6vw, 4.75rem);
    min-height: clamp(38rem, 76vh, 53rem);
    padding: clamp(1.25rem, 4vw, 3rem);
  }

  /*
    The hero sits lighter than the site's other panels so the field reads
    through the first thing anyone sees. Stated per theme — a bare --panel-tint
    here would override the light palette and render this card dark on cream.
  */
  :global(:root[data-theme="light"]) .hero-section {
    --panel-tint: rgba(253, 249, 243, 0.78);
  }

  .hero-copy,
  .hero-scene,
  .feature-copy,
  .feature-art,
  .feature-intro > * {
    position: relative;
    z-index: 1;
  }

  .hero-copy {
    display: grid;
    gap: 1.1rem;
    max-width: 42rem;
  }

  h1 {
    display: grid;
    max-width: 10ch;
    font-size: clamp(3.5rem, 7.2vw, 6.7rem);
    text-wrap: balance;
  }

  h1 span {
    display: block;
  }

  .title-flare {
    width: max-content;
    max-width: 100%;
    color: transparent;
    background: linear-gradient(105deg, var(--accent-soft) 5%, var(--accent) 50%, #ffd2b5 92%);
    background-clip: text;
    -webkit-background-clip: text;
    filter: drop-shadow(0 0 24px rgba(255, 106, 42, 0.18));
  }

  :global(:root[data-theme="light"]) .title-flare {
    background: linear-gradient(105deg, var(--accent-soft) 5%, var(--accent) 55%, var(--accent-deep) 96%);
    background-clip: text;
    -webkit-background-clip: text;
  }

  .lede {
    max-width: 36rem;
    color: var(--text-2);
    font-size: clamp(1.12rem, 2vw, 1.5rem);
    line-height: 1.45;
  }

  .release-link {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    justify-self: start;
    padding: 0.4rem 0.7rem 0.4rem 0.42rem;
    color: var(--accent-soft);
    background: rgba(255, 106, 42, 0.09);
    border: 1px solid rgba(255, 106, 42, 0.24);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    transition:
      border-color 180ms ease,
      background 180ms ease,
      transform 220ms var(--ease-out);
  }

  .release-link span {
    padding: 0.2rem 0.38rem;
    color: var(--on-accent);
    background: var(--accent);
    border-radius: calc(var(--radius-sm) - 1px);
    font-size: 0.62rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .release-link:hover {
    color: var(--text-1);
    background: rgba(255, 106, 42, 0.14);
    border-color: var(--border-2);
    transform: translateY(-1px);
  }

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.35rem;
  }

  .primary-action,
  .secondary-action,
  .feature-copy a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 2.75rem;
    padding: 0.65rem 1.1rem;
    border-radius: var(--radius-md);
    font-weight: 800;
    transition:
      border-color 160ms ease,
      background 160ms ease,
      color 160ms ease,
      box-shadow 180ms ease,
      transform 240ms var(--ease-out);
  }

  .primary-action {
    color: var(--on-accent);
    background: linear-gradient(135deg, var(--accent), var(--accent-soft));
    box-shadow: 0 12px 30px rgba(255, 106, 42, 0.2);
  }

  .secondary-action,
  .feature-copy a {
    color: var(--text-1);
    background: rgba(246, 239, 231, 0.05);
    border: 1px solid rgba(246, 239, 231, 0.09);
  }

  .primary-action:hover,
  .secondary-action:hover,
  .feature-copy a:hover {
    color: var(--text-1);
    border-color: var(--border-2);
    transform: translateY(-2px);
  }

  .primary-action:hover {
    color: var(--on-accent);
    box-shadow: 0 18px 40px rgba(255, 106, 42, 0.28);
  }

  .hero-telemetry {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
    margin: 0.45rem 0 0;
    padding: 0;
    background: rgba(2, 5, 9, 0.28);
    border: 1px solid rgba(125, 220, 255, 0.11);
    border-radius: var(--radius-md);
  }

  .hero-telemetry div {
    display: grid;
    gap: 0.1rem;
    min-width: 0;
    padding: 0.65rem 0.8rem;
  }

  .hero-telemetry div + div {
    border-left: 1px solid rgba(125, 220, 255, 0.11);
  }

  .hero-telemetry dt,
  .hero-telemetry dd {
    margin: 0;
  }

  .hero-telemetry dt {
    color: var(--text-3);
    font-family: var(--font-mono);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .hero-telemetry dd {
    overflow: hidden;
    color: var(--text-1);
    font-family: var(--font-display);
    font-size: 0.84rem;
    font-weight: 750;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .hero-scene {
    position: relative;
    min-width: 0;
    min-height: clamp(20rem, 42vw, 31rem);
    padding: 0.9rem;
    overflow: hidden;
    background: rgba(3, 6, 10, 0.82);
    border: 1px solid var(--hud-line-faint);
    border-radius: var(--radius-xl);
    box-shadow:
      0 28px 80px rgba(0, 0, 0, 0.4),
      0 0 56px rgba(255, 106, 42, 0.1),
      inset 0 1px 0 var(--hud-line-soft);
    transform: rotate(1.2deg);
    transition:
      border-color 220ms ease,
      box-shadow 220ms ease,
      transform 400ms var(--ease-out);
  }

  .hero-section:hover .hero-scene {
    border-color: rgba(125, 220, 255, 0.28);
    box-shadow:
      0 34px 90px rgba(0, 0, 0, 0.46),
      0 0 72px rgba(255, 106, 42, 0.14),
      inset 0 1px 0 var(--hud-line-soft);
    transform: rotate(0deg) translateY(-3px);
  }

  .scene-orbit {
    position: absolute;
    z-index: 1;
    pointer-events: none;
    border: 1px solid rgba(125, 220, 255, 0.14);
    border-radius: 50%;
  }

  .orbit-near {
    left: 7%;
    top: 17%;
    width: 82%;
    height: 58%;
    transform: rotate(-12deg);
  }

  .orbit-far {
    left: 22%;
    top: 9%;
    width: 58%;
    height: 74%;
    border-color: rgba(255, 106, 42, 0.13);
    transform: rotate(31deg);
  }

  .scene-readout {
    position: absolute;
    z-index: 2;
  }

  .readout-tl {
    top: 0.9rem;
    left: 0.9rem;
  }

  .readout-tr {
    top: 0.9rem;
    right: 0.9rem;
  }

  .scene-caption {
    position: absolute;
    z-index: 2;
    right: 0.9rem;
    bottom: 0.9rem;
    left: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    color: var(--text-2);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    letter-spacing: 0.02em;
  }

  .scene-live {
    flex: none;
    width: 0.5rem;
    height: 0.5rem;
    background: var(--accent);
    border-radius: 999px;
    box-shadow: 0 0 12px rgba(255, 106, 42, 0.8);
    animation: scene-pulse 2.4s ease-in-out infinite;
  }

  @keyframes scene-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.78); }
  }

  .demo-field {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background:
      linear-gradient(rgba(246, 239, 231, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(246, 239, 231, 0.025) 1px, transparent 1px),
      radial-gradient(circle at 38% 48%, rgba(255, 106, 42, 0.12), transparent 15rem),
      rgba(9, 13, 18, 0.7);
    background-size:
      2.5rem 2.5rem,
      2.5rem 2.5rem,
      auto,
      auto;
    border: 0;
    border-radius: inherit;
  }

  .demo-field::after,
  .feature-art::after {
    position: absolute;
    inset: 0;
    pointer-events: none;
    content: "";
    background: repeating-linear-gradient(
      180deg,
      transparent 0,
      transparent 4px,
      rgba(255, 255, 255, 0.012) 5px
    );
    mix-blend-mode: screen;
  }

  .demo-focus-ring {
    position: absolute;
    left: 18%;
    top: 24%;
    width: 52%;
    height: 38%;
    border: 2px solid rgba(255, 155, 84, 0.68);
    border-radius: 50%;
    box-shadow:
      0 0 36px rgba(255, 106, 42, 0.22),
      inset 0 0 34px rgba(255, 106, 42, 0.08);
    transform: rotate(-5deg);
  }

  .demo-window,
  .demo-node,
  .art-window,
  .decay-window,
  .cluster-petal,
  .monitor-field {
    position: absolute;
    background: rgba(246, 239, 231, 0.08);
    border: 1px solid rgba(246, 239, 231, 0.13);
    border-radius: var(--radius-sm);
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.28);
  }

  .demo-window {
    background:
      linear-gradient(180deg, rgba(125, 220, 255, 0.11) 0 1.15rem, transparent 1.15rem),
      rgba(10, 17, 27, 0.94);
    border-color: rgba(125, 220, 255, 0.24);
  }

  .demo-window::before {
    position: absolute;
    top: 0.48rem;
    left: 0.55rem;
    width: 0.28rem;
    height: 0.28rem;
    content: "";
    background: var(--accent);
    border-radius: 999px;
    box-shadow: 0 0 9px rgba(255, 106, 42, 0.75);
  }

  .demo-window::after {
    position: absolute;
    right: 0.5rem;
    bottom: 0.35rem;
    content: attr(data-label);
    color: rgba(125, 220, 255, 0.56);
    font-family: var(--font-mono);
    font-size: 0.46rem;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  :global(:root[data-theme="light"]) .demo-window {
    background:
      linear-gradient(180deg, rgba(40, 95, 115, 0.14) 0 1.15rem, transparent 1.15rem),
      rgba(255, 255, 255, 0.68);
    border-color: rgba(40, 95, 115, 0.34);
    box-shadow:
      0 16px 34px rgba(83, 54, 33, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 0.72);
  }

  :global(:root[data-theme="light"]) .demo-window::after {
    color: rgba(40, 95, 115, 0.76);
  }

  .window-a { left: 24%; top: 31%; width: 25%; height: 19%; animation: window-drift 7s ease-in-out infinite; }
  .window-b { left: 48%; top: 52%; width: 21%; height: 16%; opacity: 0.85; animation: window-drift 8s ease-in-out -3s infinite reverse; }

  .demo-node,
  .decay-node,
  .field-node {
    position: absolute;
    width: 2.2rem;
    height: 2.2rem;
    background: rgba(255, 106, 42, 0.18);
    border: 1px solid rgba(255, 155, 84, 0.4);
    border-radius: var(--radius-sm);
    box-shadow: 0 0 24px rgba(255, 106, 42, 0.12);
  }

  .node-a { left: 75%; top: 25%; }
  .node-b { left: 12%; top: 70%; opacity: 0.7; }

  .demo-bearing {
    position: absolute;
    padding: 0.25rem 0.45rem;
    color: var(--ion);
    background: rgba(125, 220, 255, 0.08);
    border: 1px solid rgba(125, 220, 255, 0.18);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
  }

  .bearing-left { left: 1rem; top: 46%; }
  .bearing-right { right: 1rem; top: 32%; }

  .demo-reticle {
    position: absolute;
    left: 52%;
    top: 37%;
    z-index: 2;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid rgba(125, 220, 255, 0.42);
    border-radius: 999px;
    box-shadow: 0 0 20px rgba(125, 220, 255, 0.12);
  }

  .demo-reticle::before,
  .demo-reticle::after {
    position: absolute;
    content: "";
    background: rgba(125, 220, 255, 0.42);
  }

  .demo-reticle::before { top: 50%; left: -0.5rem; right: -0.5rem; height: 1px; }
  .demo-reticle::after { top: -0.5rem; bottom: -0.5rem; left: 50%; width: 1px; }

  @keyframes window-drift {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(0.35rem, -0.4rem, 0); }
  }

  .feature-intro {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(18rem, 0.75fr);
    align-items: end;
    gap: clamp(1.5rem, 6vw, 5rem);
    max-width: 100%;
    padding: clamp(2rem, 6vw, 4.5rem) clamp(1rem, 4vw, 3rem);
    overflow: visible;
    background: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;
    backdrop-filter: none;
  }

  .feature-intro h2 {
    max-width: 15ch;
    font-size: clamp(2rem, 5vw, 4rem);
  }

  .feature-intro p:not(.eyebrow) {
    max-width: 55rem;
    font-size: clamp(1.02rem, 1.8vw, 1.22rem);
  }

  .feature-intro-copy {
    padding-left: 1.25rem;
    border-left: 2px solid rgba(125, 220, 255, 0.22);
  }

  .feature-row {
    --system-rgb: 255, 106, 42;
    display: grid;
    grid-template-columns: minmax(18rem, 0.9fr) minmax(0, 1fr);
    align-items: center;
    gap: clamp(1.25rem, 5vw, 4rem);
    min-height: clamp(24rem, 48vw, 35rem);
    padding: clamp(1.25rem, 4vw, 3rem);
    background:
      linear-gradient(90deg, transparent, rgba(var(--system-rgb), 0.74), transparent) 0 0 / 100% 2px no-repeat,
      radial-gradient(circle at 12% 18%, rgba(var(--system-rgb), 0.14), transparent 24rem),
      linear-gradient(145deg, rgba(125, 220, 255, 0.045), transparent 46%),
      rgba(8, 14, 23, 0.9);
    transition:
      border-color 220ms ease,
      box-shadow 220ms ease,
      transform 320ms var(--ease-out);
  }

  .feature-row:hover {
    border-color: rgba(var(--system-rgb), 0.28);
    box-shadow:
      0 30px 85px rgba(0, 0, 0, 0.52),
      0 0 54px rgba(var(--system-rgb), 0.08),
      inset 0 1px 0 rgba(var(--system-rgb), 0.18);
    transform: translateY(-4px);
  }

  .system-focus,
  .system-fields {
    width: 96%;
  }

  .system-nodes,
  .system-bearings {
    width: 96%;
    justify-self: end;
    --system-rgb: 125, 220, 255;
  }

  .system-clusters {
    --system-rgb: 255, 155, 84;
  }

  .system-fields {
    justify-self: center;
    --system-rgb: 125, 220, 255;
  }

  :global(:root[data-theme="light"]) .feature-row {
    background:
      linear-gradient(90deg, transparent, rgba(var(--system-rgb), 0.58), transparent) 0 0 / 100% 2px no-repeat,
      radial-gradient(circle at 12% 18%, rgba(var(--system-rgb), 0.08), transparent 24rem),
      linear-gradient(145deg, rgba(40, 95, 115, 0.04), transparent 46%),
      rgba(255, 250, 244, 0.9);
  }

  :global(:root[data-theme="light"]) .hero-telemetry {
    background: rgba(255, 255, 255, 0.34);
    border-color: rgba(40, 95, 115, 0.16);
  }

  :global(:root[data-theme="light"]) .hero-telemetry div + div {
    border-left-color: rgba(40, 95, 115, 0.16);
  }

  .system-index {
    position: absolute;
    top: clamp(1.25rem, 3vw, 2rem);
    right: clamp(1.4rem, 3vw, 2.2rem);
    z-index: 1;
    color: rgba(var(--system-rgb), 0.16);
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 6.5rem);
    font-weight: 800;
    line-height: 0.8;
    letter-spacing: -0.08em;
    pointer-events: none;
    user-select: none;
  }

  .feature-row.reverse .system-index {
    right: auto;
    left: clamp(1.4rem, 3vw, 2.2rem);
  }

  .feature-row.reverse {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.9fr);
  }

  @media (min-width: 881px) {
    .system-nodes .feature-copy {
      padding-top: 3.5rem;
    }
  }

  .feature-copy {
    display: grid;
    gap: 0.85rem;
    max-width: 34rem;
  }

  .feature-copy h2 {
    font-size: clamp(1.85rem, 4vw, 3.2rem);
    letter-spacing: -0.05em;
    text-wrap: balance;
  }

  .feature-copy p:not(.eyebrow) {
    font-size: clamp(1rem, 1.55vw, 1.12rem);
    line-height: 1.65;
  }

  .feature-copy a {
    justify-self: start;
    min-height: 2.45rem;
    margin-top: 0.2rem;
  }

  .feature-art {
    position: relative;
    min-height: clamp(17rem, 34vw, 26rem);
    overflow: hidden;
    background:
      linear-gradient(rgba(246, 239, 231, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(246, 239, 231, 0.025) 1px, transparent 1px),
      rgba(3, 6, 10, 0.5);
    background-size: 2.2rem 2.2rem;
    border: 1px solid rgba(246, 239, 231, 0.08);
    border-radius: var(--radius-xl);
    box-shadow: inset 0 1px 0 rgba(246, 239, 231, 0.04);
    transform: rotate(-1deg);
    transition:
      border-color 220ms ease,
      box-shadow 220ms ease,
      transform 360ms var(--ease-out);
  }

  .reverse .feature-art {
    transform: rotate(1deg);
  }

  .feature-row:hover .feature-art {
    border-color: rgba(var(--system-rgb), 0.26);
    box-shadow:
      inset 0 1px 0 rgba(246, 239, 231, 0.06),
      0 20px 52px rgba(0, 0, 0, 0.26);
    transform: rotate(0deg) scale(1.01);
  }

  .eye-ring {
    position: absolute;
    left: 13%;
    top: 28%;
    width: 74%;
    height: 42%;
    border: 2px solid rgba(255, 155, 84, 0.76);
    border-radius: 50%;
    box-shadow:
      0 0 48px rgba(255, 106, 42, 0.22),
      inset 0 0 44px rgba(255, 106, 42, 0.08);
  }

  :global(:root[data-theme="light"]) .hero-scene {
    background: rgba(231, 221, 210, 0.6);
    border-color: var(--hud-line-faint);
    box-shadow:
      0 28px 80px rgba(54, 37, 26, 0.14),
      0 0 56px rgba(184, 63, 17, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }

  :global(:root[data-theme="light"]) .scene-caption {
    color: var(--text-2);
  }

  .eye-core {
    position: absolute;
    left: 45%;
    top: 43%;
    width: 3.2rem;
    height: 3.2rem;
    background: radial-gradient(circle, rgba(255, 155, 84, 0.52), rgba(255, 106, 42, 0.08));
    border-radius: 999px;
    filter: blur(0.2px);
  }

  .active-one { left: 24%; top: 33%; width: 7rem; height: 4.5rem; }
  .active-two { right: 23%; bottom: 28%; width: 6.4rem; height: 4rem; }
  .fading-one { right: 8%; top: 13%; width: 5rem; height: 3.2rem; opacity: 0.36; }

  .art-measure {
    position: absolute;
    background: rgba(125, 220, 255, 0.5);
    border-radius: 999px;
  }

  .measure-x { left: 18%; right: 18%; bottom: 15%; height: 1px; }
  .measure-y { top: 17%; bottom: 17%; left: 12%; width: 1px; }

  .decay-active { left: 12%; top: 18%; width: 8rem; height: 5rem; }
  .decay-mid { left: 40%; top: 37%; width: 6.6rem; height: 4.2rem; opacity: 0.55; }
  .decay-node-one { right: 18%; top: 30%; }
  .decay-node-two { right: 32%; bottom: 20%; opacity: 0.75; }

  .decay-line {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg, rgba(255, 106, 42, 0.55), transparent);
    transform-origin: left center;
  }

  .line-one { left: 31%; top: 38%; width: 35%; transform: rotate(11deg); }
  .line-two { left: 54%; top: 55%; width: 25%; transform: rotate(-18deg); }

  .cluster-core {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    width: 4.2rem;
    height: 4.2rem;
    background: linear-gradient(135deg, rgba(255, 106, 42, 0.95), rgba(255, 155, 84, 0.78));
    border-radius: 999px;
    box-shadow: 0 0 44px rgba(255, 106, 42, 0.28);
    transform: translate(-50%, -50%) rotate(8deg);
  }

  .cluster-petal {
    z-index: 1;
    width: 6.5rem;
    height: 4.1rem;
  }

  .petal-one { left: 17%; top: 25%; transform: rotate(-12deg); }
  .petal-two { right: 15%; top: 24%; transform: rotate(13deg); }
  .petal-three { right: 17%; bottom: 22%; transform: rotate(-9deg); }
  .petal-four { left: 16%; bottom: 21%; transform: rotate(10deg); }

  .cluster-orbit {
    position: absolute;
    left: 50%;
    top: 50%;
    border: 1px solid rgba(125, 220, 255, 0.18);
    border-radius: 999px;
    transform: translate(-50%, -50%) rotate(-14deg);
  }

  .orbit-one { width: 62%; height: 46%; }
  .orbit-two { width: 78%; height: 58%; border-color: rgba(255, 106, 42, 0.16); transform: translate(-50%, -50%) rotate(21deg); }

  .hud-frame {
    position: absolute;
    inset: 13%;
    border: 1px solid rgba(125, 220, 255, 0.22);
    border-radius: var(--radius-lg);
  }

  .hud-reticle {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5.8rem;
    height: 5.8rem;
    border: 1px solid rgba(255, 155, 84, 0.48);
    border-radius: 999px;
    transform: translate(-50%, -50%);
  }

  .hud-reticle::before,
  .hud-reticle::after {
    position: absolute;
    content: "";
    background: rgba(255, 155, 84, 0.5);
  }

  .hud-reticle::before { left: 50%; top: -1.4rem; bottom: -1.4rem; width: 1px; }
  .hud-reticle::after { top: 50%; left: -1.4rem; right: -1.4rem; height: 1px; }

  .hud-arrow {
    position: absolute;
    padding: 0.34rem 0.55rem;
    color: var(--ion);
    background: rgba(125, 220, 255, 0.08);
    border: 1px solid rgba(125, 220, 255, 0.18);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    font-weight: 700;
  }

  .arrow-n { left: 44%; top: 11%; }
  .arrow-e { right: 8%; top: 46%; }
  .arrow-s { left: 42%; bottom: 11%; }

  .hud-dot {
    position: absolute;
    width: 0.75rem;
    height: 0.75rem;
    background: var(--accent-soft);
    border-radius: 999px;
    box-shadow: 0 0 20px rgba(255, 106, 42, 0.55);
  }

  .dot-one { left: 27%; top: 35%; }
  .dot-two { right: 28%; bottom: 30%; }

  .monitor-field {
    top: 24%;
    width: 38%;
    height: 42%;
    background:
      radial-gradient(circle at 45% 48%, rgba(255, 106, 42, 0.12), transparent 7rem),
      rgba(246, 239, 231, 0.055);
  }

  .field-left { left: 8%; }
  .field-right { right: 8%; }
  .field-node-one { left: 23%; top: 40%; }
  .field-node-two { right: 24%; top: 42%; background: rgba(125, 220, 255, 0.16); border-color: rgba(125, 220, 255, 0.34); }

  .field-link {
    position: absolute;
    left: 42%;
    top: 44%;
    width: 16%;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--ion));
    border-radius: 999px;
    box-shadow: 0 0 24px rgba(125, 220, 255, 0.24);
  }

  .field-link::after {
    position: absolute;
    right: -0.2rem;
    top: 50%;
    width: 0.6rem;
    height: 0.6rem;
    content: "";
    border-top: 2px solid var(--ion);
    border-right: 2px solid var(--ion);
    transform: translateY(-50%) rotate(45deg);
  }

  @media (max-width: 880px) {
    .home-shell {
      width: min(100% - 1rem, var(--page-max-width));
      padding-top: 1.5rem;
    }

    .hero-section,
    .feature-intro,
    .feature-row,
    .feature-row.reverse {
      grid-template-columns: 1fr;
    }

    .system-focus,
    .system-nodes,
    .system-clusters,
    .system-bearings,
    .system-fields {
      width: 100%;
      justify-self: stretch;
    }

    .hero-scene,
    .hero-section:hover .hero-scene {
      transform: none;
    }

    .feature-row.reverse .feature-copy {
      order: 2;
    }

    .feature-row.reverse .feature-art {
      order: 1;
    }

    .feature-copy {
      max-width: 100%;
    }

    .feature-intro-copy {
      max-width: 42rem;
    }

    .feature-art {
      background:
        radial-gradient(circle at 50% 45%, rgba(255, 106, 42, 0.08), transparent 68%),
        rgba(3, 6, 10, 0.5);
      background-size: auto;
    }

    :global(:root[data-theme="light"]) .feature-art {
      background:
        radial-gradient(circle at 50% 45%, rgba(184, 63, 17, 0.06), transparent 68%),
        rgba(255, 250, 244, 0.38);
      border-color: rgba(65, 45, 32, 0.14);
    }
  }

  @media (max-width: 560px) {
    .hero-section,
    .feature-row {
      border-radius: var(--radius-lg);
      padding: 1rem;
    }

    .feature-intro {
      padding: 1.5rem 0.35rem;
    }

    h1 {
      font-size: clamp(2.45rem, 14vw, 3.8rem);
    }

    .lede {
      font-size: 1rem;
    }

    .hero-scene,
    .feature-art {
      min-height: 13.5rem;
    }

    .hero-telemetry div {
      padding-inline: 0.55rem;
    }

    .hero-telemetry dd {
      font-size: 0.72rem;
    }

    .feature-art {
      border-radius: var(--radius-lg);
    }

    .art-window,
    .decay-window,
    .cluster-petal,
    .monitor-field {
      background: rgba(18, 24, 32, 0.5);
      border-color: rgba(255, 155, 84, 0.2);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
    }

    .demo-window {
      background: rgba(9, 13, 18, 0.5);
      border-color: rgba(246, 239, 231, 0.12);
    }

    .cluster-petal {
      background: rgba(12, 18, 26, 0.54);
    }

    :global(:root[data-theme="light"]) .art-window,
    :global(:root[data-theme="light"]) .decay-window,
    :global(:root[data-theme="light"]) .cluster-petal,
    :global(:root[data-theme="light"]) .monitor-field {
      background: rgba(92, 68, 51, 0.18);
      border-color: rgba(65, 45, 32, 0.18);
      box-shadow: 0 10px 24px rgba(83, 54, 33, 0.1);
    }

    :global(:root[data-theme="light"]) .demo-window {
      background:
        linear-gradient(180deg, rgba(40, 95, 115, 0.14) 0 1.15rem, transparent 1.15rem),
        rgba(255, 255, 255, 0.66);
      border-color: rgba(40, 95, 115, 0.34);
      box-shadow: 0 10px 24px rgba(83, 54, 33, 0.1);
    }

    .feature-intro h2,
    .feature-copy h2 {
      font-size: clamp(1.75rem, 10vw, 2.45rem);
    }

    .cluster-petal {
      width: 4.4rem;
      height: 2.8rem;
    }

    .eye-ring {
      left: 10%;
      top: 31%;
      width: 80%;
      height: 36%;
    }

    .eye-core {
      left: 45%;
      top: 42%;
      width: 2.25rem;
      height: 2.25rem;
    }

    .active-one {
      left: 18%;
      top: 33%;
      width: 4.6rem;
      height: 3rem;
    }

    .active-two {
      right: 16%;
      bottom: 31%;
      width: 4.2rem;
      height: 2.65rem;
    }

    .fading-one,
    .measure-y,
    .line-two,
    .cluster-orbit {
      display: none;
    }

    .decay-active {
      left: 9%;
      top: 24%;
      width: 5rem;
      height: 3.25rem;
    }

    .decay-mid {
      left: 35%;
      top: 42%;
      width: 4.6rem;
      height: 3rem;
    }

    .decay-node,
    .field-node,
    .demo-node {
      width: 1.75rem;
      height: 1.75rem;
      border-radius: var(--radius-sm);
    }

    .decay-node-one {
      right: 14%;
      top: 33%;
    }

    .decay-node-two {
      right: 25%;
      bottom: 22%;
    }

    .line-one {
      left: 31%;
      top: 43%;
      width: 43%;
    }

    .cluster-core {
      width: 3.35rem;
      height: 3.35rem;
      border-radius: 999px;
    }

    .petal-one { left: 10%; top: 24%; }
    .petal-two { right: 10%; top: 25%; }
    .petal-three { right: 12%; bottom: 23%; }
    .petal-four { left: 11%; bottom: 24%; }

    .hud-frame {
      inset: 10%;
    }

    .hud-reticle {
      width: 4.2rem;
      height: 4.2rem;
    }

    .hud-arrow {
      padding: 0.26rem 0.42rem;
      font-size: 0.68rem;
    }

    .arrow-n { left: 39%; top: 9%; }
    .arrow-e { right: 5%; top: 46%; }
    .arrow-s { left: 39%; bottom: 9%; }

    .monitor-field {
      top: 27%;
      width: 39%;
      height: 37%;
    }

    .field-left { left: 6%; }
    .field-right { right: 6%; }
    .field-node-one { left: 23%; top: 42%; }
    .field-node-two { right: 23%; top: 42%; }
    .field-link { left: 42%; top: 45%; width: 16%; }
  }

  @media (max-width: 380px) {
    .feature-art {
      min-height: 12rem;
    }

    .cluster-petal {
      width: 3.8rem;
      height: 2.45rem;
    }

    .scene-caption {
      font-size: 0.7rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scene-live,
    .window-a,
    .window-b {
      animation: none;
    }

    .hero-scene,
    .hero-section:hover .hero-scene,
    .feature-row,
    .feature-row:hover,
    .feature-art,
    .feature-row:hover .feature-art {
      transform: none;
      transition-duration: 0.01ms;
    }
  }

</style>
