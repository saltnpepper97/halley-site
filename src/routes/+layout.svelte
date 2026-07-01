<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import SpaceBackground from '$lib/components/SpaceBackground.svelte';
	import Starfield from '$lib/components/Starfield.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SpaceBackground />
<Starfield />
{@render children()}
<SiteFooter />
