import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

// Get initial theme from localStorage or system preference
function getInitialTheme(): Theme {
	if (!browser) return 'dark';
	
	const stored = localStorage.getItem('theme') as Theme | null;
	if (stored) return stored;
	
	// Check system preference
	if (window.matchMedia('(prefers-color-scheme: light)').matches) {
		return 'light';
	}
	
	return 'dark';
}

// Create theme store
function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>(getInitialTheme());
	
	return {
		subscribe,
		toggle: () => update(theme => {
			const newTheme = theme === 'dark' ? 'light' : 'dark';
			if (browser) {
				localStorage.setItem('theme', newTheme);
				document.documentElement.classList.toggle('dark', newTheme === 'dark');
			}
			return newTheme;
		}),
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				document.documentElement.classList.toggle('dark', theme === 'dark');
			}
			set(theme);
		}
	};
}

export const theme = createThemeStore();

// Initialize theme on page load
if (browser) {
	const initialTheme = getInitialTheme();
	document.documentElement.classList.toggle('dark', initialTheme === 'dark');
}
