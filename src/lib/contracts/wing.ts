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

export const WING_CONFIGS: WingConfig[] = [
	{
		id: 'stories',
		name: 'Stories',
		color: '#be123c',
		description: 'Written works and narratives',
		icon: '📖'
	},
	{
		id: 'music',
		name: 'Music',
		color: '#06b6d4',
		description: 'Songs and sonic experiments',
		icon: '🎵'
	},
	{
		id: 'apps',
		name: 'Apps',
		color: '#84cc16',
		description: 'Tools and software',
		icon: '💻'
	},
	{
		id: 'process',
		name: 'Process',
		color: '#f97316',
		description: 'How the sausage gets made',
		icon: '🔧'
	},
	{
		id: 'finished',
		name: 'Finished',
		color: '#fbbf24',
		description: 'Shit I actually finished',
		icon: '✨'
	}
];

export function getWingConfig(wingId: Wing): WingConfig {
	const config = WING_CONFIGS.find((w) => w.id === wingId);
	if (!config) throw new Error(`Unknown wing: ${wingId}`);
	return config;
}
