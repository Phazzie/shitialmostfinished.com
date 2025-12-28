<!--
	WING NAVIGATION COMPONENT

	WHAT: Navigation UI displaying all 5 wing categories with icons and names.
	      Highlights the current wing if provided.

	WHY: Central navigation element for the portfolio. Allows users to browse
	     projects by category. The dynamic color system gives each wing its
	     own visual identity while maintaining theme consistency.

	HOW: Uses WING_CONFIGS to get icon/name for each wing. Implements dynamic
	     theming by:
	     1. Setting --wing-color CSS variable per item (inline style)
	     2. Using var(--wing-color) in CSS for borders/text
	     3. Each wing gets its unique color from frozen contracts

	PROPS:
	- currentWing: Wing | undefined - Which wing is currently active (optional)

	INNOVATION: This component demonstrates the dynamic CSS variable pattern.
	            Instead of generating different CSS classes or inline styles,
	            we inject wing-specific colors as CSS variables, letting the
	            static CSS use them. Clean separation of data and styling.

	SDD STATUS: ✅ DISPOSABLE - Delete and regenerate if tests fail
	PHASE: 6 (Styled with theme system)
	TESTED BY: src/lib/components/WingNav.test.ts (8 tests)
-->

<script lang="ts">
	import type { Wing } from '$lib/contracts';
	import { WING_CONFIGS } from '$lib/contracts/wing';

	/**
	 * currentWing - Optional prop to highlight the active wing
	 *
	 * If provided, the matching wing item gets the .current class which:
	 * - Changes background to tertiary
	 * - Adds wing-colored border
	 * - Changes text color to wing color
	 * - Increases font weight
	 *
	 * If undefined, no wing is highlighted (used in root layout)
	 */
	export let currentWing: Wing | undefined = undefined;

	/**
	 * wings - Hardcoded array of all 5 wings in display order
	 *
	 * Order chosen for visual flow: Stories → Music → Apps → Process → Finished
	 * Could alternatively use Object.keys(WING_CONFIGS) for dynamic derivation,
	 * but explicit order is clearer and matches design intent.
	 */
	const wings: Wing[] = ['stories', 'music', 'apps', 'process', 'finished'];

	/**
	 * getWingColor - Extract wing color from WING_CONFIGS
	 *
	 * Helper function that returns the CSS hex color for a wing.
	 * This color is injected as --wing-color CSS variable for each item.
	 *
	 * @param wing - The wing to get color for
	 * @returns CSS hex color string (e.g., "#06b6d4" for music)
	 */
	function getWingColor(wing: Wing): string {
		return WING_CONFIGS[wing].color;
	}
</script>

<!--
	TEMPLATE: Horizontal navigation with 5 wing items

	Key Svelte features used:
	- {#each} to iterate over wings array
	- class:current conditional class binding
	- style attribute with dynamic CSS variable injection
	- Direct WING_CONFIGS lookups for icon and name
-->
<nav class="wing-nav">
	{#each wings as wing}
		<!--
			Each wing item gets its own --wing-color variable via inline style.
			This CSS variable is then used in hover/current states below.
		-->
		<div
			class="wing-item"
			class:current={currentWing === wing}
			style="--wing-color: {getWingColor(wing)}"
		>
			<span class="wing-icon">{WING_CONFIGS[wing].icon}</span>
			<span class="wing-name">{WING_CONFIGS[wing].name}</span>
		</div>
	{/each}
</nav>

<style>
	/* Container - Horizontal flexbox with wrapping for responsive layout */
	.wing-nav {
		display: flex;
		gap: var(--space-md); /* Spacing between wings */
		flex-wrap: wrap; /* Wraps to new line on small screens */
	}

	/*
	 * Wing item - Base state
	 *
	 * Uses theme variables for all spacing, colors, borders.
	 * Transition on 'all' properties for smooth hover/active effects.
	 */
	.wing-item {
		display: flex;
		align-items: center;
		gap: var(--space-xs); /* Gap between icon and name */
		padding: var(--space-sm) var(--space-md);
		background: var(--bg-secondary);
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;
		transition: all 0.2s ease; /* Smooth hover transitions */
		border: 1px solid transparent; /* Transparent by default */
	}

	/*
	 * Hover state - Uses injected --wing-color variable
	 *
	 * This is the key innovation: var(--wing-color) references the inline
	 * style we set per item, giving each wing its own color dynamically.
	 */
	.wing-item:hover {
		background: var(--bg-tertiary); /* Slightly darker background */
		border-color: var(--wing-color); /* Wing-specific colored border */
	}

	/*
	 * Current/active wing - Highlighted state
	 *
	 * Applied when currentWing prop matches this wing.
	 * Uses wing-specific color for border and text.
	 */
	.wing-item.current {
		background: var(--bg-tertiary);
		border-color: var(--wing-color); /* Wing-colored border */
		color: var(--wing-color); /* Wing-colored text */
		font-weight: 600; /* Bolder for emphasis */
	}

	/* Icon styling - Slightly larger than text */
	.wing-icon {
		font-size: 1.125rem; /* 18px - makes emoji prominent */
	}

	/* Name styling - Smaller, compact text */
	.wing-name {
		font-size: 0.875rem; /* 14px - keeps nav compact */
	}
</style>
