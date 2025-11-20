# Feature Module Review Rules

These rules apply to feature modules located in `src/features`. Each directory under `src/features` represents a feature module.

## Module Structure

For files located in feature modules, check the following rules:

- Feature modules should not import from other feature modules directly
- Every directory must have an `index.ts` file containing a Fastify plugin representing the feature module
- Every module must contain one or more repository files at the root level (sibling to `commands` and `queries` folders)
  - If there are more the 3 repositories they should be put in `repositories` folder
- Modules must have commands and/or queries folders as needed
- Business logic, routes, schemas and services for CQRS commands must be located in the `commands` directory
  - It is important that the code inside `commands` folder is strictly related to CQRS commands - not queries
- Business logic, routes, schemas and services for CQRS queries must be located in the `queries` directory
  - It is important that the code inside `queries` folder is strictly related to CQRS queries - not commands
- Schemas for routes must be located in `*.schema.ts` files
- Every schema file must be named after the command or query it represents

If any of the above structural rules is violated:

- Add a blocking bug titled "Module structure violated"
- Body: "The feature module does not follow the required structure. [Specify which rule was violated]"

## Service Files

This section applies to: `src/features/*/**/*.service.ts`

While checking `*.service.ts` files, verify:

- Repositories are injected into services via constructor (not instantiated directly)
- All service methods that are async use `async/await` instead of Promises (e.g., `.then()`, `.catch()`)
- Services should throw domain-specific errors, not generic Error
- When a repository method returns `null` and the absence is exceptional, the service must throw a domain error such as `NotFoundError` instead of returning null

If any service file violates these rules:

- Add a blocking bug titled "Service pattern violation"
- Body: "The service does not follow the required patterns. [Specify which rule was violated]"
- Suggest an autofix snippet if applicable

## Module Plugin

While checking the main plugin file (`index.ts`), verify:

- Every plugin has all services declared with `.decorate` method
  - All services should be injected with `.decorate` using a name that strats with a feature module name
- All services and repositories are properly decorated on the Fastify instance before routes are registered
- Type declarations for decorated properties are added to the Fastify module augmentation

If the plugin file violates these rules:

- Add a blocking bug titled "Plugin decoration missing"
- Body: "All services must be decorated on the Fastify instance using `.decorate` method"

## Repository Pattern

While checking repository files, verify:

- Repository files are located at the module root level (not inside `commands` or `queries` folders)
- Repositories encapsulate data access logic and expose intent-revealing methods
- Repositories return domain entities or `null` when no entity is found
- Services handle repository `null` returns by throwing appropriate domain errors

If any repository violates these patterns:

- Add a blocking bug titled "Repository pattern violation"
- Body: "The repository does not follow the required patterns. [Specify which rule was violated]"
