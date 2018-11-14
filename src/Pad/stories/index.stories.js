import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import State from '../../../.storybook/helpers/State';

import Pad from '../Pad';
import PadGrid from '../PadGrid';
import PadHandle from '../PadHandle';
import PadTooltip from '../PadTooltip';
import PolarPad from '../PolarPad';
import PolarPadGrid from '../PolarPadGrid';
import PolarPadHandle from '../PolarPadHandle';
import BandPad from '../BandPad';
import BandPadProgress from '../BandPadProgress';

storiesOf('Pad', module)
	.add('Basic Pad, uncontrolled', () => {
		return (
			<Pad onChange={action('onChange')}>
				<PadHandle />
				<PadGrid x_step={10} y_step={10} />
				<PadTooltip />
			</Pad>
		);
	})
	.add('Basic Pad, controlled', () => {
		return (
			<State initial={{ x: 50, y: 50 }}>
				{({ state, setState }) => (
					<Pad {...state} onChange={val => setState(val)}>
						<PadHandle />
					</Pad>
				)}
			</State>
		);
	})
	.add('Basic PolarPad', () => {
		return (
			<PolarPad onChange={action('onChange')} r_step={10} t_step={10}>
				<PolarPadHandle />
				<PolarPadGrid />
			</PolarPad>
		);
	})
	.add('Basic BandPad', () => {
		return (
			<BandPad>
				<BandPadProgress />
			</BandPad>
		);
	});
