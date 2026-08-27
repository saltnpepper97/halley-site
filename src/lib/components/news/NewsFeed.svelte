<script lang="ts">
  import { base } from "$app/paths";
  import {
    formatNewsDate,
    formatNewsDateShort,
    newsKindLabel,
    type NewsPost
  } from "$lib/news/releases";

  let { posts }: { posts: NewsPost[] } = $props();
  const withBase = (href: string) => `${base}${href}`;

  // Posts arrive newest-first; collapse consecutive same-date posts into one
  // dated group so the timeline reads as distinct days.
  const groups = $derived.by(() => {
    const out: { date: string; posts: NewsPost[] }[] = [];
    for (const post of posts) {
      const last = out[out.length - 1];
      if (last && last.date === post.date) last.posts.push(post);
      else out.push({ date: post.date, posts: [post] });
    }
    return out;
  });
</script>

<section class="news-feed surface hud-corners">
  <div class="feed-heading">
    <p class="eyebrow">News</p>
    <h1>Latest Signals</h1>
    <p>Release notes, project updates, and field reports from the Halley project.</p>
  </div>

  <div class="timeline" aria-label="News posts">
    {#each groups as group}
      <section class="day" aria-label={formatNewsDate(group.date)}>
        <div class="day-rail">
          <span class="day-dot" aria-hidden="true"></span>
          <time class="day-date" datetime={group.date}>{formatNewsDateShort(group.date)}</time>
        </div>

        <div class="day-posts">
          {#each group.posts as post}
            {@const kind = newsKindLabel(post)}
            <a class="feed-card" href={withBase(`/news/${post.slug}`)}>
              <div class="card-top">
                <span class="kind kind-{kind.toLowerCase()}">
                  <span class="badge-signal" aria-hidden="true"></span>
                  {kind}
                </span>
                <span class="version version-{kind.toLowerCase()}">
                  {post.kind === "preview" ? "Upcoming" : post.version}
                </span>
              </div>

              <h2>{post.title}</h2>
              <p class="summary">{post.summary}</p>

              <div class="card-foot">
                <time datetime={post.date}>{formatNewsDate(post.date)}</time>
                <span class="read">{post.kind === "preview" ? "Read preview" : "Read update"} →</span>
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/each}
  </div>
</section>

<style>
  .news-feed {
    display: grid;
    gap: clamp(1.5rem, 4vw, 2.5rem);
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

  /* Timeline ------------------------------------------------------------- */

  .timeline {
    display: grid;
    gap: clamp(1.5rem, 4vw, 2.25rem);
  }

  .day {
    display: grid;
    grid-template-columns: minmax(7rem, auto) minmax(0, 1fr);
    gap: clamp(1rem, 3vw, 1.75rem);
    align-items: start;
  }

  .day-rail {
    position: sticky;
    top: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding-top: 0.45rem;
  }

  .day-dot {
    position: relative;
    flex: none;
    width: 0.6rem;
    height: 0.6rem;
    background: var(--accent);
    border-radius: 999px;
    box-shadow: 0 0 0 4px rgba(255, 106, 42, 0.16);
  }

  .day-date {
    color: var(--text-2);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .day-posts {
    display: grid;
    gap: 0.95rem;
    padding-left: clamp(0.75rem, 2vw, 1.25rem);
    border-left: 1px solid var(--border-1);
  }

  /* Cards ---------------------------------------------------------------- */

  .feed-card {
    position: relative;
    overflow: hidden;
    display: grid;
    gap: 0.7rem;
    padding: clamp(1.05rem, 3vw, 1.5rem);
    background: rgba(9, 13, 18, 0.58);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease,
      transform 160ms ease;
  }

  .feed-card:hover {
    color: var(--text-1);
    border-color: var(--border-2);
    box-shadow: var(--glow-1);
    transform: translateY(-2px);
  }

  .card-top {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.65rem 1rem;
  }

  /*
    Metadata chips. One object with one type ramp and one box; the kind carries
    a tinted fill, the version an outline, and --chip-rgb is the only thing that
    varies between them. Previously these were a round pill and a sharp
    rectangle stacked with four decorations each, which read as two unrelated
    widgets sharing a row.
  */
  .kind,
  .version {
    --chip-rgb: var(--accent-rgb);
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    height: 1.75rem;
    padding: 0 0.6rem;
    border: 1px solid rgba(var(--chip-rgb), 0.34);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: 0.68rem;
    font-weight: 800;
    line-height: 1;
    text-transform: uppercase;
  }

  .kind {
    color: rgb(var(--chip-rgb));
    background: rgba(var(--chip-rgb), 0.08);
    letter-spacing: 0.11em;
  }

  .version {
    margin-left: auto;
    color: var(--text-1);
    background: transparent;
    letter-spacing: 0.04em;
  }

  .badge-signal {
    width: 0.4rem;
    height: 0.4rem;
    background: currentColor;
    border-radius: 999px;
    box-shadow: 0 0 8px rgba(var(--chip-rgb), 0.65);
  }

  .kind-patch,
  .version-patch {
    --chip-rgb: var(--ion-rgb);
  }

  /* Nothing has shipped yet, so the box stays provisional. */
  .kind-preview,
  .version-preview {
    border-style: dashed;
  }

  h2 {
    font-size: clamp(1.45rem, 3vw, 2.2rem);
    letter-spacing: -0.045em;
  }

  .summary {
    color: var(--text-2);
    font-size: 1.02rem;
    line-height: 1.55;
  }

  .card-foot {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem 1rem;
    margin-top: 0.2rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border-1);
  }

  .card-foot time {
    color: var(--text-3, var(--text-2));
    font-family: var(--font-mono);
    font-size: 0.8rem;
    letter-spacing: 0.02em;
  }

  .read {
    color: var(--coord);
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    transition: transform 160ms ease;
  }

  .feed-card:hover .read {
    transform: translateX(3px);
  }

  /* Light theme ---------------------------------------------------------- */

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

  :global(:root[data-theme="light"]) .day-posts {
    border-left-color: rgba(38, 27, 20, 0.15);
  }

  /* Responsive ----------------------------------------------------------- */

  @media (max-width: 720px) {
    .news-feed {
      min-height: auto;
    }

    .day {
      grid-template-columns: 1fr;
      gap: 0.85rem;
    }

    .day-rail {
      position: static;
      padding-top: 0;
    }

    .day-posts {
      padding-left: 0;
      border-left: none;
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
      padding: 0.95rem;
    }

    .version-label {
      display: none;
    }

    h2 {
      font-size: clamp(1.3rem, 8vw, 1.9rem);
    }
  }
</style>
