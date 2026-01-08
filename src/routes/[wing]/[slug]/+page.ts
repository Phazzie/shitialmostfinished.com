// PROJECT DETAIL PAGE LOAD FUNCTION
// Loads a specific project by slug
// DISPOSABLE - delete and regenerate if tests fail

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { projectService } from '$lib/services/project.service';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;

	try {
		const project = await projectService.getBySlug(slug);

		// Get related projects if they exist
		const relatedProjects = await Promise.all(
			project.relatedProjects.map((relatedSlug) =>
				projectService.getBySlug(relatedSlug).catch(() => null)
			)
		);

		return {
			project,
			relatedProjects: relatedProjects.filter((p) => p !== null)
		};
	} catch (err) {
		throw error(404, `Project "${slug}" not found`);
	}
};
