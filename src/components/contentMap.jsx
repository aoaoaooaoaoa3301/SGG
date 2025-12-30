import { fakeFetchMap } from "../api";
import { useState, useEffect } from 'react';

export default function ContentMap(){
    const [mapData, setMapData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            const fetchData = async () => {
            try {
                const mapData = await fakeFetchMap();
                setMapData(mapData);
            } catch (err) {
                console.error('Ошибка загрузки:', err);
            } finally {
                setLoading(false);
            }
        };
        
    fetchData();
    });
        
    if (loading) return <div>Загрузка...</div>;
    if (!mapData) return <div>Карты нет</div>;

    return(
        <div className="styleDiv flex-center" id='map'>
            <div className="styleDiv-Content">
                {mapData.map( (cage,index) => (
                    <div key={index} className={"cage" + (cage.end == 'yes' ? "" : " " + (cage.special == 'yes' ? "cage-special" : (cage.line == 1 ? "cage-1line" : "cage-2line"))) }  style={{backgroundColor:cage.color}}>
                        {cage.name}
                        <span className="cage-info">{cage.info}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}