// WING CONTRACT
// Static configuration - wings don't change at runtime
// IMMUTABLE

import type { Wing } from './project';

export interface WingConfig {
	id: Wing;
	name: string;
	color: string; // CSS hex value
	description: string;
	icon: string; // Emoji
}

// Using Record instead of array for O(1) lookup performance
// TypeScript ensures all Wing types are handled at compile time
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

export function getWingConfig(wingId: Wing): WingConfig {
	const config = WING_CONFIGS[wingId];
	if (!config) throw new Error(`Unknown wing: ${wingId}`);
	return { id: wingId, ...config };
}
