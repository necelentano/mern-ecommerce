import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Row,
  Col,
  Space,
  Button,
  Input,
  Divider,
  Spin,
  List,
  Modal,
} from 'antd';

import { ExclamationCircleOutlined } from '@ant-design/icons';

import {
  getCartAction,
  emptyCartInDBAction,
  clearCart,
} from '../store/actions/cartActions';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;

const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const { cartFromDB, getCartFromDBInProgress, cart } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCartAction(user.token));
  }, []);

  // if the user somehow got to the '/checkout' page with empty cart (for example manualy type url in the search bar) – redirect user to the '/shop' page
  useEffect(() => {
    const delayed = setTimeout(() => {
      if (!cart.items.length || !cartFromDB) {
        history.push('/shop');
      }
    }, 500);

    return () => clearTimeout(delayed);
  }, [cartFromDB, cart]);

  const emptyUserCartHandler = () => {
    confirm({
      title: `Do you want to remove this order?`,
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        dispatch(emptyCartInDBAction(user.token)); // empty (remove) user's product cart from DB
        dispatch(clearCart()); // clear user's product cart in redux store
        history.push('/shop');
      },
      onCancel() {
        console.log('Cancel remove product cart from redux and DB!');
      },
    });
  };

  return (
    cartFromDB && (
      <>
        <Row>
          <Col span={24}>
            <Title
              level={2}
              style={{
                color: 'black',
                padding: '20px 0',
                textAlign: 'center',
                backgroundColor: '#b5f5ec',
                fontSize: 30,
              }}
            >
              Checkout
            </Title>
          </Col>
        </Row>
        <Row>
          <Col
            xl={{ span: 18, offset: 3 }}
            lg={{ span: 22, offset: 1 }}
            md={{ span: 22, offset: 1 }}
            xs={{ span: 22, offset: 1 }}
          >
            <Row gutter={[16, 16]}>
              <Col
                xl={{ span: 12 }}
                lg={{ span: 12 }}
                md={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Row>
                  <Title level={3}> Deliver Address</Title>
                </Row>
                <Row>
                  <Space
                    direction="vertical"
                    size={30}
                    style={{ width: '100%' }}
                  >
                    <TextArea
                      rows={4}
                      placeholder="Please enter your shipping address"
                    />
                    <Button type="primary">Save address</Button>
                  </Space>
                </Row>
                <Divider />
                <Row>
                  <Title level={3}>Got Coupon?</Title>
                </Row>
                <Space direction="vertical" size={30} style={{ width: '100%' }}>
                  <Input placeholder="Paste coupon here if you have one" />
                  <Button type="primary">Apply coupon</Button>
                </Space>
              </Col>
              <Col
                xl={{ span: 12 }}
                lg={{ span: 12 }}
                md={{ span: 24 }}
                xs={{ span: 24 }}
              >
                <Row>
                  <Title level={3}>Order Summary</Title>
                </Row>
                <hr />
                {getCartFromDBInProgress && (
                  <div style={{ width: 40, margin: '100px auto' }}>
                    <Spin size="large" />
                  </div>
                )}
                {!getCartFromDBInProgress && cartFromDB.products.length && (
                  <>
                    <Row>
                      <Text strong>
                        Products in cart: {cartFromDB.products.length}
                      </Text>
                    </Row>
                    <hr />
                    <Row>
                      <List
                        itemLayout="horizontal"
                        dataSource={
                          cartFromDB.products.map((item) => ({
                            title: item.product.title,
                            price: item.price,
                            quantity: item.quantity,
                          })) || []
                        }
                        renderItem={(item) => (
                          <List.Item>
                            <Text>
                              {item.title} x {item.quantity} = $
                              {item.quantity * item.price}
                            </Text>
                          </List.Item>
                        )}
                      />
                    </Row>
                    <hr />
                    <Row>
                      <Text strong>
                        Cart total price: ${cartFromDB.totalPrice}
                      </Text>
                    </Row>
                    <hr />

                    <Row style={{ margin: '30px 0' }}>
                      <Space
                        direction="horizontal"
                        size={20}
                        style={{ width: '100%' }}
                        align="center"
                      >
                        <Button type="primary">Place Order</Button>
                        <Button
                          disabled={!cartFromDB.products.length}
                          type="primary"
                          onClick={emptyUserCartHandler}
                        >
                          Empty Cart
                        </Button>
                      </Space>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    )
  );
};

export default Checkout;
