import { Tabs } from 'antd';
import Player from './player.jsx';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function ContentPlayers(){
    const [playersData, setPlayersData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
          const fetchPlayer = async () => {
            
            const { data, error } = await supabase
              .from('Accounts') // ← имя вашей таблицы
              .select('*')
            if (error) {
              console.error('Ошибка:', error);
            } else {
              setPlayersData(data);
            }
          };
          fetchPlayer();
          setLoading(false);
        }, []);
      
    if(!playersData) return <div>Загрузка...</div>;


    return(
        <div className='styleDiv' id='players'>
            <div className='styleDiv-Content'>
                <Tabs 
                tabPosition={'top'}
                
                items={playersData.map( (item) => ({
                    label: item.name,
                    key:item.id,
                    children: <Player login={item.login}/>
                }))}

                ites={[
                {
                label: 'Андрей',
                key: '1',
                children: <Player login='4556'/>,
                },
                {
                label: 'Terewe',
                key: '2',
                children: <Player login='123'/>
                },
                {
                label: 'Pocker',
                key: '3',
                children: <Player login='Pocker'/>,
                },
                ]}
                />
            </div>
        </div>
    );
}