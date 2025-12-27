// TRANSCRIPT SERVICE TESTS
// IMMUTABLE - do not modify to fix failing implementation

import { describe, it, expect, beforeEach } from 'vitest';
import type { TranscriptService } from '$lib/contracts';
import { transcriptService } from './transcript.service';

// This will be swapped between mock and real implementation
let service: TranscriptService;

describe('TranscriptService', () => {
	beforeEach(() => {
		// Phase 6: Using real implementation
		service = transcriptService;
	});

	describe('getByProjectSlug', () => {
		it('returns transcript when exists', async () => {
			const result = await service.getByProjectSlug('test-project');
			expect(result).not.toBeNull();
			expect(result?.projectSlug).toBe('test-project');
		});

		it('returns null when no transcript exists', async () => {
			const result = await service.getByProjectSlug('no-transcript');
			expect(result).toBeNull();
		});

		it('transcript has messages array', async () => {
			const result = await service.getByProjectSlug('test-project');
			expect(Array.isArray(result?.messages)).toBe(true);
		});

		it('transcript has required fields', async () => {
			const result = await service.getByProjectSlug('test-project');
			if (result) {
				expect(result).toHaveProperty('projectSlug');
				expect(result).toHaveProperty('messages');
				expect(typeof result.projectSlug).toBe('string');
			}
		});

		it('messages have required speaker field', async () => {
			const result = await service.getByProjectSlug('test-project');
			result?.messages.forEach((msg) => {
				expect(['human', 'ai']).toContain(msg.speaker);
			});
		});

		it('AI messages have aiSource field', async () => {
			const result = await service.getByProjectSlug('test-project');
			result?.messages
				.filter((msg) => msg.speaker === 'ai')
				.forEach((msg) => {
					// TypeScript discriminated union ensures this exists
					expect(msg.aiSource).toBeDefined();
					expect(['claude', 'chatgpt', 'gemini', 'mixed']).toContain(msg.aiSource);
				});
		});

		it('messages have content field', async () => {
			const result = await service.getByProjectSlug('test-project');
			result?.messages.forEach((msg) => {
				expect(msg).toHaveProperty('content');
				expect(typeof msg.content).toBe('string');
			});
		});

		it('handles optional message fields correctly', async () => {
			const result = await service.getByProjectSlug('test-project');
			result?.messages.forEach((msg) => {
				// isHighlight is optional
				if (msg.isHighlight !== undefined) {
					expect(typeof msg.isHighlight).toBe('boolean');
				}
				// annotation is optional
				if (msg.annotation !== undefined) {
					expect(typeof msg.annotation).toBe('string');
				}
			});
		});

		it('handles transcripts with highlights', async () => {
			const result = await service.getByProjectSlug('test-project');
			if (result) {
				const highlights = result.messages.filter((msg) => msg.isHighlight);
				// Should have at least one highlight in test data
				expect(highlights.length).toBeGreaterThan(0);
			}
		});

		it('handles transcripts with annotations', async () => {
			const result = await service.getByProjectSlug('test-project');
			if (result) {
				const annotated = result.messages.filter((msg) => msg.annotation);
				// Should have at least one annotation in test data
				expect(annotated.length).toBeGreaterThan(0);
			}
		});
	});
});
