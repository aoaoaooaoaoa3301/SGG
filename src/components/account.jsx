import { players } from './../players-data.js';

const styleFlex = {display:'flex', alignItems:'center', gap:'1rem'};

export default function Account(){
    const userlogin = localStorage.getItem('auth');
    const user = players.find(a => a.login === userlogin);
    
    return(
        <div className='player'>
            <div className='player-info'>
                <img src={user.image} alt="img1" />
                <button className='button-change button-change-image flex-center'>{'изменить\n фото'}</button>
                <div className='player-info-fio'>
                    <div style={styleFlex}>
                        <span>{user.login}</span>
                        
                        
                    </div>
                    <div style={styleFlex}>
                        <form action="" style={styleFlex}>
                            <textarea placeholder={user.fio} className='input-account input-account-fio' type="text" />
                            <button className='button-change flex-center'>{'изменить'}</button>
                        </form>
                    </div>
                    
                </div>
        </div>
        <div className='player-games'>
            <div className="player-games-game">

            </div>
        </div>
        </div>
    );  
}