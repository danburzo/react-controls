import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import State from '../../../.storybook/helpers/State';

import SwatchList from '../SwatchList';
import Swatch from '../../Swatch/Swatch';

import culoriscales from 'culori-scales';
let { scales } = culoriscales;

storiesOf('SwatchList', module).add('Many swatchlists', () => {
	return (
		<State>
			{({ state, setState }) => (
				<React.Fragment>
					<SwatchList value={state.value} onChange={value => setState({ value })}>
						{scales['YlGn'].map(c => (
							<Swatch color={'#' + c} value={'#' + c} key={c} />
						))}
					</SwatchList>
					<SwatchList value={state.value} onChange={value => setState({ value })}>
						{scales['RdBu'].map(c => (
							<Swatch color={'#' + c} value={'#' + c} key={c} />
						))}
					</SwatchList>
				</React.Fragment>
			)}
		</State>
	);
});
