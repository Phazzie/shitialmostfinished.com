<!-- ROOT LAYOUT -->
<!-- Main layout with WingNav for site-wide navigation -->
<!-- DISPOSABLE - delete and regenerate if tests fail -->

<script lang="ts">
	import '../app.css';
	import '$lib/styles/theme.css';
	import WingNav from '$lib/components/WingNav.svelte';
	import { page } from '$app/stores';

	// Extract current wing from URL path for active state
	$: currentPath = $page.url.pathname;
	$: currentWing = currentPath.split('/')[1] || null;
</script>

<div class="app">
	<header class="header">
		<a href="/" class="site-title">
			<h1>shitialmostfinished.com</h1>
			<p class="tagline">process as product</p>
		</a>

		<WingNav currentWing={currentWing} />
	</header>

	<main class="main">
		<slot />
	</main>

	<footer class="footer">
		<p>Built with Seam-Driven Development</p>
	</footer>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background: var(--bg-primary);
		color: var(--text-primary);
	}

	.header {
		padding: var(--space-xl) var(--space-lg);
		border-bottom: 1px solid var(--bg-tertiary);
	}

	.site-title {
		text-decoration: none;
		color: inherit;
		display: inline-block;
		margin-bottom: var(--space-lg);
	}

	.site-title h1 {
		font-size: 1.5rem;
		margin: 0;
		font-weight: 600;
	}

	.tagline {
		font-size: 0.875rem;
		color: var(--text-secondary);
		margin: var(--space-xs) 0 0;
		font-style: italic;
	}

	.main {
		flex: 1;
		padding: var(--space-xl) var(--space-lg);
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
	}

	.footer {
		padding: var(--space-lg);
		text-align: center;
		color: var(--text-tertiary);
		font-size: 0.875rem;
		border-top: 1px solid var(--bg-tertiary);
	}

	.footer p {
		margin: 0;
	}
</style>
