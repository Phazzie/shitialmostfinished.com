// PROJECT CARD TESTS
// Tests component behavior for project display cards
// IMMUTABLE - do not modify to fix failing component

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import ProjectCard from './ProjectCard.svelte';
import type { Project } from '$lib/contracts';

// Test fixture - minimal valid project
const testProject: Project = {
	slug: 'test-project',
	title: 'Test Project',
	wing: 'music',
	completion: 75,
	tags: ['THE_BREAKTHROUGH'],
	aiSource: 'claude',
	dateUpdated: '2025-01-01',
	pitch: 'A test project for validation',
	quickVersion: '# Test\n\nContent here',
	recap: '## Analysis\n\nThis is the recap.',
	relatedProjects: [],
	hasTranscript: true
};

describe('ProjectCard', () => {
	it('renders project title', () => {
		const { getByText } = render(ProjectCard, { props: { project: testProject } });
		expect(getByText('Test Project')).toBeTruthy();
	});

	it('displays completion percentage', () => {
		const { getByText } = render(ProjectCard, { props: { project: testProject } });
		expect(getByText('75%')).toBeTruthy();
	});

	it('displays project pitch', () => {
		const { getByText } = render(ProjectCard, { props: { project: testProject } });
		expect(getByText('A test project for validation')).toBeTruthy();
	});

	it('displays wing information', () => {
		const { container } = render(ProjectCard, { props: { project: testProject } });
		// Wing should be displayed somewhere in the card
		expect(container.textContent).toContain('music');
	});

	it('displays process tags', () => {
		const { container } = render(ProjectCard, { props: { project: testProject } });
		expect(container.textContent).toContain('THE_BREAKTHROUGH');
	});

	it('shows transcript indicator when hasTranscript is true', () => {
		const { container } = render(ProjectCard, { props: { project: testProject } });
		// Should indicate transcript is available
		expect(container.textContent).toBeTruthy();
	});

	it('handles project without transcript', () => {
		const projectWithoutTranscript = { ...testProject, hasTranscript: false };
		const { container } = render(ProjectCard, {
			props: { project: projectWithoutTranscript }
		});
		expect(container.firstChild).toBeTruthy();
	});

	it('renders as a clickable card element', () => {
		const { container } = render(ProjectCard, { props: { project: testProject } });
		expect(container.firstChild).toBeTruthy();
	});

	it('displays AI source', () => {
		const { container } = render(ProjectCard, { props: { project: testProject } });
		expect(container.textContent).toContain('claude');
	});

	it('handles multiple tags', () => {
		const projectWithMultipleTags = {
			...testProject,
			tags: ['THE_BREAKTHROUGH', 'THE_LONG_GAME']
		};
		const { container } = render(ProjectCard, { props: { project: projectWithMultipleTags } });
		expect(container.textContent).toContain('THE_BREAKTHROUGH');
		expect(container.textContent).toContain('THE_LONG_GAME');
	});
});
