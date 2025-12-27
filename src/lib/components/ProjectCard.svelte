<script lang="ts">
	// PROJECT CARD COMPONENT
	// Displays project information as a card
	// DISPOSABLE - delete and regenerate if tests fail

	import type { Project } from '$lib/contracts';
	import CompletionBadge from './CompletionBadge.svelte';
	import TagBadge from './TagBadge.svelte';

	export let project: Project;
</script>

<div class="project-card">
	<div class="card-header">
		<h3 class="project-title">{project.title}</h3>
		<CompletionBadge completion={project.completion} />
	</div>

	<div class="project-meta">
		<span class="project-wing">{project.wing}</span>
		<span class="project-ai-source">{project.aiSource}</span>
		{#if project.hasTranscript}
			<span class="has-transcript">Has transcript</span>
		{/if}
	</div>

	<p class="project-pitch">{project.pitch}</p>

	<div class="project-tags">
		{#each project.tags as tag}
			<TagBadge {tag} />
		{/each}
	</div>
</div>

<style>
	.project-card {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.project-meta {
		display: flex;
		gap: 0.5rem;
		font-size: 0.875rem;
	}

	.project-tags {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
	}
</style>
