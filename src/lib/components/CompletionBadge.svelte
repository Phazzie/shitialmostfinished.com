<script lang="ts">
	// COMPLETION BADGE COMPONENT
	// Displays project completion percentage
	// DISPOSABLE - delete and regenerate if tests fail

	export let completion: number;

	// Clamp value to 0-100 and round to nearest integer
	// eslint-disable-next-line @typescript-eslint/no-unused-vars -- ESLint false positive: 'clamped' is used in template
	$: clamped = Math.max(0, Math.min(100, Math.round(completion)));
</script>

<div class="completion-badge">
	<span>{clamped}%</span>
</div>

<style>
	.completion-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-accent);
		color: var(--bg-primary);
		border-radius: var(--radius-sm);
		font-size: 0.875rem;
		font-weight: 700;
		min-width: 3rem;
	}
</style>
