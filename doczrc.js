import { css } from 'docz-plugin-css';

export default {
	// this is needed so the website works when deployed to
	// https://evercoder.github.io/uiuiui
	base: '/uiuiui/',
	title: 'uiuiui',
	hashRouter: true,
	plugins: [css()],
	modifyBundlerConfig: function(config) {
		config.module.rules
			.filter(rule => 'src/dummy/examples/some.example.js'.match(rule.test))
			.forEach(rule => {
				rule.exclude.push(/\.example\.js$/);
			});
		config.module.rules.push({
			test: /\.example\.js$/,
			loader: 'raw-loader'
		});
		return config;
	}
};
