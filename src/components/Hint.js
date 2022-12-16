import React from 'react';
import {AppContext} from '../App.js';

export default function Hint(props){
    const {cursor, correctCount, closeCount} = React.useContext(AppContext);
    const hintState = cursor.row > props.row && (props.col===0 ? "close" : "correct");
    return (
        <div className="hint" id={hintState ? hintState : ""}>{props.col===0 ? closeCount[props.row] : correctCount[props.row]}</div>
    )
}