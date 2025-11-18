# General Application Review Rules

These rules apply to the entire application, including plugins, routes, API endpoints, and database access patterns.

## Plugin Structure

This section applies to files containing Fastify plugins. Plugin definitions are registered with Fastify `.register` method.

While checking plugin files, verify:

- Every plugin should have dedicated logging for incoming requests
- Every plugin should have a dedicated error handler
- Routes should have a single prefix point using `fastify.register` options

If any plugin violates these rules:

- Add a blocking bug titled "Plugin structure violation"
- Body: "The plugin does not follow the global conventions [Specify which rule was violated]"

## Fastify Routes Validation

This section applies to: `src/**/*.routes.ts` files

While checking files containing Fastify routes, verify:

- All Fastify endpoints should use Zod schema validation
- All routes have a schema stored in a dedicated `*.schema.ts` file
- Each route definition includes the schema in its options (e.g., `{ schema: ... }`)

If any route file violates these rules:

- Add a blocking bug titled "Route validation missing"
- Body: "All routes must use Zod schema validation defined in a dedicated schema file"

## API Response Standards

This section applies to: `src/**/*.routes.ts`

While checking route files, verify:

- Creation of a resource should return 201 status code
- Deletion of a resource should return 204 status code
- Update of a resource should return 200 status code
- Ensure responses are JSON-serializable and avoid returning raw ORM objects when unnecessary

If any route violates these rules:

- Add a blocking bug titled "API response standard violation"
- Body: "The route does not follow the required API response standards. [Specify which rule was violated]"

## Error Handling

While checking service and route files, verify:

- Catch and log database errors; translate them to 4xx/5xx responses

If any file violates these rules:

- Add a blocking bug titled "Error handling violation"
- Body: "Database errors must be caught, logged, and translated to appropriate HTTP responses. [Specify which rule was violated]"

## Prisma Client Usage

This section applies to: `src/**/*.ts` (all TypeScript files)

While checking any file that uses Prisma, verify:

- Only one Prisma client instance should be used throughout the application
- The Prisma client should be accessed through a shared module or singleton pattern

If any file violates these rules:

- Add a blocking bug titled "Prisma client violation"
- Body: "Only one Prisma client instance should be used throughout the application"
