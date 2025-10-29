<script lang="ts">
	import { preferences, type SortOption, type ViewMode } from '$lib/stores/preferences';
	
	export let languages: string[] = [];
	
	const sortOptions: { value: SortOption; label: string; icon: string }[] = [
		{ value: 'stars', label: 'Stars', icon: '⭐' },
		{ value: 'forks', label: 'Forks', icon: '🔱' },
		{ value: 'updated', label: 'Updated', icon: '📅' },
		{ value: 'name', label: 'Name', icon: '🔤' }
	];
	
	const viewModes: { value: ViewMode; icon: string; label: string }[] = [
		{ value: 'grid', icon: '▦', label: 'Grid view' },
		{ value: 'list', icon: '☰', label: 'List view' }
	];
</script>

<div class="filter-bar">
	<div class="filter-row">
		<!-- Language Filter -->
		<div class="filter-section">
			<label class="filter-label">Filter by:</label>
			<select
				value={$preferences.selectedTags[0] || ''}
				on:change={(e) => {
					preferences.clearTags();
					if (e.currentTarget.value) {
						preferences.toggleTag(e.currentTarget.value);
					}
				}}
				class="filter-select"
			>
				<option value="">All Languages</option>
				{#each languages as lang}
					<option value={lang}>{lang}</option>
				{/each}
			</select>
		</div>
		
		<!-- Sort Options -->
		<div class="filter-section">
			<label class="filter-label">Sort by:</label>
			<div class="sort-buttons">
				{#each sortOptions as option}
					<button
						on:click={() => preferences.setSortBy(option.value)}
						class="sort-button"
						class:active={$preferences.sortBy === option.value}
						title={option.label}
					>
						<span class="sort-icon">{option.icon}</span>
						<span class="sort-label">{option.label}</span>
					</button>
				{/each}
			</div>
		</div>
		
		<!-- View Mode Toggle -->
		<div class="filter-section view-toggle-section">
			<label class="filter-label">View:</label>
			<div class="view-toggle">
				{#each viewModes as mode}
					<button
						on:click={() => preferences.setViewMode(mode.value)}
						class="view-button"
						class:active={$preferences.viewMode === mode.value}
						title={mode.label}
						aria-label={mode.label}
					>
						{mode.icon}
					</button>
				{/each}
			</div>
		</div>
	</div>
	
	<!-- Active Tags Display -->
	{#if $preferences.selectedTags.length > 0}
		<div class="active-tags">
			<span class="tags-label">Active filters:</span>
			{#each $preferences.selectedTags as tag}
				<button
					on:click={() => preferences.toggleTag(tag)}
					class="tag-chip"
				>
					{tag}
					<span class="tag-close">×</span>
				</button>
			{/each}
			<button on:click={() => preferences.clearTags()} class="clear-all">
				Clear all
			</button>
		</div>
	{/if}
</div>

<style>
	.filter-bar {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.8);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 1rem;
		margin-bottom: 2rem;
		backdrop-filter: blur(10px);
	}
	
	:global(.dark) .filter-bar {
		background: rgba(30, 41, 59, 0.8);
		border-color: rgba(255, 255, 255, 0.1);
	}
	
	.filter-row {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		align-items: center;
	}
	
	.filter-section {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	
	.filter-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: #64748b;
		white-space: nowrap;
	}
	
	:global(.dark) .filter-label {
		color: #94a3b8;
	}
	
	.filter-select {
		padding: 0.5rem 0.75rem;
		background: rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 0.5rem;
		font-size: 0.875rem;
		color: #0f172a;
		cursor: pointer;
		transition: all 0.2s ease;
		outline: none;
	}
	
	.filter-select:hover {
		background: rgba(0, 0, 0, 0.08);
		border-color: rgba(0, 174, 239, 0.3);
	}
	
	.filter-select:focus {
		border-color: rgba(0, 174, 239, 0.5);
		box-shadow: 0 0 0 3px rgba(0, 174, 239, 0.1);
	}
	
	:global(.dark) .filter-select {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
		color: #f1f5f9;
	}
	
	:global(.dark) .filter-select:hover {
		background: rgba(255, 255, 255, 0.08);
	}
	
	.sort-buttons {
		display: flex;
		gap: 0.5rem;
	}
	
	.sort-button {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.5rem 0.875rem;
		background: rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #64748b;
		cursor: pointer;
		transition: all 0.2s ease;
		white-space: nowrap;
	}
	
	.sort-button:hover {
		background: rgba(0, 174, 239, 0.1);
		border-color: rgba(0, 174, 239, 0.3);
		color: #00AEEF;
	}
	
	.sort-button.active {
		background: rgba(0, 174, 239, 0.15);
		border-color: #00AEEF;
		color: #00AEEF;
	}
	
	:global(.dark) .sort-button {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
		color: #94a3b8;
	}
	
	:global(.dark) .sort-button:hover {
		background: rgba(0, 174, 239, 0.15);
		border-color: rgba(0, 174, 239, 0.4);
	}
	
	:global(.dark) .sort-button.active {
		background: rgba(0, 174, 239, 0.2);
	}
	
	.sort-icon {
		font-size: 1rem;
	}
	
	.sort-label {
		display: none;
	}
	
	@media (min-width: 640px) {
		.sort-label {
			display: inline;
		}
	}
	
	.view-toggle-section {
		margin-left: auto;
	}
	
	.view-toggle {
		display: flex;
		background: rgba(0, 0, 0, 0.05);
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 0.5rem;
		overflow: hidden;
	}
	
	:global(.dark) .view-toggle {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
	}
	
	.view-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		background: transparent;
		border: none;
		font-size: 1.125rem;
		color: #64748b;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.view-button:hover {
		background: rgba(0, 174, 239, 0.1);
		color: #00AEEF;
	}
	
	.view-button.active {
		background: #00AEEF;
		color: white;
	}
	
	:global(.dark) .view-button {
		color: #94a3b8;
	}
	
	:global(.dark) .view-button:hover {
		background: rgba(0, 174, 239, 0.15);
	}
	
	.active-tags {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		padding-top: 0.5rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}
	
	:global(.dark) .active-tags {
		border-color: rgba(255, 255, 255, 0.1);
	}
	
	.tags-label {
		font-size: 0.813rem;
		font-weight: 600;
		color: #64748b;
	}
	
	:global(.dark) .tags-label {
		color: #94a3b8;
	}
	
	.tag-chip {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.375rem 0.75rem;
		background: rgba(0, 174, 239, 0.1);
		border: 1px solid rgba(0, 174, 239, 0.3);
		border-radius: 0.5rem;
		font-size: 0.813rem;
		font-weight: 500;
		color: #00AEEF;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.tag-chip:hover {
		background: rgba(0, 174, 239, 0.2);
		border-color: #00AEEF;
	}
	
	.tag-close {
		font-size: 1.125rem;
		line-height: 1;
	}
	
	.clear-all {
		padding: 0.375rem 0.75rem;
		background: rgba(239, 68, 68, 0.1);
		border: 1px solid rgba(239, 68, 68, 0.3);
		border-radius: 0.5rem;
		font-size: 0.813rem;
		font-weight: 500;
		color: #ef4444;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.clear-all:hover {
		background: rgba(239, 68, 68, 0.2);
		border-color: #ef4444;
	}
</style>
