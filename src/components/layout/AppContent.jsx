import { Tabs, Layout } from 'antd';
import ContentMap from '../contentComp/contentMap.jsx';
import ContentPlayers from '../contentComp/contentPlayers.jsx';
import ContentRoll from '../contentComp/contentRoll.jsx';
import ContentFaq from '../contentComp/contentFaq.jsx'
import ContentCage from '../contentComp/contentCage.jsx';

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
            defaultActiveKey="1"
            
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
            label: 'Клетки',
            key: '3',
            children: <ContentCage/>,
            style: styleItem,
            },
            {
            label: 'Колесо Игр',
            key: '4',
            children: <ContentRoll/>,
            style: styleItem,
            },
            {
            label: 'FAQ',
            key: '5',
            children: <ContentFaq/>,
            style: styleItem,
            },
            ]}
          />
      </Layout.Content>
    )
}