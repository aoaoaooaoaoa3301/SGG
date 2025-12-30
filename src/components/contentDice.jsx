import { dices } from "../dice-data.js";
import { useState, useRef, useEffect } from "react";
import { Select } from 'antd';

export default function ContentDice(){
    const [numDice, setNumDice] = useState(1);
    const [diceIndices, setDiceIndices] = useState([]);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null); 

    const onChangeInput = value => {
        setNumDice(value);
    }
    

    function toRollDice() {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        }

        intervalRef.current = setInterval(() => {
            const newIndices = Array.from({ length: numDice }, () =>
        Math.floor(Math.random() * dices.length)
    );
            setDiceIndices(newIndices);
        }, 300);

        timeoutRef.current = setTimeout(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }, 5000);
    }

    const onSearch = value => {
        console.log('search:', value);
    };

    return(
        <div className="styleDiv" id="dice">
            <div className="styleDiv-Content">
                <h1>Счастливый кубик</h1>

                <div className="dice-container">
                    {diceIndices.map((el,index) => (
                        <img key={index} className="dice-img" src={dices[el].img} alt="" />
                    ))}
                    
                </div>
                <p>колличество кубиков</p>
                <div id="roll">
                <Select
                            className="inputNumDices"
                            showSearch={{ optionFilterProp: 'label', onSearch }}
                            placeholder="1"
                            onChange={onChangeInput}
                            options={[
                            {
                                value: 1,
                                label: '1',
                            },
                            {
                                value: '2',
                                label: '2',
                            },
                            {
                                value: 3,
                                label: '3',
                            },
                            {
                                value: 4,
                                label: '4',
                            },
                            {
                                value: 5,
                                label: '5',
                            },
                            
                            ]}
                        />
                </div>
                <div className="butContainer">
                    <button onClick={toRollDice} className="buttonToRoll">
                        КЛИК
                    </button>
                </div>
            </div>
        </div>
    );  
}