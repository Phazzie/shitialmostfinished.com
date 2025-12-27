// PROJECT SERVICE IMPLEMENTATION
// Real implementation that reads from JSON files
// Replaces mock in production

import type { ProjectService, Project, Wing } from '$lib/contracts';

// Import all project JSON files
// In a real app, this would be dynamic file reading
import testProject from '$lib/data/projects/test-project.json';

// Validation helper to ensure JSON data matches Project contract
function validateProject(data: unknown): Project {
	const p = data as any;

	// Validate required string fields
	if (!p.slug || typeof p.slug !== 'string') {
		throw new Error('Invalid or missing project slug');
	}
	if (!p.title || typeof p.title !== 'string') {
		throw new Error('Invalid or missing project title');
	}
	if (!p.pitch || typeof p.pitch !== 'string') {
		throw new Error('Invalid or missing project pitch');
	}
	if (!p.quickVersion || typeof p.quickVersion !== 'string') {
		throw new Error('Invalid or missing project quickVersion');
	}
	if (!p.recap || typeof p.recap !== 'string') {
		throw new Error('Invalid or missing project recap');
	}
	if (!p.aiSource || typeof p.aiSource !== 'string') {
		throw new Error('Invalid or missing project aiSource');
	}
	if (!p.dateUpdated || typeof p.dateUpdated !== 'string') {
		throw new Error('Invalid or missing project dateUpdated');
	}

	// Validate wing enum
	const validWings: Wing[] = ['music', 'apps', 'stories', 'process', 'finished'];
	if (!validWings.includes(p.wing)) {
		throw new Error(`Invalid wing: ${p.wing}. Must be one of: ${validWings.join(', ')}`);
	}

	// Validate completion range
	if (typeof p.completion !== 'number' || p.completion < 0 || p.completion > 100) {
		throw new Error('Completion must be a number between 0 and 100');
	}

	// Validate arrays
	if (!Array.isArray(p.tags)) {
		throw new Error('Tags must be an array');
	}
	if (!Array.isArray(p.relatedProjects)) {
		throw new Error('relatedProjects must be an array');
	}

	// Validate boolean
	if (typeof p.hasTranscript !== 'boolean') {
		throw new Error('hasTranscript must be a boolean');
	}

	return p as Project;
}

// Consolidated projects array with validation
const projects: Project[] = [validateProject(testProject)];

export const projectService: ProjectService = {
	async getAll(): Promise<Project[]> {
		// Return a copy to prevent mutation of the shared array
		return [...projects];
	},

	async getBySlug(slug: string): Promise<Project | null> {
		return projects.find((p) => p.slug === slug) ?? null;
	},

	async getByWing(wing: Wing): Promise<Project[]> {
		return projects.filter((p) => p.wing === wing);
	},

	async getByCompletionRange(min: number, max: number): Promise<Project[]> {
		return projects.filter((p) => p.completion >= min && p.completion <= max);
	}
};
