import { Tabs, Layout } from 'antd';
import ContentMap from '../contentComp/contentMap.jsx';
import './styleContent.css';

const contentStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  minHeight: '100vh',
};
const styleItem = {
  padding: 0,
}
const styleTab = {
  minWidth: '20rem',
}


export default function AppContent(){
    return(
        <Layout.Content style={contentStyle}>
            <Tabs 
            tabPosition={'left'}
            
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
            children: 'player',
            },
            {
            label: 'FAQ',
            key: '3',
            children: 'faq',
            },
            {
            label: 'Клетки',
            key: '4',
            children: '123',
            },
            ]}
            />
      </Layout.Content>
    )
}