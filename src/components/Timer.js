import React from 'react';
import {AppContext} from '../App.js';

export default function Timer(){
    const {minutes, seconds, setMinutes, setSeconds, setGameOver} = React.useContext(AppContext);

    React.useEffect(() => {
        console.log(minutes + " " + seconds)
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if(prevSeconds===1 || prevSeconds==1){
                    setMinutes((prevMinutes) => {
                        if(prevMinutes===0 || prevMinutes==0){
                            setGameOver({gameOver: true, guessedWord: false});
                            return 0;
                        }else return prevMinutes;
                    })
                }
                if(prevSeconds===0 || prevSeconds==0){
                    setMinutes((prevMinutes) => {
                        setSeconds(59);
                        return prevMinutes-1;
                    })
                }else{
                    return prevSeconds-1;
                }
            })
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="timer">
            {minutes<10 ? "0"+minutes : minutes} :  {seconds<10 ? "0"+seconds : seconds}
        </div>
    )
}