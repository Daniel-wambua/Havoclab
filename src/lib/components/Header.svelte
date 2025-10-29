<script lang="ts">
	import { ACCENT_COLOR } from '$lib/constants';
	import ThemeToggle from './ThemeToggle.svelte';
	import SearchBar from './SearchBar.svelte';
</script>

<header class="header">
	<div class="header-container">
		<div class="logo-section">
			<span class="logo-icon">🧬</span>
			<h1 class="logo-text">
				HavocLab
			</h1>
		</div>
		
		<div class="search-section">
			<SearchBar />
		</div>
		
		<nav class="nav-section">
			<a 
				href="https://github.com/Daniel-wambua" 
				target="_blank" 
				rel="noopener noreferrer"
				class="nav-link"
			>
				<svg class="nav-icon" viewBox="0 0 24 24" fill="currentColor">
					<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
				</svg>
				<span class="nav-label">GitHub</span>
			</a>
			<ThemeToggle />
		</nav>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}
	
	:global(.dark) .header {
		background: rgba(15, 23, 42, 0.8);
		border-bottom-color: rgba(255, 255, 255, 0.1);
	}
	
	.header-container {
		max-width: 1280px;
		margin: 0 auto;
		padding: 1rem 1.5rem;
		display: flex;
		align-items: center;
		gap: 2rem;
	}
	
	.logo-section {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}
	
	.logo-icon {
		font-size: 1.875rem;
	}
	
	.logo-text {
		font-size: 1.5rem;
		font-weight: 700;
		background: linear-gradient(135deg, #00AEEF 0%, #3b82f6 100%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	
	.search-section {
		flex: 1;
		display: none;
	}
	
	@media (min-width: 768px) {
		.search-section {
			display: block;
		}
	}
	
	.nav-section {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	
	.nav-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		color: #64748b;
		text-decoration: none;
		font-weight: 500;
		border-radius: 0.5rem;
		transition: all 0.2s ease;
	}
	
	.nav-link:hover {
		color: #00AEEF;
		background: rgba(0, 174, 239, 0.1);
	}
	
	:global(.dark) .nav-link {
		color: #94a3b8;
	}
	
	:global(.dark) .nav-link:hover {
		color: #00AEEF;
		background: rgba(0, 174, 239, 0.15);
	}
	
	.nav-icon {
		width: 1.25rem;
		height: 1.25rem;
	}
	
	.nav-label {
		display: none;
	}
	
	@media (min-width: 640px) {
		.nav-label {
			display: inline;
		}
	}
</style>
