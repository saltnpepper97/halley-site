<script lang="ts">
  let { code, label = "Command" }: { code: string; label?: string } = $props();
  let copied = $state(false);
  let copyResetTimer: ReturnType<typeof setTimeout> | undefined;

  const copyCode = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.setAttribute("readonly", "");
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      copied = true;
      if (copyResetTimer) {
        clearTimeout(copyResetTimer);
      }
      copyResetTimer = setTimeout(() => {
        copied = false;
      }, 1600);
    } catch {
      copied = false;
    }
  };
</script>

<div class="code-block">
  <div class="code-toolbar">
    <span>{label}</span>
    <button type="button" onclick={copyCode} aria-label={`Copy ${label.toLowerCase()} to clipboard`}>
      {copied ? "Copied" : "Copy"}
    </button>
  </div>

  <pre><code>{code}</code></pre>
</div>

<style>
  .code-block {
    min-width: 0;
    overflow: hidden;
    color: var(--text-1);
    background: rgba(3, 6, 10, 0.78);
    border: 1px solid rgba(246, 239, 231, 0.08);
    border-radius: var(--radius-md);
    box-shadow: inset 0 1px 0 rgba(246, 239, 231, 0.04);
  }

  .code-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.58rem 0.7rem 0.5rem 0.85rem;
    background: rgba(246, 239, 231, 0.045);
    border-bottom: 1px solid rgba(246, 239, 231, 0.06);
  }

  .code-toolbar span {
    min-width: 0;
    color: var(--text-3);
    font-family: var(--font-display);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
  }

  button {
    flex: 0 0 auto;
    min-height: 2rem;
    padding: 0.26rem 0.58rem;
    color: var(--text-1);
    background: rgba(255, 106, 42, 0.12);
    border: 1px solid rgba(255, 106, 42, 0.24);
    border-radius: var(--radius-sm);
    font-size: 0.78rem;
    font-weight: 700;
    transition:
      background 160ms ease,
      border-color 160ms ease,
      transform 160ms ease;
  }

  button:hover {
    background: rgba(255, 106, 42, 0.2);
    border-color: rgba(255, 106, 42, 0.42);
    transform: translateY(-1px);
  }

  :global(:root[data-theme="light"]) .code-toolbar {
    background: rgba(38, 27, 20, 0.055);
    border-color: rgba(38, 27, 20, 0.11);
  }

  :global(:root[data-theme="light"]) button {
    color: var(--accent-deep);
    background: rgba(184, 63, 17, 0.08);
    border-color: rgba(184, 63, 17, 0.22);
  }

  :global(:root[data-theme="light"]) button:hover {
    color: var(--on-accent);
    background: var(--accent-deep);
    border-color: rgba(94, 31, 9, 0.36);
  }

  pre {
    overflow-x: auto;
    margin: 0;
    padding: 0.95rem 1rem;
  }

  code {
    color: inherit;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 0.9rem;
    line-height: 1.6;
    overflow-wrap: normal;
    white-space: pre;
  }

  @media (max-width: 560px) {
    .code-toolbar {
      padding-left: 0.75rem;
    }

    pre {
      padding: 0.8rem;
    }
  }
</style>
