# Implementation Plan: Code Review Fixes
**Date**: 2025-12-28
**Phase**: Phase 7 Post-Review Improvements
**Status**: DRAFT - Pending Review

---

## Executive Summary

This plan addresses the remaining issues from the Phase 7 code review (notes/phase-7-code-review.md). The security fix (XSS) has been completed. This plan covers accessibility improvements and code quality enhancements.

---

## Scope

### In Scope
1. ✅ **Security Fix** - XSS vulnerability (COMPLETED)
2. 🔲 **Accessibility Improvements** - ARIA labels (MEDIUM priority)
3. 🔲 **Date Utility Function** - DRY principle (LOW priority)
4. 🔲 **Export VALID_WINGS** - Single source of truth (LOW priority)

### Out of Scope
- Loading states (Phase 8 enhancement)
- Open Graph meta tags (Phase 8 enhancement)
- Image optimization (Post-launch)
- Analytics (Post-launch)

---

## Detailed Implementation Plan

### Task 1: Accessibility Improvements
**Priority**: MEDIUM (SHOULD FIX)
**Estimated Time**: 15 minutes
**Risk**: LOW

#### Files to Modify
1. `src/routes/[wing]/[slug]/+page.svelte`
2. `src/routes/[wing]/[slug]/transcript/+page.svelte`
3. `src/routes/+page.svelte`

#### Changes Required

##### 1.1: Add ARIA labels to breadcrumb navigation
**Files**: Project detail page, transcript page

**Change**:
```svelte
<!-- BEFORE -->
<nav class="breadcrumb">
  <a href="/">Home</a>
  <span class="separator">/</span>
  <a href="/{project.wing}">{wingConfig.name}</a>
  <span class="separator">/</span>
  <span class="current">{project.title}</span>
</nav>

<!-- AFTER -->
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="/">Home</a>
  <span class="separator" aria-hidden="true">/</span>
  <a href="/{project.wing}">{wingConfig.name}</a>
  <span class="separator" aria-hidden="true">/</span>
  <span class="current">{project.title}</span>
</nav>
```

