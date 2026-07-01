<script lang="ts">
  import { base } from "$app/paths";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import CodeBlock from "$lib/components/CodeBlock.svelte";
  import { ArrowLeftIcon } from "phosphor-svelte";

  const withBase = (href: string) => `${base}${href}`;

  const aurLift = `yay -S halley-lift
paru -S halley-lift`;
  const runLift = "halley-lift";
  const seedLift = "halley-lift cluster release";
  const configPath = "~/.config/halley/lift.rune";

  const modes = [
    { prefix: "app", note: "Installed applications from .desktop entries." },
    { prefix: "cluster", note: "Clusters, plus staging apps and nodes into a draft." },
    { prefix: "node", note: "Running windows and nodes across the field." },
    { prefix: "action", note: "Compositor actions exposed over IPC." },
    { prefix: "config", note: "Jump into config values by name." },
    { prefix: "term", note: "Run a command in your terminal through $SHELL." }
  ];
</script>

<svelte:head>
  <title>Halley Lift | Ecosystem</title>
  <meta
    name="description"
    content="Halley Lift is a compositor-integrated command palette for apps, nodes, clusters, actions, config search, and cluster drafts."
  />
</svelte:head>

<div class="lift-page">
  <SiteHeader />

  <main class="lift-shell">
    <a class="back-link" href={withBase("/ecosystem")}>
      <ArrowLeftIcon color="currentColor" weight="bold" size={16} /> Ecosystem
    </a>

    <section class="lift-hero surface">
      <p class="eyebrow">Ecosystem · Command palette</p>
      <h1>Halley Lift</h1>
      <p class="lede">
        Lift is a standalone command palette for Halley. It talks to the compositor over Halley's
        existing IPC APIs, so a single launcher can search apps, running nodes, clusters, actions,
        and config — and even assemble clusters — without leaving the field.
      </p>
    </section>

    <article class="lift-card">
      <div>
        <p class="card-kicker">Install</p>
        <h2>Get Lift</h2>
        <p>
          Lift ships as its own <code>halley-lift</code> package for users who only want the palette.
          It is also included in the <a class="inline-link" href={withBase("/ecosystem")}>halley-full</a>
          bundle.
        </p>
      </div>
      <CodeBlock code={aurLift} label="lift package" />
      <p>Run it with no arguments, or seed an initial query to open straight into a mode.</p>
      <CodeBlock code={runLift} label="run" />
      <CodeBlock code={seedLift} label="seeded query" />
    </article>

    <article class="lift-card">
      <div>
        <p class="card-kicker">Search modes</p>
        <h2>One field, every provider</h2>
        <p>
          Lift searches everything by default. Prefixing a query with a provider name filters the
          results without turning the text into a badge, so the full query stays visible and editable.
        </p>
      </div>

      <div class="mode-table">
        {#each modes as mode}
          <div class="mode-row">
            <code class="mode-prefix">{mode.prefix}</code>
            <span>{mode.note}</span>
          </div>
        {/each}
      </div>

      <p>
        <code>term</code> runs the typed command line in your configured terminal through your
        interactive <code>$SHELL</code>, so aliases, pipes, and <code>&amp;&amp;</code> all work; the shell
        stays open afterward.
      </p>
    </article>

    <article class="lift-card">
      <div>
        <p class="card-kicker">Cluster drafts</p>
        <h2>Build clusters as you search</h2>
        <p>
          In <code>cluster</code> searches, <code>Space</code> stages or unstages the selected app or
          running node — side-effect-free. Once something is staged, <code>Ctrl+Enter</code> hands the
          draft to Halley's existing Cluster Finalize popup with a name hint and the selected node IDs.
        </p>
      </div>
      <p>
        Staged apps launch only during that handoff, and the compositor auto-selects matching
        newly-appearing nodes while the finalize prompt is active. Lift never persists clusters
        itself — the finalize popup owns naming, confirmation, and creation.
      </p>
    </article>

    <article class="lift-card">
      <div>
        <p class="card-kicker">Pins &amp; icons</p>
        <h2>It follows Halley's state</h2>
        <p>
          Lift keeps no favorites database of its own. Field/Bearings-pinned nodes come straight from
          Halley and rank above ordinary matches. App icons are read from <code>.desktop</code> entries
          and resolved lazily from XDG icon paths — PNG, JPEG, and SVG — with glyph fallbacks.
        </p>
      </div>
    </article>

    <article class="lift-card">
      <div>
        <p class="card-kicker">Config</p>
        <h2>Configure Lift</h2>
        <p>
          Lift reads a Rune config from the path below. On first launch it writes a documented default
          template there if none exists; existing files are never overwritten.
        </p>
      </div>
      <CodeBlock code={configPath} label="config path" />
      <p>
        The config covers placeholder text, width, result counts, icons, terminal, positioning,
        rounding, colors, borders, cursor, and the enabled modes/providers.
      </p>
    </article>
  </main>
</div>

<style>
  .lift-page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  .lift-shell {
    display: grid;
    gap: clamp(1rem, 3vw, 1.5rem);
    width: min(100% - 2rem, var(--page-max-width));
    margin-inline: auto;
    padding: 1.25rem 0 6rem;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-2);
    font-family: var(--font-display);
    font-weight: 800;
    font-size: 0.9rem;
  }

  .back-link:hover {
    color: var(--accent-soft);
  }

  .lift-hero {
    display: grid;
    gap: 1rem;
    padding: clamp(1.5rem, 5vw, 3.5rem);
    overflow: hidden;
    background:
      radial-gradient(circle at 82% 18%, rgba(143, 181, 255, 0.18), transparent 18rem),
      linear-gradient(135deg, rgba(246, 239, 231, 0.07), transparent 35%),
      rgba(16, 23, 34, 0.72);
  }

  h1 {
    font-size: clamp(2.6rem, 6vw, 4.5rem);
    letter-spacing: -0.04em;
  }

  .lede {
    max-width: 48rem;
    color: var(--text-2);
    font-size: clamp(1.05rem, 2vw, 1.3rem);
  }

  .lift-card {
    scroll-margin-top: calc(var(--header-height) + 2rem);
    display: grid;
    gap: 0.9rem;
    min-width: 0;
    padding: clamp(1rem, 3vw, 1.6rem);
    background: rgba(9, 13, 18, 0.5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
  }

  .lift-card > * {
    min-width: 0;
  }

  .card-kicker {
    color: var(--accent-soft);
    font-family: var(--font-display);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h2 {
    margin-top: 0.25rem;
    font-size: clamp(1.35rem, 2vw, 1.85rem);
    letter-spacing: -0.03em;
    text-wrap: balance;
  }

  p {
    min-width: 0;
    color: var(--text-2);
    overflow-wrap: anywhere;
  }

  .inline-link {
    color: var(--accent-soft);
    font-weight: 700;
  }

  .inline-link:hover {
    text-decoration: underline;
  }

  .mode-table {
    display: grid;
    gap: 0.4rem;
  }

  .mode-row {
    display: grid;
    grid-template-columns: 6.5rem 1fr;
    gap: 0.75rem;
    align-items: baseline;
    padding: 0.55rem 0.75rem;
    background: rgba(246, 239, 231, 0.035);
    border: 1px solid rgba(246, 239, 231, 0.06);
    border-radius: var(--radius-md);
  }

  .mode-row span {
    color: var(--text-2);
  }

  .mode-prefix {
    justify-self: start;
    padding: 0.12rem 0.45rem;
    color: var(--accent-soft);
    background: rgba(255, 106, 42, 0.1);
    border-radius: var(--radius-sm);
  }

  code {
    color: inherit;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 0.92rem;
    overflow-wrap: anywhere;
  }

  p code {
    padding: 0.12rem 0.35rem;
    color: var(--accent-soft);
    background: rgba(255, 106, 42, 0.1);
    border-radius: var(--radius-sm);
  }

  @media (max-width: 760px) {
    .lift-shell {
      width: min(100% - 1rem, var(--page-max-width));
      padding-top: 4.5rem;
      padding-bottom: 4rem;
    }
  }

  @media (max-width: 520px) {
    .lift-hero,
    .lift-card {
      border-radius: var(--radius-lg);
    }

    .lift-hero {
      padding: 1.1rem;
    }

    h1 {
      font-size: clamp(2.2rem, 12vw, 3rem);
    }

    .mode-row {
      grid-template-columns: 5rem 1fr;
    }
  }
</style>
