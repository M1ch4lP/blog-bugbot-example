# Automated Code Review Workflows with Cursor Bug Bot

## Introduction

This project serves as a demonstration of how to optimize code review processes using Cursor and Bug Bot. The primary purpose is to showcase how you can leverage Bug Bot alongside local conventions to create automated code review workflows that ensure consistency and quality across your codebase.

As a basis for demonstrating the capabilities of Cursor and Bug Bot, we will use a simple CQRS API for storing notes, built with Fastify, TypeScript, and Prisma.

The project demonstrates how to document coding conventions in a structured way that both humans and AI can understand and enforce, making code reviews more efficient and consistent.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- SQLite (for the database)

### Installation

```bash
npm install                    # Install dependencies
npm run prisma:generate        # Generate Prisma client
npm run prisma:migrate         # Run database migrations
npm run dev                    # Start development server
```

The API will be available at `http://localhost:4000` by default.

### Running the Project

```bash
npm run dev                  # Start dev server with hot reload
npm run build                # Compile TypeScript to JavaScript
npm run start                # Run production server
npm run prisma:studio        # Open database GUI
```

The API will be available at `http://localhost:4000` by default (or the port specified in your `PORT` environment variable).

## Project Structure

This project follows a **feature-based architecture** with **CQRS (Command Query Responsibility Segregation)** pattern:

```
src/
├── features/
│   └── note/                    # Feature module example
│       ├── commands/            # Write operations (Create, Update, Delete)
│       │   ├── commands.routes.ts
│       │   ├── commands.service.ts
│       │   └── *.schema.ts      # Zod validation schemas
│       ├── queries/             # Read operations (Get, GetAll)
│       │   ├── queries.routes.ts
│       │   ├── queries.service.ts
│       │   └── *.schema.ts
│       ├── repository.ts        # Data access layer
│       └── index.ts             # Feature plugin
├── shared/                      # Shared utilities and types
└── index.ts                     # Application entry point
```

### Key Architectural Patterns

Below conventions are documented in Bugbot files and are enforced during code review and when creating new modules:

- **Feature Modules**: Each feature is self-contained in `src/features/<feature-name>/`
- **CQRS Separation**: Commands (write) and queries (read) are strictly separated
- **Repository Pattern**: Data access is abstracted through repository classes
- **Dependency Injection**: Services receive dependencies via constructors
- **Plugin Architecture**: Features are registered as Fastify plugins
- **Schema Files**: Validation schemas and response types must be defined in dedicated `*.schema.ts` files

### Important Note

⚠️ **The patterns and conventions in this project may not be production-ready.** The focus is on demonstrating the process of documenting and enforcing conventions, rather than creating a production-grade application.

## Bugbot Files and Hierarchy

Bug Bot uses a hierarchical system of convention files (BUGBOT.md) that define the rules your codebase should follow. Although BUGBOT.md files are primarily designed to describe code review rules, they can also be effectively used to document and enforce coding conventions. These files serve as **living documentation** of your coding conventions and can be referenced in multiple contexts.

### File Structure and Hierarchy

The Bugbot convention system is organized in a hierarchical file structure. Bugbot rules are scoped based on this hierarchy - meaning they are only considered for folders where a `.cursor` directory with a `BUGBOT.md` file is located.
It means that more specific rules in subfolders can extend or complement rules from higher levels.

Hierachy of the rules in the project:

```
.cursor/
└── BUGBOT.md                    # General application conventions

src/features/
└── .cursor/
    └── BUGBOT.md                # Feature module conventions
```

1. **`.cursor/BUGBOT.md`** - Contains rules that apply to the entire application:

   - Plugin structure requirements
   - Fastify route validation rules
   - Error handling patterns
   - Global architectural decisions

2. **`src/features/.cursor/BUGBOT.md`** - Contains rules specific to feature modules:
   - Module structure requirements
   - Service file patterns
   - Repository patterns
   - CQRS separation rules

### Example Rules

**From `.cursor/BUGBOT.md` (General Conventions):**

```markdown
## Fastify Routes Validation

- All Fastify routes should use Zod schema validation
- All routes have a schema stored in a dedicated `*.schema.ts` file
- Each route definition includes the schema in its options

If any route file violates these rules:

- Add a blocking bug titled "Route validation missing"
```

This example demonstrates how we can describe conventions that apply to the entire project. Here, the focus is on **code-level conventions**—rules about how code should be written and structured across all features.

**From `src/features/.cursor/BUGBOT.md` (Feature Conventions):**

```markdown
## Module Structure

- Modules must have commands and/or queries folders as needed
- Business logic, routes, schemas and services for CQRS commands must be located in the `commands` directory
  - It is important that the code inside `commands` folder is strictly related to CQRS commands - not queries
- Business logic, routes, schemas and services for CQRS queries must be located in the `queries` directory
  - It is important that the code inside `queries` folder is strictly related to CQRS queries - not commands

If any of the above structural rules is violated:

- Add a blocking bug titled "Module structure violated"
```

