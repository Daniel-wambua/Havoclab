<script lang="ts">
	export let message: string = 'An error occurred';
	export let onRetry: (() => void) | undefined = undefined;
</script>

<div class="error-container">
	<div class="error-icon">⚠️</div>
	<h3 class="error-title">Oops! Something went wrong</h3>
	<p class="error-message">{message}</p>
	
	{#if onRetry}
		<button on:click={onRetry} class="retry-button">
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
			</svg>
			Try Again
		</button>
	{/if}
</div>

<style>
	.error-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5rem 2rem;
		text-align: center;
	}
	
	.error-icon {
		font-size: 4rem;
		margin-bottom: 1.5rem;
		animation: shake 0.5s ease-in-out;
	}
	
	@keyframes shake {
		0%, 100% { transform: translateX(0); }
		25% { transform: translateX(-10px); }
		75% { transform: translateX(10px); }
	}
	
	.error-title {
		font-size: 1.5rem;
		font-weight: 700;
		color: #ef4444;
		margin-bottom: 0.75rem;
	}
	
	.error-message {
		font-size: 1rem;
		color: #64748b;
		margin-bottom: 2rem;
		max-width: 32rem;
	}
	
	:global(.dark) .error-message {
		color: #94a3b8;
	}
	
	.retry-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: rgba(0, 174, 239, 0.15);
		border: 1px solid rgba(0, 174, 239, 0.3);
		border-radius: 0.5rem;
		font-weight: 600;
		font-size: 0.938rem;
		color: #00AEEF;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.retry-button:hover {
		background: rgba(0, 174, 239, 0.25);
		border-color: #00AEEF;
		transform: translateY(-1px);
	}
	
	.retry-button svg {
		width: 1.25rem;
		height: 1.25rem;
		stroke-width: 2;
	}
</style>
