<script lang="ts">
	// WING NAVIGATION COMPONENT
	// Displays navigation between wings/categories
	// DISPOSABLE - delete and regenerate if tests fail

	import type { Wing } from '$lib/contracts';
	import { WING_CONFIGS } from '$lib/contracts/wing';

	export let currentWing: Wing | undefined = undefined;

	const wings: Wing[] = ['stories', 'music', 'apps', 'process', 'finished'];
</script>

<nav class="wing-nav">
	{#each wings as wing}
		<div class="wing-item" class:current={currentWing === wing}>
			<span class="wing-icon">{WING_CONFIGS[wing].icon}</span>
			<span class="wing-name">{WING_CONFIGS[wing].name}</span>
		</div>
	{/each}
</nav>

<style>
	.wing-nav {
		display: flex;
		gap: 1rem;
	}

	.wing-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.wing-item.current {
		font-weight: bold;
	}
</style>
