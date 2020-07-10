## Prerequisites

This project uses Node, npm, and [yarn](https://yarnpkg.org). We use [Storybook](https://storybook.js.org) for testing things visually, and [Docz](https://docz.site) for building a static documentation site.

## Installation

Clone this repository and run `yarn` in your project folder to install the necessary dependencies.

## Scripts

### Building

`yarn build` bundles the library with Rollup & Bublé, so that you can then `yarn publish` it.

`yarn build:watch` continously builds the library while you work. This is useful if you `yarn link` the repository when using it in other projects locally.

### Storybook

`yarn storybook:start` starts Storybook on [`http://localhost:6001`](http://localhost:6001).

`yarn storybook:build` creates a static version of the Storybook in `.storybook/dist`.

### Docz

`docs:start` starts Docz on [`http://localhost:3000`](http://localhost:3000).

`docs:build` builds a static Docz website in `.docz/dist`.
	
`docs:deploy` pushes the static Docz website to the `gh-pages` branch, so that it's available at [`https://evercoder.github.io/uiuiui`](`https://evercoder.github.io/uiuiui`).
