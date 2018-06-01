import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withState } from '@dump247/storybook-state';

// helpers
import CustomSelectionUI from './helpers/CustomSelectionUI';
import PortalWrapper from './helpers/PortalWrapper';

import { 
	Position,
	Surface,
	PolarSurface,
	DeltaSurface,
	TextInput,
	NumericInput,
	NumericInputControls,
	List,
	ListItem,
	Slider,
	SliderHandle,
	SliderProgress,
	SliderTooltip,
	SliderGrid,
	Pad,
	PadGrid,
	PadHandle,
	PadTooltip,
	PolarPad,
	PolarPadGrid,
	PolarPadHandle,
	MultiSlider,
	MultiSliderHandle,
	Popup,
	Portal,
	Select
} from '../components';

import './style.css';


storiesOf('Position', module)
	.add('Relating the mouse coordinates', () => {
		class MyComponent extends React.Component {

			constructor(props) {
				super(props);
				this.state = {};
			}

			render() {
				return <div>
					<p>The mouse coordinates are currently {this.state.x}: {this.state.y}</p>
					<Position onChange={ coords => this.setState(coords) } />
				</div>
			}
		}

		return <MyComponent />;
	})
	.add('Mousedown / Mouseup', () => {
		class MyComponent extends React.Component {

			constructor(props) {
				super(props);
				this.state = {
					interacting: false
				};
			}

			render() {
				return (
					<div 
						onMouseDown={ 
							e => { 
								this.setState({ interacting: true }); 
								e.preventDefault();
							} 
						}
					>
						<p>
							Hold down the mouse here and move it 
							to read its coordinates: {this.state.x}: {this.state.y}
						</p>
						{ 
							this.state.interacting && 
								<Position 
									onChange={ coords => this.setState(coords) } 
									onEnd={ e => this.setState({ interacting: false }) }
								/> 
						}
					</div>
				);
			}
		}

		return <MyComponent />;
	})

storiesOf('Slider', module)
	.add('Basic Slider', withState({ value: undefined })(({ store }) => {
		const onchange = value => {
			action('onChange')(value);
			store.set({ value });
		};
		return (
			<Slider 
				value={store.state.value} 
				onChange={onchange}
			>
				<SliderTooltip/>
				<SliderHandle/>
				<SliderProgress/>
				<SliderGrid/>
			</Slider>
		);
	}))
	.add('Basic Slider With Grid', withState({ value: undefined })(({ store }) => {
		const onchange = value => {
			action('onChange')(value);
			store.set({ value });
		};

		return (
			<Slider
				value={store.state.value} 
				onChange={onchange} 
				step='10'
			>
				<SliderTooltip/>
				<SliderHandle/>
				<SliderProgress/>
				<SliderGrid/>
			</Slider>
		);
	}))
	.add('Basic Slider, cyclical', withState({ value: undefined })(({ store }) => {
		const onchange = value => {
			action('onChange')(value);
			store.set({ value });
		};

		return (
			<Slider onChange={onchange} value={store.state.value} cyclical>
				<SliderTooltip/>
				<SliderHandle/>
				<SliderProgress/>
			</Slider>
		);
	}))
	.add('Vertical Slider', withState({ value: undefined })(({ store }) => {
		const onchange = value => {
			action('onChange')(value);
			store.set({ value });
		};
		return (
			<div style={{ height: '200px'}}>
				<Slider vertical value={store.state.value} onChange={onchange} >
					<SliderTooltip/>
					<SliderHandle/>
					<SliderProgress/>
					<SliderGrid y_step='4'/>
				</Slider>
			</div>
		);
	}))
	.add('Multiple vertical sliders', withState({ value: undefined })(({ store }) => {
		const onchange = value => {
			action('onChange')(value);
			store.set({ value });
		};
		return (
			<div className='equalizer'>
				{
					(new Array(16)).fill(0).map(
						(v, idx) => 
							<Slider key={idx} vertical onChange={onchange} value={store.state.value}>
								<SliderProgress/>
							</Slider>
					)
				}
			</div>
		);
	}))
	.add('Start: 1, End: 10', withState({ value: 3 })(({ store }) => {
		const onchange = value => {
			action('onChange')(value);
			store.set({ value });
		};
		return (
			<Slider start='1' end='10' value={store.state.value} onChange={onchange}>
				<SliderHandle/>
			</Slider>
		);
	}))
	.add('Start: 10, End: 1', withState({ value: 3 })(({ store }) => {
		const onchange = value => {
			action('onChange')(value);
			store.set({ value });
		};
		return (
			<Slider start='10' end='1' value={store.state.value} onChange={onchange}>
				<SliderHandle/>
			</Slider>
		);
	}))
	.add('Step: 0.33, Precision: 2', withState({ value: 3 })(({ store }) => {
		const onchange = value => {
			action('onChange')(value);
			store.set({ value });
		};
		return (
			<Slider step='0.33' precision='2' value={store.state.value} onChange={onchange}>
				<SliderHandle/>
			</Slider>
		);
	}));

