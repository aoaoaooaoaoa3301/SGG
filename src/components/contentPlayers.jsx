import { Tabs } from 'antd';
import Player from './player.jsx';

export default function ContentPlayers(){
    return(
        <div className='styleDiv' id='players'>
            <div className='styleDiv-Content'>
                <Tabs 
                tabPosition={'top'}
                
                items={[
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