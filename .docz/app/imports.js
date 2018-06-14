export const imports = {
  'docs/components/Input.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-components-input" */ 'docs/components/Input.mdx'),
  'docs/components/List.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-components-list" */ 'docs/components/List.mdx'),
  'docs/components/MultiSlider.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-components-multi-slider" */ 'docs/components/MultiSlider.mdx'),
}
