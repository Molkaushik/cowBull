import React from 'react';
import {AppContext} from '../App.js';
import {letterColor} from './Utils.js';

export default function Key(props){
    const {onKeyClick, onEnter, onDelete} = React.useContext(AppContext);
    const handleKeyClick = ()=>{
        if(props.keyVal==="ENTER"){
            onEnter();
        }else if(props.keyVal==="DELETE"){
            onDelete();
        }else{
            onKeyClick(props.keyVal);
        }
    }
    return (
        <div 
            id={props.bigKey ? "big-key" : (props.disabled ? "disabled" : (props.correct ? "correct" : (props.close ? "close" : "")))} 
            className="key" 
            onClick={handleKeyClick}>
                {props.keyVal}
        </div>
    )
}