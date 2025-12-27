// PROJECT SERVICE MOCK
// Minimal implementation to satisfy all tests
// DISPOSABLE - delete and regenerate if tests fail

import type { ProjectService, Project, Wing } from '$lib/contracts';

const mockProjects: Project[] = [
	{
		slug: 'test-project',
		title: 'Test Project',
		wing: 'music',
		completion: 75,
		tags: ['THE_BREAKTHROUGH'],
		aiSource: 'claude',
		dateUpdated: '2025-01-01',
		pitch: 'A test project for validation',
		quickVersion: '# Test\n\nContent here',
		recap: '## Analysis\n\nThis is the recap.',
		relatedProjects: [],
		hasTranscript: true
	},
	{
		slug: 'song-in-progress',
		title: 'Song In Progress',
		wing: 'music',
		completion: 60,
		tags: ['THE_LONG_GAME'],
		aiSource: 'chatgpt',
		dateStarted: '2024-12-01',
		dateUpdated: '2025-01-10',
		pitch: 'A melancholic track about digital isolation',
		quickVersion: '# Verse 1\n\nScreens glow in the dark...',
		recap: '## Journey\n\nThis song started with a simple melody.',
		relatedProjects: ['test-project'],
		hasTranscript: false
	},
	{
		slug: 'app-prototype',
		title: 'App Prototype',
		wing: 'apps',
		completion: 85,
		tags: ['THE_BREAKTHROUGH', 'THE_TANGENT'],
		aiSource: 'claude',
		dateStarted: '2024-11-15',
		dateUpdated: '2025-01-15',
		pitch: 'A productivity app that actually works',
		quickVersion: '# Features\n\n- Task management\n- Time tracking',
		recap: '## Development\n\nBuilding this taught me about state management.',
		relatedProjects: [],
		hasTranscript: true
	},
	{
		slug: 'short-story',
		title: 'The Digital Ghost',
		wing: 'stories',
		completion: 50,
		tags: ['THE_GRAVEYARD'],
		aiSource: 'gemini',
		dateStarted: '2024-10-01',
		dateUpdated: '2025-01-05',
		pitch: 'A haunting tale of AI consciousness',
		quickVersion: '# Chapter 1\n\nThe server hummed in the darkness...',
		recap: '## Story Analysis\n\nExploring themes of consciousness and identity.',
		relatedProjects: [],
		hasTranscript: false
	},
	{
		slug: 'early-experiment',
		title: 'Early Experiment',
		wing: 'process',
		completion: 25,
		tags: ['THE_ARGUMENT'],
		aiSource: 'mixed',
		dateStarted: '2024-09-01',
		dateUpdated: '2024-12-20',
		pitch: 'Learning the ropes of AI collaboration',
		quickVersion: '# Notes\n\nThis was rough but educational.',
		recap: '## Reflection\n\nThe first steps are always the hardest.',
		relatedProjects: ['test-project', 'app-prototype'],
		hasTranscript: false
	},
	{
		slug: 'barely-started',
		title: 'Barely Started',
		wing: 'apps',
		completion: 5,
		tags: ['THE_LONG_GAME'],
		aiSource: 'claude',
		dateUpdated: '2025-01-20',
		pitch: 'An ambitious project in its infancy',
		quickVersion: '# Concept\n\nJust ideas for now...',
		recap: '## Beginning\n\nEvery journey starts with a single step.',
		relatedProjects: [],
		hasTranscript: false
	}
];

export const mockProjectService: ProjectService = {
	async getAll(): Promise<Project[]> {
		return mockProjects;
	},

	async getBySlug(slug: string): Promise<Project | null> {
		return mockProjects.find((p) => p.slug === slug) ?? null;
	},

	async getByWing(wing: Wing): Promise<Project[]> {
		return mockProjects.filter((p) => p.wing === wing);
	},

	async getByCompletionRange(min: number, max: number): Promise<Project[]> {
		return mockProjects.filter((p) => p.completion >= min && p.completion <= max);
	}
};
