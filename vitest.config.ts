import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';

export default defineConfig({
	plugins: [svelte({ hot: !process.env.VITEST })],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: []
	},
	resolve: {
		alias: {
			$lib: fileURLToPath(new URL('./src/lib', import.meta.url))
		},
		// Use 'browser' condition for Svelte 5 compatibility in tests.
		// This is appropriate since the app targets browser environments.
		// It ensures tests use the same module resolution as the runtime app.
		conditions: ['browser']
	}
});
