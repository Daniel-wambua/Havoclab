<script lang="ts">
	import { page } from '$app/stores';
	import Header from '$lib/components/Header.svelte';
</script>

<div class="min-h-screen">
	<Header />
	<main class="container mx-auto px-4 py-12">
		<div class="glass rounded-2xl p-12 text-center max-w-2xl mx-auto">
			<h1 class="text-6xl font-bold mb-4 text-accent">⚠️</h1>
			<h2 class="text-3xl font-bold mb-4">Oops! Something went wrong</h2>
			<p class="text-gray-400 mb-6">
				{$page.error?.message || 'An unexpected error occurred'}
			</p>
			<a
				href="/"
				class="inline-block px-6 py-3 bg-accent/20 hover:bg-accent/30 border border-accent/50 rounded-lg transition-all"
			>
				Return Home
			</a>
		</div>
	</main>
</div>
