import { fakeFetchGames } from "../../api";
import { useState, useEffect } from 'react';
import { randint } from "../../utils";
import { Input } from 'antd';
const { TextArea } = Input;
import { Cascader } from 'antd';

const options = [
  {
    value: 'FPS',
    label: 'FPS',
  },
  {
    value: 'solo',
    label: 'solo',
  },
];

const onChange = value => {
  console.log(value);
};


export default function ContentRoll(){
    const [gamesData, setgamesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [randomGame, setRandomGame] = useState('тут будет игра');
    const [valueGame, setValueGame] = useState('');
    
    

    useEffect(() => {
        const fetchData = async () => {
        try {
            const gamesData = await fakeFetchGames();
            setgamesData(gamesData);
        } catch (err) {
            console.error('Ошибка загрузки:', err);
        } finally {
            setLoading(false);
        }
    };
    
    fetchData();
    });
    
    if (loading) return <div>Загрузка...</div>;
    if (!gamesData) return <div>Игрок не найден</div>;
    

    const valueGameChange = (event) => {
        setValueGame(event.target.value);
    }
    const valueGameSubmit = (event) => {
        event.preventDefault();
        const tagsForGames = valueGame.split(',').map(item => item.trim());
        const foundedGames = [];

        
        for( const game of gamesData){
            if(tagsForGames.every(found => game.tags.includes(found))){
                foundedGames.push(game);
            }
        }
        
        if(foundedGames.length == 0){setRandomGame('такой игры нет(, может ошибка в тэге?')}
        else {setRandomGame(foundedGames[randint(0,foundedGames.length-1)].name)}
    }

    return(
        <div className="styleDiv" id='roll'>
            <div className="styleDiv-Content">
                <h1>Супер-Пупер Колесо</h1>
                
                <p>{randomGame}</p>
                <form onSubmit={valueGameSubmit}>
                    <label>
                        <TextArea className="tagsInput" rows={4} placeholder="Введи сюда тэги игры(вводи тэги точно)" value={valueGame} onChange={valueGameChange}/>
                        {/*<Cascader
                            placeholder="Выбери коллекцию"
                            value={valueGame[0]}
                            onChange={valueGameChange}
                            className="tagsInput"
                            options={options}
                            expandTrigger="hover"
                            
                        />
                        */}
                    </label>
                    <div className="butContainer">
                        <button type="submit" className="buttonToRoll">
                            КЛИК
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}