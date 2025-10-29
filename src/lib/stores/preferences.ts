import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type SortOption = 'stars' | 'forks' | 'updated' | 'name';
export type ViewMode = 'grid' | 'list';

interface Preferences {
	sortBy: SortOption;
	viewMode: ViewMode;
	searchQuery: string;
	selectedTags: string[];
}

const defaultPreferences: Preferences = {
	sortBy: 'stars',
	viewMode: 'grid',
	searchQuery: '',
	selectedTags: []
};

function getStoredPreferences(): Preferences {
	if (!browser) return defaultPreferences;
	
	try {
		const stored = localStorage.getItem('preferences');
		return stored ? { ...defaultPreferences, ...JSON.parse(stored) } : defaultPreferences;
	} catch {
		return defaultPreferences;
	}
}

function createPreferencesStore() {
	const { subscribe, set, update } = writable<Preferences>(getStoredPreferences());
	
	function persist(prefs: Preferences) {
		if (browser) {
			// Don't persist search query and selected tags
			const { searchQuery, selectedTags, ...toPersist } = prefs;
			localStorage.setItem('preferences', JSON.stringify(toPersist));
		}
	}
	
	return {
		subscribe,
		setSortBy: (sortBy: SortOption) => update(prefs => {
			const updated = { ...prefs, sortBy };
			persist(updated);
			return updated;
		}),
		setViewMode: (viewMode: ViewMode) => update(prefs => {
			const updated = { ...prefs, viewMode };
			persist(updated);
			return updated;
		}),
		setSearchQuery: (searchQuery: string) => update(prefs => ({
			...prefs,
			searchQuery
		})),
		toggleTag: (tag: string) => update(prefs => {
			const selectedTags = prefs.selectedTags.includes(tag)
				? prefs.selectedTags.filter(t => t !== tag)
				: [...prefs.selectedTags, tag];
			return { ...prefs, selectedTags };
		}),
		clearTags: () => update(prefs => ({ ...prefs, selectedTags: [] })),
		reset: () => {
			if (browser) localStorage.removeItem('preferences');
			set(defaultPreferences);
		}
	};
}

export const preferences = createPreferencesStore();
