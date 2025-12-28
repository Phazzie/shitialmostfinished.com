/**
 * TRANSCRIPT CONTRACT
 *
 * WHAT: Defines the structure for AI conversation transcripts, including messages
 *       and their metadata (highlights, annotations, speaker identification).
 *
 * WHY: Transcripts are core to the "process as product" philosophy. They show
 *      exactly how each project was created through AI collaboration. The discriminated
 *      union for Message types ensures type safety: human messages can't accidentally
 *      have an aiSource, and AI messages must have one.
 *
 * HOW: Uses TypeScript discriminated union for Message type:
 *      - All messages share: content, optional highlight, optional annotation
 *      - Human messages: { speaker: 'human' } - NO aiSource allowed
 *      - AI messages: { speaker: 'ai'; aiSource: AISource } - aiSource REQUIRED
 *
 *      TypeScript's type narrowing makes this elegant:
 *        if (message.speaker === 'ai') {
 *          // TypeScript knows message.aiSource exists here
 *          console.log(message.aiSource);
 *        }
 *
 * SDD STATUS: 🔒 FROZEN AFTER PHASE 2 - DO NOT MODIFY
 */

import type { AISource } from './project';

/**
 * Message - A single message in a conversation transcript
 *
 * Uses discriminated union pattern for type safety. The 'speaker' field
 * discriminates between two message types:
 *
 * Human messages:
 *   { speaker: 'human', content: string, annotation?: string }
 *
 * AI messages:
 *   { speaker: 'ai', aiSource: AISource, content: string,
 *     isHighlight?: boolean, annotation?: string }
 *
 * The intersection type (&) combines shared fields with speaker-specific fields.
 * This ensures:
 * - Humans can't have aiSource or isHighlight
 * - AI messages must have aiSource
 * - Both can have optional annotations
 *
 * TypeScript enforces this at compile time, preventing invalid message creation.
 */
export type Message = {
	content: string; // Markdown-formatted message content
	isHighlight?: boolean; // Flag for significant moments (AI messages only)
	annotation?: string; // Sidebar commentary about this message
} & ({ speaker: 'human' } | { speaker: 'ai'; aiSource: AISource });

/**
 * Transcript - Complete conversation record for a project
 *
 * Represents the full back-and-forth between human and AI during project creation.
 * Links to a Project via projectSlug.
 *
 * Fields:
 * - projectSlug: Must match a Project.slug (required)
 * - title: Optional conversation title (e.g., "Building the Music Player")
 * - date: Optional ISO 8601 date of conversation
 * - messages: Array of human and AI messages in chronological order
 *
 * Note: title and date are optional because some conversations happen informally
 * or across multiple sessions without clear boundaries.
 */
export interface Transcript {
	projectSlug: string; // Links to parent Project
	title?: string; // Optional conversation title
	date?: string; // Optional ISO 8601 date
	messages: Message[]; // Chronological message array
}

/**
 * TranscriptService - Interface for accessing transcript data
 *
 * Currently has one method: getByProjectSlug. Simple by design because transcripts
 * are always accessed in the context of a specific project.
 *
 * Method behavior:
 * - getByProjectSlug(): Returns transcript for a project, or null if no transcript exists
 *
 * Implementation note:
 * - Async to support future API integration (currently reads from JSON)
 */
export interface TranscriptService {
	getByProjectSlug(slug: string): Promise<Transcript | null>;
}
