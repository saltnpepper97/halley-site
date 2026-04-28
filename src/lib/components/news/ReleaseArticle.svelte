<script lang="ts">
  import CodeBlock from "$lib/components/CodeBlock.svelte";
  import type { NewsPost } from "$lib/news/releases";

  let { post }: { post: NewsPost } = $props();
</script>

<article class="release-article">
  <section class="release-hero surface">
    <div class="hero-copy">
      <p class="eyebrow">{post.eyebrow}</p>
      <div class="title-row">
        <h1>{post.title}</h1>
        <span>{post.version}</span>
      </div>
      <p class="summary">{post.summary}</p>
    </div>

    <div class="orbit-badge" aria-hidden="true">
      <div class="orbit-ring ring-one"></div>
      <div class="orbit-ring ring-two"></div>
      <div class="release-core"></div>
      <div class="comet-orbit">
        <div class="release-comet"></div>
      </div>
    </div>
  </section>

  <section class="release-body surface">
    <div class="intro-copy">
      {#each post.intro as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>

    <section class="news-section" aria-labelledby="included-heading">
      <div class="section-heading">
        <p class="eyebrow">Included</p>
        <h2 id="included-heading">In This Release</h2>
      </div>

      <div class="feature-grid">
        {#each post.features as feature}
          <div class="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        {/each}
      </div>
    </section>

    <section class="news-section install-section" aria-labelledby="install-heading">
      <div class="section-heading">
        <p class="eyebrow">Installation</p>
        <h2 id="install-heading">Get {post.version}</h2>
      </div>

      <div class="install-grid">
        <div class="install-card">
          <h3>AUR</h3>
          {#each post.install.aur as command}
            <CodeBlock code={command} label="AUR" />
          {/each}
        </div>

        <div class="install-card">
          <h3>Development Version</h3>
          {#each post.install.aurDev as command}
            <CodeBlock code={command} label="dev package" />
          {/each}
        </div>

        <div class="install-card source-card">
          <h3>From Source</h3>
          <CodeBlock code={post.install.source} label="source build" />
        </div>
      </div>
    </section>

    <section class="news-section notes-section" aria-labelledby="notes-heading">
      <div>
        <p class="eyebrow">Notes</p>
        <h2 id="notes-heading">Still Growing</h2>
      </div>

      <ul>
        {#each post.notes as note}
          <li>{note}</li>
        {/each}
      </ul>
    </section>

    <section class="thanks-panel" aria-labelledby="thanks-heading">
      <div>
        <p class="eyebrow">Thanks</p>
        <h2 id="thanks-heading">To The Early Orbit</h2>
      </div>

      {#each post.thanks as paragraph}
        <p>{paragraph}</p>
      {/each}

      <strong>{post.closing}</strong>
    </section>
  </section>
</article>

<style>
  .release-article {
    display: grid;
    gap: clamp(1rem, 3vw, 1.5rem);
  }

  .release-hero {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(14rem, 0.36fr);
    align-items: center;
    gap: clamp(2rem, 6vw, 4rem);
    min-height: clamp(22rem, 46vh, 34rem);
    padding: clamp(1.5rem, 5vw, 4rem);
    background:
      radial-gradient(circle at 80% 18%, rgba(255, 106, 42, 0.24), transparent 18rem),
      radial-gradient(circle at 12% 90%, rgba(125, 220, 255, 0.11), transparent 20rem),
      rgba(16, 23, 34, 0.7);
  }

  .release-hero::before {
    position: absolute;
    inset: 1rem;
    pointer-events: none;
    content: "";
    border: 1px solid rgba(246, 239, 231, 0.06);
    border-radius: calc(var(--radius-xl) + 0.25rem);
  }

  .hero-copy {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 1rem;
  }

  .title-row {
    display: flex;
    flex-wrap: wrap;
    align-items: end;
    gap: 0.85rem 1rem;
  }

  h1 {
    font-size: clamp(3rem, 8vw, 7rem);
    letter-spacing: -0.065em;
  }

  .title-row span {
    margin-bottom: 0.6rem;
    padding: 0.35rem 0.7rem;
    color: #170b06;
    background: linear-gradient(135deg, var(--accent), var(--accent-soft));
    border-radius: 999px;
    font-family: var(--font-display);
    font-size: clamp(0.9rem, 2vw, 1.05rem);
    font-weight: 900;
  }

  .summary {
    max-width: 32rem;
    color: var(--text-1);
    font-size: clamp(1.25rem, 2.2vw, 1.7rem);
    font-weight: 750;
    line-height: 1.35;
  }

  .orbit-badge {
    position: relative;
    justify-self: center;
    width: min(19rem, 55vw);
    aspect-ratio: 1;
    filter: drop-shadow(0 0 34px rgba(255, 106, 42, 0.22));
  }

  .orbit-ring,
  .release-core,
  .comet-orbit,
  .release-comet {
    position: absolute;
    inset: 0;
    margin: auto;
  }

  .orbit-ring {
    border: 1px solid rgba(255, 106, 42, 0.36);
    border-radius: 50%;
  }

  .ring-one {
    width: 82%;
    height: 82%;
    box-shadow: 0 0 24px rgba(255, 106, 42, 0.12);
  }

  .ring-two {
    width: 58%;
    height: 58%;
    border-color: rgba(125, 220, 255, 0.24);
    animation: orbit-spin 18s linear infinite;
  }

  .release-core {
    width: 4.8rem;
    height: 4.8rem;
    background:
      radial-gradient(circle at 35% 28%, rgba(255, 155, 84, 0.48), transparent 45%),
      rgba(9, 13, 18, 0.9);
    border: 1px solid var(--accent);
    border-radius: 1.35rem;
    box-shadow:
      0 0 38px rgba(255, 106, 42, 0.42),
      inset 0 1px 0 rgba(246, 239, 231, 0.14);
    animation: core-pulse 4.4s ease-in-out infinite;
  }

  .comet-orbit {
    width: 82%;
    height: 82%;
    border-radius: 50%;
    animation: comet-loop 9s linear infinite;
  }

  .release-comet {
    inset: 0 0 auto;
    width: 0.9rem;
    height: 0.9rem;
    background: var(--accent-soft);
    border-radius: 999px;
    box-shadow:
      0 0 20px rgba(255, 155, 84, 0.9),
      -4rem 1rem 3.5rem rgba(255, 106, 42, 0.35);
    transform: translateY(-50%);
  }

  .release-body {
    display: grid;
    gap: clamp(1.5rem, 4vw, 2.5rem);
    padding: clamp(1.4rem, 4vw, 2.4rem);
    background: rgba(16, 23, 34, 0.76);
  }

  .intro-copy {
    display: grid;
    gap: 1rem;
    max-width: 62rem;
  }

  .intro-copy p,
  .thanks-panel p,
  li {
    font-size: clamp(1.02rem, 1.6vw, 1.16rem);
    line-height: 1.7;
  }

  .news-section {
    display: grid;
    gap: 1rem;
  }

  .section-heading {
    display: grid;
    gap: 0.35rem;
  }

  h2 {
    font-size: clamp(1.8rem, 4vw, 3rem);
    letter-spacing: -0.045em;
  }

  h3 {
    font-size: 1.05rem;
    letter-spacing: -0.025em;
  }

  .feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
    gap: 0.85rem;
  }

  .feature-card,
  .install-card,
  .thanks-panel {
    background: rgba(9, 13, 18, 0.52);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
  }

  .feature-card {
    display: grid;
    gap: 0.45rem;
    padding: 1rem;
    transition:
      border-color 160ms ease,
      transform 160ms ease,
      box-shadow 160ms ease;
  }

  .feature-card:hover {
    border-color: var(--border-2);
    box-shadow: var(--glow-1);
    transform: translateY(-2px);
  }

  .feature-card h3 {
    color: var(--accent-soft);
  }

  .install-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem;
  }

  .install-card {
    display: grid;
    gap: 0.65rem;
    align-content: start;
    padding: 1rem;
  }

  .source-card {
    grid-column: 1 / -1;
  }

  .notes-section ul {
    display: grid;
    gap: 0.65rem;
    margin: 0;
    padding-left: 1.2rem;
    color: var(--text-2);
  }

  li::marker {
    color: var(--accent-soft);
  }

  .thanks-panel {
    display: grid;
    gap: 0.85rem;
    padding: clamp(1rem, 3vw, 1.5rem);
    background:
      radial-gradient(circle at 88% 20%, rgba(255, 106, 42, 0.15), transparent 16rem),
      rgba(9, 13, 18, 0.52);
  }

  .thanks-panel strong {
    color: var(--text-1);
    font-family: var(--font-display);
    font-size: clamp(1.35rem, 3vw, 2.1rem);
    letter-spacing: -0.04em;
  }

  :global(:root[data-theme="light"]) .release-hero {
    background:
      radial-gradient(circle at 80% 18%, rgba(184, 63, 17, 0.08), transparent 18rem),
      radial-gradient(circle at 12% 90%, rgba(40, 95, 115, 0.06), transparent 20rem),
      rgba(255, 250, 244, 0.9);
  }

  :global(:root[data-theme="light"]) .release-hero::before {
    border-color: rgba(38, 27, 20, 0.11);
  }

  :global(:root[data-theme="light"]) .title-row span {
    color: #fffaf4;
  }

  :global(:root[data-theme="light"]) .release-core {
    background:
      radial-gradient(circle at 35% 28%, rgba(184, 63, 17, 0.22), transparent 45%),
      rgba(255, 250, 244, 0.92);
    border-color: rgba(184, 63, 17, 0.5);
    box-shadow:
      0 0 32px rgba(184, 63, 17, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.7);
  }

  :global(:root[data-theme="light"]) .release-body,
  :global(:root[data-theme="light"]) .feature-card,
  :global(:root[data-theme="light"]) .install-card,
  :global(:root[data-theme="light"]) .thanks-panel {
    background: rgba(255, 255, 255, 0.46);
    border-color: rgba(38, 27, 20, 0.13);
  }

  :global(:root[data-theme="light"]) .thanks-panel {
    background:
      radial-gradient(circle at 88% 20%, rgba(184, 63, 17, 0.07), transparent 16rem),
      rgba(255, 255, 255, 0.46);
  }

  @keyframes orbit-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes core-pulse {
    50% {
      transform: scale(1.06);
    }
  }

  @keyframes comet-loop {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 800px) {
    .release-hero {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    .orbit-badge {
      order: -1;
      width: min(15rem, 72vw);
    }

    .install-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 520px) {
    .release-hero,
    .release-body {
      padding: 1rem;
      border-radius: var(--radius-md);
    }

    h1 {
      font-size: clamp(2.35rem, 14vw, 3.4rem);
    }

    .summary {
      font-size: 1.08rem;
    }

    .orbit-badge {
      width: min(12rem, 66vw);
    }

    .feature-grid {
      grid-template-columns: 1fr;
    }

    .feature-card,
    .install-card,
    .thanks-panel {
      padding: 0.9rem;
      border-radius: var(--radius-md);
    }

  }

  @media (prefers-reduced-motion: reduce) {
    .ring-one,
    .ring-two,
    .release-core,
    .comet-orbit,
    .release-comet {
      animation: none;
    }
  }
</style>
