# General Application Review Rules

These rules apply to the entire application, including plugins, routes, API endpoints, and database access patterns.

## Plugin Structure

This section applies to: Files matching `src/**/index.ts` that contain a default export of a function whose name ends with `Plugin` (e.g., `infrastructurePlugin`, `notesFeaturePlugin`).

While checking these files, verify:

- Feature plugins (`src/features/**/index.ts`) must create a child logger using `app.log.child({ plugin: "..." })` with a descriptive module name
- All errors that are not caught in try-catch blocks must be handled with a plugin error handler. Either on global level (`src/index.ts` using `setErrorHandler`) or sub-plugin level (feature plugin using `setErrorHandler`)

Additionally, when checking `src/index.ts` (or the main application file where plugins are registered), verify:

- Each plugin registered with `app.register(...)` should include a `prefix` option in the registration options (e.g., `app.register(pluginName, { prefix: "/api/..." })`), unless the plugin is intentionally prefix-less (e.g., root-level infrastructure routes)

If any plugin violates these rules:

- Add a blocking bug titled "Plugin structure violation"
- Body: "The plugin does not follow the global conventions. [Specify which rule was violated: missing preHandler hook with logging, missing setErrorHandler, or missing prefix in plugin registration]"

## Fastify Routes Validation

This section applies to: `src/**/*.routes.ts` files.
While checking files containing Fastify routes, verify below conventions:

- All Fastify routes should use Zod schema validation
- All routes have a schema stored in a dedicated `*.schema.ts` file
- Each route definition includes the schema in its options (e.g., `{ schema: ... }`)

If any route file violates these rules:

- Add a blocking bug titled "Route validation missing"
- Body: "All routes must use Zod schema validation defined in a dedicated schema file"

## Error Handling

While checking service and route files, verify:

- Catch and log database errors; translate them to 4xx/5xx responses

If any file violates these rules:

- Add a blocking bug titled "Error handling violation"
- Body: "Database errors must be caught, logged, and translated to appropriate HTTP responses. [Specify which rule was violated]"
