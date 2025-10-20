<script lang="ts">
	export let searchQuery = '';
	export let selectedLanguage = '';
	export let languages: string[] = [];
</script>

<div class="glass rounded-2xl p-6 mb-8">
	<div class="flex flex-col md:flex-row gap-4">
		<div class="flex-1">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="🔍 Search projects..."
				class="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-lg focus:outline-none focus:border-accent transition-colors"
			/>
		</div>
		<div class="md:w-64">
			<select
				bind:value={selectedLanguage}
				class="w-full px-4 py-3 bg-dark-bg/50 border border-dark-border rounded-lg focus:outline-none focus:border-accent transition-colors cursor-pointer"
			>
				<option value="">All Languages</option>
				{#each languages as lang}
					<option value={lang}>{lang}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
