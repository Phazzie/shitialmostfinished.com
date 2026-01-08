<!-- HOME PAGE -->
<!-- Landing page introducing the site philosophy -->
<!-- DISPOSABLE - delete and regenerate if tests fail -->

<script lang="ts">
	import { WING_CONFIGS, VALID_WINGS, type Wing } from '$lib/contracts';
</script>

<svelte:head>
	<title>shitialmostfinished.com - process as product</title>
	<meta name="description" content="A portfolio of creative projects built with AI collaboration, showcasing the journey from idea to completion." />
</svelte:head>

<div class="home">
	<section class="hero">
		<h2>Welcome to the Workshop</h2>
		<p class="lead">
			This is a portfolio of unfinished things. Projects in progress. Ideas being wrestled into existence.
			The messy middle where the magic happens.
		</p>
		<p>
			Every project here was made in collaboration with AI (Claude, ChatGPT, Gemini, or some combination).
			Every conversation is preserved. Every wrong turn documented. Every breakthrough celebrated.
		</p>
	</section>

	<section class="philosophy">
		<h3>The Philosophy</h3>
		<div class="principles">
			<div class="principle">
				<h4>Process as Product</h4>
				<p>The story of how something was made matters as much as the final result.</p>
			</div>
			<div class="principle">
				<h4>AI Collaboration</h4>
				<p>These aren't AI-generated projects—they're AI-collaborated. The prompts, iterations, and conversations are the real work.</p>
			</div>
			<div class="principle">
				<h4>Seam-Driven Development</h4>
				<p>A methodology where contracts and tests are frozen, but implementations can be regenerated endlessly.</p>
			</div>
			<div class="principle">
				<h4>Radical Transparency</h4>
				<p>Full transcripts available for every project. See exactly how the sausage gets made.</p>
			</div>
		</div>
	</section>

	<section class="wings">
		<h3>Explore the Five Wings</h3>
		<div class="wing-grid">
			{#each VALID_WINGS as wing}
				<a href="/{wing}" class="wing-card" data-wing={wing}>
					<span class="wing-icon" aria-hidden="true">{WING_CONFIGS[wing].icon}</span>
					<h4>{WING_CONFIGS[wing].name}</h4>
				</a>
			{/each}
		</div>
	</section>
</div>

<style>
	.home {
		max-width: 800px;
		margin: 0 auto;
	}

	.hero {
		margin-bottom: var(--space-2xl);
	}

	.hero h2 {
		font-size: 2.5rem;
		margin-bottom: var(--space-lg);
		font-weight: 700;
	}

	.lead {
		font-size: 1.25rem;
		color: var(--text-secondary);
		margin-bottom: var(--space-md);
		line-height: 1.6;
	}

	.hero p {
		color: var(--text-secondary);
		line-height: 1.7;
	}

	.philosophy,
	.wings {
		margin-bottom: var(--space-2xl);
	}

	.philosophy h3,
	.wings h3 {
		font-size: 1.75rem;
		margin-bottom: var(--space-lg);
		font-weight: 600;
	}

	.principles {
		display: grid;
		gap: var(--space-lg);
	}

	.principle h4 {
		color: var(--color-accent);
		margin-bottom: var(--space-sm);
		font-weight: 600;
	}

	.principle p {
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.wing-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: var(--space-md);
	}

	.wing-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--space-xl);
		background: var(--bg-secondary);
		border: 2px solid transparent;
		border-radius: var(--radius-md);
		text-decoration: none;
		color: inherit;
		transition: all 0.2s;
	}

	.wing-card:hover {
		border-color: var(--color-accent);
		background: var(--bg-tertiary);
	}

	.wing-icon {
		font-size: 2rem;
		margin-bottom: var(--space-sm);
	}

	.wing-card h4 {
		margin: 0;
		font-weight: 600;
		color: var(--color-accent);
	}
</style>
