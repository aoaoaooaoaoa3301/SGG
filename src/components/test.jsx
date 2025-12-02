import React, { useState, useRef, useEffect } from 'react';

function Test() {
  const itemsList = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const itemHeight = 60;
  const totalItems = 100;
  const baseStopIndex = 51;
  const randomOffset = 10;

  const [isSpinning, setIsSpinning] = useState(false);
  const [spinTape, setSpinTape] = useState([]);
  const [targetPosition, setTargetPosition] = useState(0);
  const [currentTransform, setCurrentTransform] = useState(0);
  const [winningIndex, setWinningIndex] = useState(null); // ← null = не подсвечено

  const wheelRef = useRef(null);
  const animationId = useRef(null);
  const startTime = useRef(0);
  const startPosition = useRef(0);

  // Генерация ленты
  const generateTape = () => {
    const tape = [];
    for (let i = 0; i < totalItems; i++) {
      tape.push(itemsList[Math.floor(Math.random() * itemsList.length)]);
    }
    return tape;
  };

  // Запуск колеса
  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinningIndex(null); // 🔴 Сброс подсветки
    setCurrentTransform(0);
    
    const tape = generateTape();
    setSpinTape(tape);

    // Случайный финальный индекс
    const offset = Math.floor(Math.random() * (2 * randomOffset + 1)) - randomOffset;
    const finalIndex = Math.max(0, Math.min(totalItems - 1, baseStopIndex + offset));

    // Целевая позиция (для translateY)
    const containerCenter = 100;
    const itemCenterOffset = itemHeight / 2;
    const pos = containerCenter - (finalIndex * itemHeight + itemCenterOffset);
    setTargetPosition(pos);

    // Сохраняем индекс для подсветки **после остановки**
    setTimeout(() => setWinningIndex(finalIndex), 5000); // совпадает с duration

    // Анимация
    startPosition.current = currentTransform;
    startTime.current = performance.now();

    const duration = 5000; // 5 сек

    const animate = (time) => {
      const elapsed = time - startTime.current;

      if (elapsed < duration) {
        const t = elapsed / duration;
        const eased = 1 - Math.pow(1 - t, 4);
        const y = startPosition.current + (pos - startPosition.current) * eased;
        setCurrentTransform(y);

        if (wheelRef.current) {
          wheelRef.current.style.transform = `translateY(${y}px)`;
        }

        animationId.current = requestAnimationFrame(animate);
      } else {
        // Завершаем
        setCurrentTransform(pos);
        if (wheelRef.current) {
          wheelRef.current.style.transform = `translateY(${pos}px)`;
        }
        setIsSpinning(false);
      }
    };

    animationId.current = requestAnimationFrame(animate);
  };

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', color: 'white', fontFamily: 'Arial' }}>
      <h2>Колесо Удачи</h2>
      <p>Кликните, чтобы запустить</p>

      <div
        onClick={startSpin}
        style={{
          position: 'relative',
          width: 320,
          height: 420,
          margin: '0 auto',
          cursor: 'pointer',
        }}
      >
        {/* Указатели */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '100%',
            transform: 'translateY(-50%) rotate(90deg)',
            width: 0,
            height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderTop: '40px solid #ffd700',
          }}
        ></div>

        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '100%',
            transform: 'translateY(-50%) rotate(-90deg)',
            width: 0,
            height: 0,
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderTop: '40px solid #ffd700',
          }}
        ></div>

        {/* Контейнер колеса */}
        <div
          style={{
            height: 200,
            overflow: 'hidden',
            margin: '40px 0',
            border: '3px solid #1a3a5f',
            borderRadius: 20,
            background: 'rgba(10, 20, 40, 0.6)',
            position: 'relative',
          }}
        >
          <div
            ref={wheelRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              transition: 'none',
            }}
          >
            {spinTape.map((item, index) => (
              <div
                key={index}
                style={{
                  height: itemHeight,
                  lineHeight: `${itemHeight}px`,
                  fontSize: 28,
                  fontWeight: 'bold',
                  color: winningIndex === index ? '#fff' : '#e0e0ff',
                  textShadow: winningIndex === index
                    ? '0 0 10px #ffd700, 0 0 20px #ffa500'
                    : '0 0 8px rgba(0,0,0,0.8), 0 0 15px rgba(255,215,0,0.3)',
                  backgroundColor: winningIndex === index ? 'rgba(255, 215, 0, 0.2)' : 'transparent',
                  textAlign: 'center',
                  width: '100%',
                  boxSizing: 'border-box',
                  border: '1px solid #333',
                  borderBottom: 'none',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Управление */}
      <div>
        <label>
          Время: <input type="number" defaultValue="5" step="0.5" disabled /> с
        </label>
      </div>
    </div>
  );
}

export default Test;
