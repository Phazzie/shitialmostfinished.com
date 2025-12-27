// PROJECT SERVICE IMPLEMENTATION
// Real implementation that reads from JSON files
// Replaces mock in production

import type { ProjectService, Project, Wing } from '$lib/contracts';

// Import all project JSON files
// In a real app, this would be dynamic file reading
import testProject from '$lib/data/projects/test-project.json';

// Consolidated projects array
const projects: Project[] = [testProject as Project];

export const projectService: ProjectService = {
	async getAll(): Promise<Project[]> {
		return projects;
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
