<script lang="ts">
	// TAG BADGE COMPONENT
	// Displays process tag badges
	// DISPOSABLE - delete and regenerate if tests fail

	import type { ProcessTag } from '$lib/contracts';

	export let tag: ProcessTag;
</script>

<div class="tag-badge">
	<span>{tag}</span>
</div>

<style>
	.tag-badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-xs) var(--space-sm);
		background: var(--bg-tertiary);
		color: var(--color-process);
		border-radius: var(--radius-sm);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.025em;
		border: 1px solid var(--color-process);
	}
</style>
