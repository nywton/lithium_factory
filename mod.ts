/**
 * LithiumFactory is a lightweight, type-safe factory helper for Deno/TypeScript
 * inspired by FactoryBot (Ruby).
 *
 * Key features:
 * - Lazy loading of factory definitions (one file per factory).
 * - Supports synchronous and asynchronous factories.
 * - Allows overrides, multiple builds, and full type safety.
 */

export { define, defineAsync } from "./src/registry.ts";
export { build, buildMany } from "./src/builder.ts";
export { FactoryNotDefinedError } from "./src/errors.ts";