**Rationale**:
- `aria-label="Breadcrumb"` identifies the navigation landmark for screen readers
- `aria-hidden="true"` on separators prevents them from being announced (they're decorative)

##### 1.2: Mark decorative icons as aria-hidden
**Files**: Project detail page, home page, wing listing page

**Change**:
```svelte
<!-- BEFORE -->
<span class="wing-icon">{wingConfig.icon}</span>

<!-- AFTER -->
<span class="wing-icon" aria-hidden="true">{wingConfig.icon}</span>
```

**Rationale**: Wing icons (emojis) are decorative and duplicate information already in text labels.

**Testing**:
- Visual inspection: Page should look identical
- Manual test: Tab through page, verify no functionality changes
- Automated test: Run `npm test` to verify no regressions

**Success Criteria**:
- All breadcrumb navs have `aria-label="Breadcrumb"`
- All separators have `aria-hidden="true"`
- All decorative icons have `aria-hidden="true"`
- Tests still pass (66/66)

---

### Task 2: Date Formatting Utility
**Priority**: LOW (NICE TO HAVE)
**Estimated Time**: 10 minutes
**Risk**: LOW

#### Files to Create
1. `src/lib/utils/date.ts` (NEW)

#### Files to Modify
1. `src/routes/[wing]/[slug]/+page.svelte`
2. `src/routes/[wing]/[slug]/transcript/+page.svelte`

#### Changes Required

##### 2.1: Create date utility function
**File**: `src/lib/utils/date.ts`

**Content**:
```typescript
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
```

##### 2.2: Update project detail page
**File**: `src/routes/[wing]/[slug]/+page.svelte`

**Changes**:
```svelte
<!-- Add import at top of script block -->
<script lang="ts">
  import { formatDate } from '$lib/utils/date';
  // ... existing imports
</script>

<!-- Replace inline date formatting (line ~75-79) -->
<!-- BEFORE -->
<time datetime={project.dateUpdated}>
  {new Date(project.dateUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })}
</time>

<!-- AFTER -->
<time datetime={project.dateUpdated}>
  {formatDate(project.dateUpdated)}
</time>
```

##### 2.3: Update transcript page
**File**: `src/routes/[wing]/[slug]/transcript/+page.svelte`

**Changes**: Same pattern as 2.2, replace all date formatting (3 instances: dateCreated, dateUpdated)

**Testing**:
- Visual inspection: Dates should display identically
- Manual test: Navigate to project detail and transcript pages
- Automated test: Run `npm test` to verify no regressions

**Success Criteria**:
- Date utility file created with JSDoc
- All date formatting uses `formatDate()` function
- No inline date formatting remains
- Tests still pass (66/66)
- Production build succeeds

---

### Task 3: Export VALID_WINGS Constant
**Priority**: LOW (NICE TO HAVE)
**Estimated Time**: 10 minutes
**Risk**: LOW

#### Files to Modify
1. `src/lib/contracts/project.ts`
2. `src/routes/+page.svelte`
3. `src/routes/[wing]/+page.ts`

#### Changes Required

##### 3.1: Export constant from contracts
**File**: `src/lib/contracts/project.ts`

**Change**:
```typescript
// Find this line (around line 4):
export type Wing = 'music' | 'apps' | 'stories' | 'process' | 'finished';

// Add immediately after:
export const VALID_WINGS: Wing[] = ['music', 'apps', 'stories', 'process', 'finished'];
```

**Rationale**: Single source of truth for wing values.

##### 3.2: Update home page
**File**: `src/routes/+page.svelte`

**Change**:
```svelte
<script lang="ts">
  // BEFORE
  import { WING_CONFIGS, type Wing } from '$lib/contracts';
  const wings: Wing[] = ['music', 'apps', 'stories', 'process', 'finished'];

  // AFTER
  import { WING_CONFIGS, VALID_WINGS, type Wing } from '$lib/contracts';
  // Remove local wings array, use VALID_WINGS directly
</script>

<!-- BEFORE -->
{#each wings as wing}

<!-- AFTER -->
{#each VALID_WINGS as wing}
```

##### 3.3: Update wing loader
**File**: `src/routes/[wing]/+page.ts`

**Change**:
```typescript
// BEFORE
import { WING_CONFIGS, type Wing } from '$lib/contracts';

export const load: PageLoad = async ({ params }) => {
  const { wing } = params;
  const validWings: Wing[] = ['music', 'apps', 'stories', 'process', 'finished'];
  if (!validWings.includes(wing as Wing)) {
    throw error(404, `Wing "${wing}" not found`);
  }
  // ...
};

// AFTER
import { WING_CONFIGS, VALID_WINGS, type Wing } from '$lib/contracts';

export const load: PageLoad = async ({ params }) => {
  const { wing } = params;
  if (!VALID_WINGS.includes(wing as Wing)) {
    throw error(404, `Wing "${wing}" not found`);
  }
  // ...
};
```

**Testing**:
- Visual inspection: Home page should display same 5 wings
- Manual test: Navigate to each wing (/music, /apps, etc.)
- Manual test: Try invalid wing (/invalid) - should 404
- Automated test: Run `npm test` to verify no regressions

**Success Criteria**:
- VALID_WINGS exported from contracts
- No hard-coded wing arrays in pages/loaders
- Wing validation still works (404 for invalid wings)
- Tests still pass (66/66)

---

## Execution Order

### Phase 1: Accessibility (MUST DO)
1. Task 1.1: Add ARIA labels to breadcrumbs
2. Task 1.2: Mark decorative icons as hidden
3. Test: Visual inspection + npm test
4. Commit: "a11y: Add ARIA labels for screen reader accessibility"

### Phase 2: Code Quality (OPTIONAL)
5. Task 2.1: Create date utility
6. Task 2.2-2.3: Update pages to use utility
7. Task 3.1-3.3: Export and use VALID_WINGS
8. Test: Visual inspection + npm test
9. Commit: "refactor: Extract date formatting and VALID_WINGS to reduce duplication"

### Phase 3: Verification
10. Run full test suite
11. Run production build
12. Visual QA on all routes
13. Push to remote

---

## Risk Assessment

### Task 1: Accessibility
**Risk**: LOW
- **Impact**: None - Only adds HTML attributes
- **Likelihood of failure**: Very low
- **Rollback**: Easy - remove attributes

### Task 2: Date Utility
**Risk**: LOW
- **Impact**: None if implemented correctly
- **Likelihood of failure**: Low - simple function
- **Rollback**: Easy - revert to inline formatting

### Task 3: VALID_WINGS Export
**Risk**: LOW
- **Impact**: None - same values, different location
- **Likelihood of failure**: Low - TypeScript will catch errors
- **Rollback**: Easy - revert imports

**Overall Risk**: LOW - All changes are low-impact refactoring.

---

## Testing Strategy

### Unit Tests
- Existing tests should continue to pass (66/66)
- No new tests required (no behavior changes)

### Manual Testing
1. **Accessibility**:
   - Use browser DevTools to inspect ARIA attributes
   - Tab through pages to verify keyboard navigation
   - Use screen reader (if available) to verify announcements

2. **Date Formatting**:
   - Compare before/after screenshots
   - Verify dates display identically

3. **VALID_WINGS**:
   - Visit all wing pages (/music, /apps, etc.)
   - Try invalid wing (/invalid) - should 404
   - Verify home page shows all 5 wings

### Build Testing
- Production build must succeed: `npm run build`
- Dev server must work: `npm run dev`

---

## Success Metrics

### Must Have
- ✅ All tests passing (66/66)
- ✅ Production build succeeds
- ✅ No visual regressions
- ✅ All accessibility attributes added

### Nice to Have
- ✅ Date utility created and used
- ✅ VALID_WINGS exported and used
- ✅ Code duplication reduced

---

## Rollback Plan

If any step fails:

1. **Immediate**: Stop execution, don't proceed to next task
2. **Investigate**: Check error messages, review changes
3. **Rollback**: `git checkout -- <file>` to revert specific file
4. **Alternative**: `git reset --hard HEAD` to revert all changes
5. **Document**: Note what failed and why in lessons learned

---

## Time Estimates

| Task | Estimated Time |
|------|----------------|
| Task 1: Accessibility | 15 minutes |
| Task 2: Date Utility | 10 minutes |
| Task 3: VALID_WINGS | 10 minutes |
| Testing | 10 minutes |
| Documentation | 5 minutes |
| **Total** | **50 minutes** |

---

## Dependencies

### Required Before Starting
- ✅ Phase 7 complete
- ✅ XSS security fix complete
- ✅ All tests passing (66/66)
- ✅ Git working tree clean

### Blockers
- None identified

---

## Questions & Concerns

### Question 1: Should we add more ARIA landmarks?
**Answer**: Not in this phase. Current changes are sufficient for screen reader navigation.

### Question 2: Should we test with actual screen readers?
**Answer**: Ideal but not required. ARIA attributes follow WAI-ARIA spec, should work correctly.

### Question 3: Should we add TypeScript tests for date utility?
**Answer**: Not required. Function is simple, existing integration tests are sufficient.

### Question 4: Should all tasks be in one commit or separate?
**Answer**: Two commits:
1. Accessibility (a11y: prefix)
2. Refactoring (refactor: prefix)

---

## Post-Implementation

### Documentation Updates
- Update HANDOVER.md with completion notes
- Update phase-7-code-review.md status
- Update phase-7-lessons-learned.md with insights

### Next Steps
- Proceed to Phase 8 (Data & Deploy)
- Consider additional accessibility audit (optional)
- Plan Open Graph meta tags for Phase 8

---

## Approval

**Plan Status**: DRAFT
**Awaiting**: Review and critique
**Next Step**: Address feedback, then execute

---

**End of Implementation Plan**
