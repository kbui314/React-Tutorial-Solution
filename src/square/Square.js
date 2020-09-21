import React from "react";
import "./Square.css";

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
            style={props.hightlight ? { background: "yellow" } : null}
        >
            {props.value}
        </button>
    );
}
export default Square;
