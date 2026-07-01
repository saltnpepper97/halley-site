<script lang="ts">
  import { base } from "$app/paths";

  const withBase = (href: string) => `${base}${href}`;

  const setupPath = [
    {
      title: "Check requirements",
      text: "Confirm your TTY, seat, GPU, and portal dependencies before changing your session.",
      href: "/wiki/install#install-requirements"
    },
    {
      title: "Install Halley",
      text: "Use the AUR package for the fastest start, or build from source if you want latest changes.",
      href: "/wiki/install"
    },
    {
      title: "Edit config safely",
      text: "Use the generated config shape and option tables when adjusting keybinds, monitors, and behavior.",
      href: "/wiki/config"
    },
    {
      title: "Automate with halleyctl",
      text: "Use IPC commands when you need scripts, status bars, or external controls.",
      href: "/wiki/ipc"
    }
  ];

  const commonTasks = [
    { label: "Install on Arch", href: "/wiki/install#install-arch" },
    { label: "Build from source", href: "/wiki/install#install-source" },
    { label: "Launch from a display manager", href: "/wiki/install#install-session" },
    { label: "Set up desktop portals", href: "/wiki/install#install-portal" },
    { label: "Browse config sections", href: "/wiki/config" },
    { label: "Find halleyctl commands", href: "/wiki/ipc#ipc-cli" },
    { label: "Check IPC JSON fields", href: "/wiki/ipc#ipc-json" }
  ];
</script>

<section class="getting-started surface hud-corners">
  <div class="intro">
    <p class="eyebrow">Halley Wiki</p>
    <h1>Getting Started</h1>
    <p>
      New to Halley? Follow the setup path first. Once it boots, use the task links and reference
      pages to tune monitors, keybinds, IPC, and desktop portal behavior without hunting through the
      whole wiki.
    </p>
  </div>

  <section class="path-panel" aria-labelledby="setup-path-heading">
    <div class="path-heading">
      <p class="eyebrow">Recommended path</p>
      <h2 id="setup-path-heading">Read these in order</h2>
    </div>

    <ol class="setup-path">
      {#each setupPath as step, index}
        <li>
          <a href={withBase(step.href)}>
            <span>{index + 1}</span>
            <strong>{step.title}</strong>
            <p>{step.text}</p>
          </a>
        </li>
      {/each}
    </ol>
  </section>

  <div class="quick-links">
    <a class="quick-card" href={withBase("/wiki/install")}>
      <span>Install</span>
      <strong>Requirements, Arch packages, and source builds.</strong>
    </a>

    <a class="quick-card" href={withBase("/wiki/config")}>
      <span>Config Reference</span>
      <strong>Canonical option names, types, defaults, and notes.</strong>
    </a>

    <a class="quick-card" href={withBase("/wiki/ipc")}>
      <span>IPC Reference</span>
      <strong>Versioned halleyctl commands and JSON response shapes.</strong>
    </a>
  </div>

  <section class="task-panel" aria-labelledby="common-tasks-heading">
    <div>
      <p class="eyebrow">Common tasks</p>
      <h2 id="common-tasks-heading">Jump straight to what you need</h2>
    </div>

    <div class="task-grid">
      {#each commonTasks as task}
        <a href={withBase(task.href)}>{task.label}</a>
      {/each}
    </div>
  </section>
</section>

<style>
  .getting-started {
    display: grid;
    gap: 1.35rem;
    min-width: 0;
    padding: clamp(1.2rem, 4vw, 2rem);
  }

  .intro {
    display: grid;
    gap: 0.75rem;
    max-width: 48rem;
  }

  h1 {
    font-size: clamp(2.1rem, 4vw, 3.4rem);
    letter-spacing: -0.04em;
  }

  h2 {
    font-size: clamp(1.35rem, 2.4vw, 2rem);
    letter-spacing: -0.035em;
  }

  .intro p:not(.eyebrow) {
    font-size: 1.05rem;
  }

  .path-panel,
  .task-panel {
    display: grid;
    gap: 1rem;
    min-width: 0;
    padding: clamp(1rem, 3vw, 1.35rem);
    background:
      radial-gradient(circle at 100% 0%, rgba(125, 220, 255, 0.09), transparent 16rem),
      rgba(9, 13, 18, 0.5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
  }

  .path-heading,
  .task-panel > div:first-child {
    display: grid;
    gap: 0.35rem;
  }

  .setup-path {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.85rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .setup-path li,
  .setup-path a {
    min-width: 0;
  }

  .setup-path a {
    display: grid;
    gap: 0.5rem;
    min-width: 0;
    height: 100%;
    padding: 0.95rem;
    background: rgba(246, 239, 231, 0.035);
    border: 1px solid rgba(246, 239, 231, 0.07);
    border-radius: var(--radius-md);
    transition:
      border-color 160ms ease,
      background 160ms ease,
      transform 160ms ease;
  }

  .setup-path a:hover,
  .task-grid a:hover {
    color: var(--text-1);
    border-color: var(--border-2);
    background: rgba(255, 106, 42, 0.08);
    transform: translateY(-2px);
  }

  .setup-path span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    color: #170b06;
    background: linear-gradient(135deg, var(--accent), var(--accent-soft));
    border-radius: 999px;
    font-family: var(--font-display);
    font-weight: 900;
  }

  .setup-path strong {
    min-width: 0;
    font-family: var(--font-display);
    font-size: 1.02rem;
    line-height: 1.25;
    overflow-wrap: anywhere;
  }

  .setup-path p {
    min-width: 0;
    font-size: 0.94rem;
    line-height: 1.45;
    overflow-wrap: anywhere;
  }

  .quick-links {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .quick-card {
    display: grid;
    gap: 0.55rem;
    min-width: 0;
    padding: 1.1rem;
    background: rgba(9, 13, 18, 0.5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .quick-card:hover {
    color: var(--text-1);
    border-color: var(--border-2);
    box-shadow: var(--glow-1);
    transform: translateY(-2px);
  }

  .quick-card span {
    color: var(--accent-soft);
    font-family: var(--font-display);
    font-weight: 800;
  }

  .quick-card strong {
    min-width: 0;
    color: var(--text-1);
    font-size: 1.05rem;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .task-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.65rem;
  }

  .task-grid a {
    min-width: 0;
    padding: 0.75rem 0.85rem;
    color: var(--text-1);
    background: rgba(246, 239, 231, 0.035);
    border: 1px solid rgba(246, 239, 231, 0.07);
    border-radius: var(--radius-md);
    font-weight: 750;
    overflow-wrap: anywhere;
    transition:
      border-color 160ms ease,
      background 160ms ease,
      transform 160ms ease;
  }

  @media (max-width: 980px) {
    .setup-path,
    .task-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 900px) {
    .quick-links {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 560px) {
    .getting-started {
      padding: 1rem;
      border-radius: var(--radius-md);
    }

    h1 {
      font-size: clamp(1.85rem, 10vw, 2.5rem);
    }

    .path-panel,
    .task-panel,
    .setup-path a {
      border-radius: var(--radius-md);
    }

    .setup-path,
    .task-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
