import React from 'react';
import EventListener from 'react-event-listener';
import PropTypes from 'prop-types';
import { noop } from '../util/functions';

/*
	Component: Position
	------------------------------------------

	This low-level component will relay the user coordinates
	on the `onChange` callback, as long as it is rendered.

	It will also relay the end of the interaction 
	on the `onEnd` callback.

*/

class Position extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onEnd = this.onEnd.bind(this);
	}

	onChange(e) {
		this.props.onChange(
			{
				x: e.clientX,
				y: e.clientY,
				event: e
			},
			this.props.property
		);
		e.preventDefault();
	}

	onEnd(e) {
		this.props.onEnd(
			{
				x: e.clientX,
				y: e.clientY,
				event: e
			},
			this.props.property
		);
	}

	render() {
		return (
			<EventListener target="document" onMouseMove={this.onChange} onMouseUp={this.onEnd} />
		);
	}
}

Position.propTypes = {
	onChange: PropTypes.func,
	onEnd: PropTypes.func,
	property: PropTypes.string
};

Position.defaultProps = {
	onChange: noop,
	onEnd: noop
};

export default Position;
