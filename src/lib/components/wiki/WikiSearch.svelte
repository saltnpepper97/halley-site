<script lang="ts">
  import { MagnifyingGlassIcon } from "phosphor-svelte";
  import { goto } from "$app/navigation";
  import type { WikiNavItem } from "$lib/wiki/navigation";
  import { searchWiki, wikiSearchEntries } from "$lib/wiki/search";

  let { items, version, hrefFor, onselect }: {
    items: WikiNavItem[];
    version: string;
    hrefFor: (href: string) => string;
    onselect: () => void;
  } = $props();
  let query = $state("");
  const entries = $derived(wikiSearchEntries(items, version));
  const results = $derived(searchWiki(entries, query));
  const searching = $derived(query.trim().length > 0);
  const select = () => { query = ""; onselect(); };
  const handleKey = (event: KeyboardEvent) => {
    if (event.key === "Escape" && query) {
      event.stopPropagation();
      query = "";
    } else if (event.key === "Enter" && results.length) {
      event.preventDefault();
      const href = hrefFor(results[0].href);
      select();
      void goto(href);
    }
  };
</script>

<div class="wiki-search" role="search" aria-label="Wiki documentation">
  <label for="wiki-search-input">Search wiki</label>
  <div class="search-field">
    <span class="search-icon" aria-hidden="true"><MagnifyingGlassIcon size={18} weight="bold" /></span>
    <input id="wiki-search-input" type="search" placeholder="Config, IPC, commands…" bind:value={query}
      autocomplete="off" spellcheck="false" aria-describedby="wiki-search-status" onkeydown={handleKey} />
    {#if query}<button type="button" aria-label="Clear wiki search" onclick={() => query = ""}>×</button>{/if}
  </div>
  <p id="wiki-search-status" class="search-status" role="status">
    {#if searching}{results.length ? `${results.length} results in v${version}` : `No results in v${version}`}
    {:else}Search sections, settings, and commands.{/if}
  </p>
  {#if searching && results.length}
    <ul aria-label="Wiki search results">
      {#each results.slice(0, 20) as result (result.href)}
        <li><a href={hrefFor(result.href)} onclick={select}><strong>{result.label}</strong><span>{result.category}</span></a></li>
      {/each}
    </ul>
    {#if results.length > 20}<p class="search-status">Showing the first 20. Add another word to narrow your search.</p>{/if}
  {/if}
</div>

<style>
  .wiki-search { margin-bottom: 1rem; }
  label { display: block; margin-bottom: 0.4rem; color: var(--text-1); font-weight: 800; font-size: 0.9rem; }
  .search-field { position: relative; }
  .search-icon { position: absolute; left: 0.65rem; top: 50%; display: flex; transform: translateY(-50%); color: var(--text-3); pointer-events: none; }
  input { width: 100%; min-width: 0; min-height: 2.65rem; padding: 0.55rem 2.1rem 0.55rem 2.05rem; color: var(--text-1); background: var(--surface-1, rgba(128,128,128,0.08)); border: 1px solid var(--border-1); border-radius: var(--radius-sm); font: inherit; font-size: 0.88rem; }
  input:focus-visible, button:focus-visible, a:focus-visible { outline: 2px solid var(--accent-soft); outline-offset: 2px; }
  input::-webkit-search-cancel-button { display: none; }
  button { position: absolute; right: 0.25rem; top: 0.25rem; width: 2.1rem; height: 2.1rem; padding: 0; border: 0; border-radius: var(--radius-sm); background: transparent; color: var(--text-2); font-size: 1.3rem; cursor: pointer; }
  .search-status { margin: 0.4rem 0 0; font-size: 0.76rem; line-height: 1.4; color: var(--text-3); }
  ul { display: grid; gap: 0.2rem; padding: 0; margin: 0.65rem 0 0; list-style: none; max-height: 24rem; overflow-y: auto; }
  a { display: grid; gap: 0.2rem; padding: 0.6rem; border-radius: var(--radius-sm); overflow-wrap: anywhere; }
  a:hover { background: rgba(128,128,128,0.1); }
  strong { font-size: 0.9rem; color: var(--text-1); }
  span { font-size: 0.73rem; line-height: 1.35; color: var(--text-2); }
</style>
