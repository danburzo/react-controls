import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import buble from '@rollup/plugin-buble';
import cssbundle from 'rollup-plugin-css-bundle';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import pkg from './package.json';

export default [
	{
		input: pkg.source,
		external: Object.keys(pkg.dependencies),
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		],
		plugins: [
			cssbundle({
				output: pkg.style,
				transform: code => postcss([autoprefixer]).process(code, {})
			}),
			buble({ objectAssign: 'Object.assign' }),
			resolve(),
			commonjs()
		]
	}
];
