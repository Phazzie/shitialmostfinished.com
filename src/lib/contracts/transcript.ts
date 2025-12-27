// TRANSCRIPT CONTRACT
// Defines the shape of conversation data
// IMMUTABLE - Do not modify once tests are written

import type { AISource } from './project';

// Using discriminated union to enforce type safety:
// - Human messages cannot have aiSource
// - AI messages must have aiSource
export type Message = {
	content: string; // Markdown
	isHighlight?: boolean; // Key moment flag
	annotation?: string; // Sidebar note
} & (
	| { speaker: 'human' }
	| { speaker: 'ai'; aiSource: AISource }
);

export interface Transcript {
	projectSlug: string; // Links to parent Project
	title?: string;
	date?: string;
	messages: Message[];
}

// === SERVICE INTERFACE ===
export interface TranscriptService {
	getByProjectSlug(slug: string): Promise<Transcript | null>;
}
