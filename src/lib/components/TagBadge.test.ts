// TAG BADGE TESTS
// Tests component behavior for process tag badges
// IMMUTABLE - do not modify to fix failing component

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import TagBadge from './TagBadge.svelte';
import type { ProcessTag } from '$lib/contracts';

describe('TagBadge', () => {
	it('renders tag name', () => {
		const { getByText } = render(TagBadge, { props: { tag: 'THE_BREAKTHROUGH' as ProcessTag } });
		expect(getByText('THE_BREAKTHROUGH')).toBeTruthy();
	});

	it('displays THE_ARGUMENT tag', () => {
		const { getByText } = render(TagBadge, { props: { tag: 'THE_ARGUMENT' as ProcessTag } });
		expect(getByText('THE_ARGUMENT')).toBeTruthy();
	});

	it('displays THE_GRAVEYARD tag', () => {
		const { getByText } = render(TagBadge, { props: { tag: 'THE_GRAVEYARD' as ProcessTag } });
		expect(getByText('THE_GRAVEYARD')).toBeTruthy();
	});

	it('displays THE_LONG_GAME tag', () => {
		const { getByText } = render(TagBadge, { props: { tag: 'THE_LONG_GAME' as ProcessTag } });
		expect(getByText('THE_LONG_GAME')).toBeTruthy();
	});

	it('displays THE_TANGENT tag', () => {
		const { getByText } = render(TagBadge, { props: { tag: 'THE_TANGENT' as ProcessTag } });
		expect(getByText('THE_TANGENT')).toBeTruthy();
	});

	it('renders as a visual element', () => {
		const { container } = render(TagBadge, { props: { tag: 'THE_BREAKTHROUGH' as ProcessTag } });
		expect(container.firstChild).toBeTruthy();
	});

	it('handles all valid tag types', () => {
		const tags: ProcessTag[] = [
			'THE_BREAKTHROUGH',
			'THE_ARGUMENT',
			'THE_GRAVEYARD',
			'THE_LONG_GAME',
			'THE_TANGENT'
		];
		tags.forEach((tag) => {
			const { getByText } = render(TagBadge, { props: { tag } });
			expect(getByText(tag)).toBeTruthy();
		});
	});
});
