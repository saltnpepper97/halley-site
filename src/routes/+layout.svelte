<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import SiteBackground from '$lib/components/SiteBackground.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<SiteBackground />

{@render children()}
<SiteFooter />
