import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// helpers
import ControlledComponentWrapper from './helpers/ControlledComponentWrapper';
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
	BandPad,
	BandPadProgress,
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
	.add('Basic Slider', () => {
		return (
			<Slider onChange={action('onChange')}>
				<SliderTooltip/>
				<SliderHandle/>
				<SliderProgress/>
				<SliderGrid/>
			</Slider>
		);
	})
	.add('Basic Slider With Grid', () => {
		return (
			<Slider onChange={action('onChange')} step='10'>
				<SliderTooltip/>
				<SliderHandle/>
				<SliderProgress/>
				<SliderGrid/>
			</Slider>
		);
	})
	.add('Basic Slider, cyclical', () => {
		return (
			<Slider onChange={action('onChange')} cyclical>
				<SliderTooltip/>
				<SliderHandle/>
				<SliderProgress/>
			</Slider>
		);
	})
	.add('Basic Slider, Controlled', () => {
		return (
			<ControlledComponentWrapper>
				<Slider property='myslider'>
					<SliderTooltip/>
					<SliderHandle/>
					<SliderProgress/>
				</Slider>
			</ControlledComponentWrapper>
		);
	})
	.add('Basic Slider, cyclical Controlled', () => {
		return (
			<ControlledComponentWrapper>
				<Slider property='myslider' cyclical>
					<SliderTooltip/>
					<SliderHandle/>
					<SliderProgress/>
				</Slider>
			</ControlledComponentWrapper>
		);
	})
	.add('Vertical Slider', () => {
		return (
			<div style={{ height: '200px'}}>
				<Slider vertical onChange={action('onChange')} >
					<SliderTooltip/>
					<SliderHandle/>
					<SliderProgress/>
					<SliderGrid y_step='4'/>
				</Slider>
			</div>
		);
	})
	.add('Multiple vertical sliders', () => {
		return (
			<div className='equalizer'>
				{
					(new Array(16)).fill(0).map(
						(v, idx) => 
							<Slider key={idx} vertical>
								<SliderProgress/>
							</Slider>
					)
				}
			</div>
		);
	})
	.add('Start: 1, End: 10', () => {
		return (
			<Slider start='1' end='10' value='3' onChange={action('onChange')}>
				<SliderHandle/>
			</Slider>
		);
	})
	.add('Start: 10, End: 1', () => {
		return (
			<Slider start='10' end='1' value='3' onChange={action('onChange')}>
				<SliderHandle/>
			</Slider>
		);
	})
	.add('Step: 0.33, Precision: 2', () => {
		return (
			<Slider step='0.33' precision='2' value='3' onChange={action('onChange')}>
				<SliderHandle/>
			</Slider>
		);
	});

storiesOf('Pad', module)
	.add('Basic Pad', () => {
		return (
		<ControlledComponentWrapper>
			<Pad property='mypad'>
				<PadHandle/>
				<PadGrid x_step='10' y_step='10'/>
				<PadTooltip/>
			</Pad>
		</ControlledComponentWrapper>
		);
	})
	.add('Basic PolarPad', () => {
		return (
			<PolarPad onChange={action('onChange')} r_step='10' t_step='10'>
				<PolarPadHandle/>
				<PolarPadGrid />
			</PolarPad>
		);
	})
	.add('Basic BandPad', () => {
		return (
			<BandPad>
				<BandPadProgress/>
			</BandPad>
		);
	});

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
	.add('TextInput', () => {
		return (
			<TextInput 
				value='caca'
				onChange={action('onChange')}
				valid={
					value => value.match(/^\d+$/)
				}
			/>
		);
	})
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
	})
	.add('NumericInput, Controlled', () => {
		return (
			<ControlledComponentWrapper>
				<NumericInput property='some_property'/>
			</ControlledComponentWrapper>
		);
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

storiesOf('onselect', module)
	.add('onselect', () => {
		class MyCo extends React.Component {
			constructor(props) {
				super(props);
				this.state = {
					rects: null
				};
			}

			select(e) {
				let sel = window.getSelection();
				let rects = sel.getRangeAt(0).getClientRects();
				this.setState({
					rects: rects
				})
			}
			render() {

				let rects = this.state.rects;

				let tooltips = null;
				if (rects) {
					tooltips = rects.map(rect => <div style={
						{
							width: rect.width + 'px',
							height: rect.height + 'px',
							top: rect.top + 'px',
							left: rect.left + 'px',
							position: 'absolute',
							pointerEvents: 'none',
							border: '1px solid red'
						}
					}>
						
					</div>);
				}

				return (
					<div>
						<div tabIndex='0' onSelect={this.select.bind(this)}>
							<p>It is a long established fact that a reader will be distracted</p>
							<p>by the readable content of a page when looking at its layout. </p>
							<p>The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p></div>
						{ tooltips }
					</div>
				)
			}
		}

		return <MyCo/>
	})

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
