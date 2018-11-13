import React from 'react';
import EventListener from 'react-event-listener';
import PropTypes from 'prop-types';

import Surface from '../Surface/Surface';
import { noop } from '../util/functions';

import './MultiSlider.css';

const initial_state = {
	interacting: false
};

class MultiSlider extends React.Component {
	constructor(props) {
		super(props);
		this.onStart = this.onStart.bind(this);
		this.onEnd = this.onEnd.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onInsert = this.onInsert.bind(this);
		this.state = initial_state;
	}

	onStart(e, property) {
		this.setState({
			interacting: true,
			interacting_property: property
		});
	}

	onEnd(e) {
		this.setState({
			interacting: false,
			interacting_property: null
		});
	}

	onChange({ x, y }) {
		this.props.onChange(x, this.state.interacting_property);
	}

	onInsert({ x, y }) {
		this.props.onInsert(x);
	}

	render() {
		let { interacting } = this.state;

		return (
			<div className="uix-multislider">
				<Surface
					passive
					interacting={interacting}
					onChange={this.onChange}
					onInsert={this.onInsert}
					onEnd={this.onEnd}
				>
					{React.Children.map(this.props.children, child =>
						React.cloneElement(child, {
							onStart: this.onStart
						})
					)}
				</Surface>
			</div>
		);
	}
}

MultiSlider.propTypes = {
	onChange: PropTypes.func,
	onInsert: PropTypes.func
};

MultiSlider.defaultProps = {
	onChange: noop,
	onInsert: noop
};

export default MultiSlider;
