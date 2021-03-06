import React from 'react';
import PropTypes from 'prop-types';
import { noop } from '../util/functions';
import normalizeEvent, { isTouchEnabledDevice } from '../util/normalize-event';

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

	componentDidMount() {
		document.addEventListener('mousemove', this.onChange);
		document.addEventListener('mouseup', this.onEnd);
		if (isTouchEnabledDevice()) {
			document.addEventListener('touchmove', this.onChange);
			document.addEventListener('touchend', this.onEnd);
		}
	}

	componentWillUnmount() {
		document.removeEventListener('mousemove', this.onChange);
		document.removeEventListener('mouseup', this.onEnd);
		if (isTouchEnabledDevice()) {
			document.removeEventListener('touchmove', this.onChange);
			document.removeEventListener('touchend', this.onEnd);
		}
	}

	onChange(e) {
		e = normalizeEvent(e);
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
		e = normalizeEvent(e);
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
		return null;
	}
}

Position.propTypes = {
	/**
	 * A callback function that's called on each mouse movement
	 * with an object in the form of `{x: …, y: …, event: …}`.
	 * When the `property` prop is set, it will be passed back
	 * as the second argument.
	 */
	onChange: PropTypes.func,

	/**
	 * A callback function that's called
	 * when the user finishes the interaction (the `mouseup` event)
	 * with an object in the form of `{x: …, y: …, event: …}`.
	 * When the `property` prop is set, it will be passed back
	 * as the second argument.
	 */
	onEnd: PropTypes.func,

	/**
	 * An optional identifier to pass along to the callback functions.
	 */
	property: PropTypes.any
};

Position.defaultProps = {
	onChange: noop,
	onEnd: noop
};

export default Position;
