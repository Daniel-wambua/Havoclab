<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { animate } from 'motion';
	
	let buttonRef: HTMLButtonElement;
	
	function toggleTheme() {
		theme.toggle();
		
		// Animate the button
		if (buttonRef) {
			animate(
				buttonRef,
				{ scale: [1, 0.9, 1.1, 1], rotate: [0, -15, 15, 0] },
				{ duration: 0.4, easing: 'ease-out' }
			);
		}
	}
</script>

<button
	bind:this={buttonRef}
	on:click={toggleTheme}
	class="theme-toggle"
	aria-label="Toggle theme"
	title="Toggle theme"
>
	{#if $theme === 'dark'}
		<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<circle cx="12" cy="12" r="5" />
			<line x1="12" y1="1" x2="12" y2="3" />
			<line x1="12" y1="21" x2="12" y2="23" />
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
			<line x1="1" y1="12" x2="3" y2="12" />
			<line x1="21" y1="12" x2="23" y2="12" />
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
		</svg>
	{:else}
		<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.5rem;
		background: rgba(0, 174, 239, 0.1);
		border: 1px solid rgba(0, 174, 239, 0.2);
		color: #00AEEF;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.theme-toggle:hover {
		background: rgba(0, 174, 239, 0.2);
		border-color: rgba(0, 174, 239, 0.4);
		transform: translateY(-1px);
	}
	
	.theme-toggle:active {
		transform: translateY(0);
	}
	
	.icon {
		width: 1.25rem;
		height: 1.25rem;
		stroke-width: 2;
	}
	
	:global(.dark) .theme-toggle {
		background: rgba(0, 174, 239, 0.15);
	}
</style>
