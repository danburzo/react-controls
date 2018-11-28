import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Husk from '../../Husk/Husk';

import List from '../List';
import ListItem from '../ListItem';

storiesOf('List', module)
	.add('Basic List', () => {
		return (
			<Husk>
				{(state, setState) => (
					<List value={state.value} onChange={value => setState({ value })}>
						<ListItem value="hello">Hello</ListItem>
						<ListItem value="moto">Moto</ListItem>
					</List>
				)}
			</Husk>
		);
	})
	.add('List with dynamic items', () => {
		let items = [{ label: 'Hello', value: 'hello' }, { label: 'Moto', value: 'moto' }];

		return (
			<Husk>
				{(state, setState) => (
					<List value={state.value} onChange={value => setState({ value })}>
						{items.map(item => (
							<ListItem key={item.value} value={item.value}>
								{item.label}
							</ListItem>
						))}
					</List>
				)}
			</Husk>
		);
	});
