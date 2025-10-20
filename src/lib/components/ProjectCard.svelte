<script lang="ts">
	import type { Repository } from '$lib/types';
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	export let project: Repository;
	export let index: number = 0;
	export let image: string = '';

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
	class="glass glass-hover rounded-xl overflow-hidden group"
	on:mouseenter={() => handleHover(true)}
	on:mouseleave={() => handleHover(false)}
>
	{#if image}
		<div class="w-full h-32 bg-gradient-to-br from-accent/20 to-blue-500/20 overflow-hidden">
			<img 
				src={image} 
				alt="{project.name} preview" 
				class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
			/>
		</div>
	{:else}
		<div class="w-full h-32 bg-gradient-to-br from-accent/20 to-blue-500/20 flex items-center justify-center">
			<span class="text-5xl opacity-50">{projectIcon}</span>
		</div>
	{/if}

	<div class="p-4">
		<div class="flex items-center gap-2 mb-2">
			<span class="text-2xl">{projectIcon}</span>
			<h3 class="text-lg font-bold text-accent group-hover:text-blue-400 transition-colors truncate">
				{project.name}
			</h3>
		</div>

		<p class="text-gray-400 text-xs mb-3 line-clamp-2">
			{project.description || 'No description available'}
		</p>

		{#if project.language}
			<div class="mb-3">
				<span class="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent border border-accent/30">
					{project.language}
				</span>
			</div>
		{/if}

		{#if project.topics && project.topics.length > 0}
			<div class="flex flex-wrap gap-1 mb-3">
				{#each project.topics.slice(0, 2) as topic}
					<span class="text-xs px-2 py-0.5 rounded-full bg-dark-bg/50 text-gray-400 border border-dark-border">
						{topic}
					</span>
				{/each}
			</div>
		{/if}

		<div class="flex gap-2 mt-3">
			<a
				href={project.html_url}
				target="_blank"
				rel="noopener noreferrer"
				class="flex-1 px-3 py-1.5 bg-accent/20 hover:bg-accent/30 border border-accent/50 rounded-lg text-center text-xs font-semibold transition-all hover:scale-105"
			>
				Code
			</a>
			{#if project.homepage}
				<a
					href={project.homepage}
					target="_blank"
					rel="noopener noreferrer"
					class="flex-1 px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg text-center text-xs font-semibold transition-all hover:scale-105"
				>
					Demo
				</a>
			{/if}
		</div>

		{#if project.featured}
			<div class="mt-2 flex items-center gap-1 text-xs text-accent">
				<span>⭐</span>
				<span>Featured</span>
			</div>
		{/if}
	</div>
</article>
