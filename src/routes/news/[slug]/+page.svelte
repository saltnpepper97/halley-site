<script lang="ts">
  import { base } from "$app/paths";
  import ReleaseArticle from "$lib/components/news/ReleaseArticle.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  const withBase = (href: string) => `${base}${href}`;
</script>

<svelte:head>
  <title>{data.post.title} | Halley News</title>
  <meta name="description" content={data.post.summary} />
</svelte:head>

<div class="news-page">
  <SiteHeader />

  <main class="news-shell">
    <a class="back-link" href={withBase("/news")}>Back to news</a>
    <ReleaseArticle post={data.post} />
  </main>
</div>

<style>
  .news-page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  .news-shell {
    display: grid;
    gap: 1rem;
    width: min(100% - 2rem, var(--page-max-width));
    margin-inline: auto;
    padding: 1.25rem 0 6rem;
  }

  .back-link {
    justify-self: start;
    padding: 0.45rem 0.75rem;
    color: var(--text-2);
    background: rgba(16, 23, 34, 0.7);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-sm);
    font-weight: 700;
    transition:
      color 160ms ease,
      border-color 160ms ease,
      background 160ms ease;
  }

  .back-link:hover {
    color: var(--text-1);
    background: rgba(255, 106, 42, 0.1);
    border-color: var(--border-2);
  }

  @media (max-width: 560px) {
    .news-shell {
      width: min(100% - 1rem, var(--page-max-width));
      padding: 0.75rem 0 4rem;
    }
  }
</style>
