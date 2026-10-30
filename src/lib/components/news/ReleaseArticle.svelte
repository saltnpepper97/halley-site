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
    </div>

    <aside class="release-plate plate-{kindLabel.toLowerCase()}" aria-label="Release details">
      <div class="plate-head">
        <span class="plate-label">{isPreview ? "Status" : "Version"}</span>
        <span class="plate-kind">{kindLabel}</span>
      </div>
      <p class="plate-version">{isPreview ? "Upcoming" : post.version}</p>
      <p class="plate-date">
        <span class="plate-label">Published</span>
        <time datetime={post.date}>{formattedDate}</time>
      </p>
    </aside>
  </section>

  <section class="release-body surface">
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

    {#if post.thanks.length || post.closing}
      <section class="thanks-panel" aria-labelledby="thanks-heading">
        <div>
          <p class="eyebrow">Thanks</p>
          <h2 id="thanks-heading">To The Early Field</h2>
        </div>

        {#each post.thanks as paragraph}
          <p>{paragraph}</p>
        {/each}

        {#if post.closing}
          <strong>{post.closing}</strong>
        {/if}
      </section>
    {/if}
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
    grid-template-columns: minmax(0, 1fr) minmax(15rem, 17rem);
    align-items: start;
    gap: clamp(2rem, 6vw, 4rem);
    padding: clamp(1.5rem, 5vw, 4rem);
    background:
      rgba(16, 23, 34, 0.7);
  }


  .hero-copy {
    position: relative;
    z-index: 1;
    display: grid;
    gap: 1rem;
  }

  h1 {
    max-width: 14ch;
    text-wrap: balance;
  }

  .summary {
    max-width: 40rem;
    font-size: clamp(1.05rem, 1.6vw, 1.2rem);
    line-height: 1.6;
  }


  /*
    Release details. Version is the headline; the kind tag is the only
    coloured element, keyed off --plate-rgb.
  */
  .release-plate {
    --plate-rgb: var(--accent-rgb);
    position: relative;
    z-index: 1;
    align-self: start;
    display: grid;
    gap: 0.35rem;
    width: 100%;
    padding: 1.1rem 1.2rem 0;
    background: var(--chip-base);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
  }

  .plate-patch {
    --plate-rgb: var(--ion-rgb);
  }

  .plate-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .plate-label {
    color: var(--text-3);
    font-size: 0.8rem;
  }

  .plate-version {
    color: var(--text-1);
    font-family: var(--font-display);
    font-size: clamp(1.9rem, 3vw, 2.4rem);
    font-weight: 650;
    line-height: 1.1;
    letter-spacing: -0.03em;
  }

  .plate-preview .plate-version {
    font-size: 1.6rem;
  }

  .plate-date {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: 0.65rem -1.2rem 0;
    padding: 0.75rem 1.2rem;
    color: var(--text-1);
    font-size: 0.88rem;
    border-top: 1px solid var(--border-1);
  }

  .plate-kind {
    display: inline-block;
    padding: 0.15rem 0.55rem;
    color: rgb(var(--plate-rgb));
    background: rgba(var(--plate-rgb), 0.1);
    border: 1px solid rgba(var(--plate-rgb), 0.3);
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  /* Nothing has shipped yet, so the tag stays provisional. */
  .plate-preview .plate-kind {
    color: var(--text-2);
    background: transparent;
    border: 1px dashed var(--border-1);
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
    letter-spacing: -0.03em;
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
    align-content: start;
    padding: 1rem;
    transition:
      border-color 160ms ease,
      transform 160ms ease,
      box-shadow 160ms ease;
  }

  .feature-card:hover {
    border-color: var(--border-2);
    box-shadow: var(--glow-1);
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
      rgba(255, 250, 244, 0.9);
  }


  :global(:root[data-theme="light"]) .release-body,
  :global(:root[data-theme="light"]) .feature-card,
  :global(:root[data-theme="light"]) .thanks-panel {
    background: rgba(255, 255, 255, 0.46);
    border-color: rgba(38, 27, 20, 0.13);
  }

  :global(:root[data-theme="light"]) .thanks-panel {
    background:
      rgba(255, 255, 255, 0.46);
  }

  @media (max-width: 800px) {
    .release-hero {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    /* Compact strip above the title: version, kind, date on one line. */
    .release-plate {
      order: -1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem 0.75rem;
      padding: 0.6rem 0.9rem;
      border-radius: var(--radius-md);
    }

    .plate-head {
      order: 2;
    }

    .plate-label {
      display: none;
    }

    .plate-version {
      order: 1;
      font-size: 1.15rem;
    }

    .plate-preview .plate-version {
      font-size: 1.05rem;
    }

    .plate-date {
      order: 3;
      margin: 0 0 0 auto;
      padding: 0;
      color: var(--text-2);
      border: 0;
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
      font-size: clamp(2.1rem, 10vw, 2.8rem);
    }

    .summary {
      font-size: 1rem;
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
