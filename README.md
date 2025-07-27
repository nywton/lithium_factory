# 🧪 lithium_factory

> A type-safe, lazily-loaded factory library for Deno, inspired by Ruby's
> FactoryBot.

Build structured mock data for testing with zero config and full type safety.

---

## 📦 Installation

**From [jsr.io](https://jsr.io):**

```ts
import {
  build,
  buildMany,
  define,
  defineAsync,
} from "jsr:@twigo/lithium_factory";
```

**From GitHub (if not yet published):**

```ts
import {
  build,
  buildMany,
  define,
  defineAsync,
} from "https://deno.land/x/lithium_factory/src/mod.ts";
```

---

## 🚀 Features

- ✅ Fully typed with generics
- 🌀 Lazy-loads `./factories/{name}.ts` automatically
- 🔁 Sync and async factory support
- 🎯 Build single or multiple entities
- 🧱 Extensible structure for sequences, traits (coming soon)

---

## 📂 Project Structure

```
lithium_factory/
├── src/
│   ├── builder.ts
│   ├── errors.ts
│   └── registry.ts
├── factories/           # Your user-defined factories
├── tests/
├── .github/workflows/ci.yml
├── deno.json
├── mod.ts
└── README.md
```

---

## ✨ Usage

### 1. Define your factory

```ts
// factories/user.ts
import { build, buildMany, define } from "./mod.ts";

type User = { id: number; name: string };

define<User>("user", () => ({
  id: 1,
  name: "John Doe",
}));
```

### 2. Build instances

```ts
const user = await build<User>("user");
// { id: 1, name: "John Doe" }

const userOverride = await build<User>("user", { name: "Jane" });
// { id: 1, name: "Jane" }

const users = await buildMany<User>("user", 3);
// [
//  { id: 1, name: "John Doe" },
//  { id: 1, name: "John Doe" },
//  { id: 1, name: "John Doe" }
//]
```

---

## 🔧 deno.json tasks

```json
{
  "tasks": {
    "fmt": "deno fmt",
    "lint": "deno lint",
    "test": "deno test --allow-read --allow-net",
    "coverage": "deno coverage --lcov > coverage.lcov"
  }
}
```

Run with:

```bash
deno task test
```

---

## ✅ CI with GitHub Actions

Included `.github/workflows/ci.yml` runs:

- `deno fmt`
- `deno lint`
- `deno test`
- `deno coverage`

---

## 🚀 Publishing

1. Log in to JSR:

   ```bash
   deno publish --dry-run
   ```

2. If all checks pass:

   ```bash
   deno publish
   ```

---

## 🧩 Future Ideas

- Support for sequences
- Traits & associations
- CLI integration

---

## 🧠 License

MIT – Made with ❤️ by [@nywton](https://github.com/nywton)
