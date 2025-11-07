<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import FilterBar from '$lib/components/FilterBar.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import LoadingState from '$lib/components/LoadingState.svelte';
	import ErrorState from '$lib/components/ErrorState.svelte';
	import StatsDisplay from '$lib/components/StatsDisplay.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import type { Repository } from '$lib/types';
	import { GITHUB_USERNAME } from '$lib/constants';
	import { preferences } from '$lib/stores/preferences';
	import { onMount } from 'svelte';

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

	// Reactive filtered and sorted projects
	$: filteredProjects = allProjects
		.filter((project) => {
			// Search filter
			const matchesSearch = !$preferences.searchQuery || 
				project.name.toLowerCase().includes($preferences.searchQuery.toLowerCase()) ||
				(project.description?.toLowerCase().includes($preferences.searchQuery.toLowerCase()) ?? false) ||
				(project.language?.toLowerCase().includes($preferences.searchQuery.toLowerCase()) ?? false);
			
			// Language/tag filter
			const matchesTags = $preferences.selectedTags.length === 0 ||
				$preferences.selectedTags.some(tag => project.language === tag);

			return matchesSearch && matchesTags;
		})
		.sort((a, b) => {
			// Sorting logic
			switch ($preferences.sortBy) {
				case 'stars':
					return (b.stargazers_count || 0) - (a.stargazers_count || 0);
				case 'forks':
					return (b.forks_count || 0) - (a.forks_count || 0);
				case 'updated':
					return new Date(b.updated_at || 0).getTime() - new Date(a.updated_at || 0).getTime();
				case 'name':
					return a.name.localeCompare(b.name);
				default:
					return 0;
			}
		});

	// Load on mount
	onMount(() => {
		loadProjects();
	});
</script>

<svelte:head>
	<title>🧬 HavocLab - Project Showcase</title>
	<meta name="description" content="Explore the innovative projects by Daniel Wambua at HavocLab" />
</svelte:head>

