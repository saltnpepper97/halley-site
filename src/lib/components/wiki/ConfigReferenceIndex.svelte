<script lang="ts">
  import { page as routePage } from "$app/state";
  import { configPageForVersion, type ConfigPage } from "$lib/wiki/config-reference";
  import { wikiVersionFromSearch } from "$lib/wiki/versions";

  let { pages }: { pages: ConfigPage[] } = $props();

  const activeVersion = () => wikiVersionFromSearch(routePage.url.searchParams);
  const displayPages = () =>
    pages
      .map((page) => configPageForVersion(page, activeVersion().value))
      .filter((page) => page.sections.length > 0);

  const versionedHref = (href: string) => {
    const version = routePage.url.searchParams.get("version");
    return version ? `${href}?version=${encodeURIComponent(version)}` : href;
  };
</script>

<section class="config-index surface">
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
        <code>{page.navLabel}</code>
        <span>{page.summary}</span>
      </a>
    {/each}
  </div>
</section>

<style>
  .config-index {
    display: grid;
    gap: 1.25rem;
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
    display: grid;
    gap: 0.55rem;
    min-height: 8rem;
    padding: 1rem;
    background: rgba(9, 13, 18, 0.5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .section-card:hover {
    color: var(--text-1);
    border-color: var(--border-2);
    box-shadow: var(--glow-1);
    transform: translateY(-2px);
  }

  .section-card code {
    color: var(--accent-soft);
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-weight: 800;
    overflow-wrap: anywhere;
  }

  .section-card span {
    color: var(--text-2);
    line-height: 1.4;
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
