// PROJECT SERVICE TESTS
// These tests run against BOTH mock and real implementation
// Tests are IMMUTABLE - if implementation fails, fix implementation not tests

import { describe, it, expect, beforeEach } from 'vitest';
import type { ProjectService, Project, Wing } from '$lib/contracts';
import { mockProjectService } from './project.service.mock';

// This will be swapped between mock and real implementation
let service: ProjectService;

// Test fixtures - valid project data
const validProject: Project = {
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
	hasTranscript: false
};

describe('ProjectService', () => {
	beforeEach(() => {
		// Wire the mock service for Phase 4
		service = mockProjectService;
	});

	describe('getAll', () => {
		it('returns an array', async () => {
			const result = await service.getAll();
			expect(Array.isArray(result)).toBe(true);
		});

		it('returns projects matching Project interface', async () => {
			const result = await service.getAll();
			if (result.length > 0) {
				const project = result[0];
				expect(project).toHaveProperty('slug');
				expect(project).toHaveProperty('title');
				expect(project).toHaveProperty('wing');
				expect(project).toHaveProperty('completion');
				expect(typeof project.completion).toBe('number');
				expect(project.completion).toBeGreaterThanOrEqual(0);
				expect(project.completion).toBeLessThanOrEqual(100);
			}
		});

		it('all projects have valid wing types', async () => {
			const result = await service.getAll();
			const validWings: Wing[] = ['music', 'apps', 'stories', 'process', 'finished'];
			result.forEach((project) => {
				expect(validWings).toContain(project.wing);
			});
		});
	});

	describe('getBySlug', () => {
		it('returns project when slug exists', async () => {
			const result = await service.getBySlug('test-project');
			expect(result).not.toBeNull();
			expect(result?.slug).toBe('test-project');
		});

		it('returns null when slug does not exist', async () => {
			const result = await service.getBySlug('nonexistent-slug');
			expect(result).toBeNull();
		});

		it('returned project matches Project interface', async () => {
			const result = await service.getBySlug('test-project');
			if (result) {
				expect(result).toHaveProperty('slug');
				expect(result).toHaveProperty('title');
				expect(result).toHaveProperty('wing');
				expect(result).toHaveProperty('completion');
				expect(result).toHaveProperty('pitch');
				expect(result).toHaveProperty('quickVersion');
				expect(result).toHaveProperty('recap');
			}
		});
	});

	describe('getByWing', () => {
		it('returns only projects matching the wing', async () => {
			const result = await service.getByWing('music');
			result.forEach((project) => {
				expect(project.wing).toBe('music');
			});
		});

		it('returns empty array when no projects in wing', async () => {
			const result = await service.getByWing('finished');
			expect(Array.isArray(result)).toBe(true);
		});

		it('handles all valid wing types', async () => {
			const wings: Wing[] = ['music', 'apps', 'stories', 'process', 'finished'];
			for (const wing of wings) {
				const result = await service.getByWing(wing);
				expect(Array.isArray(result)).toBe(true);
				result.forEach((project) => {
					expect(project.wing).toBe(wing);
				});
			}
		});
	});

	describe('getByCompletionRange', () => {
		it('returns projects within completion range', async () => {
			const result = await service.getByCompletionRange(50, 100);
			result.forEach((project) => {
				expect(project.completion).toBeGreaterThanOrEqual(50);
				expect(project.completion).toBeLessThanOrEqual(100);
			});
		});

		it('returns empty array when no projects in range', async () => {
			const result = await service.getByCompletionRange(100, 100);
			expect(Array.isArray(result)).toBe(true);
		});

		it('handles 0-100 range correctly', async () => {
			const result = await service.getByCompletionRange(0, 100);
			expect(Array.isArray(result)).toBe(true);
			result.forEach((project) => {
				expect(project.completion).toBeGreaterThanOrEqual(0);
				expect(project.completion).toBeLessThanOrEqual(100);
			});
		});

		it('handles exact completion value', async () => {
			const result = await service.getByCompletionRange(75, 75);
			expect(Array.isArray(result)).toBe(true);
			result.forEach((project) => {
				expect(project.completion).toBe(75);
			});
		});
	});
});
