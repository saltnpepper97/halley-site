<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import WikiSidebar from "$lib/components/wiki/WikiSidebar.svelte";
  import { wikiNavigationForVersion } from "$lib/wiki/navigation";
  import { defaultWikiVersion, wikiVersionFromSearch } from "$lib/wiki/versions";

  let { children } = $props();

  const activeVersion = () => browser ? wikiVersionFromSearch(page.url.searchParams) : defaultWikiVersion;
  const navigation = () => wikiNavigationForVersion(activeVersion().value);
</script>

<div class="wiki-page">
  <SiteHeader />

  <main class="wiki-shell">
    <WikiSidebar items={navigation()} />
    <div class="wiki-content">
      {@render children()}
    </div>
  </main>
</div>

<style>
  .wiki-page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  .wiki-shell {
    display: grid;
    grid-template-columns: minmax(13rem, 17rem) minmax(0, 1fr);
    align-items: start;
    gap: clamp(1rem, 3vw, 1.5rem);
    width: min(100% - 2rem, var(--page-max-width));
    min-width: 0;
    margin-inline: auto;
    padding: 1.25rem 0 max(8rem, 18vh);
  }

  .wiki-shell > * {
    min-width: 0;
  }

  .wiki-content {
    grid-column: 2;
    min-width: 0;
    max-width: 100%;
  }

  @media (max-width: 880px) {
    :global(.wiki-page .site-header) {
      display: none;
    }

    .wiki-shell {
      grid-template-columns: 1fr;
      width: min(100% - 1rem, var(--page-max-width));
      padding-top: 4.5rem;
      padding-bottom: 4rem;
    }

    .wiki-content {
      grid-column: auto;
    }
  }
</style>
