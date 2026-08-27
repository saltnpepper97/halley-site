<script lang="ts">
  import { browser } from "$app/environment";
  import { page as routePage } from "$app/state";
  import CodeBlock from "$lib/components/CodeBlock.svelte";
  import ConfigOptionsTable from "$lib/components/wiki/ConfigOptionsTable.svelte";
  import { configPageForVersion, type ConfigPage } from "$lib/wiki/config-reference";
  import { defaultWikiVersion, wikiVersionFromSearch } from "$lib/wiki/versions";

  let { page }: { page: ConfigPage } = $props();

  const activeVersion = () => browser ? wikiVersionFromSearch(routePage.url.searchParams) : defaultWikiVersion;
  const displayPage = () => configPageForVersion(page, activeVersion().value);
</script>

<article class="config-section surface hud-corners">
  <header class="section-header">
    <p class="eyebrow">Config Reference</p>
    <h1><code>{displayPage().title}</code></h1>
    <p>{displayPage().summary}</p>
  </header>

  <div class="note-card">
    <strong>Defaults</strong>
    <p>Defaults shown here are the effective built-in defaults for the selected wiki version.</p>
  </div>

  <section class="example-section" aria-labelledby="default-config-heading">
    <div class="example-heading">
      <h2 id="default-config-heading">Default Config Shape</h2>
      <p>Use this as the section shape when editing <code>halley.rune</code>.</p>
    </div>

    <CodeBlock code={displayPage().example} label={`${displayPage().title} config`} />
  </section>

  {#each displayPage().sections as section}
    <section id={section.slug} class="option-section">
      {#if displayPage().sections.length > 1}
        <div class="option-heading">
          <h2><code>{section.name}</code></h2>
          <p>{section.summary}</p>
        </div>
      {/if}

      <ConfigOptionsTable options={section.options} />
    </section>
  {/each}
</article>

<style>
  .config-section {
    display: grid;
    gap: 1.1rem;
    padding: clamp(1.2rem, 4vw, 2rem);
  }

  .section-header {
    display: grid;
    gap: 0.7rem;
    max-width: 52rem;
  }

  h1 {
    font-size: clamp(2rem, 4vw, 3.2rem);
    letter-spacing: -0.04em;
    overflow-wrap: anywhere;
  }

  h2 {
    font-size: clamp(1.25rem, 2vw, 1.75rem);
    letter-spacing: -0.03em;
  }

  h1 code,
  h2 code {
    color: var(--text-1);
    font-family: inherit;
    overflow-wrap: anywhere;
  }

  .section-header p:not(.eyebrow) {
    font-size: 1.05rem;
  }

  .note-card {
    display: grid;
    gap: 0.25rem;
    padding: 0.9rem 1rem;
    background: rgba(255, 106, 42, 0.08);
    border: 1px solid rgba(255, 106, 42, 0.18);
    border-radius: var(--radius-md);
  }

  .note-card strong {
    color: var(--accent-soft);
    font-family: var(--font-display);
  }

  .example-section {
    display: grid;
    gap: 0.75rem;
  }

  .example-heading {
    display: grid;
    gap: 0.25rem;
  }

  .example-heading h2 {
    font-size: clamp(1.2rem, 2vw, 1.55rem);
  }

  .example-heading p {
    font-size: 0.98rem;
  }

  .example-heading code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  }

  .option-section {
    display: grid;
    gap: 0.8rem;
    scroll-margin-top: calc(var(--header-height) + 2rem);
  }

  .option-heading {
    display: grid;
    gap: 0.35rem;
  }

  @media (max-width: 560px) {
    .config-section {
      padding: 1rem;
      border-radius: var(--radius-md);
    }

    h1 {
      font-size: clamp(1.75rem, 10vw, 2.35rem);
    }

  }
</style>
