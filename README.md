### svelte-example-museums

How to make a svelte app compatible with IE11.

#### Updates from the original fork

- Updated Rollup and dependencies to later major version.
- Added stronger support for core-js polyfills, resolving potential gotchas for devs new to all this.

Technologies used:

- rollup
- babel
- core-js
- SCSS via [Svelte Preprocess](https://github.com/kaisermann/svelte-preprocess#readme)

Check the final [rollup config](https://github.com/jayliu50/svelte-example-museums/blob/master/rollup.config.js) of this.

#### Original project

See also the [original fork](https://github.com/angelozehr/svelte-example-museums).

This is a copy of the official [Svelte Template](https://github.com/sveltejs/template).

PS: As you might see, I did not find an elegant way to share styles across multiple svelte components. If you know a way, let me know :)

### IE11 Support

#### Dependency Decisions:

- Using SCSS with PostCSS (autoprefixer) to author styles. Emotion did not work. Also, not sure if the eventual implementation by Svelte would work, since it seemed like the community was gravitating toward an implementation based on CSS Variables. TODO: see if using `postcss-preset-env` would help bring those modern CSS features.