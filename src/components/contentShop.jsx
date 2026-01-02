import { shop } from '../shop-data.js'
import { useEffect, useRef } from 'react';

export default function ContentShop(){
    const dateRef = useRef(null);

    

    return(
        <div className="styleDiv" id="shop">
            <div className="styleDiv-Content">
                <h1>Магазин</h1>
                <div className="grid-ShopItems">
                    {shop.map((el, key) => (
                        <div key={key} className="cardShop">
                            <h2>{el.name}</h2>
                            <p>осталось 2 штуки</p>
                            <div className="img-container">
                                <img src={el.img} alt="" />
                            </div>
                            <div className='container-info'><p>{el.info} </p></div>
                            <p>стоит {el.price}</p>
                            
                            
                            <div className="butContainer">
                                <button className="buttonToBuy">
                                    Купить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <h1>До обновления магазина осталось 4ч</h1>
            </div>
        </div>
    );  
}