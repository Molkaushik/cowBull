import React from 'react';
import Key from './Key.js';
import {AppContext} from '../App.js';

export default function KeyBoard(){
    const {onEnter, onDelete, onKeyClick, disabledLetters, correctLetters, closeLetters} = React.useContext(AppContext);
    const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const row3 = ["Z", "X", "C", "V", "B", "N", "M"];
    const keysRow1 = row1.map((key) => {
        return <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)} close={closeLetters.includes(key)}/>
    })
    const keysRow2 = row2.map((key) => {
        return <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)} close={closeLetters.includes(key)}/>
    })
    const keysRow3 = row3.map((key) => {
        return <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} correct={correctLetters.includes(key)} close={closeLetters.includes(key)}/>
    })
    const handleKeyboard = React.useCallback((event) => {
        if(event.key === "Enter"){
            onEnter();
        }else if(event.key === "Backspace"){
            onDelete();
        }else{
            row1.forEach((key) => {
                if(event.key.toLowerCase() === key.toLowerCase()){
                    onKeyClick(key);
                }
            });
            row2.forEach((key) => {
                if(event.key.toLowerCase() === key.toLowerCase()){
                    onKeyClick(key);
                }
            });
            row3.forEach((key) => {
                if(event.key.toLowerCase() === key.toLowerCase()){
                    onKeyClick(key);
                }
            });
        }
    });

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);
        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    return (
        <div className="keyboard">
            <div className="keys-row">{keysRow1}</div>
            <div className="keys-row">{keysRow2}</div>
            <div className="keys-row">
                <Key key={"ENTER"} keyVal={"ENTER"} bigKey={true}/>
                {keysRow3}
                <Key key={"DELETE"} keyVal={"DELETE"} bigKey={true}/>
            </div>
        </div>
    )
}