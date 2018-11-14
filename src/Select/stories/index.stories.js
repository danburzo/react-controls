import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Select from '../Select';
import List from '../../List/List';
import ListItem from '../../List/ListItem';

import State from '../../../.storybook/helpers/State';

import CustomSelectionUI from './CustomSelectionUI';

storiesOf('Select', module)
	.add('basic', () => {
		let items = [{ value: 1, label: 'one' }, { value: 2, label: 'two' }];

		return (
			<State>
				{({ state, setState }) => (
					<Select
						value={state.value}
						onChange={value => setState({ value })}
						current={item => (item ? item.label : 'Placeholder')}
					>
						<List>
							{items.map(item => (
								<ListItem key={item.value} value={item}>
									{item.label}
								</ListItem>
							))}
						</List>
					</Select>
				)}
			</State>
		);
	})
	.add('with portal', () => {
		let items = [
			{ value: 1, label: 'one' },
			{ value: 2, label: 'two' },
			{ value: 3, label: 'three' },
			{ value: 4, label: 'four' },
			{ value: 5, label: 'five' },
			{ value: 6, label: 'six' }
		];

		return (
			<State>
				{({ state, setState }) => (
					<Select
						value={state.value}
						onChange={value => setState({ value })}
						current={item => (item ? item.label : 'Placeholder')}
						target={document.body}
					>
						<List>
							{items.map(item => (
								<ListItem key={item.value} value={item}>
									{item.label}
								</ListItem>
							))}
						</List>
					</Select>
				)}
			</State>
		);
	})
	.add('with arbitrary contents', () => {
		return (
			<State>
				{({ state, setState }) => (
					<Select
						value={state.value}
						onChange={value => setState({ value })}
						current={item => (item ? item : 'Placeholder')}
					>
						<CustomSelectionUI />
					</Select>
				)}
			</State>
		);
	});
