import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import State from '../../../.storybook/helpers/State';

import Slider from '../Slider';
import SliderHandle from '../SliderHandle';
import SliderProgress from '../SliderProgress';
import SliderTooltip from '../SliderTooltip';
import SliderGrid from '../SliderGrid';

import './style.css';

storiesOf('Slider', module)
	.add('Basic Slider', () => {
		return (
			<Slider onChange={action('onChange')}>
				<SliderTooltip />
				<SliderHandle />
				<SliderProgress />
				<SliderGrid />
			</Slider>
		);
	})
	.add('Basic Slider With Grid', () => {
		return (
			<Slider onChange={action('onChange')} step="10">
				<SliderTooltip />
				<SliderHandle />
				<SliderProgress />
				<SliderGrid />
			</Slider>
		);
	})
	.add('Basic Slider, cyclical', () => {
		return (
			<Slider onChange={action('onChange')} cyclical>
				<SliderTooltip />
				<SliderHandle />
				<SliderProgress />
			</Slider>
		);
	})
	.add('Basic Slider (controlled)', () => {
		return (
			<State>
				{({ state, setState }) => (
					<Slider value={state.value} onChange={value => setState({ value })}>
						<SliderTooltip />
						<SliderHandle />
						<SliderProgress />
					</Slider>
				)}
			</State>
		);
	})
	.add('Basic Slider, cyclical (controlled)', () => {
		return (
			<State>
				{({ state, setState }) => (
					<Slider value={state.value} onChange={value => setState({ value })} cyclical>
						<SliderTooltip />
						<SliderHandle />
						<SliderProgress />
					</Slider>
				)}
			</State>
		);
	})
	.add('Vertical Slider', () => {
		return (
			<div style={{ height: '200px' }}>
				<Slider vertical onChange={action('onChange')}>
					<SliderTooltip />
					<SliderHandle />
					<SliderProgress />
					<SliderGrid y_step="4" />
				</Slider>
			</div>
		);
	})
	.add('Multiple vertical sliders', () => {
		return (
			<div className="equalizer">
				{new Array(16).fill(0).map((v, idx) => (
					<Slider key={idx} vertical>
						<SliderProgress />
					</Slider>
				))}
			</div>
		);
	})
	.add('Start: 1, End: 10', () => {
		return (
			<Slider start="1" end="10" value="3" onChange={action('onChange')}>
				<SliderHandle />
			</Slider>
		);
	})
	.add('Start: 10, End: 1', () => {
		return (
			<Slider start="10" end="1" value="3" onChange={action('onChange')}>
				<SliderHandle />
			</Slider>
		);
	})
	.add('Step: 0.33, Precision: 2', () => {
		return (
			<Slider step="0.33" precision="2" value="3" onChange={action('onChange')}>
				<SliderHandle />
			</Slider>
		);
	});
