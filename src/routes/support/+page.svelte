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
        <a class="secondary-action" href="https://github.com/saltnpepper97/halley" rel="noreferrer">
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
        <span class="coord" aria-hidden="true">01 · Sponsor</span>
        <h2>Sponsor it</h2>
        <p>If Halley is useful or you want to help it keep moving, GitHub Sponsors is the direct support route.</p>
        <a class="link-comet" href="https://github.com/sponsors/saltnpepper97" rel="noreferrer">GitHub Sponsors</a>
      </article>

      <article class="support-card surface">
        <span class="coord" aria-hidden="true">02 · Try</span>
        <h2>Try it</h2>
        <p>Install a release, run it on real hardware, and report where the model breaks down.</p>
        <a class="link-comet" href={withBase("/wiki/install")}>Install guide</a>
      </article>

      <article class="support-card surface">
        <span class="coord" aria-hidden="true">03 · Feedback</span>
        <h2>Give feedback</h2>
        <p>Open issues for bugs, rough edges, confusing docs, or workflows Halley should handle better.</p>
        <a class="link-comet" href="https://github.com/saltnpepper97/halley/issues" rel="noreferrer">GitHub issues</a>
      </article>

      <article class="support-card surface">
        <span class="coord" aria-hidden="true">04 · Share</span>
        <h2>Share it</h2>
        <p>If the project resonates, point other Wayland and desktop-environment people at it.</p>
        <a class="link-comet" href={withBase("/news/v0-9-0-steadier-experience")}>Halley 0.9 release</a>
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
      rgba(16, 23, 34, 0.72);
  }

  h1 {
    max-width: 14ch;
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
    font-weight: 600;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    transition:
      background 160ms ease,
      border-color 160ms ease,
      color 160ms ease;
  }

  .primary-action {
    color: var(--on-accent);
    background: var(--accent);
  }


  .primary-action:hover {
    color: var(--on-accent);
    background: var(--accent-soft);
  }

  .secondary-action {
    color: var(--text-1);
    background: var(--chip-base);
    border-color: var(--border-1);
  }

  .secondary-action:hover {
    color: var(--text-1);
    border-color: var(--text-3);
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

  .support-card :global(.coord),
  .support-card a {
    justify-self: start;
  }

  .sponsor-card {
    border-color: var(--border-2);
  }

  .support-card h2 {
    font-size: clamp(1.35rem, 2vw, 1.85rem);
  }

  .support-card a {
    margin-top: auto;
    color: var(--accent);
    font-weight: 600;
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
