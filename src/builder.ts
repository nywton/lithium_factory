import { FactoryNotDefinedError } from "./errors.ts";
import { getFactory, hasFactory } from "./registry.ts";

/**
 * Tries to load a factory from `../factories/{name}.ts` if it hasn’t been registered yet.
 */
async function lazyLoad(name: string): Promise<void> {
  if (!hasFactory(name)) {
    try {
      await import(`../factories/${name}.ts`);
    } catch (err) {
      if (
        err instanceof Deno.errors.NotFound ||
        err instanceof TypeError
      ) {
        // Do nothing, getFactory will throw proper error
      } else {
        throw err;
      }
    }
  }
}

/**
 * Build a single entity by name.
 */
export async function build<T>(
  name: string,
  override: Partial<T> = {},
): Promise<T> {
  await lazyLoad(name);

  const factory = getFactory(name);
  if (!factory) throw new FactoryNotDefinedError(name);

  // Allow both sync and async factories
  const value = await Promise.resolve(factory() as T);
  return { ...value, ...override };
}

/**
 * Build multiple entities from a factory.
 */
export async function buildMany<T>(
  name: string,
  count: number,
  override: Partial<T> = {},
): Promise<T[]> {
  const builds = Array.from({ length: count }, () => build<T>(name, override));
  return await Promise.all(builds);
}

/**
 * Alias for build()
 */
export const buildAsync = build;
