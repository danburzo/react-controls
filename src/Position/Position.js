import React, { useEffect } from 'react';
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

const Position = function(props) {
	useEffect(() => {
		const onChange = e => {
			props.onChange(
				{
					x: e.clientX,
					y: e.clientY,
					event: e
				},
				props.property
			);
			e.preventDefault();
		};

		const onEnd = e => {
			props.onEnd(
				{
					x: e.clientX,
					y: e.clientY,
					event: e
				},
				props.property
			);
		};
		document.addEventListener('mousemove', onChange);
		document.addEventListener('mouseup', onEnd);

		return () => {
			document.removeEventListener('mousemove', onChange);
			document.removeEventListener('mouseup', onEnd);
		};
	}, [props.onChange, props.onEnd, props.property]);

	return null;
};

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
