// App.jsx
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import AppContent from './components/layout/AppContent';
import ContentMap from './components/contentComp/contentMap';
import ContentPlayers from './components/contentComp/contentPlayers.jsx';
import ContentRoll from './components/contentComp/contentRoll.jsx';
import ContentFaq from './components/contentComp/contentFaq.jsx'
import ContentCage from './components/contentComp/contentCage.jsx';

import './style.css'

const { Sider, Content } = Layout;

// Данные каталогов
const catalogs = {
  map: <ContentMap/>,
  wheel: <ContentRoll/>,
  players: <ContentPlayers/>,
};

const catalogNames = {
  map: 'Карта',
  wheel: 'Колесо Игр',
  players: 'Игроки',
};

// Компонент страницы каталога
export function CatalogPage() {
  const { category } = useParams();

  if (!catalogs[category]) {
    return <div>Каталог не найден</div>;
  }

  return (
    <div>
      {catalogs[category]}
    </div>
  );
}

// Главный компонент приложения
export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Меню-элементы для Ant Design
  const menuItems = Object.keys(catalogs).map((key) => ({
    key,
    label: catalogNames[key],
  }));

  const handleMenuClick = ({ key }) => {
    navigate(`/${key}`);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        width={'15rem'}
      >
        <Menu
          mode="inline"
          inlineCollapsed={collapsed}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      {/* Основной контент — сюда рендерятся маршруты */}
      
      <Content>
        <Outlet />
      </Content>
      
    </Layout>
  );
}
