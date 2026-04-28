<script lang="ts">
  import ConfigReferenceIndex from "$lib/components/wiki/ConfigReferenceIndex.svelte";
  import { configPages } from "$lib/wiki/config-reference";
</script>

<svelte:head>
  <title>Config Reference | Halley Wiki</title>
  <meta name="description" content="Halley config reference with canonical options, types, defaults, and notes." />
</svelte:head>

<ConfigReferenceIndex pages={configPages} />
