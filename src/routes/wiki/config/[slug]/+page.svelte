<script lang="ts">
  import ConfigSectionView from "$lib/components/wiki/ConfigSectionView.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>{data.configPage.title} | Halley Config Reference</title>
  <meta name="description" content={data.configPage.summary} />
</svelte:head>

<ConfigSectionView page={data.configPage} />
