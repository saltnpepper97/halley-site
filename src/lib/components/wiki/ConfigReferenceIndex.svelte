<script lang="ts">
  import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import { page as routePage } from "$app/state";
  import { configPageForVersion, type ConfigPage } from "$lib/wiki/config-reference";
  import { defaultWikiVersion, wikiVersionFromSearch } from "$lib/wiki/versions";

  let { pages }: { pages: ConfigPage[] } = $props();
  const withBase = (href: string) => `${base}${href}`;

  const activeVersion = () => browser ? wikiVersionFromSearch(routePage.url.searchParams) : defaultWikiVersion;
  const displayPages = () =>
    pages
      .map((page) => configPageForVersion(page, activeVersion().value))
      .filter((page) => page.sections.length > 0);

  const optionCount = (page: ConfigPage) =>
    page.sections.reduce((total, section) => total + section.options.length, 0);

  const versionedHref = (href: string) => {
    if (!browser) {
      return withBase(href);
    }

    const version = routePage.url.searchParams.get("version");
    return withBase(version ? `${href}?version=${encodeURIComponent(version)}` : href);
  };
</script>

<section class="config-index surface hud-corners">
  <div class="intro">
    <p class="eyebrow">Config Reference</p>
    <h1>Config Sections</h1>
    <p>
      Canonical hyphenated option names accepted by Halley's config loader. Each section has its own
      page with types, builtin defaults, and notes.
    </p>
  </div>

  <div class="section-grid">
    {#each displayPages() as page}
      <a class="section-card" href={versionedHref(`/wiki/config/${page.slug}`)}>
        <span class="card-accent" aria-hidden="true"></span>
        <div class="card-head">
          <code>{page.navLabel}</code>
          <span class="card-count">{optionCount(page)}</span>
        </div>
        <span class="card-summary">{page.summary}</span>
      </a>
    {/each}
  </div>
</section>

<style>
  .config-index {
    display: grid;
    gap: 1.25rem;
    min-width: 0;
    padding: clamp(1.2rem, 4vw, 2rem);
  }

  .intro {
    display: grid;
    gap: 0.75rem;
    max-width: 54rem;
  }

  h1 {
    font-size: clamp(2.1rem, 4vw, 3.4rem);
    letter-spacing: -0.04em;
  }

  .intro p:not(.eyebrow) {
    font-size: 1.05rem;
  }

  .section-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: 0.85rem;
  }

  .section-card {
    position: relative;
    display: grid;
    grid-template-rows: auto auto;
    gap: 0.6rem;
    min-width: 0;
    min-height: 8rem;
    padding: 1rem 1rem 1.05rem;
    overflow: hidden;
    background:
      linear-gradient(180deg, rgba(255, 155, 84, 0.045), rgba(9, 13, 18, 0) 55%),
      rgba(9, 13, 18, 0.5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease,
      transform 180ms ease;
  }

  .card-accent {
    position: absolute;
    inset: 0 0 auto 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-muted), var(--accent-soft) 45%, transparent);
    opacity: 0.55;
    transition: opacity 180ms ease;
  }

  .section-card:hover {
    color: var(--text-1);
    border-color: var(--border-2);
    box-shadow: var(--glow-1);
    transform: translateY(-2px);
  }

  .section-card:hover .card-accent {
    opacity: 1;
  }

  .card-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.6rem;
    /* Reserve room for two wrapped lines so every card's summary aligns. */
    min-height: 2.5em;
  }

  .section-card code {
    color: var(--accent-soft);
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-weight: 800;
    line-height: 1.25;
    overflow-wrap: anywhere;
    white-space: normal;
    word-break: break-word;
  }

  .card-count {
    flex: none;
    padding: 0.05rem 0.45rem;
    font-size: 0.72rem;
    font-variant-numeric: tabular-nums;
    color: var(--text-3);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-sm);
  }

  .card-summary {
    min-width: 0;
    padding-top: 0.55rem;
    border-top: 1px solid var(--border-1);
    color: var(--text-2);
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  @media (max-width: 560px) {
    .config-index {
      padding: 1rem;
      border-radius: var(--radius-md);
    }

    h1 {
      font-size: clamp(1.85rem, 10vw, 2.5rem);
    }

    .section-grid {
      grid-template-columns: 1fr;
    }

    .section-card {
      min-height: auto;
    }
  }
</style>
