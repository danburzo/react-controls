import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Husk from '../../Husk/Husk';
import TextInput from '../TextInput';
import NumericInput from '../NumericInput';
import NumericInputControls from '../NumericInputControls';
import ColorInput from '../ColorInput';
import ColorTextInput from '../ColorTextInput';
import ColorPicker from '../../ColorPicker/ColorPicker';
import Swatch from '../../Swatch/Swatch';

storiesOf('Input', module)
	.add('TextInput', () => {
		return (
			<TextInput
				value="hello"
				onChange={action('onChange')}
				valid={value => value.match(/^\d+$/)}
			/>
		);
	})
	.add('NumericInput', () => {
		return (
			<NumericInput onChange={action('onChange')}>
				<NumericInputControls />
			</NumericInput>
		);
	})
	.add('NumericInput, cyclical', () => {
		return (
			<NumericInput
				onChange={action('onChange')}
				cyclical
				start={5}
				end={-5}
				step={0.1}
				precision={1}
			>
				<NumericInputControls />
			</NumericInput>
		);
	})
	.add('NumericInput, Controlled', () => {
		return (
			<Husk>
				{(state, setState) => (
					<NumericInput value={state.value} onChange={value => setState({ value })} />
				)}
			</Husk>
		);
	})
	.add('ColorInput', () => {
		return (
			<ColorInput value="tomato" current={value => <Swatch color={value} />}>
				<ColorPicker />
			</ColorInput>
		);
	})
	.add('ColorInput controlled', () => {
		return (
			<Husk useState={{ value: 'tomato' }}>
				{(state, setState) => (
					<ColorInput
						value={state.value}
						onChange={value => setState({ value })}
						current={value => <Swatch color={value} />}
					>
						<ColorPicker />
					</ColorInput>
				)}
			</Husk>
		);
	})
	.add('ColorInput in portal', () => {
		return (
			<Husk useState={{ value: 'tomato' }}>
				{(state, setState) => (
					<ColorInput
						value={state.value}
						onChange={value => setState({ value })}
						current={value => <Swatch color={value} />}
						target={document.body}
					>
						<ColorPicker />
					</ColorInput>
				)}
			</Husk>
		);
	})
	.add('ColorTextInput (uncontrolled)', () => {
		return <ColorTextInput value="#000" format="hex" onChange={action('onChange')} />;
	})

	.add('ColorTextInput (controlled)', () => {
		return (
			<Husk useState={{ value: '#000' }}>
				{(state, setState) => (
					<ColorTextInput
						value={state.value}
						format="hex"
						onChange={value => setState({ value })}
					/>
				)}
			</Husk>
		);
	});
