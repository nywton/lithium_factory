import { assert } from "@std/assert/assert";
import { assertEquals } from "@std/assert/equals";
import { define, defineAsync, getFactory, hasFactory } from "./registry.ts";

type User = { id: number; name: string };

Deno.test("define() registers a sync factory and retrieves it via getFactory()", () => {
  define<User>("user", () => ({ id: 1, name: "Alice" }));

  const factory = getFactory("user") as (() => User) | undefined;
  assert(factory, "Factory should be registered");

  const instance = factory();
  assertEquals(instance.name, "Alice");
  assertEquals(instance.id, 1);
});

Deno.test("defineAsync() registers an async factory and resolves it", async () => {
  defineAsync<User>(
    "async_user",
    () => Promise.resolve({ id: 2, name: "Bob" }),
  );

  const factory = getFactory("async_user") as (() => Promise<User>) | undefined;
  assert(factory, "Factory should be registered");

  const instance = await factory();
  assertEquals(instance.name, "Bob");
  assertEquals(instance.id, 2);
});

Deno.test("getFactory() returns undefined for unknown factory name", () => {
  const factory = getFactory("nonexistent");
  assertEquals(factory, undefined);
});

Deno.test("hasFactory() returns true for registered factory", () => {
  define<User>("check_user", () => ({ id: 3, name: "Charlie" }));
  assert(hasFactory("check_user"));
});

Deno.test("hasFactory() returns false for unregistered factory", () => {
  assert(!hasFactory("ghost"));
});

Deno.test("define() overwrites existing factory with same name", () => {
  define<User>("overwrite_user", () => ({ id: 1, name: "Old" }));
  define<User>("overwrite_user", () => ({ id: 1, name: "New" }));

  const factory = getFactory("overwrite_user") as (() => User) | undefined;
  assert(factory);

  const result = factory();
  assertEquals(result.name, "New");
});
