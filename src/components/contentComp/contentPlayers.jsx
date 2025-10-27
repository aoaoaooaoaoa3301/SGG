import './styleContent.css';
import { Tabs } from 'antd';
import Player from './player.jsx';

export default function ContentPlayers(){
    return(
        <div className='styleDivPlayers'>
            <div className='styleDivPlayers-Content'>
                <Tabs 
                tabPosition={'top'}
                
                items={[
                {
                label: 'Андрей',
                key: '1',
                children: <Player login='Andrey'/>,
                },
                {
                label: 'Terewe',
                key: '2',
                children: <Player login='Tron'/>
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