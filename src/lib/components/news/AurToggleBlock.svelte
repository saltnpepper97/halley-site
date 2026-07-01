<script lang="ts">
  let { yay, paru, label = "AUR" }: { yay: string; paru: string; label?: string } = $props();

  let helper = $state<"yay" | "paru">("yay");
  const code = $derived(helper === "yay" ? yay : paru);

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
    <div class="toolbar-left">
      <span class="label">{label}</span>
      <div class="aur-toggle" role="tablist" aria-label="AUR helper">
        <button
          type="button"
          role="tab"
          aria-selected={helper === "yay"}
          class="aur-toggle-btn"
          class:active={helper === "yay"}
          onclick={() => (helper = "yay")}>yay</button>
        <button
          type="button"
          role="tab"
          aria-selected={helper === "paru"}
          class="aur-toggle-btn"
          class:active={helper === "paru"}
          onclick={() => (helper = "paru")}>paru</button>
      </div>
    </div>
    <button type="button" class="copy-btn" onclick={copyCode} aria-label={`Copy ${label.toLowerCase()} to clipboard`}>
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
    gap: 0.6rem;
    padding: 0.5rem 0.7rem 0.5rem 0.85rem;
    background: rgba(246, 239, 231, 0.045);
    border-bottom: 1px solid rgba(246, 239, 231, 0.06);
  }

  .toolbar-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    min-width: 0;
  }

  .label {
    color: var(--text-3);
    font-family: var(--font-display);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .aur-toggle {
    display: inline-flex;
    gap: 0.15rem;
    padding: 0.15rem;
    background: rgba(3, 6, 10, 0.5);
    border: 1px solid rgba(246, 239, 231, 0.08);
    border-radius: var(--radius-sm);
  }

  .aur-toggle-btn {
    padding: 0.18rem 0.5rem;
    color: var(--text-3);
    background: transparent;
    border: 1px solid transparent;
    border-radius: 2px;
    font-family: var(--font-mono);
    font-size: 0.72rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      color 160ms ease,
      background 160ms ease,
      border-color 160ms ease;
  }

  .aur-toggle-btn:hover {
    color: var(--text-1);
  }

  .aur-toggle-btn.active {
    color: var(--text-1);
    background: rgba(255, 106, 42, 0.16);
    border-color: var(--border-2);
  }

  .copy-btn {
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

  .copy-btn:hover {
    background: rgba(255, 106, 42, 0.2);
    border-color: rgba(255, 106, 42, 0.42);
    transform: translateY(-1px);
  }

  :global(:root[data-theme="light"]) .code-toolbar {
    background: rgba(38, 27, 20, 0.055);
    border-color: rgba(38, 27, 20, 0.11);
  }

  :global(:root[data-theme="light"]) .aur-toggle {
    background: rgba(38, 27, 20, 0.05);
    border-color: rgba(38, 27, 20, 0.11);
  }

  :global(:root[data-theme="light"]) .aur-toggle-btn.active {
    color: var(--accent-deep);
    background: rgba(184, 63, 17, 0.12);
    border-color: rgba(184, 63, 17, 0.3);
  }

  :global(:root[data-theme="light"]) .copy-btn {
    color: var(--accent-deep);
    background: rgba(184, 63, 17, 0.08);
    border-color: rgba(184, 63, 17, 0.22);
  }

  :global(:root[data-theme="light"]) .copy-btn:hover {
    color: #fffaf4;
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
