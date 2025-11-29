import { fakeFetchGames } from "../api";
import { useState, useEffect } from 'react';
import { randint } from "../utils";
import { Select } from 'antd';


// Изменить Cascader на AutoComplete



export default function ContentRoll(){
    const [gamesData, setGamesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [randomGame, setRandomGame] = useState('тут будет игра');
    const [valueGame, setValueGame] = useState('');
    
    

    useEffect(() => {
        const fetchData = async () => {
        try {
            const gamesData = await fakeFetchGames();
            setGamesData(gamesData);
        } catch (err) {
            console.error('Ошибка загрузки:', err);
        } finally {
            setLoading(false);
        }
    };
    
    fetchData();
    });
    
    if (loading) return <div>Загрузка...</div>;
    if (!gamesData) return <div>Игр нет</div>;

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

    const valueGameChange = value => {
        console.log(`selected ${value}`);
        setValueGame(value);
    };

    const onSearch = value => {
        console.log('search:', value);
    };


    return(
        <div className="styleDiv" id='roll'>
            <div className="styleDiv-Content">
                <h1>Супер-Пупер Колесо</h1>
                
                <p>{randomGame}</p>
                <form onSubmit={valueGameSubmit}>
                    <label>
                        <Select
                            className="tagsInput"
                            showSearch={{ optionFilterProp: 'label', onSearch }}
                            placeholder="Выбери коллекцию"
                            onChange={valueGameChange}
                            options={[
                            {
                                value: 'solo',
                                label: 'solo',
                            },
                            {
                                value: 'fps',
                                label: 'fps',
                            },
                            {
                                value: 'online',
                                label: 'online',
                            },
                            ]}
                        />
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