storiesOf('Pad', module)
	.add('Basic Pad', withState({ x: 0, y: 0 })(({ store }) => {
		const onchange = (value, prop) => {
			action('onChange')(value, prop);
			store.set(value);
		};
		return (
			<Pad property='mypad' onChange={onchange} x={store.state.x} y={store.state.y}>
				<PadHandle/>
				<PadGrid x_step='10' y_step='10'/>
				<PadTooltip/>
			</Pad>
		);
	}))
	.add('Basic PolarPad', withState({ r: 0, t: 0 })(({ store }) => {
		const onchange = (value, prop) => {
			action('onChange')(value, prop);
			store.set(value);
		};
		return (
			<PolarPad property='mypad' r_step='10' t_step='10' r={store.state.r} t={store.state.t} onChange={onchange}>
				<PolarPadHandle/>
				<PolarPadGrid />
			</PolarPad>
		);
	}));

storiesOf('Surface', module)
	.add('Basic Surface', () => {
		return <div style={ {width: '300px', height: '300px', 'background': '#f0f0f0' } }>
			<Surface onChange={action('onChange')}/>
		</div>;
	})
	.add('Passive Surface', () => {
		return <Surface passive></Surface>;
	})
	.add('Basic PolarSurface', () => {
		return <div className='polar-surface-container'>
			<PolarSurface onChange={action('onChange')}/>
		</div>;
	})
	.add('Basic DeltaSurface', () => {
		return <DeltaSurface onChange={action('onChange')}>DeltaSurface</DeltaSurface>;
	});


storiesOf('Input', module)
	.add('TextInput', withState({ value: 'caca' })(({ store }) => {
		const onchange = (value, prop) => {
			action('onChange')(value, prop);
			store.set({ value });
		};
		const isNumber = value => value.match(/^\d+$/);
		return (
			<TextInput 
				value={store.state.value}
				onChange={action('onChange')}
				valid={isNumber}
			/>
		);
	}))
	.add('NumericInput', () => {
		return <NumericInput onChange={action('onChange')}>
			<NumericInputControls/>
		</NumericInput>;
	})
	.add('NumericInput, cyclical', () => {
		return <NumericInput 
			onChange={action('onChange')} 
			cyclical
			start='5'
			end='-5'
			step='0.1'
			precision='1'
		>
			<NumericInputControls/>
		</NumericInput>;
	});

storiesOf('List', module)
	.add('Basic List', () => {
		return (
			<ControlledComponentWrapper>
				<List property="some_property">
					<ListItem value='hello'>Hello</ListItem>
					<ListItem value='moto'>Moto</ListItem>
				</List>
			</ControlledComponentWrapper>
		);
	})
	.add('List with dynamic items', () => {
		let items = [
			{ label: 'Hello', value: 'hello' },
			{ label: 'Moto', value: 'moto' }
		];

		return (
			<ControlledComponentWrapper>
				<List property="some_property">
					{ 
						items.map(
							item => 
								<ListItem 
									key={item.value} 
									value={item.value}
								>
									{item.label}
								</ListItem>
						)
					}
				</List>
			</ControlledComponentWrapper>
		);
	});

storiesOf('MultiSlider', module)
	.add('Basic MultiSlider', () => {
		return <MultiSlider onChange={action('onChange')}>
			<MultiSliderHandle property='prop1'/>
			<MultiSliderHandle property='prop2'/>
		</MultiSlider>
	});

storiesOf('Popup', module)
	.add('basic', () => 
		<Popup property='some_property' onClose={action('onClose')}>
			Click outside me
		</Popup>
	)

storiesOf('Select', module)
	.add('basic', () => {

		let items = [{ value: 1, label: 'one' }, { value: 2, label: 'two' }];

		return (
			<ControlledComponentWrapper>
				<Select 
					property='some_property'
					current={ item => item ? item.label : 'Placeholder' }
				>
					<List>
						{ 
							items.map(
								item => 
									<ListItem 
										key={item.value} 
										value={item}
									>
										{item.label}
									</ListItem>
							)
						}
					</List>
				</Select>
			</ControlledComponentWrapper>
		);
	})
	.add('with portal', () => {

		let items = [
			{ value: 1, label: 'one' }, 
			{ value: 2, label: 'two' },
			{ value: 3, label: 'three' },
			{ value: 4, label: 'four' },
			{ value: 5, label: 'five' },
			{ value: 6, label: 'six' },
		];

		return (
			<ControlledComponentWrapper>
				<Select 
					property='some_property'
					current={ item => item ? item.label : 'Placeholder' }
					target={document.body}
				>
					<List>
						{ 
							items.map(
								item => 
									<ListItem 
										key={item.value} 
										value={item}
									>
										{item.label}
									</ListItem>
							)
						}
					</List>
				</Select>
			</ControlledComponentWrapper>
		);
	})
	.add('with arbitrary contents', () => {
		return (
			<ControlledComponentWrapper>
				<Select 
					property='some_property'
					current={ item => item ? item : 'Placeholder' }
				>
					<CustomSelectionUI/>
				</Select>
			</ControlledComponentWrapper>
		);
	});

storiesOf("Portal", module)
	.add('Portal', () => {
		return <div>
			<Portal 
				target={document.body} 
				reference={() => document.querySelector('.portal-reference')}
			>
				Hello
			</Portal>
			<div className='portal-reference'></div>
		</div>;
	})
