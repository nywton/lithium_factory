/**
 * A synchronous factory function that returns an instance of T.
 */
type SyncFactory<T> = () => T;

/**
 *  An async factory function that returns a promise that resolves to a value T.
 */
type AsyncFactory<T> = () => Promise<T>;

/**
 * Internal registry of all facory definitions, keyed by their names.
 *
 * It supports both sync and async factories.
 * This map is populated by calling `define()` or `defineAsync()`.
 *
 * Example usage:
 *
 * define<User>('user', () => ({ name: 'John Doe' }));
 * define<User>('mailed_user', () => ({ name: 'John Doe', email: 'x2MlH@example.com' }));
 *
 * const user = await build<User>('user');
 * const mailed_user = await build<User>('mailed_user');
 */

const registry = new Map<
  string,
  SyncFactory<unknown> | AsyncFactory<unknown>
>();

/**
 * Registers a synchronous factory in the registry.
 *
 * @param name Unique identifier for the factory.
 * @param factory Function returning an object of type T.
 *
 * @example
 * define<User>('user', () => ({ id: 1, name: 'Test' }));
 */
export function define<T>(name: string, factory: SyncFactory<T>) {
  registry.set(name, factory);
}

/**
 * Registers an asynchronous factory in the registry.
 *
 * @param name Unique identifier for the factory.
 * @param factory Async function returning an object of type T.
 *
 * @example
 * defineAsync<User>('user', async () => fetchUser());
 */
export function defineAsync<T>(name: string, factory: AsyncFactory<T>) {
  registry.set(name, factory);
}

/**
 * Retrieves a factory by its name.
 * Returns `undefined` if not found.
 */
export function getFactory(name: string) {
  return registry.get(name);
}

/**
 * Checks whether a factory has been defined with the given name.
 */
export function hasFactory(name: string): boolean {
  return registry.has(name);
}
