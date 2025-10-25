import { Layout } from "antd";

const headerStyle = {
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'rgba(83, 135, 247, 1)',
  minHeight:'4rem',
}

export default function AppHeader(){
    return(
        <Layout.Header style={headerStyle}>
            Header
        </Layout.Header>
    );
}