# Contracts

This directory contains the **SEAMS** of the application - the boundaries where data crosses between components and systems.

## SDD Philosophy: Contracts are IMMUTABLE

Once tests are written against these contracts, **DO NOT MODIFY THEM**.

If something breaks:

- ❌ Do NOT change the contract
- ❌ Do NOT change the tests
- ✅ DELETE the broken implementation
- ✅ REGENERATE from the contract

## What Lives Here

- `project.ts` - Project data shape and service interface
- `transcript.ts` - Conversation data shape and service interface
- `wing.ts` - Wing/category configuration (static data)
- `index.ts` - Re-exports for convenient importing

## Rules

1. Contracts NEVER import runtime libraries (no Svelte, no fs, no fetch)
2. Contracts are pure TypeScript interfaces and types
3. Contracts define WHAT, not HOW
4. If the contract seems wrong, finish the current phase first, then discuss
