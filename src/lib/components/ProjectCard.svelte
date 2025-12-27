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
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--bg-secondary);
		border: 1px solid var(--bg-tertiary);
		border-radius: var(--radius-md);
		transition: all 0.2s ease;
	}

	.project-card:hover {
		background: var(--bg-tertiary);
		border-color: var(--color-accent);
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.project-title {
		color: var(--text-primary);
		margin: 0;
		font-size: 1.125rem;
	}

	.project-meta {
		display: flex;
		gap: var(--space-sm);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.project-wing {
		color: var(--color-accent);
		font-weight: 600;
	}

	.project-ai-source {
		color: var(--color-claude);
	}

	.has-transcript {
		color: var(--color-highlight);
	}

	.project-pitch {
		color: var(--text-primary);
		margin: var(--space-sm) 0;
		line-height: 1.5;
	}

	.project-tags {
		display: flex;
		gap: var(--space-xs);
		flex-wrap: wrap;
	}
</style>
