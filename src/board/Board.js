import React, { Component } from "react";
import "./Board.css";
import Square from "../square/Square";

class Board extends Component {
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
}
export default Board;
