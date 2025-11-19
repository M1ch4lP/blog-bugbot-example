# Feature module convention review

## Prerequisites

Read convention files:

- `src/features/.cursor/BUGBOT.md` - Feature module conventions
- `.cursor/BUGBOT.md` - General application conventions

## Review Process

For each feature module in `src/features/*`:

1. **Module Structure** - Check against `src/features/.cursor/BUGBOT.md` "Module Structure" section
2. **Service Files** (`*.service.ts`) - Check against `src/features/.cursor/BUGBOT.md` "Service Files" section
3. **Route Files** (`*.routes.ts`) - Check against:
   - `src/features/.cursor/BUGBOT.md` "Route Files" section
   - `.cursor/BUGBOT.md` "Fastify Routes Validation" and "API Response Standards" sections
4. **Plugin File** (`index.ts`) - Check against:
   - `src/features/.cursor/BUGBOT.md` "Module Plugin" section
   - `.cursor/BUGBOT.md` "Plugin Structure" section
5. **Repository Files** - Check against `src/features/.cursor/BUGBOT.md` "Repository Pattern" section
6. **General Conventions** - Check all files against `.cursor/BUGBOT.md` "Error Handling" and "Prisma Client Usage" sections
7. **CQRS Separation** - Verify commands/queries are strictly separated
8. **Type Safety** - Verify Fastify module augmentation and typed route handlers

## Output Format

For each violation:

- **Title:** Use exact title from relevant BUGBOT.md section
- **Body:** Rule violated, file path, location (reference BUGBOT.md section)
- **Labels:** As specified in BUGBOT.md
- **Autofix:** Suggest when applicable

## Summary

- Total modules reviewed
- Violations grouped by type
- Modules with violations
- Priority recommendations
