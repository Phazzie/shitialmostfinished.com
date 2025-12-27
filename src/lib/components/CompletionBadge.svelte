<script lang="ts">
	// COMPLETION BADGE COMPONENT
	// Displays project completion percentage
	// DISPOSABLE - delete and regenerate if tests fail

	export let completion: number;

	// Clamp value to 0-100 and round to nearest integer
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
	}
</style>
