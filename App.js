import React, { PureComponent } from 'react';
import { render } from 'react-dom';

class App extends PureComponent {
	constructor() {
		super();
		this.state = {
			size: 10,
			world: []
		}
	}

	componentDidMount() {
		this._populate();
	}

	_populate = () => {
		const miniWorld = new Array(this.state.size).fill(false);
		const world = new Array(this.state.size).fill(miniWorld);
		this.setState({ world });
	}

	singleCell = (isAlive) => {
		const color = isAlive ? { backgroundColor: 'white' } : { backgroundColor: 'black' };
		const size = { height: '10px', width: '10px' };
		return (
			<div
				style={{...size, ...color}}
			>
			</div>
		)
	}

	lineOfCells = (arr) => {
		return arr.map(cell => this.singleCell(cell));
	}

	render() {
		const world = this.state.world.map(line => (
			this.lineOfCells(line)
		));
		return (
			<div
				style={{
					height: '100vh',
					width: '100vw',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<div
					style={{
						height: '80%',
						width: '80%',
						backgroundColor: 'grey'
					}}
				>
					{ world }
				</div>	
			</div>
		);
	}
}

render(<App />, document.getElementById('app'));
