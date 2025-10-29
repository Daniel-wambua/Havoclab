<div class="loading-container">
	<div class="loading-spinner"></div>
	<p class="loading-text">Loading projects...</p>
</div>

<style>
	.loading-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 5rem 2rem;
	}
	
	.loading-spinner {
		width: 4rem;
		height: 4rem;
		border: 3px solid rgba(0, 174, 239, 0.1);
		border-top-color: #00AEEF;
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
		margin-bottom: 1.5rem;
	}
	
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	
	.loading-text {
		font-size: 1rem;
		color: #64748b;
		font-weight: 500;
	}
	
	:global(.dark) .loading-text {
		color: #94a3b8;
	}
</style>