This example shows that we can also describe concepts related to **file structure and organization**. Here, the focus is more on **architectural concepts**—how the codebase should be organized at a structural level, defining the relationships between directories and the separation of concerns.

### Convention Records

These BUGBOT.md files are more than just Bug Bot configuration—they are **convention records** that:

- Document architectural decisions
- Can be referenced in other contexts (commands, .mdc files, documentation)
- Serve as a single source of truth for coding standards
- Enable both automated and manual code review processes

These files serve as an excellent source of **local conventions** that are documented close to the code they relate to. By placing BUGBOT.md files in `.cursor` directories within the relevant parts of your codebase, you create a documentation system where conventions live alongside the code they govern. This proximity makes it easier for developers to discover and understand the rules that apply to specific areas of the project.

Additionally, since these are **Markdown files**, they are easily readable by both humans and machines. Developers can quickly open and review them in any text editor or markdown viewer, making the conventions accessible and transparent. This human-readable format encourages documentation that is clear, well-structured, and maintainable.

## Running Bugbot

### On Pull Requests

**This is the default usage of Bug Bot.** Bug Bot can be configured to run automatically on pull requests, providing automated code review feedback. This ensures that:

- All code changes are checked against conventions
- Violations are caught before code is merged
- Reviewers can focus on logic and design rather than convention compliance

The automated checks use the same BUGBOT.md files, ensuring consistency between local development and CI/CD processes.

**However, in this repository, we focus more on alternative solutions**, including local usage and integration with Cursor commands and Cursor rules. While using Bug Bot with pull requests is very useful, it's important to note that:

- **Integration challenges**: PR-based Bug Bot usage can conflict with other tools integrated into your CI/CD pipeline
- **Limited availability**: You may not always have the option to integrate Bug Bot directly with your repository (e.g., due to organizational policies, existing tooling constraints, or platform limitations)
- **Alternative approaches**: Even when you cannot use Bug Bot in your CI/CD pipeline, you can still leverage it in other ways—through local usage, Cursor commands, and by referencing BUGBOT.md files in your development workflow

### Local Usage

Bug Bot can be run locally through Cursor's interface. When you open a file or make changes, Bug Bot will automatically check your code against the conventions defined in the BUGBOT.md files.

To trigger Bug Bot manually:

1. Open a file in Cursor
2. Use Cursor's Bug Bot feature (typically accessible through the command palette or UI)
3. Bug Bot will analyze the code against all relevant BUGBOT.md files in the hierarchy, taking into account primarily the changes relative to the main branch

## Manual Code Review with Commands: Using Bugbot Rules Outside of Bugbot

While Bug Bot provides automated checks, the BUGBOT.md files can be used in various ways outside of Bug Bot itself. The rules defined in these files are not limited to automated checks - they serve as a flexible foundation for multiple review and validation approaches.

**Using Cursor Commands**

