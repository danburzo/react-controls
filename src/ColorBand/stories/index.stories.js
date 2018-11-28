import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import ColorBand from '../ColorBand';
import HueBand from '../HueBand';
import CheckerboardBand from '../CheckerboardBand';

storiesOf('ColorBand', module)
	.add('ColorBand', () => {
		return (
			<div style={{ height: '1em' }}>
				<ColorBand colors={['red 10%', 'blue 60%', 'green 100%']} />
			</div>
		);
	})
	.add('HueBand', () => (
		<div style={{ height: '1em' }}>
			<HueBand />
		</div>
	))
	.add('CheckerboardBand', () => (
		<div style={{ height: '1em' }}>
			<CheckerboardBand />
		</div>
	));
