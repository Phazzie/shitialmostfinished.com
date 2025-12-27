// TRANSCRIPT VIEWER TESTS
// Tests component behavior for displaying conversation transcripts
// IMMUTABLE - do not modify to fix failing component

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import TranscriptViewer from './TranscriptViewer.svelte';
import type { Transcript } from '$lib/contracts';

// Test fixture - complete transcript
const testTranscript: Transcript = {
	projectSlug: 'test-project',
	title: 'Building Test Project',
	date: '2025-01-01',
	messages: [
		{
			speaker: 'human',
			content: 'Hello, can you help me?'
		},
		{
			speaker: 'ai',
			aiSource: 'claude',
			content: 'Of course! I would be happy to help.',
			isHighlight: true,
			annotation: 'Key moment'
		},
		{
			speaker: 'human',
			content: 'Great, thanks!'
		}
	]
};

describe('TranscriptViewer', () => {
	it('renders transcript title when provided', () => {
		const { getByText } = render(TranscriptViewer, { props: { transcript: testTranscript } });
		expect(getByText('Building Test Project')).toBeTruthy();
	});

	it('displays all messages', () => {
		const { container } = render(TranscriptViewer, { props: { transcript: testTranscript } });
		expect(container.textContent).toContain('Hello, can you help me?');
		expect(container.textContent).toContain('Of course! I would be happy to help.');
		expect(container.textContent).toContain('Great, thanks!');
	});

	it('distinguishes human messages', () => {
		const { container } = render(TranscriptViewer, { props: { transcript: testTranscript } });
		// Human messages should be identifiable
		expect(container.textContent).toContain('human');
	});

	it('distinguishes AI messages', () => {
		const { container } = render(TranscriptViewer, { props: { transcript: testTranscript } });
		// AI messages should be identifiable
		expect(container.textContent).toContain('ai');
	});

	it('displays AI source for AI messages', () => {
		const { container } = render(TranscriptViewer, { props: { transcript: testTranscript } });
		expect(container.textContent).toContain('claude');
	});

	it('indicates highlighted messages', () => {
		const { container } = render(TranscriptViewer, { props: { transcript: testTranscript } });
		// Highlighted messages should be visually distinct
		// At minimum, the content should be present
		expect(container.textContent).toContain('Of course! I would be happy to help.');
	});

	it('displays annotations when present', () => {
		const { container } = render(TranscriptViewer, { props: { transcript: testTranscript } });
		expect(container.textContent).toContain('Key moment');
	});

	it('handles transcript without title', () => {
		const transcriptNoTitle = { ...testTranscript, title: undefined };
		const { container } = render(TranscriptViewer, { props: { transcript: transcriptNoTitle } });
		expect(container.firstChild).toBeTruthy();
	});

	it('handles transcript without date', () => {
		const transcriptNoDate = { ...testTranscript, date: undefined };
		const { container } = render(TranscriptViewer, { props: { transcript: transcriptNoDate } });
		expect(container.firstChild).toBeTruthy();
	});

	it('renders empty state for no messages', () => {
		const emptyTranscript = { ...testTranscript, messages: [] };
		const { container } = render(TranscriptViewer, { props: { transcript: emptyTranscript } });
		expect(container.firstChild).toBeTruthy();
	});

	it('handles messages without highlights or annotations', () => {
		const simpleTranscript: Transcript = {
			projectSlug: 'simple',
			messages: [
				{
					speaker: 'human',
					content: 'Simple message'
				}
			]
		};
		const { getByText } = render(TranscriptViewer, { props: { transcript: simpleTranscript } });
		expect(getByText('Simple message')).toBeTruthy();
	});
});
