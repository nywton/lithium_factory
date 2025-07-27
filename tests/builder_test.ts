import { assertEquals, assertRejects } from "@std/assert";
import { define, defineAsync } from "../src/registry.ts";
import { build, buildMany } from "../src/builder.ts";
import { FactoryNotDefinedError } from "../src/errors.ts";

Deno.test("build(): returns an entity with defaults", async () => {
  define("user", () => ({
    id: 1,
    name: "Alice",
    email: "alice@example.com",
  }));

  const user = await build<{
    id: number;
    name: string;
    email: string;
  }>("user");

  assertEquals(user.name, "Alice");
});

Deno.test("build(): applies override values", async () => {
  define("user", () => ({
    id: 1,
    name: "Alice",
    email: "alice@example.com",
  }));

  const user = await build<{ name: string }>("user", {
    name: "Bob",
  });

  assertEquals(user.name, "Bob");
});

Deno.test("buildMany(): builds multiple entities", async () => {
  define("item", () => ({ value: 42 }));

  const items = await buildMany<{ value: number }>("item", 3);
  assertEquals(items.length, 3);
  assertEquals(items[0].value, 42);
});

Deno.test("build(): works with async factory", async () => {
  defineAsync("async_user", async () => ({
    id: "a1",
    role: "admin",
  }));

  const user = await build<{ id: string; role: string }>("async_user");
  assertEquals(user.role, "admin");
});

Deno.test("build(): throws on undefined factory", async () => {
  await assertRejects(
    () => build("not_exist"),
    FactoryNotDefinedError,
    "Factory 'not_exist' is not defined.",
  );
});
