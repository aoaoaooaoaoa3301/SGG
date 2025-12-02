import { fakeFetchGames } from "../api";
import { useState, useEffect } from 'react';
import { randint } from "../utils";
import { Select } from 'antd';


// Изменить Cascader на AutoComplete



export default function ContentWheel(){
    const [gamesData, setGamesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [randomGame, setRandomGame] = useState('тут будет игра');
    const [valueGame, setValueGame] = useState('');
    const [winningIndex, setWinningIndex] = useState(null);
    const [spinTape, setSpinTape] = useState([]);
    
    

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
        if (isSpinning) return;
        const randomCorrection = randint(-27, 30);
        console.log(randomCorrection);
        startSpin(foundedGames.map((game) =>(game.name)),randomCorrection);
    }

    const valueGameChange = value => {
        console.log(`selected ${value}`);
        setValueGame(value);
    };

    const onSearch = value => {
        console.log('search:', value);
    };


    //Wheel Code
    const itemHeight = 60; 
    const stopIndex = 90; 
    const totalItems = 100; // общая длина ленты

    // DOM
    const wheel = document.getElementById('wheel');
    const durationInput = document.getElementById('duration');

    let isSpinning = false;
    let animationId = null;
    let tape = [];

    // Генерация случайной ленты
    function generateTape(list) {
      const tape = [];
      for (let i = 0; i < totalItems; i++) {
        tape.push(list[Math.floor(Math.random() * list.length)]);
      }
      return tape;
    }


    function startSpin(list, randomCorrection) {
      isSpinning = true;
      
      setWinningIndex(null);
      // Генерируем новую ленту
      tape = generateTape(list);
      setSpinTape(tape);

      // Позиция 90-го элемента (в реальной ленте)
      const targetElementIndex = stopIndex;
      const targetPosition = -(targetElementIndex * itemHeight);
      

      // Время анимации
      const duration = parseFloat(durationInput.value); // сек

      // Анимация с ease-out
      const startTime = performance.now();
      const startPosition = 0;
      let lastPosition = 0.0;

      function animate(currentTime) {
        const elapsed = (currentTime - startTime) / 1000;
        

        if (elapsed < duration) {
          // Плавное замедление
          const t = elapsed / duration;
          const eased = 1 - Math.pow(1 - t, 4); 
          const currentY = startPosition + (targetPosition - startPosition) * eased;
          wheel.style.transform = `translateY(${currentY + randomCorrection}px)`;
          animationId = requestAnimationFrame(animate);
          lastPosition = currentY + randomCorrection;
        }
        
        else {
            wheel.style.transform = `translateY(${targetPosition}px)`;

            setWinningIndex(targetElementIndex + 1);
            isSpinning = false;
            
        }
      }

      requestAnimationFrame(animate);
    }




    return(
        <div className="styleDiv" id='roll'>
            <div className="styleDiv-Content">
                <h1>Супер-Пупер Колесо</h1>
                <div class="container" id="container">
                    <div className="wheel-pack">
                        <div class="pointer pointer-left"></div>
                        <div class="pointer pointer-right"></div>

                        <div class="wheel-container">
                            <div class="wheel" id="wheel">
                                {spinTape.map((item, index) => (
                                    <div key={index} id={index} className='wheel-item' style={{color: winningIndex == index ? `var(--color-main)` : `var(--color-white)`}}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>  
                    
                    <div class="controls">
                        <div>
                            <label>Время прокрутки: <input id="duration" type="number" defaultValue={3} min="3" max="10"/> с</label>
                        </div>
                    </div>
                </div>
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
                        <button type="submit" id="buttonToRoll" className="buttonToRoll">
                            КЛИК
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}