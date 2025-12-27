// TRANSCRIPT SERVICE MOCK
// Minimal implementation to satisfy all tests
// DISPOSABLE - delete and regenerate if tests fail

import type { TranscriptService, Transcript } from '$lib/contracts';

const mockTranscripts: Transcript[] = [
	{
		projectSlug: 'test-project',
		title: 'Building Test Project',
		date: '2025-01-01',
		messages: [
			{
				speaker: 'human',
				content: 'Let us build a test project to validate our architecture.'
			},
			{
				speaker: 'ai',
				aiSource: 'claude',
				content:
					'Great idea! I will help you set up the project structure. Let us start with the core contracts.',
				isHighlight: true,
				annotation: 'The key architectural decision - contracts first'
			},
			{
				speaker: 'human',
				content: 'What should we include in the Project interface?'
			},
			{
				speaker: 'ai',
				aiSource: 'claude',
				content:
					'The Project interface should include: slug, title, wing, completion percentage, tags, AI source, dates, content fields (pitch, quickVersion, recap), and connections to related projects and transcripts.',
				isHighlight: true
			},
			{
				speaker: 'human',
				content: 'Perfect. How do we handle the transcript data?',
				annotation: 'Discussing data structure'
			},
			{
				speaker: 'ai',
				aiSource: 'claude',
				content:
					'We will use a discriminated union for Message types. This ensures type safety - human messages cannot have an aiSource, and AI messages must have one.'
			},
			{
				speaker: 'human',
				content: 'That makes sense. Let us implement it.'
			},
			{
				speaker: 'ai',
				aiSource: 'claude',
				content: 'I will create the contract files now.',
				isHighlight: true,
				annotation: 'Beginning implementation phase'
			}
		]
	}
];

export const mockTranscriptService: TranscriptService = {
	async getByProjectSlug(slug: string): Promise<Transcript | null> {
		return mockTranscripts.find((t) => t.projectSlug === slug) ?? null;
	}
};
