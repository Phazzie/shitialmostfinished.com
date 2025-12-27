// COMPLETION BADGE TESTS
// Tests component behavior against contract expectations
// IMMUTABLE - do not modify to fix failing component

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import CompletionBadge from './CompletionBadge.svelte';

describe('CompletionBadge', () => {
	it('renders completion percentage', () => {
		const { getByText } = render(CompletionBadge, { props: { completion: 75 } });
		expect(getByText('75%')).toBeTruthy();
	});

	it('handles 0% completion', () => {
		const { getByText } = render(CompletionBadge, { props: { completion: 0 } });
		expect(getByText('0%')).toBeTruthy();
	});

	it('handles 100% completion', () => {
		const { getByText } = render(CompletionBadge, { props: { completion: 100 } });
		expect(getByText('100%')).toBeTruthy();
	});

	it('clamps values above 100', () => {
		const { getByText } = render(CompletionBadge, { props: { completion: 150 } });
		expect(getByText('100%')).toBeTruthy();
	});

	it('clamps values below 0', () => {
		const { getByText } = render(CompletionBadge, { props: { completion: -10 } });
		expect(getByText('0%')).toBeTruthy();
	});

	it('renders as a visual element', () => {
		const { container } = render(CompletionBadge, { props: { completion: 50 } });
		expect(container.firstChild).toBeTruthy();
	});

	it('handles decimal values correctly', () => {
		const { getByText } = render(CompletionBadge, { props: { completion: 75.5 } });
		// Should round or display consistently
		const text = getByText(/75%|76%/);
		expect(text).toBeTruthy();
	});
});
