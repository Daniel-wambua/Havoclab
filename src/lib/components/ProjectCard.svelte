<script lang="ts">
	import type { Repository } from '$lib/types';
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	export let project: Repository;
	export let index: number = 0;
	export let image: string = '';
	export let viewMode: 'grid' | 'list' = 'grid';

	let cardElement: HTMLElement;

	// Generate icon based on project name or use custom icon
	function getProjectIcon(name: string, customIcon?: string): string {
		if (customIcon) return customIcon;
		
		// Icon mapping based on common project types
		const lowerName = name.toLowerCase();
		if (lowerName.includes('api') || lowerName.includes('backend')) return '🔌';
		if (lowerName.includes('web') || lowerName.includes('site')) return '🌐';
		if (lowerName.includes('app') || lowerName.includes('mobile')) return '📱';
		if (lowerName.includes('bot') || lowerName.includes('ai')) return '🤖';
		if (lowerName.includes('game')) return '🎮';
		if (lowerName.includes('tool')) return '🔧';
		if (lowerName.includes('cli')) return '⌨️';
		if (lowerName.includes('lib') || lowerName.includes('package')) return '📦';
		if (lowerName.includes('doc') || lowerName.includes('blog')) return '📚';
		if (lowerName.includes('data') || lowerName.includes('analytics')) return '📊';
		if (lowerName.includes('auth')) return '🔐';
		if (lowerName.includes('chat') || lowerName.includes('message')) return '💬';
		if (lowerName.includes('music') || lowerName.includes('audio')) return '🎵';
		if (lowerName.includes('video')) return '🎥';
		if (lowerName.includes('image') || lowerName.includes('photo')) return '🖼️';
		return '🧬'; // Default HavocLab icon
	}

	const projectIcon = getProjectIcon(project.name, project.icon);
	
	function formatNumber(num: number | undefined): string {
		if (!num) return '0';
		if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
		return num.toString();
	}
	
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const now = new Date();
		const diffTime = Math.abs(now.getTime() - date.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		
		if (diffDays < 7) return `${diffDays}d ago`;
		if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
		if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
		return `${Math.floor(diffDays / 365)}y ago`;
	}

	onMount(() => {
		animate(
			cardElement,
			{ opacity: [0, 1], y: [20, 0] },
			{ duration: 0.5, delay: index * 0.1 }
		);
	});

	function handleHover(isHovering: boolean) {
		if (isHovering) {
			animate(cardElement, { y: -8, scale: 1.02 }, { duration: 0.3 });
		} else {
			animate(cardElement, { y: 0, scale: 1 }, { duration: 0.3 });
		}
	}

</script>

<article
	bind:this={cardElement}
	class="project-card"
	class:list-view={viewMode === 'list'}
	on:mouseenter={() => handleHover(true)}
	on:mouseleave={() => handleHover(false)}
