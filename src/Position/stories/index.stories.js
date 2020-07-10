import React from 'react';
import { storiesOf } from '@storybook/react';

import Position from '../Position';

storiesOf('Position', module)
	.add('Relating the mouse coordinates', () => {
		class MyComponent extends React.Component {
			constructor(props) {
				super(props);
				this.state = {};
			}

			render() {
				return (
					<div>
						<p>
							The mouse coordinates are currently {this.state.x}: {this.state.y}
						</p>
						<Position onChange={coords => this.setState(coords)} />
					</div>
				);
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
				this.startInteraction = this.startInteraction.bind(this);
			}

			startInteraction(e) {
				this.setState({ interacting: true });
				e.preventDefault();
			}

			render() {
				return (
					<div onMouseDown={this.startInteraction} onTouchStart={this.startInteraction}>
						<p>
							Hold down the mouse here and move it to read its coordinates:{' '}
							{this.state.x}: {this.state.y}
						</p>
						{this.state.interacting && (
							<Position
								onChange={coords => this.setState(coords)}
								onEnd={e => this.setState({ interacting: false })}
							/>
						)}
					</div>
				);
			}
		}

		return <MyComponent />;
	});
