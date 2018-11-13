import React from 'react';
import ReactDOM from 'react-dom';
import EventListener from 'react-event-listener';
import PropTypes from 'prop-types';

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
				<EventListener target="document" onMouseDown={this.close_on_click_outside} />
				{typeof this.props.children === 'function'
					? this.props.children(this.close)
					: this.props.children}
			</div>
		);
	}
}

Popup.propTypes = {
	property: PropTypes.any,
	className: PropTypes.string,
	tabIndex: PropTypes.number,
	autofocus: PropTypes.bool.isRequired,
	onClose: PropTypes.func
};

Popup.defaultProps = {
	tabIndex: 0,
	autofocus: false,
	onClose: noop
};

export default Popup;
