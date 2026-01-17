// DATE FORMATTING UTILITIES
// Centralized date formatting functions
// DISPOSABLE - delete and regenerate if tests fail

/**
 * Formats an ISO date string to human-readable format
 * @param dateString - ISO date string (e.g., "2024-01-15")
 * @returns Formatted date (e.g., "January 15, 2024")
 * @example
 * formatDate("2024-01-15") // "January 15, 2024"
 */
export function formatDate(dateString: string): string {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
