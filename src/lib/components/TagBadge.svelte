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
	}
</style>
