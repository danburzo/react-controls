import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import State from '../../../.storybook/helpers/State';

import List from '../List';
import ListItem from '../ListItem';

storiesOf('List', module)
	.add('Basic List', () => {
		return (
			<State>
				{({ state, setState }) => (
					<List value={state.value} onChange={value => setState({ value })}>
						<ListItem value="hello">Hello</ListItem>
						<ListItem value="moto">Moto</ListItem>
					</List>
				)}
			</State>
		);
	})
	.add('List with dynamic items', () => {
		let items = [{ label: 'Hello', value: 'hello' }, { label: 'Moto', value: 'moto' }];

		return (
			<State>
				{({ state, setState }) => (
					<List value={state.value} onChange={value => setState({ value })}>
						{items.map(item => (
							<ListItem key={item.value} value={item.value}>
								{item.label}
							</ListItem>
						))}
					</List>
				)}
			</State>
		);
	});
