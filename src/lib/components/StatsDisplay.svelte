<script lang="ts">
	import type { Repository } from '$lib/types';
	import { animate } from 'motion';
	import { onMount } from 'svelte';
	
	export let repositories: Repository[];
	
	$: totalStars = repositories.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
	$: totalForks = repositories.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);
	$: languages = [...new Set(repositories.map(r => r.language).filter(Boolean))].length;
	$: totalProjects = repositories.length;
	
	let statsRefs: (HTMLDivElement | null)[] = [];
	
	onMount(() => {
		// Animate stats on mount
		statsRefs.forEach((ref, index) => {
			if (ref) {
				animate(
					ref,
					{ opacity: [0, 1], y: [20, 0] },
					{ duration: 0.5, delay: index * 0.1, easing: 'ease-out' }
				);
			}
		});
	});
	
	function formatNumber(num: number): string {
		if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'k';
		}
		return num.toString();
	}
</script>

<div class="stats-container">
	<div class="stat-card" bind:this={statsRefs[0]}>
		<div class="stat-icon">📦</div>
		<div class="stat-value">{totalProjects}</div>
		<div class="stat-label">Projects</div>
	</div>
	
	<div class="stat-card" bind:this={statsRefs[1]}>
		<div class="stat-icon">⭐</div>
		<div class="stat-value">{formatNumber(totalStars)}</div>
		<div class="stat-label">Stars</div>
	</div>
	
	<div class="stat-card" bind:this={statsRefs[2]}>
		<div class="stat-icon">🔱</div>
		<div class="stat-value">{formatNumber(totalForks)}</div>
		<div class="stat-label">Forks</div>
	</div>
	
	<div class="stat-card" bind:this={statsRefs[3]}>
		<div class="stat-icon">💻</div>
		<div class="stat-value">{languages}</div>
		<div class="stat-label">Languages</div>
	</div>
</div>

<style>
	.stats-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: 1rem;
		margin-bottom: 2rem;
		opacity: 0;
	}
	
	.stat-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.5rem 1rem;
		background: rgba(255, 255, 255, 0.8);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 1rem;
		transition: all 0.3s ease;
		opacity: 0;
	}
	
	.stat-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
		border-color: rgba(0, 174, 239, 0.3);
	}
	
	:global(.dark) .stat-card {
		background: rgba(30, 41, 59, 0.8);
		border-color: rgba(255, 255, 255, 0.1);
	}
	
	:global(.dark) .stat-card:hover {
		border-color: rgba(0, 174, 239, 0.5);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
	}
	
	.stat-icon {
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}
	
	.stat-value {
		font-size: 2rem;
		font-weight: 700;
		color: #00AEEF;
		margin-bottom: 0.25rem;
	}
	
	.stat-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #64748b;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	
	:global(.dark) .stat-label {
		color: #94a3b8;
	}
</style>
