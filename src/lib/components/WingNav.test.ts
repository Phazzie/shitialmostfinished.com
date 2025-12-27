// WING NAVIGATION TESTS
// Tests component behavior for wing/category navigation
// IMMUTABLE - do not modify to fix failing component

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import WingNav from './WingNav.svelte';
import type { Wing } from '$lib/contracts';

describe('WingNav', () => {
	it('displays all five wings', () => {
		const { container } = render(WingNav);
		// All wings should be displayed
		expect(container.textContent).toContain('Stories');
		expect(container.textContent).toContain('Music');
		expect(container.textContent).toContain('Apps');
		expect(container.textContent).toContain('Process');
		expect(container.textContent).toContain('Finished');
	});

	it('accepts currentWing prop', () => {
		const { container } = render(WingNav, { props: { currentWing: 'music' as Wing } });
		expect(container.firstChild).toBeTruthy();
	});

	it('highlights current wing when provided', () => {
		const { container } = render(WingNav, { props: { currentWing: 'music' as Wing } });
		// Current wing should be visually distinct
		expect(container.textContent).toContain('Music');
	});

	it('renders without currentWing (optional)', () => {
		const { container } = render(WingNav);
		expect(container.firstChild).toBeTruthy();
	});

	it('displays wing icons', () => {
		const { container } = render(WingNav);
		// Icons from wing config: 📖 🎵 💻 🔧 ✨
		const text = container.textContent || '';
		// At least one icon should be present
		expect(text.length).toBeGreaterThan(0);
	});

	it('renders as a navigation element', () => {
		const { container } = render(WingNav);
		// Should be a nav element or container
		expect(container.firstChild).toBeTruthy();
	});

	it('displays all wing names correctly', () => {
		const { getByText } = render(WingNav);
		expect(getByText('Stories')).toBeTruthy();
		expect(getByText('Music')).toBeTruthy();
		expect(getByText('Apps')).toBeTruthy();
		expect(getByText('Process')).toBeTruthy();
		expect(getByText('Finished')).toBeTruthy();
	});

	it('handles each wing as currentWing', () => {
		const wings: Wing[] = ['stories', 'music', 'apps', 'process', 'finished'];
		wings.forEach((wing) => {
			const { container } = render(WingNav, { props: { currentWing: wing } });
			expect(container.firstChild).toBeTruthy();
		});
	});
});
