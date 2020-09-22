# React Tutorial Solution

This project contains the solution to the React Tutorial at the 
end of tutorial. Unlike the original tutorial, I'd split each 
Components into its own respective folder for better manageability.

## Available Scripts

In the project directory, you can run:
```
npm start
```

### 1. Display the location for each move in format (col,row) in the move history list.
Added a location property to the history state.
```javascript
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    location: 0,
                },
            ],
            stepNumber: 0,
            xIsNext: true,
            moves: [],
        };
```
Created a function that takes an index as an argument and returns the location.
```javascript
function getCoordinates(squareIndex) {
    const location = [
        "(1,1)",
        "(2,1)",
        "(3,1)",
        "(1,2)",
        "(2,2)",
        "(3,2)",
        "(1,3)",
        "(2,3)",
        "(3,3)",
    ];
    return location[squareIndex];
}
```
Set the location property in history object in the handleClick(i) which uses the getCoordinates function to get location.

```javascript
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([
                {
                    squares: squares,
                    location: getCoordinates(i),
                },
            ]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
```
In the render function of the Game Component, created a constant called lastestMove which 
contains the location property of history and added to desc constant.
```javascript
        const moves = history.map((step, move) => {
            const lastestMove = step.location;
            const desc = move
                ? "Go to move #" + move + " " + lastestMove
                : "Go to game start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
						{desc}
                    </button>
                </li>
            );
        });
```

### 2. Bold the currently selected item in the move list.
In the render function of Game Component, checked if the move is equal to the current stepNumber in the button tag. If true, bold the text.
```javascript
        const moves = history.map((step, move) => {
            const lastestMove = step.location;
            const desc = move
                ? "Go to move #" + move + " " + lastestMove
                : "Go to game start";
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {move === this.state.stepNumber ? <b>{desc}</b> : desc}
                    </button>
                </li>
            );
        });
```

### 3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
In the Board Component, used map functions to create an array of size 3 which each element contains an array of 3 squares.
```javascript
    render() {
        return (
            <div>
                {[1, 2, 3].map((n) => {
                    return (
                        <div key={n} className="board-row">
                            {[1, 2, 3].map((m) => {
                                return this.renderSquare(3 * (n - 1) + m - 1);
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
```

### 4. When someone wins, highlight the three squares that caused the win.
In the calculateWinner function, along with winner, return the indices that are used to win. The function will now return an object.
```javascript
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return {
                winner: squares[a],
                hightlight: lines[i],
            };
        }
    }

    return null;
}
```
In the render function of Game Component, if there is a winner, pass a down prop to Board 
called hightlight which is contains an array of indices.
```javascript
        let status;
        let hightlight = [];
        if (winner) {
            if (winner.winner === "Draw") {
                status = "It is a Draw";
            } else {
                status = "Winner: " + winner.winner;
                hightlight = winner.hightlight;
            }
        } else {
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        hightlight={hightlight}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
```
In the renderSquare function of the Board Component, if hightlightLines contains the Square's index, 
pass down a prop called hightlight to Square 
```javascript
    renderSquare(i) {
        const hightlightLines = this.props.hightlight;
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                hightlight={hightlightLines && hightlightLines.includes(i)}
            />
        );
    }
```
In the return of the Square Component, apply the yellow background style if the property hightlight is true, else don't set a style.
```javascript
    return (
        <button
            className="square"
            onClick={props.onClick}
            style={props.hightlight ? { background: "yellow" } : null}
        >
            {props.value}
        </button>
    );
```

### 5. When no one wins, display a message about the result being a draw.
Added a loop that returns true if each is contains a value. If true, then return and object stating that it is a draw.
```javascript
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return {
                winner: squares[a],
                hightlight: lines[i],
            };
        }
    }
    const isDraw = (squares) => {
        return squares.every((e) => e !== null);
    };
    if (isDraw(squares)) {
        return { winner: "Draw" };
    }

    return null;
}
```
