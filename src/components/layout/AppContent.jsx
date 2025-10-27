import { Tabs, Layout } from 'antd';
import ContentMap from '../contentComp/contentMap.jsx';
import ContentPlayers from '../contentComp/contentPlayers.jsx';

const contentStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  minHeight: '100vh',
};
const styleItem = {
  padding: 0,
}


export default function AppContent(){
    return(
        <Layout.Content style={contentStyle}>
            
            <Tabs 
            tabPosition={'left'}
            defaultActiveKey="2"
            
            items={[
            {
            label: 'Карта',
            key: '1',
            children: <ContentMap />,
            style: styleItem,
            },
            {
            label: 'Игроки',
            key: '2',
            children: <ContentPlayers />,
            style: styleItem,
            },
            {
            label: 'FAQ',
            key: '3',
            children: 'faq',
            style: styleItem,
            },
            {
            label: 'Клетки',
            key: '4',
            children: '123',
            style: styleItem,
            },
            ]}
            />
      </Layout.Content>
    )
}