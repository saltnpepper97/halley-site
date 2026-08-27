<script lang="ts">
  import { base } from "$app/paths";
  import BackLink from "$lib/components/BackLink.svelte";
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
    <BackLink href={withBase("/news")} label="News" />
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

  @media (max-width: 560px) {
    .news-shell {
      width: min(100% - 1rem, var(--page-max-width));
      padding: 0.75rem 0 4rem;
    }
  }
</style>
