<script>
	import '../app.postcss';
	import Header from './Header.svelte';
</script>

<Header />

<slot />

<style>
	:global(body) {
		background-color: #f0fdf4;
	}
</style>
