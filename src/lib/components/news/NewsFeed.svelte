<script lang="ts">
  import type { NewsPost } from "$lib/news/releases";

  let { posts }: { posts: NewsPost[] } = $props();
</script>

<section class="news-feed surface">
  <div class="feed-heading">
    <p class="eyebrow">News</p>
    <h1>Latest Signals</h1>
    <p>Release notes, project updates, and field reports from Halley's orbit.</p>
  </div>

  <div class="feed-list" aria-label="News posts">
    {#each posts as post}
      <a class="feed-card" href={`/news/${post.slug}`}>
        <div class="card-main">
          <div>
            <p class="card-kicker">{post.eyebrow}</p>
            <h2>{post.title}</h2>
          </div>
          <p>{post.summary}</p>
        </div>

        <div class="card-meta">
          <span>{post.version}</span>
          <span>Read update</span>
        </div>
      </a>
    {/each}
  </div>
</section>

<style>
  .news-feed {
    display: grid;
    gap: clamp(1.25rem, 4vw, 2rem);
    min-height: clamp(32rem, 62vh, 46rem);
    padding: clamp(1.4rem, 4vw, 2.6rem);
    background:
      radial-gradient(circle at 84% 12%, rgba(255, 106, 42, 0.2), transparent 18rem),
      radial-gradient(circle at 8% 88%, rgba(125, 220, 255, 0.1), transparent 20rem),
      rgba(16, 23, 34, 0.72);
  }

  .feed-heading {
    display: grid;
    gap: 0.75rem;
    max-width: 46rem;
  }

  h1 {
    font-size: clamp(2.8rem, 7vw, 6rem);
    letter-spacing: -0.065em;
  }

  .feed-heading p:not(.eyebrow) {
    color: var(--text-2);
    font-size: clamp(1.05rem, 2vw, 1.3rem);
  }

  .feed-list {
    display: grid;
    gap: 0.95rem;
  }

  .feed-card {
    position: relative;
    overflow: hidden;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 1.25rem;
    padding: clamp(1rem, 3vw, 1.35rem);
    background: rgba(9, 13, 18, 0.58);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .feed-card::before {
    position: absolute;
    inset: 0 auto 0 0;
    width: 3px;
    content: "";
    background: linear-gradient(var(--accent), var(--ion));
    opacity: 0.75;
  }

  .feed-card:hover {
    color: var(--text-1);
    border-color: var(--border-2);
    box-shadow: var(--glow-1);
    transform: translateY(-2px);
  }

  :global(:root[data-theme="light"]) .news-feed {
    background:
      radial-gradient(circle at 84% 12%, rgba(184, 63, 17, 0.08), transparent 18rem),
      radial-gradient(circle at 8% 88%, rgba(40, 95, 115, 0.06), transparent 20rem),
      rgba(255, 250, 244, 0.9);
  }

  :global(:root[data-theme="light"]) .feed-card {
    background: rgba(255, 255, 255, 0.46);
    border-color: rgba(38, 27, 20, 0.13);
    box-shadow: 0 12px 28px rgba(54, 37, 26, 0.08);
  }

  :global(:root[data-theme="light"]) .card-meta span:first-child {
    color: #fffaf4;
  }

  .card-main {
    display: grid;
    gap: 0.7rem;
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
    margin-top: 0.15rem;
    font-size: clamp(1.55rem, 3vw, 2.45rem);
    letter-spacing: -0.045em;
  }

  .card-main p:not(.card-kicker) {
    color: var(--text-2);
    font-size: 1.02rem;
  }

  .card-meta {
    display: grid;
    justify-items: end;
    gap: 0.55rem;
    white-space: nowrap;
  }

  .card-meta span:first-child {
    padding: 0.35rem 0.65rem;
    color: #170b06;
    background: linear-gradient(135deg, var(--accent), var(--accent-soft));
    border-radius: 999px;
    font-family: var(--font-display);
    font-weight: 900;
  }

  .card-meta span:last-child {
    color: var(--text-3);
    font-size: 0.92rem;
    font-weight: 700;
  }

  @media (max-width: 720px) {
    .news-feed {
      min-height: auto;
    }

    .feed-card {
      grid-template-columns: 1fr;
    }

    .card-meta {
      justify-items: start;
    }
  }

  @media (max-width: 520px) {
    .news-feed {
      padding: 1rem;
      border-radius: var(--radius-md);
    }

    h1 {
      font-size: clamp(2.35rem, 14vw, 3.4rem);
    }

    .feed-card {
      padding: 0.9rem;
    }

    h2 {
      font-size: clamp(1.35rem, 8vw, 2rem);
    }
  }
</style>
