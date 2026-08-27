<script lang="ts">
  import { browser } from "$app/environment";
  import { page } from "$app/state";
  import CodeBlock from "$lib/components/CodeBlock.svelte";
  import {
    commandAvailableInVersion,
    fieldsForVersion,
    ipcGroups,
    responseShapes,
    responseShapeAvailableInVersion,
    selectors
  } from "$lib/wiki/ipc-reference";
  import { defaultWikiVersion, wikiVersionFromSearch } from "$lib/wiki/versions";

  const activeVersion = () => browser ? wikiVersionFromSearch(page.url.searchParams) : defaultWikiVersion;
  const ipcExamples = `XDG_RUNTIME_DIR=/run/user/1000 halleyctl outputs
halleyctl node list --json
halleyctl cluster info current --json`;

  const visibleCommands = (commands: typeof ipcGroups[number]["commands"]) =>
    commands.filter((command) => commandAvailableInVersion(command, activeVersion().value));
</script>

<article class="ipc-reference surface hud-corners">
  <header id="ipc-overview" class="section-header">
    <p class="eyebrow">IPC Reference</p>
    <h1>halleyctl and IPC</h1>
    <p>
      Versioned command and response reference for Halley's local IPC socket. This page is showing
      <strong>v{activeVersion().label}</strong>.
    </p>
  </header>

  <section id="ipc-socket" class="socket-card" aria-labelledby="ipc-socket-heading">
    <div class="socket-copy">
      <p class="card-kicker">Transport</p>
      <h2 id="ipc-socket-heading">Local socket</h2>
      <p>
        <code>halleyctl</code> talks to the running compositor over a framed Unix socket. Use
        <code>--json</code> on inspection commands when scripts need structured output.
      </p>

      <div class="socket-path" aria-label="Default IPC socket path">
        <span>Default path</span>
        <code>$XDG_RUNTIME_DIR/halley/halley.sock</code>
      </div>

      <div class="socket-note">
        <strong>No Halley-specific override yet.</strong>
        <span>
          To change the derived location, launch both Halley and <code>halleyctl</code> with the same
          <code>XDG_RUNTIME_DIR</code>.
        </span>
      </div>
    </div>

    <div class="terminal-card" aria-label="IPC command examples">
      <CodeBlock code={ipcExamples} label="ipc examples" />
    </div>
  </section>

  <section id="ipc-cli" class="reference-section" aria-labelledby="ipc-cli-heading">
    <div class="section-heading">
      <p class="card-kicker">Commands</p>
      <h2 id="ipc-cli-heading">Command Surface</h2>
    </div>

    <div class="command-groups">
      {#each ipcGroups as group}
        {@const commands = visibleCommands(group.commands)}
        {#if commands.length}
          <section class="command-group">
            <div class="command-heading">
              <h3>{group.title}</h3>
              <p>{group.summary}</p>
            </div>

            <div class="command-list">
              {#each commands as command}
                <div class="command-row">
                  <code>{command.command}</code>
                  <p>{command.description}</p>
                  <span class:empty={!command.json} aria-hidden={!command.json}>{command.json ? "JSON" : ""}</span>
                </div>
              {/each}
            </div>
          </section>
        {/if}
      {/each}
    </div>
  </section>

  <section id="ipc-selectors" class="reference-section" aria-labelledby="ipc-selectors-heading">
    <div class="section-heading">
      <p class="card-kicker">Selectors</p>
      <h2 id="ipc-selectors-heading">Node Targets</h2>
      <p>Node commands and trail goto accept these selectors where a target is needed.</p>
    </div>

    <div class="selector-grid">
      {#each selectors as selector}
        <div class="selector-card">
          <code>{selector.value}</code>
          <p>{selector.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <section id="ipc-json" class="reference-section" aria-labelledby="ipc-json-heading">
    <div class="section-heading">
      <p class="card-kicker">Responses</p>
      <h2 id="ipc-json-heading">JSON Shapes</h2>
      <p>Important structured response fields exposed by <code>--json</code> commands.</p>
    </div>

    <div class="shape-list">
      {#each responseShapes.filter((shape) => responseShapeAvailableInVersion(shape, activeVersion().value)) as shape}
        <section class="shape-card">
          <h3>{shape.name}</h3>
          <div class="field-list">
            {#each fieldsForVersion(shape, activeVersion().value) as field}
              <code>{field}</code>
            {/each}
          </div>
        </section>
      {/each}
    </div>
  </section>

</article>

<style>
  .ipc-reference {
    display: grid;
    gap: 1.1rem;
    padding: clamp(1.2rem, 4vw, 2rem);
  }

  .section-header,
  .section-heading {
    display: grid;
    gap: 0.7rem;
    max-width: 54rem;
  }

  .reference-section,
  .command-groups,
  .shape-list {
    display: grid;
    gap: 0.9rem;
  }

  .reference-section,
  .section-header {
    scroll-margin-top: calc(var(--header-height) + 2rem);
  }

  h1 {
    font-size: clamp(2rem, 4vw, 3.2rem);
    letter-spacing: -0.04em;
  }

  h2 {
    font-size: clamp(1.25rem, 2vw, 1.75rem);
    letter-spacing: -0.03em;
  }

  h3 {
    font-size: clamp(1.05rem, 1.6vw, 1.35rem);
    letter-spacing: -0.025em;
  }

  .socket-card,
  .command-group,
  .shape-card {
    display: grid;
    gap: 0.85rem;
    min-width: 0;
    padding: clamp(1rem, 3vw, 1.35rem);
    background: rgba(9, 13, 18, 0.5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
  }

  .card-kicker {
    color: var(--accent-soft);
    font-family: var(--font-display);
    font-weight: 800;
  }

  .card-kicker {
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .socket-card {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.8fr);
    align-items: start;
    gap: clamp(1rem, 3vw, 1.5rem);
    background:
      radial-gradient(circle at 100% 0%, rgba(125, 220, 255, 0.1), transparent 16rem),
      rgba(9, 13, 18, 0.5);
  }

  .socket-copy {
    display: grid;
    gap: 0.8rem;
    min-width: 0;
  }

  .socket-path {
    display: grid;
    gap: 0.35rem;
    min-width: 0;
    padding: 0.85rem 0.95rem;
    background: rgba(255, 106, 42, 0.075);
    border: 1px solid rgba(255, 106, 42, 0.16);
    border-radius: var(--radius-md);
  }

  .socket-path span,
  .socket-note strong {
    color: var(--accent-soft);
    font-family: var(--font-display);
    font-size: 0.76rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .socket-path code {
    color: var(--text-1);
    overflow-wrap: anywhere;
  }

  .socket-note {
    display: grid;
    gap: 0.35rem;
    padding-left: 0.9rem;
    border-left: 2px solid rgba(125, 220, 255, 0.38);
  }

  .socket-note span {
    color: var(--text-2);
  }

  .terminal-card {
    min-width: 0;
  }

  .command-heading {
    display: grid;
    gap: 0.3rem;
  }

  .command-list {
    display: grid;
    gap: 0.45rem;
  }

  .command-row {
    display: grid;
    grid-template-columns: minmax(16rem, 1.05fr) minmax(0, 1.3fr) 4.25rem;
    align-items: center;
    gap: 0.75rem;
    padding: 0.7rem 0.75rem;
    background: rgba(246, 239, 231, 0.035);
    border: 1px solid rgba(246, 239, 231, 0.06);
    border-radius: var(--radius-md);
  }

  .command-row > * {
    min-width: 0;
  }

  .command-row span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 1.65rem;
    padding: 0.18rem 0.45rem;
    color: var(--ion);
    background: rgba(125, 220, 255, 0.09);
    border: 1px solid rgba(125, 220, 255, 0.16);
    border-radius: var(--radius-sm);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 1;
    text-align: center;
  }

  .command-row span.empty {
    visibility: hidden;
  }

  .command-row p {
    min-width: 0;
  }

  .selector-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    gap: 0.75rem;
  }

  .selector-card {
    display: grid;
    gap: 0.45rem;
    padding: 0.9rem;
    background: rgba(9, 13, 18, 0.5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-md);
  }

  .field-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;
  }

  code {
    color: var(--accent-soft);
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 0.9em;
    overflow-wrap: anywhere;
    white-space: normal;
    word-break: break-word;
  }

  .command-row > code {
    color: var(--text-1);
    min-width: 0;
  }

  .field-list code {
    padding: 0.28rem 0.48rem;
    background: rgba(255, 106, 42, 0.1);
    border: 1px solid rgba(255, 106, 42, 0.14);
    border-radius: var(--radius-sm);
  }

  @media (max-width: 980px) {
    .socket-card {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 760px) {
    .command-row {
      grid-template-columns: minmax(0, 1fr) 4.25rem;
      align-items: start;
    }

    .command-row p {
      grid-column: 1 / -1;
      order: 3;
    }

    .command-row span {
      justify-self: end;
    }
  }

  @media (max-width: 560px) {
    .ipc-reference {
      padding: 1rem;
      border-radius: var(--radius-md);
    }

    h1 {
      font-size: clamp(1.85rem, 10vw, 2.5rem);
    }

    .socket-card,
    .command-group,
    .shape-card {
      padding: 0.9rem;
      border-radius: var(--radius-md);
    }

    .command-row {
      padding: 0.65rem;
    }

  }
</style>
