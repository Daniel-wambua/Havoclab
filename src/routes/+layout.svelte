<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	
	// Initialize analytics in production
	if (!dev) {
		inject();
		injectSpeedInsights();
	}
</script>

<slot />
