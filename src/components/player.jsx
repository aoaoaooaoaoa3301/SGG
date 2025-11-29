import { fakeFetchPlayers } from "../api";
import { useState, useEffect } from 'react';


export default function Player({ login }) {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playersData = await fakeFetchPlayers();
        const found = playersData.find(a => a.login === login);
        setPlayerData(found);
      } catch (err) {
        console.error('Ошибка загрузки:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  });

  if (loading) return <div>Загрузка...</div>;
  if (!playerData) return <div>Игрок не найден</div>;

  return (
    <div className='player'>
      <div className='player-info'>
        <img src={playerData.image} alt="img1" />
        <div className='player-info-fio'>
          <span>{playerData.name}</span>
          <span>{playerData.fio}</span>
        </div>
      </div>
      <div className='player-games'>
        <div className="player-games-game">

        </div>
      </div>
    </div>
  );
}