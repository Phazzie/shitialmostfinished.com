/**
 * PROJECT SERVICE - REAL IMPLEMENTATION
 *
 * WHAT: Production implementation of ProjectService that reads project data from
 *       static JSON files and validates them against the Project contract.
 *
 * WHY: In SDD methodology, this is a "disposable" implementation that replaced
 *      the mock version from Phase 4. If it breaks, we delete and regenerate it
 *      to pass the frozen tests. The validation ensures that malformed JSON fails
 *      fast with clear error messages rather than causing runtime errors later.
 *
 * HOW:
 *   1. Import JSON files statically (currently just test-project.json)
 *   2. Validate each JSON file with comprehensive validateProject() function
 *   3. Store validated projects in module-level array
 *   4. Implement all ProjectService methods (getAll, getBySlug, etc.)
 *   5. Use defensive copying (return [...projects]) to prevent external mutation
 *
 * VALIDATION STRATEGY:
 *   - Validates at module initialization (fails fast on import)
 *   - Checks all required fields exist and have correct types
 *   - Validates enum values (wing must be valid Wing type)
 *   - Validates ranges (completion must be 0-100)
 *   - Descriptive error messages point to exact problem
 *
 * FUTURE EXPANSION:
 *   - Add more project JSON imports as projects are created
 *   - Could use Vite's import.meta.glob() for dynamic imports
 *   - Currently async methods return immediately (no I/O), but stay async
 *     for future API integration
 *
 * SDD STATUS: ✅ DISPOSABLE - Delete and regenerate if tests fail
 * PHASE: 6 (Real Implementation)
 * REPLACED: project.service.mock.ts (kept as reference)
 */

import type { ProjectService, Project, Wing } from '$lib/contracts';

// === JSON IMPORTS ===
// Static imports for now. In Phase 8, add more projects here.
// Future: Could use import.meta.glob('$lib/data/projects/*.json') for dynamic loading
import testProject from '$lib/data/projects/test-project.json';

/**
 * validateProject - Comprehensive validation of project JSON data
 *
 * WHAT: Validates that unknown data (from JSON) matches the Project contract.
 *
 * WHY: JSON files could be malformed, have typos, missing fields, or wrong types.
 *      TypeScript can't validate JSON at compile time, so we do runtime validation.
 *      Failing fast at module load is better than cryptic errors later in components.
 *
 * HOW: Checks every required field for existence and correct type:
 *      - String fields: slug, title, pitch, quickVersion, recap, aiSource, dateUpdated
 *      - Enum field: wing (must be one of 5 valid values)
 *      - Number field: completion (must be 0-100 range)
 *      - Array fields: tags, relatedProjects
 *      - Boolean field: hasTranscript
 *
 * ERROR HANDLING:
 *      Throws descriptive errors like "Invalid or missing project slug" rather
 *      than generic "Cannot read property 'slug' of undefined" errors.
 *
 * @param data - Unknown data to validate (from JSON.parse or JSON import)
 * @returns Validated Project object (type assertion after runtime checks)
 * @throws Error with descriptive message if validation fails
 */