<div class="app-container">
	<Header />

	<main class="main-content">
		<!-- Hero Section -->
		<div class="hero-section">
			<h2 class="hero-title">
				Project Showcase
			</h2>
			<p class="hero-subtitle">
				Building the future, one project at a time
			</p>
		</div>

		<!-- Mobile Search (hidden on desktop where it's in header) -->
		<div class="mobile-search">
			<SearchBar />
		</div>

		<!-- Stats Display -->
		{#if !isLoading && !error && allProjects.length > 0}
			<StatsDisplay repositories={allProjects} />
		{/if}

		<!-- Filter Bar -->
		<FilterBar {languages} />

		{#if isLoading}
			<LoadingState />
		{:else if error}
			<ErrorState message={error} onRetry={loadProjects} />
		{:else if filteredProjects.length === 0}
			<div class="empty-state">
				<div class="empty-icon">🔍</div>
				<h3 class="empty-title">No projects found</h3>
				<p class="empty-text">
					Try adjusting your search or filters
				</p>
				<button on:click={() => {
					preferences.setSearchQuery('');
					preferences.clearTags();
				}} class="empty-button">
					Clear filters
				</button>
			</div>
		{:else}
			<!-- Results count -->
			<div class="results-info">
				<p class="results-text">
					Showing <strong>{filteredProjects.length}</strong> {filteredProjects.length === 1 ? 'project' : 'projects'}
				</p>
			</div>
			
			<!-- Projects Grid/List -->
			<div 
				class="projects-container"
				class:grid-view={$preferences.viewMode === 'grid'}
				class:list-view={$preferences.viewMode === 'list'}
			>
				{#each filteredProjects as project, index}
					<ProjectCard 
						{project} 
						{index}
						image={project.image || ''}
						viewMode={$preferences.viewMode}
					/>
				{/each}
			</div>
		{/if}
	</main>
	
	<!-- Footer -->
	<footer class="footer">
		<div class="footer-container">
			<p class="footer-text">
				Made with 🧬 by <a href="https://github.com/Daniel-wambua" target="_blank" rel="noopener noreferrer" class="footer-link">Daniel Wambua</a>
			</p>
			<p class="footer-copyright">
				© {new Date().getFullYear()} HavocLab. All rights reserved.
			</p>
		</div>
	</footer>
</div>

<style>
	.app-container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
		transition: background 0.3s ease;
	}
	
	:global(.dark) .app-container {
		background: linear-gradient(to bottom, #0f172a, #1e293b);
	}
	
	.main-content {
		flex: 1;
		max-width: 1280px;
		margin: 0 auto;
		padding: 3rem 1.5rem;
		width: 100%;
	}
	
	.hero-section {
		text-align: center;
		margin-bottom: 1.5rem;
	}
	
	.hero-title {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, #00AEEF 0%, #3b82f6 50%, #a855f7 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	
	@media (min-width: 768px) {
		.hero-title {
			font-size: 3.75rem;
		}
	}
	
	.hero-subtitle {
		font-size: 1.125rem;
		color: #64748b;
	}
	
	:global(.dark) .hero-subtitle {
		color: #94a3b8;
	}
	
	.mobile-search {
		display: block;
		margin-bottom: 2rem;
	}
	
	@media (min-width: 768px) {
		.mobile-search {
			display: none;
		}
	}
	
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 4rem 2rem;
		text-align: center;
	}
	
	.empty-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
		opacity: 0.5;
	}
	
	.empty-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #0f172a;
		margin-bottom: 0.5rem;
	}
	
	:global(.dark) .empty-title {
		color: #f1f5f9;
	}
	
	.empty-text {
		font-size: 1rem;
		color: #64748b;
		margin-bottom: 1.5rem;
	}
	
	:global(.dark) .empty-text {
		color: #94a3b8;
	}
	
	.empty-button {
		padding: 0.75rem 1.5rem;
		background: rgba(0, 174, 239, 0.15);
		border: 1px solid rgba(0, 174, 239, 0.3);
		border-radius: 0.5rem;
		font-weight: 600;
		color: #00AEEF;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.empty-button:hover {
		background: rgba(0, 174, 239, 0.25);
		border-color: #00AEEF;
		transform: translateY(-1px);
	}
	
	.results-info {
		margin-bottom: 1.5rem;
	}
	
	.results-text {
		font-size: 0.875rem;
		color: #64748b;
	}
	
	:global(.dark) .results-text {
		color: #94a3b8;
	}
	
	.results-text strong {
		color: #00AEEF;
		font-weight: 700;
	}
	
	.projects-container {
		display: grid;
		gap: 1.5rem;
	}
	
	.projects-container.grid-view {
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	}
	
	.projects-container.list-view {
		grid-template-columns: 1fr;
	}
	
	@media (min-width: 1024px) {
		.projects-container.list-view {
			gap: 1rem;
		}
	}
	
	.footer {
		margin-top: auto;
		padding: 2rem 1.5rem;
		background: rgba(255, 255, 255, 0.8);
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
	}
	
	:global(.dark) .footer {
		background: rgba(15, 23, 42, 0.8);
		border-top-color: rgba(255, 255, 255, 0.1);
	}
	
	.footer-container {
		max-width: 1280px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		text-align: center;
	}
	
	@media (min-width: 640px) {
		.footer-container {
			flex-direction: row;
			justify-content: space-between;
		}
	}
	
	.footer-text {
		font-size: 0.875rem;
		color: #64748b;
	}
	
	:global(.dark) .footer-text {
		color: #94a3b8;
	}
	
	.footer-link {
		color: #00AEEF;
		text-decoration: none;
		font-weight: 600;
		transition: color 0.2s ease;
	}
	
	.footer-link:hover {
		color: #3b82f6;
	}
	
	.footer-copyright {
		font-size: 0.875rem;
		color: #94a3b8;
	}
	
	:global(.dark) .footer-copyright {
		color: #64748b;
	}
</style>
