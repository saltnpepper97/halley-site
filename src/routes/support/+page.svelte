<script lang="ts">
  import { base } from "$app/paths";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import { GithubLogoIcon, HandHeartIcon, StarIcon } from "phosphor-svelte";

  const withBase = (href: string) => `${base}${href}`;
</script>

<svelte:head>
  <title>Support | Halley</title>
  <meta
    name="description"
    content="Support Halley by following the project, sharing feedback, and helping more people find it."
  />
</svelte:head>

<div class="support-page">
  <SiteHeader />

  <main class="support-shell">
    <section class="support-hero surface">
      <p class="eyebrow">Support</p>
      <h1>Help Halley keep orbit.</h1>
      <p class="lede">
        Halley is early, independent work. The most useful support right now is attention,
        feedback, and real testing from people who care about spatial desktops.
      </p>

      <div class="support-actions">
        <a class="primary-action sponsor-action" href="https://github.com/sponsors/saltnpepper97" rel="noreferrer">
          <HandHeartIcon color="currentColor" weight="bold" size={22} />
          <span>Support on GitHub Sponsors</span>
        </a>
        <a class="primary-action" href="https://github.com/saltnpepper97/halley" rel="noreferrer">
          <GithubLogoIcon color="currentColor" weight="regular" size={22} />
          <span>Follow on GitHub</span>
        </a>
        <a class="secondary-action" href="https://github.com/saltnpepper97/halley/stargazers" rel="noreferrer">
          <StarIcon color="currentColor" weight="bold" size={22} />
          <span>Star the project</span>
        </a>
      </div>
    </section>

    <section class="support-grid">
      <article class="support-card sponsor-card surface">
        <h2>Sponsor it</h2>
        <p>If Halley is useful or you want to help it keep moving, GitHub Sponsors is the direct support route.</p>
        <a href="https://github.com/sponsors/saltnpepper97" rel="noreferrer">GitHub Sponsors</a>
      </article>

      <article class="support-card surface">
        <h2>Try it</h2>
        <p>Install a release, run it on real hardware, and report where the model breaks down.</p>
        <a href={withBase("/wiki/install")}>Install guide</a>
      </article>

      <article class="support-card surface">
        <h2>Give feedback</h2>
        <p>Open issues for bugs, rough edges, confusing docs, or workflows Halley should handle better.</p>
        <a href="https://github.com/saltnpepper97/halley/issues" rel="noreferrer">GitHub issues</a>
      </article>

      <article class="support-card surface">
        <h2>Share it</h2>
        <p>If the project resonates, point other Wayland and desktop-environment people at it.</p>
        <a href={withBase("/news/third-orbit")}>Third Orbit release</a>
      </article>
    </section>
  </main>
</div>

<style>
  .support-page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  .support-shell {
    display: grid;
    gap: clamp(1rem, 3vw, 1.5rem);
    width: min(100% - 2rem, var(--page-max-width));
    margin-inline: auto;
    padding: 1.25rem 0 6rem;
  }

  .support-hero {
    display: grid;
    gap: 1.25rem;
    padding: clamp(1.5rem, 5vw, 4rem);
    overflow: hidden;
    background:
      radial-gradient(circle at 82% 18%, rgba(255, 106, 42, 0.22), transparent 18rem),
      linear-gradient(135deg, rgba(246, 239, 231, 0.07), transparent 35%),
      rgba(16, 23, 34, 0.72);
  }

  h1 {
    max-width: 11ch;
    font-size: clamp(3rem, 7vw, 6rem);
  }

  .lede {
    max-width: 44rem;
    color: var(--text-2);
    font-size: clamp(1.05rem, 2vw, 1.35rem);
  }

  .support-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .primary-action,
  .secondary-action {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    min-height: 2.9rem;
    padding: 0.65rem 1rem;
    font-family: var(--font-display);
    font-weight: 800;
    border-radius: var(--radius-xl);
  }

  .primary-action {
    color: #170b06;
    background: linear-gradient(135deg, var(--accent), var(--accent-soft));
  }

  .sponsor-action {
    position: relative;
    isolation: isolate;
    min-height: 3.15rem;
    padding-inline: 1.15rem;
    background:
      linear-gradient(135deg, var(--accent), var(--accent-soft));
    box-shadow:
      0 0 0 1px rgba(255, 155, 84, 0.22),
      0 0 34px rgba(255, 106, 42, 0.28);
  }

  .sponsor-action::after {
    position: absolute;
    inset: -0.32rem;
    z-index: -1;
    pointer-events: none;
    content: "";
    background: radial-gradient(circle, rgba(255, 106, 42, 0.28), transparent 68%);
    border-radius: inherit;
  }

  .primary-action:hover {
    color: #170b06;
    box-shadow: var(--glow-1);
  }

  .secondary-action {
    color: var(--text-1);
    background: rgba(246, 239, 231, 0.06);
    border: 1px solid var(--border-1);
  }

  .secondary-action:hover {
    color: var(--accent-soft);
    border-color: var(--border-2);
  }

  .support-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(1rem, 3vw, 1.5rem);
  }

  .support-card {
    display: grid;
    align-content: start;
    gap: 0.75rem;
    padding: 1.25rem;
  }

  .sponsor-card {
    border-color: rgba(255, 106, 42, 0.24);
    background:
      radial-gradient(circle at 100% 0%, rgba(255, 106, 42, 0.14), transparent 13rem),
      rgba(16, 23, 34, 0.82);
    box-shadow: var(--shadow-1), 0 0 36px rgba(255, 106, 42, 0.16);
  }

  .support-card h2 {
    font-size: clamp(1.35rem, 2vw, 1.85rem);
  }

  .support-card a {
    color: var(--accent-soft);
    font-family: var(--font-display);
    font-weight: 800;
  }

  @media (max-width: 760px) {
    .support-shell {
      width: min(100% - 1rem, var(--page-max-width));
      padding-top: 4.5rem;
      padding-bottom: 4rem;
    }

    .support-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 761px) and (max-width: 1080px) {
    .support-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 520px) {
    .support-hero,
    .support-card {
      border-radius: var(--radius-lg);
    }

    .support-hero {
      padding: 1.1rem;
    }

    h1 {
      font-size: clamp(2.4rem, 14vw, 3.5rem);
    }

    .support-actions,
    .primary-action,
    .secondary-action {
      width: 100%;
    }

    .primary-action,
    .secondary-action {
      justify-content: center;
    }
  }
</style>
