// TRANSCRIPT CONTRACT
// Defines the shape of conversation data
// IMMUTABLE - Do not modify once tests are written

import type { AISource } from './project';

export interface Message {
	speaker: 'human' | 'ai';
	aiSource?: AISource; // Required when speaker is 'ai'
	content: string; // Markdown
	isHighlight?: boolean; // Key moment flag
	annotation?: string; // Sidebar note
}

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
