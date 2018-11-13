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
				onMouseDown={e => {
					this.setState({ interacting: true });
					e.preventDefault();
				}}
			>
				<p>Press down the mouse here and move it around.</p>
				<strong>
					{this.state.x} &times; {this.state.y}
				</strong>
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
