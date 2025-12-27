// PROJECT CONTRACT
// Defines the shape of all project data
// IMMUTABLE - Do not modify once tests are written

export type Wing = 'music' | 'apps' | 'stories' | 'process' | 'finished';
export type AISource = 'claude' | 'chatgpt' | 'gemini' | 'mixed';
export type ProcessTag =
	| 'THE_BREAKTHROUGH'
	| 'THE_ARGUMENT'
	| 'THE_GRAVEYARD'
	| 'THE_LONG_GAME'
	| 'THE_TANGENT';

export interface Project {
	// === IDENTITY ===
	slug: string; // URL-safe: "twelve-twack-commandments"
	title: string; // Display: "Twelve Twack Commandments"

	// === CLASSIFICATION ===
	wing: Wing;
	completion: number; // 0-100
	tags: ProcessTag[];

	// === METADATA ===
	aiSource: AISource;
	dateStarted?: string; // ISO date (optional)
	dateUpdated: string; // ISO date (required)

	// === CONTENT ===
	pitch: string; // One-line hook, max 200 chars
	quickVersion: string; // Markdown - the final output
	recap: string; // Markdown - analysis (800-1500 words)

	// === CONNECTIONS ===
	relatedProjects: string[]; // Slugs for related items
	hasTranscript: boolean;
}

// === SERVICE INTERFACE ===
export interface ProjectService {
	getAll(): Promise<Project[]>;
	getBySlug(slug: string): Promise<Project | null>;
	getByWing(wing: Wing): Promise<Project[]>;
	getByCompletionRange(min: number, max: number): Promise<Project[]>;
}
