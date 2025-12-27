// PROJECT SERVICE IMPLEMENTATION
// Real implementation that reads from JSON files
// Replaces mock in production

import type { ProjectService, Project, Wing } from '$lib/contracts';

// Import all project JSON files
// In a real app, this would be dynamic file reading
import testProject from '$lib/data/projects/test-project.json';

function validateProject(data: unknown): Project {
  // Add basic checks for required fields
  const p = data as any;
  if (!p.slug || !p.title || !p.wing || typeof p.completion !== 'number') {
    throw new Error('Invalid project data');
  }
  return p as Project;
}

// Consolidated projects array
const projects: Project[] = [validateProject(testProject)];

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
