<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import FilterBar from '$lib/components/FilterBar.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import type { Repository } from '$lib/types';
	import { GITHUB_USERNAME } from '$lib/constants';

	let searchQuery = '';
	let selectedLanguage = '';
	let isLoading = true;
	let error = '';
	let allProjects: Repository[] = [];
	let languages: string[] = [];

	// Load projects on mount
	async function loadProjects() {
		try {
			isLoading = true;
			error = '';

			// Fetch featured projects
			const featuredRes = await fetch('/api/featured');
			const featuredProjects = featuredRes.ok ? await featuredRes.json() : [];

			// Fetch GitHub repos
			const reposRes = await fetch('/api/repos');
			if (!reposRes.ok) throw new Error('Failed to fetch repositories');
			const repos = await reposRes.json();

			// Mark featured projects
			const featured = featuredProjects.map((p: any) => ({ ...p, featured: true, id: Math.random() }));

			// Combine and deduplicate
			const combined = [...featured, ...repos];
			allProjects = combined;

			// Extract unique languages
			const langSet = new Set<string>();
			combined.forEach((p: Repository) => {
				if (p.language) langSet.add(p.language);
			});
			languages = Array.from(langSet).sort();

			isLoading = false;
		} catch (err) {
			error = err instanceof Error ? err.message : 'An error occurred';
			isLoading = false;
		}
	}

	// Reactive filtered projects
	$: filteredProjects = allProjects.filter((project) => {
		const matchesSearch = !searchQuery || 
			project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			(project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
		
		const matchesLanguage = !selectedLanguage || project.language === selectedLanguage;

		return matchesSearch && matchesLanguage;
	});

	// Load on mount
	import { onMount } from 'svelte';
	onMount(() => {
		loadProjects();
	});
</script>

<svelte:head>
	<title>🧬 HavocLab - Project Showcase</title>
	<meta name="description" content="Explore the innovative projects by Daniel Wambua at HavocLab" />
</svelte:head>

<div class="min-h-screen">
	<Header />

	<main class="container mx-auto px-4 py-12">
		<div class="text-center mb-12">
			<h2 class="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent via-blue-400 to-purple-500 bg-clip-text text-transparent">
				Project Showcase
			</h2>
			<p class="text-gray-400 text-lg">
				Building the future, one project at a time
			</p>
		</div>

		<FilterBar bind:searchQuery bind:selectedLanguage {languages} />

		{#if isLoading}
			<div class="flex items-center justify-center py-20">
				<div class="text-center">
					<div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
					<p class="text-gray-400">Loading projects...</p>
				</div>
			</div>
		{:else if error}
			<div class="glass rounded-2xl p-8 text-center">
				<p class="text-red-400 mb-4">⚠️ {error}</p>
				<button
					on:click={loadProjects}
					class="px-6 py-2 bg-accent/20 hover:bg-accent/30 border border-accent/50 rounded-lg transition-all"
				>
					Try Again
				</button>
			</div>
		{:else if filteredProjects.length === 0}
			<div class="glass rounded-2xl p-8 text-center">
				<p class="text-gray-400">No projects found matching your filters</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{#each filteredProjects as project, index (project.id)}
					<ProjectCard 
						{project} 
						{index} 
						image={project.image || ''}
					/>
				{/each}
			</div>

			<div class="text-center mt-12 text-gray-500 text-sm">
				<p>Found {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}</p>
			</div>
		{/if}
	</main>

	<footer class="border-t border-dark-border py-8 mt-20">
		<div class="container mx-auto px-4">
			<div class="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
				<div class="text-center md:text-left mb-4 md:mb-0">
					<p>Built with SvelteKit, TailwindCSS, and Motion One</p>
					<p class="mt-1">© 2025 HavocLab - All rights reserved</p>
				</div>
				<div class="text-center md:text-right">
					<p class="flex items-center gap-2 justify-center md:justify-end">
						Made with <span class="text-red-500 animate-pulse">❤️</span> by <span class="text-accent font-semibold">Havoc</span>
					</p>
				</div>
			</div>
		</div>
	</footer>
</div>
