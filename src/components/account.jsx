import { players } from './../players-data.js';
import { Table, ConfigProvider } from 'antd';
import { useState } from 'react';

const styleFlex = {display:'flex', alignItems:'center', gap:'1rem'};
const statusGame1 = 'Дроп';
const statusGame2 = 'Пройдено';


const getStatusColor = (placeholder) => {
  switch (placeholder) {
    case 'Пройдено': return 'green';
    case 'Дроп': return 'red';
    case 'В процессе': return 'orange';
    case 'Рерол': return 'blue';
    default: return '';
  }
};
const styleInput = {
    width:'100%',
}
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


const dataSource = [
  {
    key: '1',
    cage: <input style={styleInput} type='number' placeholder='4'/>,
    name: <input style={styleInput} placeholder='Elden Ring'/>,
    rating: <input style={styleInput} type='number' placeholder='9/10'/>,
    result: <input style={{...styleInput, backgroundColor: getStatusColor(statusGame1)}}  placeholder={statusGame1}/>,
    commit: <input style={styleInput} placeholder='говное'/>,
  },
  {
    key: '2',
    cage: <input style={styleInput} type='number' placeholder='2'/>,
    name: <input style={styleInput} placeholder='risk of rain'/>,
    rating: <input style={styleInput} type='number' placeholder='1/10'/>,
    result: <input style={{...styleInput, backgroundColor: getStatusColor(statusGame2)}} placeholder={statusGame2}/>,
    commit: <input style={styleInput} placeholder='ЭТО САМАЯ ЛУЧШАЯ ИГРА'/>,
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


export default function Account(){
    const userlogin = localStorage.getItem('auth');
    const user = players.find(a => a.login === userlogin);
    const [nowKey, setNowKey] = useState(dataSource.length+1);
    const [dataGames, setDataGames] = useState(dataSource);
    const [itemsInvent, setItemsInvent] = useState(itemsInInventory);
    
    function logOutAccount(){
        localStorage.removeItem('auth');
        location.reload();
    }
    function toAddGame(){
      setNowKey(nowKey+1);
      setDataGames([...dataGames,{
    key: `${nowKey}`,
    cage: <input style={styleInput} type='number' placeholder='клетка'/>,
    name: <input style={styleInput} placeholder='игра'/>,
    rating: <input style={styleInput} type='number' placeholder='оценка'/>,
    result: <input style={{...styleInput, backgroundColor: getStatusColor('результат')}}  placeholder='результат'/>,
    commit: <input style={styleInput} placeholder='оценка'/>,
  }])
      console.log(dataGames);
    }
    const toRemoveItem = (event, index) => {
      event.preventDefault();

      setItemsInvent(prev => {
        const newItems = [...prev];
        newItems[index] = {};
        return newItems;
      });
    };

    return(
        <div className='player'>
            <div className='player-info'>
                <img className='player-img' src={user.image} alt="img1" />
                
                <div className='player-info-fio'>
                    <div style={styleFlex}>
                        <span>{user.name}</span>
                    </div>
                    <div style={styleFlex}>
                        {itemsInvent.map((item,key) =>(
                          <form onSubmit={(e) => toRemoveItem(e, key)} className='itemInventory' key={key}>
                            <div className="item-container">
                              <img src={item.img} alt="" />
                            </div>
                            <button>🗑️</button>
                          </form>
                        ))}
                    </div>
                </div>
                
            </div>
            <button className='button-logOut' onClick={logOutAccount}>выйти из Аккаунта</button>
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
                
                    <Table style={{color:'black', marginBottom:'1rem'}} dataSource={dataGames} columns={columns} pagination={false}/>
                
            </ConfigProvider>
            <div className="butContainer" style={{gap:'1rem'}}>
              <button onClick={toAddGame} className='button-toAddGameStats'>+</button>
              <button  className='button-toAddGameStats'>✔</button>
              
            </div>
            
            
        </div>
    );  
}