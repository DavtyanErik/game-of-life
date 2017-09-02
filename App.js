import React, { PureComponent } from 'react';
import { render } from 'react-dom';

class App extends PureComponent {
	constructor() {
		super();
		this.cellSize = 20;
		this.state = {
			size: 30,
			world: []
		}
	}

	componentDidMount() {
		this._populate();
	}

	_2dCopy = (arr) => {
		return arr.map(oneD => oneD.slice());
	}

	_populate = () => {
		this.stop()
		const world = [];
		for (let i = 0; i < this.state.size; i++) {
			world.push(new Array(this.state.size).fill(false));
		}
		this.setState({ world });
	}

	play = () => {
		this.game = setInterval(this._move, 100);
	}

	stop = () => {
		clearInterval(this.game)
	}
	
	_move = () => {
		const world = this._2dCopy(this.state.world);
		for (let i = 0; i < world.length; i++) {
			for (let j = 0; j < world.length; j++) {
				world[i][j] = this._nextState(i, j);
			}
		}
		this.setState({ world });
	}

	_nextState = (rowIndex, cellIndex) => {
		const isAlive = this.state.world[rowIndex][cellIndex];
		let numberOfNeighbours = 0;
		const startingRow = rowIndex - 1 >= 0 ? rowIndex - 1 : rowIndex;
		const endingRow = rowIndex + 1 < this.state.size ? rowIndex + 1 : rowIndex;
		const startingCell = cellIndex - 1 >= 0 ? cellIndex - 1 : cellIndex;
		const endingCell = cellIndex + 1 < this.state.size ? cellIndex + 1 : cellIndex;
		for (let i = startingRow; i <= endingRow; i++) {
			for (let j = startingCell; j <= endingCell; j++) {
				if (!(i == rowIndex && j == cellIndex) && this.state.world[i][j]) {
					numberOfNeighbours++;
				}
			}
		}
		if (isAlive && (numberOfNeighbours < 2 || numberOfNeighbours > 3)) {
			return false;
		} else if (!isAlive && numberOfNeighbours == 3) {
			return true;
		} else {
			return isAlive;
		}
	}

	randomize = () => {
		this.stop();
		const world = this._2dCopy(this.state.world);
		for (let i = 0; i < this.state.size; i++) {
			for (let j = 0; j < this.state.size; j++) {
				world[i][j] = Math.random() < 0.8 ? false : true;
			}
		}
		this.setState({ world })
	}

	changeColor = (i, j) => {
		const world = this._2dCopy(this.state.world);
		world[i][j] = !world[i][j];
		this.setState({ world });
	}

	singleCell = (isAlive, i, j) => {
		const color = isAlive ? 'white' : 'black';
		const size = {
			height: this.cellSize,
			width: this.cellSize,
			backgroundColor: color,
			border: `1px solid grey`
		};
		return (
			<div
				key={j}
				style={{...size, ...color}}
				onClick={() => this.changeColor(i, j)}
			>
			</div>
		)
	}

	lineOfCells = (arr, lineIndex) => {
		return (
			<div
				key={lineIndex}
				style={{
					height: this.cellSize,
					width: this.state.size * this.cellSize,
					display: 'flex',
				}}
			>
				{arr.map((cell, rowIndex) => this.singleCell(cell, lineIndex, rowIndex))}
			</div>
		);
	}

	render() {
		const world = this.state.world.map((line, lineIndex) => {
			return this.lineOfCells(line, lineIndex);
		});
		return (
			<div
				style={{
					height: '100vh',
					width: '100vw',
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					flexDirection: 'row'
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<button
						onClick={this.randomize}
						style={styles.button}
					>
						Randomize
					</button>
					<button
						onClick={this.play}
						style={styles.button}
					>
						Play
					</button>
					<button
						onClick={this.stop}
						style={styles.button}
					>
						Stop
					</button>
					<button
						onClick={this._populate}
						style={styles.button}
					>
						Reset
					</button>
				</div>
				<div
					style={{
						height: this.state.size * this.cellSize,
						width: this.state.size * this.cellSize,
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					{ world }
				</div>
			</div>
		);
	}
}

const styles = {
	button: {
		height: 40,
		width: 100,
		backgroundColor: 'blue',
		marginTop: 10,
		cursor: 'pointer',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: 'white'
	}
}

render(<App />, document.getElementById('app'));
