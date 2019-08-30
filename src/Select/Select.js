import React from 'react';
import PropTypes from 'prop-types';

import { noop, identity } from '../util/functions';

import Popup from '../Popup/Popup';
import Portal from '../Portal/Portal';

import './Select.css';

class Select extends React.Component {
	constructor(props) {
		super(props);

		this.select = this.select.bind(this);
		this.focus = this.focus.bind(this);
		this.register = this.register.bind(this);
		this.handleKeys = this.handleKeys.bind(this);
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);

		this.state = {
			interacting: false
		};
	}

	select(value) {
		this.close();
		this.focus();
		if (value !== this.props.value) {
			this.props.onChange(value, this.props.property);
		}
	}

	open() {
		this.setState({
			interacting: true
		});
	}

	close() {
		this.setState({
			interacting: false
		});
	}

	focus() {
		if (this.element) {
			this.element.focus();
		}
	}

	register(el) {
		this.element = el;
	}

	handleKeys(e) {
		switch (e.key) {
			case 'Enter':
				this.open(e);
				break;
		}
	}

	render() {
		let { className, tabIndex, target, buttonContent } = this.props;

		let { interacting, wrapper } = this.state;

		return (
			<div
				className={`
					uix-select
					${className || ''}
					${target ? 'uix-select--portal' : ''}
				`}
				ref={this.register}
				tabIndex={tabIndex}
				onKeyDown={this.handleKeys}
			>
				<div className="uix-select__current" onMouseDown={this.open}>
					<div className="uix-select__value">{this.props.current(this.props.value)}</div>
					<div className="uix-select__button">
						<button tabIndex="-1">{buttonContent || "↓"}</button>
					</div>
				</div>

				{interacting && (
					<Portal target={target} mirror={this.element}>
						<Popup
							autofocus
							onClose={this.close}
							className={` 
									uix-select__popup
									${target ? 'uix-select__popup--portal' : ''}
								`}
						>
							{close =>
								React.Children.map(this.props.children, child =>
									React.cloneElement(child, {
										className: `
													${child.props.className || ''}
													uix-select__popup-content
												`,
										value: this.props.value,
										onSelect: this.select
									})
								)
							}
						</Popup>
					</Portal>
				)}
			</div>
		);
	}
}

Select.propTypes = {
	property: PropTypes.any,
	className: PropTypes.string,
	buttonContent: propTypes.string,
	value: PropTypes.any,
	tabIndex: PropTypes.number,
	target: PropTypes.object
};

Select.defaultProps = {
	tabIndex: 0,
	onChange: noop
};

export default Select;
