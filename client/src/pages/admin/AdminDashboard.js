import { Layout, Typography } from 'antd';

import AdminNav from '../../components/nav/AdminNav';

const { Header, Content } = Layout;
const { Title } = Typography;

const AdminDashboard = () => {
  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            Admin Dashboard Page
          </Title>
        </Header>
        <Layout hasSider>
          <AdminNav />
          <Content style={{ backgroundColor: 'white' }}>
            Dashboard Content
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminDashboard;