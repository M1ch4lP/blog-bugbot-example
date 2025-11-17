/**
 * Utility types for Fastify feature module type declarations
 * 
 * This file provides patterns for handling multiple feature modules that may
 * want to use the same property names on FastifyInstance.
 */

/**
 * Pattern for independent feature type declarations:
 * 
 * Each feature should have its own fastify.d.ts file that augments FastifyInstance.
 * TypeScript will merge these declarations:
 * 
 * 1. If two features declare the same property with identical/compatible types:
 *    - TypeScript merges them successfully
 *    - No conflicts occur
 * 
 * 2. If two features declare the same property with incompatible types:
 *    - TypeScript will error during compilation
 *    - This prevents runtime type conflicts
 * 
 * Example for a feature:
 * ```typescript
 * // src/features/notes/fastify.d.ts
 * import { NoteService } from "./service.js";
 * 
 * declare module "fastify" {
 *   interface FastifyInstance {
 *     noteService: NoteService;
 *   }
 * }
 * ```
 * 
 * If another feature also uses noteService with a compatible type, it works.
 * If it uses an incompatible type, TypeScript will catch the conflict.
 */

export type {}; // This file is for documentation and type utilities only

