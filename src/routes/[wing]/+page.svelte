<!-- WING LISTING PAGE -->
<!-- Displays all projects for a specific wing -->
<!-- DISPOSABLE - delete and regenerate if tests fail -->

<script lang="ts">
	import type { PageData } from './$types';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	export let data: PageData;

	$: ({ wing, wingConfig, projects } = data);
</script>

<svelte:head>
	<title>{wingConfig.name} - shitialmostfinished.com</title>
	<meta name="description" content="Explore {wingConfig.name.toLowerCase()} projects built with AI collaboration." />
</svelte:head>

<div class="wing-page" data-wing={wing}>
	<header class="wing-header">
		<div class="wing-title">
			<span class="wing-icon" aria-hidden="true">{wingConfig.icon}</span>
			<h2>{wingConfig.name}</h2>
		</div>
		<p class="project-count">
			{projects.length} {projects.length === 1 ? 'project' : 'projects'}
		</p>
	</header>

	{#if projects.length === 0}
		<div class="empty-state">
			<p>No projects in this wing yet.</p>
			<p class="hint">Check back soon as new projects are always in progress!</p>
		</div>
	{:else}
		<div class="project-grid">
			{#each projects as project (project.slug)}
				<ProjectCard {project} />
			{/each}
		</div>
	{/if}
</div>

<style>
	.wing-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.wing-header {
		margin-bottom: var(--space-2xl);
		padding-bottom: var(--space-lg);
		border-bottom: 2px solid var(--color-accent);
	}

	.wing-title {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		margin-bottom: var(--space-sm);
	}

	.wing-icon {
		font-size: 2.5rem;
	}

	.wing-title h2 {
		margin: 0;
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-accent);
	}

	.project-count {
		color: var(--text-secondary);
		font-size: 0.875rem;
		margin: 0;
	}

	.empty-state {
		text-align: center;
		padding: var(--space-2xl);
		color: var(--text-secondary);
	}

	.empty-state p {
		margin-bottom: var(--space-sm);
	}

	.hint {
		font-size: 0.875rem;
		color: var(--text-tertiary);
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--space-lg);
	}
</style>
