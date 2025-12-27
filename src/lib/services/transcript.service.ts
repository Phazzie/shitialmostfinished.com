// TRANSCRIPT SERVICE IMPLEMENTATION
// Real implementation that reads from JSON files
// Replaces mock in production

import type { TranscriptService, Transcript } from '$lib/contracts';

// Import all transcript JSON files
import testProjectTranscript from '$lib/data/transcripts/test-project.json';

// Consolidated transcripts array
const transcripts: Transcript[] = [testProjectTranscript as Transcript];

export const transcriptService: TranscriptService = {
	async getByProjectSlug(slug: string): Promise<Transcript | null> {
		return transcripts.find((t) => t.projectSlug === slug) ?? null;
	}
};
