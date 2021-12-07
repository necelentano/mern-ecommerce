import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Layout,
  Typography,
  Divider,
  List,
  Row,
  Col,
  Form,
  Button,
  Spin,
} from 'antd';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import AdminNav from '../../components/nav/AdminNav';
import CouponForm from '../../components/forms/CouponForm';

import { LocalSearch, searched } from '../../components/forms/LocalSearch';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const CategoryCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [idOfClickedItem, setIdOfClickedItem] = useState('');
  const [keyword, setKeyword] = useState(''); // Step 1. Category search filter – Category search input local state

  const handleDelete = (category) => {
    if (window.confirm(`Delete ${category.name} coupon?`)) {
    }
  };

  const onFinish = ({ name, discount, expiry }) => {
    console.log('COUPON VALUES', name, discount, expiry);

    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Layout>
        <Header>
          <Title level={2} style={{ color: 'white', marginTop: '10px' }}>
            Manage Coupons
          </Title>
        </Header>
        <Layout hasSider>
          <AdminNav />
          <Content style={{ backgroundColor: 'white' }}>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Title level={2} style={{ marginTop: 40 }}>
                  Create New Coupon
                </Title>
              </Col>
            </Row>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <CouponForm
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  //inProgress={false}
                />
              </Col>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Divider style={{ fontWeight: 'bold' }}>Coupon Search</Divider>
                <LocalSearch
                  keyword={keyword}
                  setKeyword={setKeyword}
                  placeholderText="Enter coupon name"
                />
              </Col>
            </Row>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                LIST OF ALL COUPONS
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CategoryCreate;
