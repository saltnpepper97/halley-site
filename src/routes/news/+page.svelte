<script lang="ts">
  import NewsFeed from "$lib/components/news/NewsFeed.svelte";
  import SiteHeader from "$lib/components/SiteHeader.svelte";
  import { sortedNewsPosts } from "$lib/news/releases";
</script>

<svelte:head>
  <title>News | Halley</title>
  <meta
    name="description"
    content="Halley news and release announcements, including the current v0.7.0 Cluster Composer and compositor UI styling release."
  />
</svelte:head>

<div class="news-page">
  <SiteHeader />

  <main class="news-shell">
    <NewsFeed posts={sortedNewsPosts} />
  </main>
</div>

<style>
  .news-page {
    position: relative;
    z-index: 1;
    min-height: 100vh;
  }

  .news-shell {
    width: min(100% - 2rem, var(--page-max-width));
    margin-inline: auto;
    padding: 1.25rem 0 6rem;
  }

  @media (max-width: 880px) {
    .news-shell {
      width: min(100% - 1rem, var(--page-max-width));
      padding: 4.5rem 0 4rem;
    }
  }
</style>
