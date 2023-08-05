# Basic Auth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt 3 Module for Basic Authentication.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/@kgierke/nuxt-basic-auth?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- ✅ Simple to use
- ✅ Supports multiple users
- ✅ Whitelist routes

## Quick Setup

1. Add `@kgierke/nuxt-basic-auth` dependency to your project

```bash
# Using pnpm
pnpm add -D @kgierke/nuxt-basic-auth

# Using yarn
yarn add --dev @kgierke/nuxt-basic-auth

# Using npm
npm install --save-dev @kgierke/nuxt-basic-auth
```

2. Add `@kgierke/nuxt-basic-auth` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["@kgierke/nuxt-basic-auth"],
});
```

3. Configure the module in `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: ["@kgierke/nuxt-basic-auth"],

  basicAuth: {
    enabled: true,
    users: [
      {
        username: "admin",
        password: "admin",
      },
    ],
    // Optional: Whitelist routes
    // allowedRoutes: ["/api/.*"],
  },
});
```

That's it! You can now use Basic Auth in your Nuxt app ✨

## Options

| Option          | Type       | Default | Description                                                                                                                                                |
| --------------- | ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`       | `boolean`  | `true`  | Enables or disables Basic Auth.                                                                                                                            |
| `users`         | `array`    | `[]`    | Array of users. Each user must have a `username` and `password` property. Can also be formatted as string `<username>:<password>, <username2>:<password2>` |
| `allowedRoutes` | `string[]` | `[]`    | Array of routes that are not protected by Basic Auth. Supports regex patterns.                                                                             |

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@kgierke/nuxt-basic-auth/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@kgierke/nuxt-basic-auth
[npm-downloads-src]: https://img.shields.io/npm/dm/@kgierke/nuxt-basic-auth.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@kgierke/nuxt-basic-auth
[license-src]: https://img.shields.io/npm/l/@kgierke/nuxt-basic-auth.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@kgierke/nuxt-basic-auth
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
