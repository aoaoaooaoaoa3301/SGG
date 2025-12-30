import { useState } from 'react';
import { players } from '../players-data.js'

export default function Login(){
    const [pincode, setPincode] = useState(null);
    const [isFound, setIsFound] = useState(true);
    
    const onChange = e => {
        setPincode(e.target.value);  
    }
    const onSubmit = event => {
        event.preventDefault();
        const found = players.find(a => a.login === pincode);
        if(!found){setIsFound(false);}
        if(found){localStorage.setItem('auth', found.login); location.reload(); setIsFound(true);}
        
    }

    return(
        <div className="login-notification-container">
            <div className="login-notification">
                <h1>Введи пин код для входа</h1>
                <p className='error' style={{visibility: (!isFound) ? 'visible':'hidden'}}>Не верный код</p>
                <form onSubmit={onSubmit}>
                    <input type="text" onChange={onChange} value={pincode || ''}/>
                    <button type="submit">клик</button>
                </form>
            </div>
        </div>
    );  
}