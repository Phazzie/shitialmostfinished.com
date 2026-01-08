/**
 * PROJECT CONTRACT
 *
 * WHAT: Defines all data structures for portfolio projects and the service interface
 *       for accessing project data.
 *
 * WHY: Creates a frozen seam (contract) between data and implementation. By freezing
 *      this contract after Phase 2, we ensure all implementations can be regenerated
 *      without breaking tests. This is the foundation of Seam-Driven Development (SDD).
 *
 * HOW: Uses TypeScript interfaces and types to define:
 *      - Wing categorization (5 types of projects)
 *      - Process tags (5 types of creative moments)
 *      - AI source tracking (which AI helped create the project)
 *      - Complete Project interface (all fields required by the portfolio)
 *      - ProjectService interface (async methods for data access)
 *      - WING_CONFIGS constant (lookup table for wing metadata)
 *
 * SDD STATUS: 🔒 FROZEN AFTER PHASE 2 - DO NOT MODIFY
 *
 * If you need to change this contract, you must:
 * 1. Acknowledge you're breaking the SDD methodology
 * 2. Delete all tests that depend on it
 * 3. Regenerate tests from scratch
 * 4. Regenerate all implementations
 *
 * This is a last resort. Trust the contract.
 */

// === TYPE DEFINITIONS ===

/**
 * Wing - Project categorization system
 *
 * Represents the 5 main categories of creative work:
 * - music: Musical projects (songs, albums, compositions)
 * - apps: Software applications and tools
 * - stories: Written narratives, scripts, creative writing
 * - process: Meta-projects about the creative process itself
 * - finished: Completed works from any category
 */
export type Wing = 'music' | 'apps' | 'stories' | 'process' | 'finished';

/**
 * VALID_WINGS - Array of all valid Wing values
 * NOTE: This is derived convenience data, not a contract modification.
 * Mirrors the Wing type definition above for runtime validation.
 */
export const VALID_WINGS: Wing[] = ['music', 'apps', 'stories', 'process', 'finished'];

/**
 * AISource - Tracks which AI tool(s) helped create the project
 *
 * - claude: Anthropic's Claude (this AI!)
 * - chatgpt: OpenAI's ChatGPT
 * - gemini: Google's Gemini
 * - mixed: Multiple AI tools used together
 */
export type AISource = 'claude' | 'chatgpt' | 'gemini' | 'mixed';

/**
 * ProcessTag - Labels for significant moments in the creative process
 *
 * These tags highlight interesting patterns that emerge during AI collaboration:
 * - THE_BREAKTHROUGH: Eureka moments, key insights, solving hard problems
 * - THE_ARGUMENT: Productive disagreements between human and AI
 * - THE_GRAVEYARD: Failed attempts, dead ends, instructive failures
 * - THE_LONG_GAME: Persistence over time, gradual progress
 * - THE_TANGENT: Interesting diversions that led somewhere unexpected
 */
export type ProcessTag =
	| 'THE_BREAKTHROUGH'
	| 'THE_ARGUMENT'
	| 'THE_GRAVEYARD'
	| 'THE_LONG_GAME'
	| 'THE_TANGENT';

/**
 * Project - Complete data structure for a portfolio item
 *
 * Represents a single creative work with all its metadata, content, and relationships.
 * Every project must have all required fields (except dateStarted which is optional).
 *
 * Field organization:
 * - IDENTITY: How to identify and reference the project
 * - CLASSIFICATION: How to categorize and filter the project
 * - METADATA: When and how the project was created
 * - CONTENT: The actual creative work and analysis
 * - CONNECTIONS: Links to related projects and transcripts
 */
export interface Project {
	// === IDENTITY ===
	slug: string; // URL-safe identifier: "twelve-twack-commandments"
	title: string; // Human-readable name: "Twelve Twack Commandments"

	// === CLASSIFICATION ===
	wing: Wing; // Category (music/apps/stories/process/finished)
	completion: number; // Progress percentage (0-100, integer)
	tags: ProcessTag[]; // Zero or more process tags

	// === METADATA ===
	aiSource: AISource; // Which AI(s) helped create this
	dateStarted?: string; // ISO 8601 date (optional - some projects start informally)
	dateUpdated: string; // ISO 8601 date (required - last modified timestamp)

	// === CONTENT ===
	pitch: string; // One-line hook (~200 chars max, plain text)
	quickVersion: string; // Markdown - the final creative output
	recap: string; // Markdown - detailed analysis (800-1500 words)

	// === CONNECTIONS ===
	relatedProjects: string[]; // Array of slugs for related projects
	hasTranscript: boolean; // Whether a conversation transcript exists
}

/**
 * ProjectService - Interface for accessing project data
 *
 * Defines all methods for querying projects. All methods are async to support
 * future API integration (currently reads from JSON, could later fetch from server).
 *
 * Method behaviors:
 * - getAll(): Returns all projects, no filtering
 * - getBySlug(): Finds exact match by slug, returns null if not found
 * - getByWing(): Filters projects by category, returns empty array if none
 * - getByCompletionRange(): Filters by completion percentage (inclusive range)
 *
 * Implementation notes:
 * - All arrays returned should be copies (defensive programming)
 * - Slug lookups are case-sensitive
 * - Range queries include both min and max boundaries
 */
export interface ProjectService {
	getAll(): Promise<Project[]>;
	getBySlug(slug: string): Promise<Project | null>;
	getByWing(wing: Wing): Promise<Project[]>;
	getByCompletionRange(min: number, max: number): Promise<Project[]>;
}
