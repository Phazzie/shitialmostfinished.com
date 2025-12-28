/**
 * TRANSCRIPT SERVICE - REAL IMPLEMENTATION
 *
 * WHAT: Production implementation of TranscriptService that reads conversation
 *       transcripts from static JSON files.
 *
 * WHY: Provides access to the full AI conversation history for each project,
 *      supporting the "process as product" philosophy. Simpler than project
 *      service because transcripts are always queried by project slug (1:1 relationship).
 *
 * HOW:
 *   1. Import transcript JSON files statically
 *   2. Store in module-level array (no validation needed - trust the data)
 *   3. Implement getByProjectSlug to find matching transcript
 *
 * DESIGN NOTES:
 *   - No validation function (unlike project.service.ts) because transcript
 *     structure is simpler and controlled by us
 *   - Could add validation in future if transcripts come from external sources
 *   - Type assertion (as Transcript) is safe for our controlled JSON files
 *   - Async method for consistency with ProjectService (future-proofing)
 *
 * SDD STATUS: ✅ DISPOSABLE - Delete and regenerate if tests fail
 * PHASE: 6 (Real Implementation)
 * REPLACED: transcript.service.mock.ts (kept as reference)
 */

import type { TranscriptService, Transcript } from '$lib/contracts';

// === JSON IMPORTS ===
// Static imports for now. In Phase 8, add more transcripts here.
// Transcript files must match their project's slug (test-project.json → test-project transcript)
import testProjectTranscript from '$lib/data/transcripts/test-project.json';

// === MODULE-LEVEL DATA ===
/**
 * transcripts - All conversation transcripts
 *
 * Array of all available transcripts. Each transcript should correspond to
 * a project with hasTranscript: true.
 *
 * Currently contains:
 * - test-project transcript (8 messages, 3 highlights, 3 annotations)
 *
 * Phase 8 TODO: Add all real transcript imports here
 */
const transcripts: Transcript[] = [testProjectTranscript as Transcript];

// === SERVICE IMPLEMENTATION ===
/**
 * transcriptService - Implementation of TranscriptService interface
 *
 * Simple single-method service for transcript lookup.
 * Always queries by project slug (1:1 relationship between project and transcript).
 */
export const transcriptService: TranscriptService = {
	/**
	 * getByProjectSlug - Find transcript for a specific project
	 *
	 * Looks up the conversation transcript associated with a project.
	 * Returns null if no transcript exists (check project.hasTranscript first).
	 *
	 * @param slug - The project slug to find transcript for
	 * @returns Promise<Transcript | null> - The transcript or null if not found
	 *
	 * EXAMPLE:
	 *   const transcript = await transcriptService.getByProjectSlug('test-project');
	 *   if (transcript) {
	 *     transcript.messages.forEach(msg => console.log(msg.content));
	 *   }
	 */
	async getByProjectSlug(slug: string): Promise<Transcript | null> {
		return transcripts.find((t) => t.projectSlug === slug) ?? null;
	}
};
