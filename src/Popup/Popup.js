import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Husk from '../Husk/Husk';

import { noop } from '../util/functions';

import './Popup.css';

class Popup extends React.Component {
	constructor(props) {
		super(props);
		this.close = this.close.bind(this);
		this.close_on_click_outside = this.close_on_click_outside.bind(this);
		this.register = this.register.bind(this);
	}

	close(e) {
		this.props.onClose(this.props.property);
	}

	close_on_click_outside(e) {
		if (!this._el || this._el === e.target || this._el.contains(e.target)) {
			return;
		}
		this.close(e);
	}

	register(el) {
		this._el = el;
		if (el && this.props.autofocus) {
			el.focus();
		}
	}

	render() {
		let { className, tabIndex } = this.props;

		return (
			<div
				className={`
					uix-popup
					${className || ''} 
				`}
				tabIndex={tabIndex}
				ref={this.register}
			>
				<Husk
					useEffect={() => {
						document.addEventListener('mousedown', this.close_on_click_outside);
						return () => {
							document.removeEventListener('mousedown', this.close_on_click_outside);
						};
					}}
				/>
				{typeof this.props.children === 'function'
					? this.props.children(this.close)
					: this.props.children}
			</div>
		);
	}
}

Popup.propTypes = {
	property: PropTypes.any,

	/**
	 * Any additional class names to pass to the component.
	 */
	className: PropTypes.string,

	/**
	 * The component's tabindex
	 */
	tabIndex: PropTypes.number,

	/**
	 * Whether the component should autofocus when it's mounted in the DOM.
	 */
	autofocus: PropTypes.bool.isRequired,

	/**
	 * A callback function that gets invoked when there's a click outside
	 * the bounds of the popup. When the `property` prop is set,
	 * it will be passed back as the second argument.
	 */
	onClose: PropTypes.func
};

Popup.defaultProps = {
	tabIndex: 0,
	autofocus: false,
	onClose: noop
};

export default Popup;
