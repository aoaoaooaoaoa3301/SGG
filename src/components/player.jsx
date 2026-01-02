import { fakeFetchPlayers } from "../api";
import { useState, useEffect } from 'react';
import { Table, ConfigProvider } from 'antd';
import { supabase } from '../supabaseClient';

const styleFlex = {display:'flex', alignItems:'center', gap:'1rem'};
const itemsInInventory = [
  {
    name:'Свобода выбора',
    info:'Позволяет выбрать любую игру из колеса(не работает на коллекции)',
    img:'pictures/Free.png',
    price:4
  },
  {
    name:'Щит упрямства',
    info:'Блокирует получение дебаффа на один раз, если при покупке предмета, у игрока уже есть один дебафф, игнорирует его',
    img:'pictures/Shield.png',
    price:1
  },
  {
    name:'Щит упрямства',
    info:'Блокирует получение дебаффа на один раз, если при покупке предмета, у игрока уже есть один дебафф, игнорирует его',
    img:'pictures/Shield.png',
    price:1
  },
  {
    name:'Щит упрямства',
    info:'Блокирует получение дебаффа на один раз, если при покупке предмета, у игрока уже есть один дебафф, игнорирует его',
    img:'pictures/Shield.png',
    price:1
  },
  {
    
  },
  {
    
  },
  
]
const statusGame1 = 'Дроп';
const statusGame2 = 'Пройдено';
const styleInput = {
    width:'100%',
    textAlign: 'center',
    borderRadius:'8rem'
}
const getStatusColor = (placeholder) => {
  switch (placeholder) {
    case 'Пройдено': return 'green';
    case 'Дроп': return 'red';
    case 'В процессе': return 'orange';
    case 'Рерол': return 'blue';
    default: return '';
  }
};

const columns = [
  {
    title: 'Клетка',
    dataIndex: 'cage',
    key: 'cage',
    width: '10%',
  },  
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
  },
  {
    title: 'Оценка',
    dataIndex: 'rating',
    key: 'rating',
    width: '10%',
  },
  {
    title: 'Результат',
    dataIndex: 'result',
    key: 'result',
    width: '20%',
  },
  {
    title: 'Комментарий',
    dataIndex: 'commit',
    key: 'commit',
    width: 50,
    height:600,
    className: 'wrap-cell',
  },
];

function createGameList(list){
  console.log(list);
  return list.map( (item)=>({
    key: item.id,
    cage: item.cage,
    name: item.name,
    rating: `${item.rating}/10`,
    result: <p style={{...styleInput, backgroundColor: getStatusColor(item.result)}}>{item.result}</p>,
    commit: item.commit,
  }))
}


export default function Player({ login }) {
  const [playerData, setPlayerData] = useState();
  const [playerGames, setPlayerGames] = useState();
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
      const fetchPlayer = async () => {
        
        const { data, error } = await supabase
          .from('Accounts') 
          .select('*')
          .eq('login', login);
        if (error) {
          console.error('Ошибка:', error);
        } else {
          setPlayerData(data[0]);
          
          if (data[0]?.gameList) {
            await fetchPlayerGames(data[0].gameList);
          }
        }
      };
      const fetchPlayerGames = async (table) => {
        const { data, error } = await supabase
          .from(table) 
          .select('*')
        if (error) {
          console.error('Ошибка:', error);
        } else {
          setPlayerGames(createGameList(data));
        }
      };
      fetchPlayer();
      setLoading(false);
    }, []);
  
  if (!playerData) return <div>Загрузка...</div>;

  return (
    <div className='player'>
      
      <div className='player-info'>
        <img className="player-img" src={playerData.image} alt="img1" />
        <div className='player-info-fio'>
                    <span>{playerData.name}</span>
                    <span>{playerData.info}</span>
                    
                    <div style={styleFlex}>
                        {itemsInInventory.map((item,key) =>(
                          <div className='itemInventory' key={key}>
                            <div className="item-container">
                              <img src={item.img} alt="" />
                            </div>
                            
                          </div>
                        ))}
                    </div>
                </div>
      </div>
      <ConfigProvider
                theme={{
                    components:{
                        Table:{
                            rowHoverBg:'var(--color-5side)',
                            bodySortBg:'var(--color-5side)',
                            headerBg:'var(--color-5side)',
                            headerColor: 'var(--color-white)',

                        }
                    }
                }}
                >
                
                    <Table style={{color:'black', marginBottom:'1rem'}} dataSource={playerGames} columns={columns} pagination={false}/>
                
            </ConfigProvider>
    </div>
  );
}