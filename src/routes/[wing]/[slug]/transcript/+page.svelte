<!-- TRANSCRIPT VIEWER PAGE -->
<!-- Displays the full conversation transcript for a project -->
<!-- DISPOSABLE - delete and regenerate if tests fail -->

<script lang="ts">
	import type { PageData } from './$types';
	import TranscriptViewer from '$lib/components/TranscriptViewer.svelte';
	import { WING_CONFIGS } from '$lib/contracts';

	export let data: PageData;

	$: ({ project, transcript } = data);
	$: wingConfig = WING_CONFIGS[project.wing];
</script>

<svelte:head>
	<title>Transcript: {project.title} - shitialmostfinished.com</title>
	<meta name="description" content="Read the full AI conversation transcript for {project.title}" />
</svelte:head>

<div class="transcript-page" data-wing={project.wing}>
	<nav class="breadcrumb">
		<a href="/">Home</a>
		<span class="separator">/</span>
		<a href="/{project.wing}">{wingConfig.name}</a>
		<span class="separator">/</span>
		<a href="/{project.wing}/{project.slug}">{project.title}</a>
		<span class="separator">/</span>
		<span class="current">Transcript</span>
	</nav>

	<header class="transcript-header">
		<h1>Transcript: {project.title}</h1>
		<p class="description">{transcript.description}</p>

		<div class="meta">
			<div class="meta-item">
				<span class="label">Created:</span>
				<time datetime={transcript.dateCreated}>
					{new Date(transcript.dateCreated).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
			</div>

			<div class="meta-item">
				<span class="label">Last Updated:</span>
				<time datetime={transcript.dateUpdated}>
					{new Date(transcript.dateUpdated).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}
				</time>
			</div>

			<div class="meta-item">
				<span class="label">Messages:</span>
				<span>{transcript.messages.length}</span>
			</div>
		</div>
	</header>

	<div class="transcript-container">
		<TranscriptViewer {transcript} />
	</div>

	<nav class="bottom-nav">
		<a href="/{project.wing}/{project.slug}" class="back-button">
			← Back to Project
		</a>
	</nav>
</div>

<style>
	.transcript-page {
		max-width: 900px;
		margin: 0 auto;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-bottom: var(--space-xl);
		font-size: 0.875rem;
		color: var(--text-secondary);
		flex-wrap: wrap;
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

	.transcript-header {
		margin-bottom: var(--space-2xl);
		padding-bottom: var(--space-xl);
		border-bottom: 2px solid var(--color-accent);
	}

	h1 {
		margin: 0 0 var(--space-md) 0;
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-accent);
	}

	.description {
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--text-secondary);
		margin-bottom: var(--space-lg);
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-lg);
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

	.transcript-container {
		margin-bottom: var(--space-2xl);
	}

	.bottom-nav {
		padding-top: var(--space-xl);
		border-top: 1px solid var(--bg-tertiary);
	}

	.back-button {
		display: inline-block;
		padding: var(--space-md) var(--space-lg);
		background: var(--bg-secondary);
		color: var(--color-accent);
		text-decoration: none;
		border: 1px solid var(--color-accent);
		border-radius: var(--radius-md);
		font-weight: 500;
		transition: all 0.2s;
	}

	.back-button:hover {
		background: var(--bg-tertiary);
	}
</style>
