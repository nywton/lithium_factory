/**
 * Custom error thrown when a factory has not been defined or could not be found.
 */
export class FactoryNotDefinedError extends Error {
  constructor(name: string) {
    super(`Factory '${name}' is not defined.`);
    this.name = "FactoryNotDefinedError";
  }
}
