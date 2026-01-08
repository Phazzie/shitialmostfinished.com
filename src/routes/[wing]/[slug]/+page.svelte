<!-- PROJECT DETAIL PAGE -->
<!-- Displays full details for a specific project -->
<!-- DISPOSABLE - delete and regenerate if tests fail -->

<script lang="ts">
	import type { PageData } from './$types';
	import CompletionBadge from '$lib/components/CompletionBadge.svelte';
	import TagBadge from '$lib/components/TagBadge.svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	import { WING_CONFIGS } from '$lib/contracts';
	import { browser } from '$app/environment';
	import DOMPurify from 'dompurify';
	import { formatDate } from '$lib/utils/date';

	export let data: PageData;

	$: ({ project, relatedProjects } = data);
	$: wingConfig = WING_CONFIGS[project.wing];

	// AI source color mapping
	const aiSourceColors: Record<string, string> = {
		claude: 'var(--color-claude)',
		chatgpt: 'var(--color-chatgpt)',
		gemini: 'var(--color-gemini)',
		mixed: 'var(--color-mixed)'
	};

	$: aiSourceColor = aiSourceColors[project.aiSource];

	// Sanitize HTML content to prevent XSS attacks
	// Only sanitize in browser context (DOMPurify requires DOM APIs)
	$: sanitizedQuickVersion = browser
		? DOMPurify.sanitize(project.quickVersion)
		: project.quickVersion;
	$: sanitizedRecap = browser ? DOMPurify.sanitize(project.recap) : project.recap;
</script>

<svelte:head>
	<title>{project.title} - shitialmostfinished.com</title>
	<meta name="description" content={project.pitch} />
</svelte:head>

<div class="project-detail" data-wing={project.wing}>
	<nav class="breadcrumb" aria-label="Breadcrumb">
		<a href="/">Home</a>
		<span class="separator" aria-hidden="true">/</span>
		<a href="/{project.wing}">{wingConfig.name}</a>
		<span class="separator" aria-hidden="true">/</span>
		<span class="current">{project.title}</span>
	</nav>

	<header class="project-header">
		<div class="title-row">
			<h1>{project.title}</h1>
			<CompletionBadge completion={project.completion} />
		</div>

		<div class="meta">
			<div class="meta-item">
				<span class="label">Wing:</span>
				<a href="/{project.wing}" class="wing-link">
					<span class="wing-icon" aria-hidden="true">{wingConfig.icon}</span>
					{wingConfig.name}
				</a>
			</div>

			<div class="meta-item">
				<span class="label">AI Source:</span>
				<span class="ai-source" style="color: {aiSourceColor}">
					{project.aiSource}
				</span>
			</div>

			<div class="meta-item">
				<span class="label">Last Updated:</span>
				<time datetime={project.dateUpdated}>
					{formatDate(project.dateUpdated)}
				</time>
			</div>
		</div>

		{#if project.tags.length > 0}
			<div class="tags">
				{#each project.tags as tag (tag)}
					<TagBadge {tag} />
				{/each}
			</div>
		{/if}
	</header>

	<section class="pitch">
		<h2>The Pitch</h2>
		<p class="pitch-text">{project.pitch}</p>
	</section>

	<section class="quick-version">
		<h2>Quick Version</h2>
		<div class="markdown-content">
			{@html sanitizedQuickVersion}
		</div>
	</section>

	<section class="recap">
		<h2>The Story So Far</h2>
		<div class="markdown-content">
			{@html sanitizedRecap}
		</div>
	</section>

	{#if project.hasTranscript}
		<section class="transcript-cta">
			<h3>See How It Was Made</h3>
			<p>Read the full conversation transcript to see every prompt, iteration, and decision.</p>
			<a href="/{project.wing}/{project.slug}/transcript" class="transcript-button">
				View Transcript
			</a>
		</section>
	{/if}

	{#if relatedProjects.length > 0}
		<section class="related">
			<h3>Related Projects</h3>
			<div class="related-grid">
				{#each relatedProjects as relatedProject (relatedProject.slug)}
					<ProjectCard project={relatedProject} />
				{/each}
			</div>
		</section>
	{/if}
</div>

<style>
	.project-detail {
		max-width: 800px;
		margin: 0 auto;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-bottom: var(--space-xl);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.breadcrumb a {
		color: var(--color-accent);
		text-decoration: none;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.separator {
		color: var(--text-tertiary);
	}

	.current {
		color: var(--text-primary);
	}

	.project-header {
		margin-bottom: var(--space-2xl);
		padding-bottom: var(--space-xl);
		border-bottom: 2px solid var(--color-accent);
	}

	.title-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		margin-bottom: var(--space-lg);
	}

	h1 {
		margin: 0;
		font-size: 2.5rem;
		font-weight: 700;
		color: var(--color-accent);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-lg);
		margin-bottom: var(--space-md);
	}

	.meta-item {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: 0.875rem;
	}

	.label {
		color: var(--text-tertiary);
	}

	.wing-link {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		color: var(--color-accent);
		text-decoration: none;
	}

	.wing-link:hover {
		text-decoration: underline;
	}

	.wing-icon {
		font-size: 1rem;
	}

	.ai-source {
		font-weight: 600;
		text-transform: capitalize;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	section {
		margin-bottom: var(--space-2xl);
	}

	h2 {
		font-size: 1.75rem;
		margin-bottom: var(--space-md);
		font-weight: 600;
	}

	h3 {
		font-size: 1.5rem;
		margin-bottom: var(--space-md);
		font-weight: 600;
	}

	.pitch-text {
		font-size: 1.25rem;
		line-height: 1.6;
		color: var(--text-secondary);
	}

	.markdown-content {
		line-height: 1.7;
		color: var(--text-secondary);
	}

	.transcript-cta {
		text-align: center;
		padding: var(--space-2xl);
		background: var(--bg-secondary);
		border: 2px solid var(--color-accent);
		border-radius: var(--radius-md);
	}

	.transcript-cta h3 {
		margin-top: 0;
		color: var(--color-accent);
	}

	.transcript-cta p {
		margin-bottom: var(--space-lg);
		color: var(--text-secondary);
	}

	.transcript-button {
		display: inline-block;
		padding: var(--space-md) var(--space-xl);
		background: var(--color-accent);
		color: var(--bg-primary);
		text-decoration: none;
		border-radius: var(--radius-md);
		font-weight: 600;
		transition: opacity 0.2s;
	}

	.transcript-button:hover {
		opacity: 0.8;
	}

	.related-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: var(--space-lg);
	}
</style>
