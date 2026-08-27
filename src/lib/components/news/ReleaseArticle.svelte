<script lang="ts">
  import InstallCard from "$lib/components/news/InstallCard.svelte";
  import { formatNewsDate, newsKindLabel, type NewsPost } from "$lib/news/releases";

  let { post }: { post: NewsPost } = $props();

  const isPreview = $derived(post.kind === "preview");
  const kindLabel = $derived(newsKindLabel(post));
  const formattedDate = $derived(formatNewsDate(post.date));
</script>

<article class="release-article">
  <section class="release-hero surface">
    <div class="hero-copy">
      <p class="eyebrow">{post.eyebrow}</p>
      <h1>{post.title}</h1>
      <p class="summary">{post.summary}</p>
      <p class="hero-date"><time datetime={post.date}>{formattedDate}</time></p>
    </div>

    <aside
      class="release-plate plate-{kindLabel.toLowerCase()}"
      aria-label={`${kindLabel}: ${isPreview ? "Upcoming" : post.version}, published ${formattedDate}`}
    >
      <div class="plate-readout">
        <span class="plate-label">{isPreview ? "Release status" : "Version"}</span>
        <span class="plate-version">{isPreview ? "Upcoming" : post.version}</span>
      </div>

      <div class="plate-footer">
        <span>Published</span>
        <time class="plate-date" datetime={post.date}>{formattedDate}</time>
      </div>
    </aside>
  </section>

  <section class="release-body surface hud-corners">
    <div class="intro-copy">
      {#each post.intro as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>

    {#if post.featureSections}
      {#each post.featureSections as featureSection, index}
        <section class="news-section" aria-labelledby={`feature-section-${index}`}>
          <div class="section-heading">
            <p class="eyebrow">{featureSection.eyebrow}</p>
            <h2 id={`feature-section-${index}`}>{featureSection.title}</h2>
            {#if featureSection.intro}
              <p class="section-intro">{featureSection.intro}</p>
            {/if}
          </div>

          <div class="feature-grid">
            {#each featureSection.features as feature}
              <div class="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            {/each}
          </div>
        </section>
      {/each}
    {:else if post.features}
      <section class="news-section" aria-labelledby="included-heading">
        <div class="section-heading">
          <p class="eyebrow">{isPreview ? "Preview" : "Included"}</p>
          <h2 id="included-heading">{isPreview ? "On The Horizon" : "In This Release"}</h2>
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
    {/if}

    {#if post.install}
      <section class="news-section install-section" aria-labelledby="install-heading">
        <div class="section-heading">
          <p class="eyebrow">Installation</p>
          <h2 id="install-heading">Get {post.version}</h2>
        </div>

        <div class="install-grid">
          <InstallCard title="AUR" label="AUR" commands={post.install.aur} />
          <InstallCard title="Development Version" label="dev package" commands={post.install.aurDev} />
          <InstallCard title="From Source" label="source build" code={post.install.source} wide />
        </div>
      </section>
    {/if}

    <section class="news-section notes-section" aria-labelledby="notes-heading">
      <div>
        <p class="eyebrow">Notes</p>
        <h2 id="notes-heading">{isPreview ? "What To Expect" : "Still Growing"}</h2>
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
        <h2 id="thanks-heading">To The Early Field</h2>
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

  h1 {
    font-size: clamp(3rem, 8vw, 7rem);
    letter-spacing: -0.065em;
  }

  .summary {
    max-width: 32rem;
    color: var(--text-1);
    font-size: clamp(1.25rem, 2.2vw, 1.7rem);
    font-weight: 750;
    line-height: 1.35;
  }

  .hero-date {
    color: var(--text-2);
    font-family: var(--font-mono);
    font-size: 0.86rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  /*
    Release plate. The identity is carried by --plate-rgb and the numeral; the
    box stays quiet. This previously stacked eight decoration layers (grid
    lines, a radial bloom, an outer border, a second inset border, a glowing
    underline, and a coloured outer glow) on one 17rem object.
  */
  .release-plate {
    --plate-rgb: var(--accent-rgb);
    position: relative;
    z-index: 1;
    align-self: start;
    justify-self: end;
    overflow: hidden;
    display: grid;
    width: min(17rem, 100%);
    background: rgba(var(--plate-rgb), 0.06);
    border: 1px solid rgba(var(--plate-rgb), 0.34);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1);
  }

  .plate-patch {
    --plate-rgb: var(--ion-rgb);
  }

  /* Nothing has shipped yet, so the box stays provisional. */
  .plate-preview {
    border-style: dashed;
  }

  .plate-readout {
    display: grid;
    gap: 0.34rem;
    padding: clamp(1.25rem, 4vw, 1.8rem) 1rem 1.25rem;
    text-align: center;
  }

  .plate-label {
    color: var(--text-2);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .plate-version {
    color: var(--text-1);
    font-family: var(--font-mono);
    font-size: clamp(2.25rem, 5vw, 3.2rem);
    font-weight: 850;
    letter-spacing: -0.065em;
    line-height: 0.95;
    text-shadow: 0 0 24px rgba(var(--plate-rgb), 0.2);
  }

  .plate-preview .plate-version {
    font-size: clamp(1.45rem, 3.6vw, 2rem);
    letter-spacing: -0.035em;
  }

  .plate-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.68rem 0.9rem 0.78rem;
    background: rgba(var(--plate-rgb), 0.05);
    border-top: 1px solid rgba(var(--plate-rgb), 0.18);
  }

  .plate-footer > span {
    color: var(--text-2);
    font-family: var(--font-mono);
    font-size: 0.66rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .plate-date {
    color: var(--text-2);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.03em;
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

  .section-intro {
    max-width: 56rem;
    color: var(--text-2);
    font-size: 1.02rem;
    line-height: 1.65;
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

  :global(:root[data-theme="light"]) .release-body,
  :global(:root[data-theme="light"]) .feature-card,
  :global(:root[data-theme="light"]) .thanks-panel {
    background: rgba(255, 255, 255, 0.46);
    border-color: rgba(38, 27, 20, 0.13);
  }

  :global(:root[data-theme="light"]) .thanks-panel {
    background:
      radial-gradient(circle at 88% 20%, rgba(184, 63, 17, 0.07), transparent 16rem),
      rgba(255, 255, 255, 0.46);
  }

  @media (max-width: 800px) {
    .release-hero {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    .release-plate {
      order: -1;
      justify-self: start;
      width: min(22rem, 100%);
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

    .release-plate {
      width: 100%;
    }

    .feature-grid {
      grid-template-columns: 1fr;
    }

    .feature-card,
    .thanks-panel {
      padding: 0.9rem;
      border-radius: var(--radius-md);
    }

  }
</style>
