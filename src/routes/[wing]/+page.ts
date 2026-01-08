// WING LISTING PAGE LOAD FUNCTION
// Loads all projects for a specific wing
// DISPOSABLE - delete and regenerate if tests fail

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { projectService } from '$lib/services/project.service';
import { WING_CONFIGS, VALID_WINGS, type Wing } from '$lib/contracts';

export const load: PageLoad = async ({ params }) => {
	const { wing } = params;

	// Validate wing parameter
	if (!VALID_WINGS.includes(wing as Wing)) {
		throw error(404, `Wing "${wing}" not found`);
	}

	// Get all projects and filter by wing
	const allProjects = await projectService.getAll();
	const wingProjects = allProjects.filter((project) => project.wing === wing);

	return {
		wing: wing as Wing,
		wingConfig: WING_CONFIGS[wing as Wing],
		projects: wingProjects
	};
};
