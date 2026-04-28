<script lang="ts">
  import SiteHeader from "$lib/components/SiteHeader.svelte";
</script>

<svelte:head>
  <title>Halley | Spatial Wayland Compositor</title>
  <meta
    name="description"
    content="Halley is a spatial Wayland compositor with per-monitor fields, focus rings, decaying windows, nodes, clusters, and bearings."
  />
</svelte:head>

<div class="page-container">
  <div class="space-backdrop" aria-hidden="true"></div>

  <SiteHeader />

  <main class="home-shell" aria-labelledby="home-title">
    <section class="hero-section">
      <div class="hero-copy">
        <p class="eyebrow">Wayland compositor</p>
        <h1 id="home-title">Periodic. Precise. Returning.</h1>
        <p class="lede">Windows as nodes, displays as fields, clusters as deliberate workspaces.</p>

        <div class="hero-actions" aria-label="Primary actions">
          <a class="primary-action" href="/wiki/install">Install Halley</a>
          <a class="secondary-action" href="/wiki">Read the wiki</a>
        </div>
      </div>

      <section class="video-shell" aria-labelledby="demo-heading">
        <div class="video-topbar">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="video-stage">
          <div class="demo-field" aria-hidden="true">
            <div class="demo-focus-ring"></div>
            <div class="demo-window window-a"></div>
            <div class="demo-window window-b"></div>
            <div class="demo-node node-a"></div>
            <div class="demo-node node-b"></div>
            <div class="demo-bearing bearing-left">W 420</div>
            <div class="demo-bearing bearing-right">E 180</div>
          </div>

          <div class="play-callout">
            <button type="button" aria-label="Demo video coming soon">
              <span></span>
            </button>
            <div>
              <h2 id="demo-heading">Demo video coming soon</h2>
              <p>A guided walkthrough will live here: fields, focus ring, nodes, clusters, and bearings in motion.</p>
            </div>
          </div>
        </div>

        <div class="video-controls" aria-hidden="true">
          <span class="control-play"></span>
          <div class="control-track"><span></span></div>
          <span class="control-time">00:00 / soon</span>
        </div>
      </section>
    </section>

    <section class="feature-intro" aria-labelledby="features-heading">
      <p class="eyebrow">How Halley thinks</p>
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
        <a href="/wiki/config/viewport#viewport-connector-focus-ring">Configure focus rings</a>
      </div>
    </section>

    <section class="feature-row reverse" aria-labelledby="nodes-heading">
      <div class="feature-copy">
        <p class="eyebrow">Decay and Nodes</p>
        <h2 id="nodes-heading">Windows can drift out of focus without disappearing.</h2>
        <p>
          Halley lets inactive or offscreen windows decay into compact nodes. The field keeps their
          location and identity, but reduces visual noise until you need them again.
        </p>
        <a href="/wiki/config/node">Tune node behavior</a>
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

    <section class="feature-row" aria-labelledby="clusters-heading">
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
        <a href="/wiki/config/clusters">Explore cluster settings</a>
      </div>
    </section>

    <section class="feature-row reverse" aria-labelledby="bearings-heading">
      <div class="feature-copy">
        <p class="eyebrow">Bearings</p>
        <h2 id="bearings-heading">A HUD for finding your way back.</h2>
        <p>
          Bearings are directional cues for spatial navigation. They behave like a lightweight game HUD,
          pointing toward useful context when the field is bigger than the visible monitor.
        </p>
        <a href="/wiki/config/bearings">Adjust bearings</a>
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

    <section class="feature-row final-row" aria-labelledby="fields-heading">
      <div class="feature-art fields-art" aria-hidden="true">
        <div class="monitor-field field-left"></div>
        <div class="monitor-field field-right"></div>
        <div class="field-node field-node-one"></div>
        <div class="field-node field-node-two"></div>
        <div class="field-jump"></div>
      </div>

      <div class="feature-copy">
        <p class="eyebrow">Per-monitor Fields</p>
        <h2 id="fields-heading">Each display gets its own world.</h2>
        <p>
          Multi-monitor is not an afterthought. Each output has its own field, camera, focus behavior,
          and cluster slots, so moving between displays feels deliberate instead of chaotic.
        </p>
        <a href="/wiki/config/viewport">Set up monitors</a>
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

  .space-backdrop {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    background:
      radial-gradient(circle at 12% 6%, rgba(255, 106, 42, 0.24), transparent 28rem),
      radial-gradient(circle at 88% 18%, rgba(125, 220, 255, 0.15), transparent 26rem),
      radial-gradient(circle at 50% 104%, rgba(124, 108, 255, 0.14), transparent 32rem),
      linear-gradient(180deg, rgba(4, 7, 12, 0.16), rgba(4, 7, 12, 0.72));
  }

  .space-backdrop::before,
  .space-backdrop::after {
    position: absolute;
    inset: -20%;
    content: "";
    background-image:
      radial-gradient(circle, rgba(246, 239, 231, 0.46) 0 0.8px, transparent 1.25px),
      radial-gradient(circle, rgba(125, 220, 255, 0.3) 0 0.9px, transparent 1.35px);
    background-position:
      0 0,
      3.7rem 4.9rem;
    background-size:
      7rem 7rem,
      11rem 11rem;
    opacity: 0.36;
    animation: dust-drift 95s linear infinite;
  }

  .space-backdrop::after {
    background-size:
      10rem 10rem,
      15rem 15rem;
    opacity: 0.24;
    animation-duration: 140s;
    animation-direction: reverse;
  }

  .home-shell {
    display: grid;
    gap: clamp(1.25rem, 4vw, 2rem);
    width: min(100% - 2rem, var(--page-max-width));
    margin-inline: auto;
    padding: clamp(2.5rem, 7vw, 5.5rem) 0 clamp(4rem, 9vw, 7rem);
  }

  .hero-section,
  .feature-intro,
  .feature-row {
    position: relative;
    overflow: hidden;
    background:
      linear-gradient(135deg, rgba(246, 239, 231, 0.07), transparent 34%),
      rgba(16, 23, 34, 0.68);
    border: 1px solid var(--border-1);
    border-radius: calc(var(--radius-xl) + 0.45rem);
    box-shadow: var(--shadow-1), inset 0 1px 0 rgba(246, 239, 231, 0.08);
    backdrop-filter: blur(16px);
  }

  .hero-section {
    display: grid;
    grid-template-columns: minmax(0, 0.92fr) minmax(19rem, 1.08fr);
    align-items: center;
    gap: clamp(1.5rem, 5vw, 4rem);
    min-height: clamp(34rem, 70vh, 48rem);
    padding: clamp(1.25rem, 4vw, 3rem);
  }

  .hero-section::after,
  .feature-row::after {
    position: absolute;
    inset: auto -8rem -16rem auto;
    width: 28rem;
    height: 28rem;
    pointer-events: none;
    content: "";
    background: radial-gradient(circle, rgba(125, 220, 255, 0.13), transparent 68%);
    border-radius: 999px;
  }

  .hero-copy,
  .video-shell,
  .feature-copy,
  .feature-art,
  .feature-intro > * {
    position: relative;
    z-index: 1;
  }

  .hero-copy {
    display: grid;
    gap: 1rem;
    max-width: 42rem;
  }

  h1 {
    max-width: 11ch;
    text-wrap: balance;
  }

  .lede {
    max-width: 36rem;
    color: var(--text-2);
    font-size: clamp(1.12rem, 2vw, 1.5rem);
    line-height: 1.45;
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
    padding: 0.65rem 0.95rem;
    border-radius: 999px;
    font-weight: 850;
    transition:
      border-color 160ms ease,
      background 160ms ease,
      color 160ms ease,
      transform 160ms ease;
  }

  .primary-action {
    color: #170b06;
    background: linear-gradient(135deg, var(--accent), var(--accent-soft));
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

  .video-shell {
    min-width: 0;
    overflow: hidden;
    background: rgba(3, 6, 10, 0.82);
    border: 1px solid rgba(246, 239, 231, 0.09);
    border-radius: var(--radius-xl);
    box-shadow:
      0 28px 80px rgba(0, 0, 0, 0.34),
      0 0 56px rgba(255, 106, 42, 0.12),
      inset 0 1px 0 rgba(246, 239, 231, 0.05);
  }

  .video-topbar,
  .video-controls {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.75rem 0.9rem;
    background: rgba(246, 239, 231, 0.045);
    border-bottom: 1px solid rgba(246, 239, 231, 0.06);
  }

  .video-topbar span {
    width: 0.62rem;
    height: 0.62rem;
    background: var(--text-3);
    border-radius: 999px;
  }

  .video-topbar span:first-child {
    background: var(--accent);
  }

  .video-topbar span:nth-child(2) {
    background: var(--accent-soft);
  }

  .video-topbar span:nth-child(3) {
    background: var(--ion);
  }

  .video-stage {
    position: relative;
    display: grid;
    place-items: center;
    min-height: clamp(18rem, 38vw, 30rem);
    padding: clamp(1rem, 3vw, 2rem);
  }

  .demo-field {
    position: absolute;
    inset: 1rem;
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
    border: 1px solid rgba(246, 239, 231, 0.06);
    border-radius: var(--radius-lg);
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
    border-radius: 0.55rem;
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.28);
  }

  .window-a { left: 27%; top: 33%; width: 22%; height: 17%; }
  .window-b { left: 48%; top: 51%; width: 19%; height: 14%; opacity: 0.85; }

  .demo-node,
  .decay-node,
  .field-node {
    position: absolute;
    width: 2.2rem;
    height: 2.2rem;
    background: rgba(255, 106, 42, 0.18);
    border: 1px solid rgba(255, 155, 84, 0.4);
    border-radius: 0.6rem;
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
    border-radius: 999px;
    font-family: var(--font-display);
    font-size: 0.72rem;
    font-weight: 800;
  }

  .bearing-left { left: 1rem; top: 46%; }
  .bearing-right { right: 1rem; top: 32%; }

  .play-callout {
    position: relative;
    display: grid;
    justify-items: center;
    gap: 1rem;
    max-width: 25rem;
    padding: 1.25rem;
    text-align: center;
    background: rgba(3, 6, 10, 0.54);
    border: 1px solid rgba(246, 239, 231, 0.08);
    border-radius: var(--radius-lg);
    backdrop-filter: blur(10px);
  }

  .play-callout button {
    display: grid;
    place-items: center;
    width: 4.6rem;
    height: 4.6rem;
    padding: 0;
    background: linear-gradient(135deg, var(--accent), var(--accent-soft));
    border: 0;
    border-radius: 999px;
    box-shadow: 0 0 42px rgba(255, 106, 42, 0.36);
  }

  .play-callout button span {
    width: 0;
    height: 0;
    margin-left: 0.2rem;
    border-top: 0.65rem solid transparent;
    border-bottom: 0.65rem solid transparent;
    border-left: 1rem solid #170b06;
  }

  .play-callout h2 {
    font-size: clamp(1.25rem, 2vw, 1.7rem);
    letter-spacing: -0.035em;
  }

  .play-callout p {
    font-size: 0.98rem;
  }

  .video-controls {
    border-top: 1px solid rgba(246, 239, 231, 0.06);
    border-bottom: 0;
  }

  .control-play {
    width: 0;
    height: 0;
    border-top: 0.38rem solid transparent;
    border-bottom: 0.38rem solid transparent;
    border-left: 0.58rem solid var(--text-1);
  }

  .control-track {
    flex: 1 1 auto;
    height: 0.42rem;
    overflow: hidden;
    background: rgba(246, 239, 231, 0.1);
    border-radius: 999px;
  }

  .control-track span {
    display: block;
    width: 18%;
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--ion));
    border-radius: inherit;
  }

  .control-time {
    color: var(--text-3);
    font-size: 0.78rem;
    font-weight: 800;
    white-space: nowrap;
  }

  .feature-intro {
    display: grid;
    gap: 0.8rem;
    max-width: 100%;
    padding: clamp(1.25rem, 4vw, 2.5rem);
  }

  .feature-intro h2 {
    max-width: 15ch;
    font-size: clamp(2rem, 5vw, 4rem);
  }

  .feature-intro p:not(.eyebrow) {
    max-width: 55rem;
    font-size: clamp(1.02rem, 1.8vw, 1.22rem);
  }

  .feature-row {
    display: grid;
    grid-template-columns: minmax(18rem, 0.9fr) minmax(0, 1fr);
    align-items: center;
    gap: clamp(1.25rem, 5vw, 4rem);
    min-height: clamp(24rem, 48vw, 35rem);
    padding: clamp(1.25rem, 4vw, 3rem);
  }

  .feature-row.reverse {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.9fr);
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

  :global(:root[data-theme="light"]) .video-topbar,
  :global(:root[data-theme="light"]) .video-controls {
    background: rgba(38, 27, 20, 0.055);
    border-color: rgba(38, 27, 20, 0.11);
  }

  :global(:root[data-theme="light"]) .play-callout {
    background: rgba(255, 250, 244, 0.72);
    border-color: rgba(38, 27, 20, 0.14);
    box-shadow: 0 14px 36px rgba(54, 37, 26, 0.12);
  }

  :global(:root[data-theme="light"]) .control-track {
    background: rgba(38, 27, 20, 0.12);
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
    border-radius: 999px;
    font-family: var(--font-display);
    font-size: 0.78rem;
    font-weight: 850;
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

  .field-jump {
    position: absolute;
    left: 42%;
    top: 44%;
    width: 16%;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--ion));
    border-radius: 999px;
    box-shadow: 0 0 24px rgba(125, 220, 255, 0.24);
  }

  .field-jump::after {
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
    .feature-row,
    .feature-row.reverse {
      grid-template-columns: 1fr;
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
  }

  @media (max-width: 560px) {
    .hero-section,
    .feature-intro,
    .feature-row {
      border-radius: var(--radius-lg);
      padding: 1rem;
    }

    h1 {
      font-size: clamp(2.45rem, 14vw, 3.8rem);
    }

    .lede {
      font-size: 1rem;
    }

    .video-stage,
    .feature-art {
      min-height: 13.5rem;
    }

    .feature-art {
      background-size: 1.55rem 1.55rem;
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
    :global(:root[data-theme="light"]) .monitor-field,
    :global(:root[data-theme="light"]) .demo-window {
      background: rgba(92, 68, 51, 0.18);
      border-color: rgba(65, 45, 32, 0.18);
      box-shadow: 0 10px 24px rgba(83, 54, 33, 0.1);
    }

    .control-time {
      display: none;
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
      border-radius: 0.48rem;
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
    .field-jump { left: 42%; top: 45%; width: 16%; }
  }

  @media (max-width: 380px) {
    .feature-art {
      min-height: 12rem;
    }

    .cluster-petal {
      width: 3.8rem;
      height: 2.45rem;
    }

    .play-callout {
      padding: 0.9rem;
    }

    .play-callout button {
      width: 3.6rem;
      height: 3.6rem;
    }
  }

  @keyframes dust-drift {
    from { transform: translate3d(0, 0, 0); }
    to { transform: translate3d(-8rem, 10rem, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .space-backdrop::before,
    .space-backdrop::after {
      animation: none;
    }
  }
</style>
