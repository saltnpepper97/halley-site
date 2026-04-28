<script lang="ts">
  import { browser } from "$app/environment";
  import { base } from "$app/paths";
  import { page } from "$app/state";
  import { CaretDownIcon } from "phosphor-svelte";
  import { defaultWikiVersion, wikiVersionFromSearch, wikiVersions } from "$lib/wiki/versions";

  const activeVersion = () => browser ? wikiVersionFromSearch(page.url.searchParams) : defaultWikiVersion;
  const withBase = (href: string) => `${base}${href}`;

  const versionHref = (value: string) => {
    if (!browser) {
      return withBase(`/?version=${encodeURIComponent(value)}`);
    }

    const nextUrl = new URL(page.url);
    nextUrl.searchParams.set("version", value);
    const pathname = base && nextUrl.pathname.startsWith(base)
      ? nextUrl.pathname.slice(base.length) || "/"
      : nextUrl.pathname;

    return withBase(`${pathname}?${nextUrl.searchParams.toString()}${nextUrl.hash}`);
  };
</script>

<section class="version-control" aria-label="Wiki version">
  <p class="version-label">Wiki version</p>

  <details class="version-picker">
    <summary>
      <span class="version-main">v{activeVersion().label}</span>
      <span class="version-status">{activeVersion().status}</span>
      <span class="chevron" aria-hidden="true">
        <CaretDownIcon color="currentColor" weight="bold" size={16} />
      </span>
    </summary>

    <div class="version-list">
      {#each wikiVersions as version}
        <a
          class:active={activeVersion().value === version.value}
          class="version-option"
          href={versionHref(version.value)}
        >
          <span>v{version.label}</span>
          <span>{version.status}</span>
        </a>
      {/each}
    </div>
  </details>
</section>

<style>
  .version-control {
    display: grid;
    gap: 0.45rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(246, 239, 231, 0.08);
  }

  .version-label {
    color: var(--text-3);
    font-family: var(--font-display);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .version-picker {
    position: relative;
  }

  summary {
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    gap: 0.55rem;
    min-height: 2.75rem;
    padding: 0.55rem 0.65rem;
    color: var(--text-1);
    cursor: pointer;
    list-style: none;
    background:
      linear-gradient(135deg, rgba(255, 106, 42, 0.16), transparent 58%),
      rgba(246, 239, 231, 0.045);
    border: 1px solid rgba(255, 106, 42, 0.2);
    border-radius: var(--radius-md);
  }

  summary::-webkit-details-marker {
    display: none;
  }

  .version-main {
    font-family: var(--font-display);
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  .version-status {
    color: var(--accent-soft);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .chevron {
    display: inline-flex;
    color: var(--text-3);
    transition: transform 160ms ease;
  }

  .version-picker[open] .chevron {
    transform: rotate(180deg);
  }

  .version-list {
    display: grid;
    gap: 0.25rem;
    margin-top: 0.45rem;
    padding: 0.35rem;
    background: rgba(9, 13, 18, 0.72);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-md);
  }

  .version-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.5rem 0.55rem;
    color: var(--text-2);
    border-radius: var(--radius-sm);
    font-weight: 750;
    transition:
      color 160ms ease,
      background 160ms ease;
  }

  .version-option span:last-child {
    color: var(--text-3);
    font-size: 0.7rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .version-option:hover,
  .version-option.active {
    color: var(--text-1);
    background: rgba(255, 106, 42, 0.12);
  }

  :global(:root[data-theme="light"]) .version-control {
    border-bottom-color: rgba(38, 27, 20, 0.11);
  }

  :global(:root[data-theme="light"]) summary {
    background:
      linear-gradient(135deg, rgba(184, 63, 17, 0.08), transparent 58%),
      rgba(255, 255, 255, 0.42);
    border-color: rgba(184, 63, 17, 0.24);
  }

  :global(:root[data-theme="light"]) .version-list {
    background: rgba(255, 255, 255, 0.5);
    border-color: rgba(38, 27, 20, 0.12);
  }

  @media (max-width: 520px) {
    .version-control {
      margin-bottom: 0.8rem;
      padding-bottom: 0.8rem;
    }

    summary {
      min-height: 2.5rem;
      padding: 0.5rem 0.58rem;
    }

    .version-status,
    .version-option span:last-child {
      font-size: 0.66rem;
    }
  }
</style>
