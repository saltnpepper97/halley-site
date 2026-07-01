<script lang="ts">
  import CodeBlock from "$lib/components/CodeBlock.svelte";
  import AurToggleBlock from "$lib/components/news/AurToggleBlock.svelte";

  type AurPair = { yay: string; paru: string };

  let {
    title,
    label,
    commands = [],
    code = undefined,
    wide = false
  }: {
    title: string;
    label: string;
    commands?: string[];
    code?: string;
    wide?: boolean;
  } = $props();

  // Collapse yay/paru duplicates into one toggle block per command pair,
  // keyed by everything after the helper token (e.g. "-S halley").
  const pairs = $derived.by(() => {
    const map = new Map<string, { yay?: string; paru?: string }>();
    for (const command of commands) {
      const trimmed = command.trim();
      const space = trimmed.indexOf(" ");
      const head = space === -1 ? trimmed : trimmed.slice(0, space);
      const tail = space === -1 ? "" : trimmed.slice(space + 1);
      if (head !== "yay" && head !== "paru") {
        continue;
      }
      const entry = map.get(tail) ?? {};
      entry[head] = command;
      map.set(tail, entry);
    }
    return [...map.values()].filter(
      (entry): entry is AurPair => Boolean(entry.yay && entry.paru)
    );
  });
</script>

<div class="install-card" class:wide>
  <h3>{title}</h3>

  {#if code !== undefined}
    <CodeBlock {code} {label} />
  {:else if pairs.length > 0}
    {#each pairs as pair}
      <AurToggleBlock yay={pair.yay} paru={pair.paru} {label} />
    {/each}
  {:else}
    {#each commands as command}
      <CodeBlock code={command} {label} />
    {/each}
  {/if}
</div>

<style>
  .install-card {
    display: grid;
    gap: 0.65rem;
    align-content: start;
    padding: 1rem;
    background: rgba(9, 13, 18, 0.52);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
  }

  .install-card.wide {
    grid-column: 1 / -1;
  }

  h3 {
    font-size: 1.05rem;
    letter-spacing: -0.025em;
  }

  :global(:root[data-theme="light"]) .install-card {
    background: rgba(255, 255, 255, 0.46);
    border-color: rgba(38, 27, 20, 0.13);
  }

  @media (max-width: 520px) {
    .install-card {
      padding: 0.9rem;
      border-radius: var(--radius-md);
    }
  }
</style>
