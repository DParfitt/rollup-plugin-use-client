To use the rollup-plugin-use-client npm package, simply install it as a dependency in your project.

```bash
npm install --save-dev rollup-plugin-use-client
```

Then, add it to your rollup configuration as follows:

```ts
import useClient from "rollup-plugin-use-client";

export default {
  // other configuration options...
  plugins: [useClient()],
};
```

This will add the 'use client' directive to the top of any files that are processed by rollup, ensuring that your code works as intended.

Alternatively, you can pass options to the plugin to customize its behavior. For example, you can specify a custom directive to use instead of 'use client':

```ts
import useClient from "rollup-plugin-use-client";

export default {
  // other configuration options...
  plugins: [
    useClient({
      directive: "custom-directive",
    }),
  ],
};
```

For more information on the available options and their defaults, see the documentation for the rollup-plugin-use-client package.

Enjoy using the rollup-plugin-use-client npm package to fix your 'use client' directives!

WARNING: If your code is bundled into a single file, then the 'use client' directive will be added to the top of that file. This could lead to unintended behavior.