>
	{#if image}
		<div class="project-image">
			<img 
				src={image} 
				alt="{project.name} preview" 
				class="image"
			/>
		</div>
	{:else}
		<div class="project-image placeholder">
			<span class="icon-large">{projectIcon}</span>
		</div>
	{/if}

	<div class="card-content">
		<div class="card-header">
			<div class="title-row">
				<span class="icon">{projectIcon}</span>
				<h3 class="title">
					{project.name}
				</h3>
			</div>
			
			<!-- GitHub Stats -->
			<div class="stats-row">
				{#if project.stargazers_count !== undefined}
					<div class="stat" title="{project.stargazers_count} stars">
						<svg class="stat-icon" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
						</svg>
						<span>{formatNumber(project.stargazers_count)}</span>
					</div>
				{/if}
				
				{#if project.forks_count !== undefined}
					<div class="stat" title="{project.forks_count} forks">
						<svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<circle cx="12" cy="18" r="3"/>
							<circle cx="6" cy="6" r="3"/>
							<circle cx="18" cy="6" r="3"/>
							<path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/>
							<path d="M12 12v3"/>
						</svg>
						<span>{formatNumber(project.forks_count)}</span>
					</div>
				{/if}
				
				{#if project.updated_at}
					<div class="stat updated" title="Last updated {new Date(project.updated_at).toLocaleDateString()}">
						<svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
							<circle cx="12" cy="12" r="10"/>
							<polyline points="12 6 12 12 16 14"/>
						</svg>
						<span>{formatDate(project.updated_at)}</span>
					</div>
				{/if}
			</div>
		</div>

		<p class="description">
			{project.description || 'No description available'}
		</p>

		{#if project.language}
			<div class="tags-row">
				<span class="language-tag">
					{project.language}
				</span>
			</div>
		{/if}

		{#if project.topics && project.topics.length > 0}
			<div class="topics-row">
				{#each project.topics.slice(0, viewMode === 'list' ? 5 : 2) as topic}
					<span class="topic-tag">
						{topic}
					</span>
				{/each}
			</div>
		{/if}

		<div class="actions-row">
			<a
				href={project.html_url}
				target="_blank"
				rel="noopener noreferrer"
				class="action-button primary"
			>
				<svg viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
				Code
			</a>
			{#if project.homepage}
				<a
					href={project.homepage}
					target="_blank"
					rel="noopener noreferrer"
					class="action-button secondary"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<circle cx="12" cy="12" r="10"/>
						<line x1="2" y1="12" x2="22" y2="12"/>
						<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
					</svg>
					Demo
				</a>
			{/if}
		</div>

		{#if project.featured}
			<div class="featured-badge">
				<span>⭐</span>
				<span>Featured</span>
			</div>
		{/if}
	</div>
</article>

<style>
	.project-card {
		display: flex;
		flex-direction: column;
		background: rgba(255, 255, 255, 0.8);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 1rem;
		overflow: hidden;
		backdrop-filter: blur(10px);
		transition: all 0.3s ease;
		opacity: 0;
	}
	
	:global(.dark) .project-card {
		background: rgba(30, 41, 59, 0.8);
		border-color: rgba(255, 255, 255, 0.1);
	}
	
	.project-card:hover {
		border-color: rgba(0, 174, 239, 0.3);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
	}
	
	:global(.dark) .project-card:hover {
		border-color: rgba(0, 174, 239, 0.5);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
	}
	
	/* List view layout */
	.project-card.list-view {
		flex-direction: row;
	}
	
	.project-image {
		width: 100%;
		height: 8rem;
		background: linear-gradient(135deg, rgba(0, 174, 239, 0.2), rgba(59, 130, 246, 0.2));
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	
	.list-view .project-image {
		width: 12rem;
		height: auto;
		flex-shrink: 0;
	}
	
	.image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.8;
		transition: opacity 0.3s ease;
	}
	
	.project-card:hover .image {
		opacity: 1;
	}
	
	.icon-large {
		font-size: 3rem;
		opacity: 0.5;
	}
	
	.card-content {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		flex: 1;
	}
	
	.card-header {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	
	.title-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
	
	.icon {
		font-size: 1.5rem;
		flex-shrink: 0;
	}
	
	.title {
		font-size: 1.125rem;
		font-weight: 700;
		color: #00AEEF;
		transition: color 0.2s ease;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.project-card:hover .title {
		color: #3b82f6;
	}
	
	.stats-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
	}
	
	.stat {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.813rem;
		font-weight: 600;
		color: #64748b;
	}
	
	:global(.dark) .stat {
		color: #94a3b8;
	}
	
	.stat-icon {
		width: 1rem;
		height: 1rem;
		stroke-width: 2;
	}
	
	.stat:first-child {
		color: #f59e0b;
	}
	
	.stat:nth-child(2) {
		color: #8b5cf6;
	}
	
	.stat.updated {
		color: #64748b;
	}
	
	:global(.dark) .stat.updated {
		color: #94a3b8;
	}
	
	.description {
		font-size: 0.875rem;
		color: #64748b;
		line-height: 1.5;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	
	:global(.dark) .description {
		color: #94a3b8;
	}
	
	.list-view .description {
		-webkit-line-clamp: 3;
	}
	
	.tags-row {
		display: flex;
		gap: 0.5rem;
	}
	
	.language-tag {
		display: inline-block;
		padding: 0.375rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: 0.5rem;
		background: rgba(0, 174, 239, 0.15);
		color: #00AEEF;
		border: 1px solid rgba(0, 174, 239, 0.3);
	}
	
	.topics-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}
	
	.topic-tag {
		padding: 0.25rem 0.625rem;
		font-size: 0.75rem;
		font-weight: 500;
		border-radius: 0.375rem;
		background: rgba(0, 0, 0, 0.05);
		color: #64748b;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	:global(.dark) .topic-tag {
		background: rgba(255, 255, 255, 0.05);
		color: #94a3b8;
		border-color: rgba(255, 255, 255, 0.1);
	}
	
	.actions-row {
		display: flex;
		gap: 0.5rem;
		margin-top: auto;
	}
	
	.action-button {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.375rem;
		padding: 0.625rem 1rem;
		font-size: 0.813rem;
		font-weight: 600;
		border-radius: 0.5rem;
		text-decoration: none;
		transition: all 0.2s ease;
	}
	
	.action-button svg {
		width: 1rem;
		height: 1rem;
	}
	
	.action-button.primary {
		background: rgba(0, 174, 239, 0.15);
		color: #00AEEF;
		border: 1px solid rgba(0, 174, 239, 0.3);
	}
	
	.action-button.primary:hover {
		background: rgba(0, 174, 239, 0.25);
		border-color: #00AEEF;
		transform: translateY(-1px);
	}
	
	.action-button.secondary {
		background: rgba(59, 130, 246, 0.15);
		color: #3b82f6;
		border: 1px solid rgba(59, 130, 246, 0.3);
	}
	
	.action-button.secondary:hover {
		background: rgba(59, 130, 246, 0.25);
		border-color: #3b82f6;
		transform: translateY(-1px);
	}
	
	.featured-badge {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: #00AEEF;
	}
</style>
