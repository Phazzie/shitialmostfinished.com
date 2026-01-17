// TRANSCRIPT VIEWER PAGE LOAD FUNCTION
// Loads transcript for a specific project
// DISPOSABLE - delete and regenerate if tests fail

import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { projectService } from '$lib/services/project.service';
import { transcriptService } from '$lib/services/transcript.service';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;

	try {
		// Get the project first to verify it exists
		const project = await projectService.getBySlug(slug);

		// Check if project has a transcript
		if (!project.hasTranscript) {
			throw error(404, `No transcript available for project "${slug}"`);
		}

		// Get the transcript
		const transcript = await transcriptService.getBySlug(slug);

		return {
			project,
			transcript
		};
	} catch (err) {
		if (err && typeof err === 'object' && 'status' in err) {
			throw err; // Re-throw SvelteKit errors
		}
		throw error(404, `Transcript for project "${slug}" not found`);
	}
};
