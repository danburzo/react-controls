import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Swatch from '../Swatch';

import culoriscales from 'culori-scales';
import { colorsNamed, formatter } from 'culori';

let { scales } = culoriscales;
let hex = formatter('hex');

storiesOf('Swatch', module)
	.add('Basic swatch', () => <Swatch color="#000" title="Black" onSelect={action('onSelect')} />)
	.add('ColorBrewer swatches', () => {
		return (
			<div>
				<h1>Culori scales</h1>

				{Object.keys(scales).map(scale => (
					<div key={scale}>
						<h2>{scale}</h2>
						{scales[scale].map((c, idx) => (
							<Swatch key={idx} color={hex(c)} />
						))}
					</div>
				))}
			</div>
		);
	})
	.add('Named colors', () => {
		return (
			<div>
				<h1>Named colors</h1>
				{Object.keys(colorsNamed).map(c => (
					<Swatch key={c} color={hex(c)} title={c} />
				))}
			</div>
		);
	});
