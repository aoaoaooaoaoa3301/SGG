// src/components/TaskList.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Test() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('Accounts') // ← имя вашей таблицы
        .select('*');

      if (error) {
        console.error('Ошибка:', error);
      } else {
        setTasks(data);
      }
    };

    fetchTasks();
  }, []);

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>{task.name}</li>
      ))}
    </ul>
  );
}