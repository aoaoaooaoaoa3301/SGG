import { fakeFetchPlayers } from "../api";
import { useState, useEffect } from 'react';
import { Table, ConfigProvider } from 'antd';

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

const dataSource = [
  {
    key: '1',
    cage: '4',
    name: 'Elden Ring',
    rating: '9/10',
    result: <p style={{...styleInput, backgroundColor: getStatusColor(statusGame1)}}>{statusGame1}</p>,
    commit: 'говное',
  },
  {
    key: '2',
    cage: '2',
    name: 'risk of rain',
    rating: '1/10',
    result: <p style={{...styleInput, backgroundColor: getStatusColor(statusGame2)}}>{statusGame2}</p>,
    commit: 'ЭТО САМАЯ ЛУЧШАЯ ИГРА',
  },
];

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
    width: '40%',
  },
];


export default function Player({ login }) {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playersData = await fakeFetchPlayers();
        const found = playersData.find(a => a.login === login);
        setPlayerData(found);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  if (loading) return <div>Загрузка...</div>;
  if (!playerData) return <div>Игрок не найден</div>;

  return (
    <div className='player'>
      
      <div className='player-info'>
        <img className="player-img" src={playerData.image} alt="img1" />
        <div className='player-info-fio'>
                    <span>{playerData.name}</span>
                    <span>{playerData.fio}</span>
                    
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
                
                    <Table style={{color:'black', marginBottom:'1rem'}} dataSource={dataSource} columns={columns} pagination={false}/>
                
            </ConfigProvider>
    </div>
  );
}