<script lang="ts">
  import { base } from "$app/paths";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import CodeBlock from "$lib/components/CodeBlock.svelte";
  import { ArrowRightIcon, MagnifyingGlassIcon } from "phosphor-svelte";

  const withBase = (href: string) => `${base}${href}`;
  const aurFull = `yay -S halley-full
paru -S halley-full`;
</script>

<svelte:head>
  <title>Ecosystem | Halley</title>
  <meta
    name="description"
    content="First-party apps built around the Halley compositor: Halley Lift and the halley-full bundle."
  />
</svelte:head>

<div class="ecosystem-page">
  <SiteHeader />

  <main class="ecosystem-shell">
    <section class="ecosystem-hero surface">
      <p class="eyebrow">Ecosystem</p>
      <h1>Apps built for the field.</h1>
      <p class="lede">
        Halley is more than a compositor. The ecosystem is a set of first-party apps that talk to
        Halley over its IPC APIs, so they understand nodes, clusters, and the spatial model instead
        of treating the desktop as a flat stack of windows.
      </p>
      <p class="lede-sub">
        Each app ships as its own package. <code>halley-full</code> is the convenience bundle that
        pulls in the whole set at once and grows as the ecosystem grows.
      </p>
    </section>

    <section class="app-grid">
      <a class="app-card surface hud-corners available" href={withBase("/ecosystem/lift")}>
        <div class="app-icon" aria-hidden="true">
          <MagnifyingGlassIcon color="currentColor" weight="bold" size={26} />
        </div>
        <span class="status status-available">Available</span>
        <h2>Halley Lift</h2>
        <p>
          A compositor-integrated command palette. Search apps, nodes, clusters, actions, and config
          from one launcher — and stage running nodes into cluster drafts in a single flow.
        </p>
        <span class="app-link">
          Learn more <ArrowRightIcon color="currentColor" weight="bold" size={16} />
        </span>
      </a>

    </section>

    <section class="bundle-card surface hud-corners">
      <div>
        <p class="card-kicker">halley-full</p>
        <h2>Install the whole ecosystem</h2>
        <p>
          The <code>halley-full</code> AUR package installs Halley alongside every first-party
          ecosystem app. It is the convenience path — each app also stays individually installable if
          you only want certain pieces.
        </p>
      </div>
      <CodeBlock code={aurFull} label="ecosystem bundle" />
      <a class="link-comet" href={withBase("/wiki/install#install-arch")}>Full install guide</a>
    </section>
  </main>
</div>

<style>
  .ecosystem-page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  .ecosystem-shell {
    display: grid;
    gap: clamp(1rem, 3vw, 1.5rem);
    width: min(100% - 2rem, var(--page-max-width));
    margin-inline: auto;
    padding: 1.25rem 0 6rem;
  }

  .ecosystem-hero {
    display: grid;
    gap: 1rem;
    padding: clamp(1.5rem, 5vw, 4rem);
    overflow: hidden;
    background:
      radial-gradient(circle at 82% 18%, rgba(125, 220, 255, 0.16), transparent 18rem),
      linear-gradient(135deg, rgba(246, 239, 231, 0.07), transparent 35%),
      rgba(16, 23, 34, 0.72);
  }

  h1 {
    max-width: 14ch;
    font-size: clamp(2.6rem, 6vw, 5rem);
    letter-spacing: -0.04em;
  }

  .lede {
    max-width: 46rem;
    color: var(--text-2);
    font-size: clamp(1.05rem, 2vw, 1.3rem);
  }

  .lede-sub {
    max-width: 46rem;
    color: var(--text-2);
    font-size: 1.02rem;
  }

  .app-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(1rem, 3vw, 1.5rem);
  }

  .app-card {
    display: grid;
    align-content: start;
    gap: 0.7rem;
    padding: clamp(1.25rem, 3vw, 1.75rem);
    transition:
      border-color 160ms ease,
      transform 160ms ease,
      box-shadow 160ms ease;
  }

  a.app-card.available:hover {
    border-color: var(--border-2);
    transform: translateY(-2px);
    box-shadow: var(--shadow-1), var(--glow-1);
  }

  .app-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    color: var(--accent-soft);
    background: rgba(255, 106, 42, 0.1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-md);
  }

  .status {
    justify-self: start;
    padding: 0.2rem 0.6rem;
    font-family: var(--font-display);
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-radius: 999px;
  }

  .status-available {
    color: var(--on-accent);
    background: linear-gradient(135deg, var(--accent-soft), var(--accent));
    box-shadow: 0 0 18px rgba(255, 106, 42, 0.35);
  }

  .app-card h2 {
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    letter-spacing: -0.03em;
  }

  .app-card p {
    color: var(--text-2);
  }

  .app-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: 0.2rem;
    color: var(--accent-soft);
    font-family: var(--font-display);
    font-weight: 800;
  }

  .bundle-card {
    display: grid;
    gap: 1rem;
    padding: clamp(1.25rem, 3vw, 1.75rem);
    background:
      radial-gradient(circle at 100% 0%, rgba(255, 106, 42, 0.1), transparent 14rem),
      rgba(9, 13, 18, 0.5);
  }

  .card-kicker {
    color: var(--accent-soft);
    font-family: var(--font-display);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .bundle-card h2 {
    margin-top: 0.3rem;
    font-size: clamp(1.35rem, 2vw, 1.85rem);
    letter-spacing: -0.03em;
  }

  .bundle-card p {
    max-width: 46rem;
    color: var(--text-2);
  }

  .bundle-card .link-comet {
    justify-self: start;
    color: var(--accent-soft);
    font-family: var(--font-display);
    font-weight: 800;
  }

  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    font-size: 0.92rem;
  }

  p code {
    padding: 0.12rem 0.35rem;
    color: var(--accent-soft);
    background: rgba(255, 106, 42, 0.1);
    border-radius: var(--radius-sm);
  }

  :global(:root[data-theme="light"]) .ecosystem-hero {
    background:
      radial-gradient(circle at 82% 18%, rgba(40, 95, 115, 0.1), transparent 18rem),
      linear-gradient(135deg, rgba(184, 63, 17, 0.045), transparent 35%),
      rgba(255, 250, 244, 0.9);
  }

  :global(:root[data-theme="light"]) .app-card {
    background:
      radial-gradient(circle at 0 0, rgba(184, 63, 17, 0.07), transparent 15rem),
      rgba(255, 255, 255, 0.48);
    border-color: rgba(38, 27, 20, 0.14);
  }

  :global(:root[data-theme="light"]) .bundle-card {
    background:
      radial-gradient(circle at 100% 0%, rgba(184, 63, 17, 0.08), transparent 14rem),
      rgba(255, 255, 255, 0.44);
    border-color: rgba(38, 27, 20, 0.14);
  }

  :global(:root[data-theme="light"]) .app-icon {
    color: var(--accent);
    background: rgba(184, 63, 17, 0.08);
    border-color: rgba(184, 63, 17, 0.2);
  }

  @media (max-width: 760px) {
    .ecosystem-shell {
      width: min(100% - 1rem, var(--page-max-width));
      padding-top: 4.5rem;
      padding-bottom: 4rem;
    }

    .app-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 520px) {
    .ecosystem-hero,
    .app-card,
    .bundle-card {
      border-radius: var(--radius-lg);
    }

    .ecosystem-hero {
      padding: 1.1rem;
    }

    h1 {
      font-size: clamp(2.2rem, 12vw, 3rem);
    }
  }
</style>
