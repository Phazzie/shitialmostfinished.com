/**
 * WING CONFIGURATION CONTRACT
 *
 * WHAT: Static metadata for each wing category (colors, icons, names, descriptions).
 *       Provides a lookup table for wing display properties.
 *
 * WHY: Centralizes all wing-related UI constants. Instead of scattering wing colors
 *      and icons throughout components, we define them once here. This makes it
 *      easy to ensure consistency and enables dynamic theming (see WingNav component).
 *
 * HOW: Uses TypeScript Record<Wing, ...> type to ensure all 5 wings have configuration.
 *      - Record provides O(1) lookup performance (better than array.find())
 *      - TypeScript compiler enforces exhaustiveness (can't forget a wing)
 *      - Omit<WingConfig, 'id'> avoids redundancy (id is the key)
 *      - getWingConfig() helper adds the id back for components that need full object
 *
 * USAGE EXAMPLE:
 *   const musicColor = WING_CONFIGS.music.color; // "#06b6d4"
 *   const fullConfig = getWingConfig('apps'); // { id: 'apps', name: 'Apps', ... }
 *
 * SDD STATUS: 🔒 FROZEN AFTER PHASE 2 - DO NOT MODIFY
 */

import type { Wing } from './project';

/**
 * WingConfig - Complete metadata for a wing category
 *
 * Contains all display properties needed to render a wing in the UI:
 * - id: The Wing type (music/apps/stories/process/finished)
 * - name: Human-readable label for display
 * - color: CSS hex color for theming (#rrggbb format)
 * - description: Short explanation of what goes in this wing
 * - icon: Emoji character for visual identification
 */
export interface WingConfig {
	id: Wing;
	name: string;
	color: string; // CSS hex value
	description: string;
	icon: string; // Emoji
}

/**
 * WING_CONFIGS - Lookup table mapping wing IDs to their metadata
 *
 * Design decisions:
 * - Record type ensures compile-time exhaustiveness checking
 * - O(1) lookup performance (direct property access)
 * - Omits 'id' field to avoid redundancy (id is the Record key)
 * - Colors chosen for visual distinctiveness and accessibility
 */
export const WING_CONFIGS: Record<Wing, Omit<WingConfig, 'id'>> = {
	stories: {
		name: 'Stories',
		color: '#be123c',
		description: 'Written works and narratives',
		icon: '📖'
	},
	music: {
		name: 'Music',
		color: '#06b6d4',
		description: 'Songs and sonic experiments',
		icon: '🎵'
	},
	apps: {
		name: 'Apps',
		color: '#84cc16',
		description: 'Tools and software',
		icon: '💻'
	},
	process: {
		name: 'Process',
		color: '#f97316',
		description: 'How the sausage gets made',
		icon: '🔧'
	},
	finished: {
		name: 'Finished',
		color: '#fbbf24',
		description: 'Shit I actually finished',
		icon: '✨'
	}
};

/**
 * getWingConfig - Convert a Wing ID to a complete WingConfig object
 *
 * Takes a wing ID and returns the full configuration including the ID itself.
 * Useful when components need the complete object rather than lookup.
 *
 * @param wingId - The wing to get configuration for
 * @returns Complete WingConfig with id field populated
 * @throws Error if wingId is not a valid Wing (shouldn't happen with TypeScript)
 *
 * EXAMPLE:
 *   const config = getWingConfig('music');
 *   // Returns: { id: 'music', name: 'Music', color: '#06b6d4', ... }
 */
export function getWingConfig(wingId: Wing): WingConfig {
	const config = WING_CONFIGS[wingId];
	// Defensive check - TypeScript prevents this, but good practice
	if (!config) throw new Error(`Unknown wing: ${wingId}`);
	return { id: wingId, ...config };
}
