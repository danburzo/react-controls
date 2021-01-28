## Prerequisites

We use [Storybook](https://storybook.js.org) for testing things visually, and [Docz](https://docz.site) for building a static documentation site.

## Installation

Clone this repository and run `npm install` in your project folder to install the necessary dependencies.

## Scripts

### Building

`npm run build` bundles the library with Rollup & Bublé, so that you can then `npm run publish` it.

`npm run build:watch` continously builds the library while you work. This is useful if you `npm link` the repository when using it in other projects locally.

### Storybook

`npm run storybook:start` starts Storybook on [`http://localhost:6001`](http://localhost:6001).

`npm run storybook:build` creates a static version of the Storybook in `.storybook/dist`.

### Docz

`npm run docs:start` starts Docz on [`http://localhost:3000`](http://localhost:3000).

`npm run docs:build` builds a static Docz website in `.docz/dist`.
	
`npm run docs:deploy` pushes the static Docz website to the `gh-pages` branch, so that it's available at [`https://evercoder.github.io/uiuiui`](`https://evercoder.github.io/uiuiui`).
