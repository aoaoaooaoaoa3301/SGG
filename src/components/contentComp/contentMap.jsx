import './styleContent.css';


export default function ContentMap(){
    return(
        <div className='mapContainer' id='map'>
            <div className="styleDivMap">
                <img src="/SGG/pictures/board-1.webp" alt='map'/>
                <img src="/SGG/pictures/board-2.webp" alt='map'/>
                <img src="/SGG/pictures/board-3.webp" alt='map'/>
            </div>
            <div className="position">
                <div className="playerOnMap" id='pocker'>
                    
                    <img className="avatarPlayerOnMap" src="/SGG/13514ca887092c87ca87636896bdc6ea.jpg" alt="player" />
                    
                </div>
            </div>
        </div>
    )
}