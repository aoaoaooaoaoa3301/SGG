// App.jsx
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import ContentPlayers from './components/contentPlayers.jsx';
import ContentRoll from './components/contentRoll.jsx';
import ContentFaq from './components/contentFaq.jsx'

const { Sider, Content } = Layout;

const catalogs = {
  map: '',
  wheel: <ContentRoll/>,
  players: <ContentPlayers/>,
  faq: <ContentFaq />,
};

const catalogNames = {
  map: 'Карта',
  wheel: 'Колесо Игр',
  players: 'Игроки',
  faq: 'FAQ',
};

export function CatalogPage() {
  const { category } = useParams();

  if (!catalogs[category]) {
    return <div>Каталог не найден</div>;
  }

  return (
    <div>
      {catalogs[category]}
    </div>
  )
};

const getKeyFromPath = (pathname) => {
  if (pathname === '/' || pathname === '/SGG' || pathname === '/SGG/') {
    return 'map';
  }
  const match = pathname.match(/\/SGG\/([^/]+)/);
  const category = match ? match[1] : null;
  return catalogs[category] ? category : 'map';
};

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const activeKey = getKeyFromPath(location.pathname);

  const menuItems = Object.keys(catalogs).map((key) => ({
    key,
    label: catalogNames[key],
  }));

  const handleMenuClick = ({ key }) => {
    if(key == 'map') { navigate(``); }
    else{ navigate(`/${key}`); }
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
          selectedKeys={[activeKey]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      
      <Content>
        <Outlet />
      </Content>
      
    </Layout>
  );
};
