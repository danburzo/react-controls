class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<p>
					The mouse coordinates are currently
					<strong>
						{this.state.x} &times; {this.state.y}
					</strong>
				</p>
				<Position onChange={coords => this.setState(coords)} />
			</div>
		);
	}
}