One way to leverage Bugbot rules outside of Bug Bot is through [Cursor commands](https://cursor.com/docs/agent/chat/commands).
These commands can be particularly useful for:

- Reviewing specific changes in a diff
- Performing comprehensive reviews of the current codebase
- Using different Cursor models for analysis

Commands are located in `.cursor/commands/` and can be referenced directly in Cursor. For example, the `feature-module-code-review.md` command provides a structured review process.

**Example Command: `.cursor/commands/feature-module-code-review.md`**

```markdown
# Feature module convention review

## Prerequisites

Read convention files:

- `src/features/.cursor/BUGBOT.md` - Feature module conventions
- `.cursor/BUGBOT.md` - General application conventions

## Review Process

For each feature module in `src/features/*`:

1. **Module Structure** - Check against `src/features/.cursor/BUGBOT.md` "Module Structure" section
2. **Service Files** (`*.service.ts`) - Check against `src/features/.cursor/BUGBOT.md` "Service Files" section
   ... // other review process steps

## Output Format

For each violation:

- **Title:** Use exact title from relevant BUGBOT.md section
  ... // other content of the output format
```

This command:

- Reads the relevant BUGBOT.md files
- Performs a systematic review of feature modules based on the specified review steps and checks against all convention categories (structure, services, routes, plugins, repositories)
- Provides structured output with violations and recommendations

#### Use cases

1. **Reviewing Current Codebase**

   - Apply the command to the entire codebase or specific modules to get a comprehensive report of convention compliance
   - This is particularly useful when you don't want to focus only on changes, but rather perform an audit of existing code to identify areas that need refactoring or improvement

2. **Reviewing Changes with a specific model selection**

   - Use Cursor's diff (Symbol: `@ -> Branch(Diff with main)`), then reference a command using BUGBOT rules (type: `/<your-code-review-command>`) and select the model you are interested in
   - This approach is particularly useful when you want to perform a code review with a specific model or compare reviews across multiple models
   - Different models may provide different insights and perspectives, and some models may be better at detecting specific types of violations, making cross-checking reviews valuable

#### Alternatives to cursor commands

However, Cursor commands are just one of the ways to use Bugbot rules. You can also:

- **Reference rules directly in the agent window**: When working with Cursor's AI agent, you can directly reference BUGBOT.md files to guide code generation, refactoring, or review processes. Simply mention the relevant BUGBOT.md file in your conversation, and the agent will use those conventions as context.
- **Integrate with CI/CD tools**: BUGBOT.md files can be referenced by other tools integrated into your CI/CD pipeline. Since they are human-readable Markdown files, they can be parsed and used by custom scripts, linting tools, or other automated review systems that need to understand your project's conventions.

## Cursor rules (.mdc files) integration

`.mdc` files are contextual rules that can be applied in Cursor to guide AI behavior. They are particularly useful for scaffolding and code generation tasks.

### Purpose

`.mdc` files allow you to:

- Define specific workflows for common tasks
- Ensure generated code follows your conventions
- Provide context-aware guidance to AI assistants

**Key difference between cursor rules (.mdc) and BUGBOT.md files:** Cursor rules guide Cursor's behavior—they can describe how Cursor should work, step by step, while BUGBOT.md files are a set of rules that should be followed before code publication.

Below, you can find explanation how you can use BUGBOT.md files to improve code generation and the pitfalls associated with this approach.

### Example: Feature Module Creation

The file `src/features/.cursor/rules/feature-module-creation.mdc` demonstrates how to scaffold a new feature module while respecting conventions:

```markdown
---
description: Use this when the user requests scaffolding of a new feature module using a specific Prisma model
alwaysApply: false
---

Follow this rule only when the user explicitly asks to create a new feature module...

Steps:

1. Determine the module name from the Prisma model name
2. Read `@src/features/.cursor/BUGBOT.md` and ensure every convention is respected
3. Scaffolding outline (apply BUGBOT conventions for each part):
   - `index.ts` Fastify plugin...
   - Root-level repository file(s)...
   - `commands/` and `queries/` folders...
```

### Referencing BUGBOT.md in .mdc Files

For `.mdc` files that define scaffolding processes, it might be a good idea to reference a BUGBOT.md files. This ensures that:

- Generated code automatically follows conventions
- The scaffolding process is aligned with your architectural decisions

The example `feature-module-creation.mdc` demonstrates this by explicitly instructing to "Read `@src/features/.cursor/BUGBOT.md` and ensure every convention in that document is respected while scaffolding."

#### Pitfalls and Considerations

While referencing BUGBOT.md files in `.mdc` files can improve code generation, be aware of the following pitfalls:

- **Context overload**: Including multiple BUGBOT.md files or very long convention files can overwhelm the AI's context window, potentially causing it to miss important details or generate code that only partially follows conventions
- **Over-constraining the AI**: If BUGBOT.md files contain too many detailed rules, the AI might struggle to generate code that satisfies all constraints simultaneously, leading to incomplete or overly complex solutions
- **Rule conflicts**: Different BUGBOT.md files in the hierarchy might contain conflicting rules, causing confusion about which conventions to prioritize during code generation
- **Stale conventions**: If BUGBOT.md files are updated but `.mdc` files still reference old versions or outdated patterns, generated code might not align with current best practices
- **Interpretation ambiguity**: BUGBOT.md rules written for code review might be interpreted differently when used for code generation, leading to unexpected results

To mitigate these risks, keep BUGBOT.md references in `.mdc` files focused and specific, and regularly review whether the referenced conventions are still appropriate for code generation tasks.

### Important Warning: Metadata Control

This is especially importatnt when you are referencing other files in your mdc rules:

⚠️ **`.mdc` files should NOT always run automatically.** The `alwaysApply: false` setting is crucial because:

- **Relevance matters**: Rules should only apply when relevant - most of them are scenrio-specific
- **Context window should be protected**: Rules add to the context data that will be used by agent
- **Avoid conflicts**: Multiple rules running simultaneously can conflict
- **Rule control**: Often you should explicitly choose when to apply scaffolding rules, or at least allow for "intelligent" application of the rule

Always review the metadata of `.mdc` files and ensure `alwaysApply: false` unless you have a specific reason to auto-apply a rule.

## Summary

This project demonstrates a complete workflow for:

1. **Documenting conventions** in structured BUGBOT.md files
2. **Automated enforcement** through Bug Bot
3. **Manual review** using commands that reference the same conventions
4. **Code generation** with .mdc files that respect your conventions

By combining these approaches, you can create a robust code review system that ensures consistency, quality, and adherence to architectural decisions throughout your development process.