function validateProject(data: unknown): Project {
	const p = data as any;

	// Validate required string fields
	if (!p.slug || typeof p.slug !== 'string') {
		throw new Error('Invalid or missing project slug');
	}
	if (!p.title || typeof p.title !== 'string') {
		throw new Error('Invalid or missing project title');
	}
	if (!p.pitch || typeof p.pitch !== 'string') {
		throw new Error('Invalid or missing project pitch');
	}
	if (!p.quickVersion || typeof p.quickVersion !== 'string') {
		throw new Error('Invalid or missing project quickVersion');
	}
	if (!p.recap || typeof p.recap !== 'string') {
		throw new Error('Invalid or missing project recap');
	}
	if (!p.aiSource || typeof p.aiSource !== 'string') {
		throw new Error('Invalid or missing project aiSource');
	}
	if (!p.dateUpdated || typeof p.dateUpdated !== 'string') {
		throw new Error('Invalid or missing project dateUpdated');
	}

	// Validate wing enum - must be one of the 5 defined Wing values
	const validWings: Wing[] = ['music', 'apps', 'stories', 'process', 'finished'];
	if (!validWings.includes(p.wing)) {
		throw new Error(`Invalid wing: ${p.wing}. Must be one of: ${validWings.join(', ')}`);
	}

	// Validate completion range - must be integer 0-100 inclusive
	if (typeof p.completion !== 'number' || p.completion < 0 || p.completion > 100) {
		throw new Error('Completion must be a number between 0 and 100');
	}

	// Validate arrays - must be arrays (even if empty)
	if (!Array.isArray(p.tags)) {
		throw new Error('Tags must be an array');
	}
	if (!Array.isArray(p.relatedProjects)) {
		throw new Error('relatedProjects must be an array');
	}

	// Validate boolean - must be explicitly true or false
	if (typeof p.hasTranscript !== 'boolean') {
		throw new Error('hasTranscript must be a boolean');
	}

	// All validations passed - type assertion is now safe
	return p as Project;
}

// === MODULE-LEVEL DATA ===
/**
 * projects - Validated project data array
 *
 * Initialized at module load with all imported JSON files.
 * Each project is validated before being added to the array.
 * If validation fails, the module fails to load (fail fast).
 *
 * Currently contains:
 * - test-project.json (75% complete music project)
 *
 * Phase 8 TODO: Add all real project imports here
 */
const projects: Project[] = [validateProject(testProject)];

// === SERVICE IMPLEMENTATION ===
/**
 * projectService - Implementation of ProjectService interface
 *
 * Provides four query methods for accessing project data.
 * All methods are async to support future API integration.
 *
 * Design notes:
 * - getAll() returns a copy to prevent external mutation (defensive programming)
 * - Array methods like filter() already create new arrays (safe)
 * - find() returns a reference, but Projects are treated as immutable
 * - Null coalescing operator (??) provides clean null handling
 */
export const projectService: ProjectService = {
	/**
	 * getAll - Returns all projects
	 *
	 * Returns a defensive copy of the projects array to prevent external code
	 * from mutating the shared module state.
	 *
	 * @returns Promise<Project[]> - Copy of all projects
	 */
	async getAll(): Promise<Project[]> {
		// Defensive copy - prevents: const all = await getAll(); all.push(badData);
		return [...projects];
	},

	/**
	 * getBySlug - Find project by exact slug match
	 *
	 * Case-sensitive slug lookup. Returns null if no match found.
	 *
	 * @param slug - The project slug to search for
	 * @returns Promise<Project | null> - Matched project or null
	 */
	async getBySlug(slug: string): Promise<Project | null> {
		return projects.find((p) => p.slug === slug) ?? null;
	},

	/**
	 * getByWing - Filter projects by wing category
	 *
	 * Returns all projects in the specified wing. Returns empty array if no matches.
	 * filter() creates a new array, so no defensive copy needed.
	 *
	 * @param wing - The wing to filter by
	 * @returns Promise<Project[]> - All projects in that wing (possibly empty)
	 */
	async getByWing(wing: Wing): Promise<Project[]> {
		return projects.filter((p) => p.wing === wing);
	},

	/**
	 * getByCompletionRange - Filter projects by completion percentage range
	 *
	 * Returns projects with completion >= min AND <= max (inclusive on both ends).
	 * Returns empty array if no matches.
	 *
	 * @param min - Minimum completion percentage (0-100)
	 * @param max - Maximum completion percentage (0-100)
	 * @returns Promise<Project[]> - Projects in the range (possibly empty)
	 */
	async getByCompletionRange(min: number, max: number): Promise<Project[]> {
		return projects.filter((p) => p.completion >= min && p.completion <= max);
	}
};
