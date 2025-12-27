<script lang="ts">
	// WING NAVIGATION COMPONENT
	// Displays navigation between wings/categories
	// DISPOSABLE - delete and regenerate if tests fail

	import type { Wing } from '$lib/contracts';
	import { WING_CONFIGS } from '$lib/contracts/wing';

	export let currentWing: Wing | undefined = undefined;

	const wings: Wing[] = ['stories', 'music', 'apps', 'process', 'finished'];

	function getWingColor(wing: Wing): string {
		return WING_CONFIGS[wing].color;
	}
</script>

<nav class="wing-nav">
	{#each wings as wing}
		<div
			class="wing-item"
			class:current={currentWing === wing}
			style="--wing-color: {getWingColor(wing)}"
		>
			<span class="wing-icon">{WING_CONFIGS[wing].icon}</span>
			<span class="wing-name">{WING_CONFIGS[wing].name}</span>
		</div>
	{/each}
</nav>

<style>
	.wing-nav {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
	}

	.wing-item {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-sm) var(--space-md);
		background: var(--bg-secondary);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s ease;
		border: 1px solid transparent;
	}

	.wing-item:hover {
		background: var(--bg-tertiary);
		border-color: var(--wing-color);
	}

	.wing-item.current {
		background: var(--bg-tertiary);
		border-color: var(--wing-color);
		color: var(--wing-color);
		font-weight: 600;
	}

	.wing-icon {
		font-size: 1.125rem;
	}

	.wing-name {
		font-size: 0.875rem;
	}
</style>
