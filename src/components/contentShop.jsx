import { shop } from '../shop-data.js'
import { useEffect, useRef } from 'react';

export default function ContentShop(){
    const dateRef = useRef(null);

    

    return(
        <div className="styleDiv" id="shop">
            <div className="styleDiv-Content">
                <h1>Магазин</h1>
                <div className="grid-ShopItems">
                    {shop.map(el => (
                        <div key={el.id} className="cardShop">
                            <h2>{el.name}</h2>
                            <img src={el.img} alt="" />
                            <p>{el.info} </p>
                            
                            <p>стоит {el.price}</p>
                            <p>осталось 2 штуки</p>
                            <div className="butContainer">
                                <button className="buttonToBuy">
                                    Купить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <h1>До обновления магазина осталось 5ч</h1>
            </div>
        </div>
    );  
}