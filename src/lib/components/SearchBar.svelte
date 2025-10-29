<script lang="ts">
	import { preferences } from '$lib/stores/preferences';
	
	let inputRef: HTMLInputElement;
</script>

<div class="search-bar">
	<svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.35-4.35" />
	</svg>
	
	<input
		bind:this={inputRef}
		type="text"
		value={$preferences.searchQuery}
		on:input={(e) => preferences.setSearchQuery(e.currentTarget.value)}
		placeholder="Search projects..."
		class="search-input"
	/>
	
	{#if $preferences.searchQuery}
		<button
			on:click={() => preferences.setSearchQuery('')}
			class="clear-button"
			aria-label="Clear search"
		>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>
	{/if}
</div>

<style>
	.search-bar {
		position: relative;
		display: flex;
		align-items: center;
		width: 100%;
		max-width: 28rem;
	}
	
	.search-icon {
		position: absolute;
		left: 1rem;
		width: 1.25rem;
		height: 1.25rem;
		color: #64748b;
		stroke-width: 2;
		pointer-events: none;
		transition: color 0.2s ease;
	}
	
	:global(.dark) .search-icon {
		color: #94a3b8;
	}
	
	.search-input {
		width: 100%;
		padding: 0.75rem 3rem 0.75rem 3rem;
		background: rgba(255, 255, 255, 0.8);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 0.75rem;
		font-size: 0.938rem;
		color: #0f172a;
		transition: all 0.2s ease;
		outline: none;
	}
	
	.search-input::placeholder {
		color: #94a3b8;
	}
	
	.search-input:focus {
		background: rgba(255, 255, 255, 1);
		border-color: rgba(0, 174, 239, 0.5);
		box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.1);
	}
	
	:global(.dark) .search-input {
		background: rgba(30, 41, 59, 0.8);
		border-color: rgba(255, 255, 255, 0.1);
		color: #f1f5f9;
	}
	
	:global(.dark) .search-input:focus {
		background: rgba(30, 41, 59, 1);
		border-color: rgba(0, 174, 239, 0.5);
	}
	
	.clear-button {
		position: absolute;
		right: 0.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 0.375rem;
		background: rgba(0, 0, 0, 0.05);
		border: none;
		color: #64748b;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.clear-button:hover {
		background: rgba(0, 0, 0, 0.1);
		color: #0f172a;
	}
	
	:global(.dark) .clear-button {
		background: rgba(255, 255, 255, 0.05);
		color: #94a3b8;
	}
	
	:global(.dark) .clear-button:hover {
		background: rgba(255, 255, 255, 0.1);
		color: #f1f5f9;
	}
	
	.clear-button svg {
		width: 1rem;
		height: 1rem;
		stroke-width: 2;
	}
</style>
