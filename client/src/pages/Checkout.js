import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  notification,
  message,
} from 'antd';

import {
  ExclamationCircleOutlined,
  PercentageOutlined,
  DollarCircleOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import {
  getCartAction,
  emptyCartInDBAction,
  clearCart,
  saveUserAddressAction,
  getShippingAddressAction,
  applyCouponAction,
} from '../store/actions/cartActions';
import { createOrderCashPaymentAction } from '../store/actions/orderActions';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { confirm } = Modal;

const Checkout = ({ history }) => {
  const dispatch = useDispatch();
  const {
    cartFromDB,
    getCartFromDBInProgress,
    shippingAddress,
    applyCouponInProgress,
    cart,
  } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { cashOnDelivery } = useSelector((state) => state.COD);

  // TextArea value
  const [textAreaValue, setTextAreaValue] = useState('');
  // Coupon
  const [coupon, setCoupon] = useState('');

  useEffect(() => {
    dispatch(getCartAction(user.token)).then((data) => {
      // need to handle redirect when cartIsEmpty after createOrder with cash payment option (kinda not best practice, but it works)
      if (cashOnDelivery) return;
      // if the user somehow got to the '/checkout' page with empty cart in the DB or redux store (for example typed manually the url in the search bar) – redirect user to the '/shop' page
      if (!cart.items.length || data.cartIsEmpty) history.push('/shop');
    });
  }, [user.token, dispatch, cart, history, cashOnDelivery]);

  useEffect(() => {
    dispatch(getShippingAddressAction(user.token));
  }, [user.token, dispatch]);

  useEffect(() => {
    setTextAreaValue(shippingAddress);
  }, [shippingAddress]);

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

  // TextArea
  const onTextAreaChange = (e) => {
    setTextAreaValue(e.target.value);
  };
  // Coupon Input
  const onChangeCoupon = (e) => {
    setCoupon(e.target.value);
  };

  const saveUserAddress = () => {
    // simple validation
    if (textAreaValue.length < 10) {
      return notification.warning({
        message: `Please enter your correct shipping address. It's required!`,
      });
    }
    if (textAreaValue === shippingAddress) {
      return message.info(
        `You try to save the same shipping address! Change it if you need.`
      );
    }
    // after saving shipping address to DB we want to get it from DB
    dispatch(saveUserAddressAction(textAreaValue, user.token)).then(() =>
      dispatch(getShippingAddressAction(user.token))
    );
  };

  // Apply coupon
  const applyCouponHandler = () => {
    if (!coupon.length)
      return notification.warning({
        message: `Please enter your coupon if you have one!`,
      });
    dispatch(applyCouponAction(coupon, user.token));
  };

  // Create order conditionaly (with card payment or cash)

  const createOrder = () => {
    if (cashOnDelivery) {
      dispatch(createOrderCashPaymentAction(cashOnDelivery, user.token)).then(
        (orderCreated) => {
          if (orderCreated) history.push('/user/history');
        }
      );
    } else {
      // to payment with card
      history.push('/payment');
    }
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
                      onChange={onTextAreaChange}
                      value={textAreaValue}
                    />
                    <Button
                      type="primary"
                      onClick={saveUserAddress}
                      icon={<HomeOutlined />}
                      size="large"
                    >
                      Save address
                    </Button>
                  </Space>
                </Row>
                <Divider />
                <Row>
                  <Title level={3}>Got Coupon?</Title>
                </Row>
                <Space direction="vertical" size={30} style={{ width: '100%' }}>
                  <Input
                    placeholder={
                      cartFromDB.totalPriceAfterDiscount
                        ? 'Coupon already used'
                        : 'Paste coupon here if you have one'
                    }
                    value={coupon}
                    onChange={onChangeCoupon}
                    disabled={cartFromDB.totalPriceAfterDiscount}
                  />
                  <Button
                    type="primary"
                    onClick={applyCouponHandler}
                    loading={applyCouponInProgress}
                    icon={<PercentageOutlined />}
                    disabled={cartFromDB.totalPriceAfterDiscount}
                    size="large"
                  >
                    Apply coupon
                  </Button>
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
                        Products in cart:{' '}
                        {cartFromDB.products.reduce(
                          (sum, product) => sum + product.quantity,
                          0
                        )}
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
                    {cartFromDB.totalPriceAfterDiscount && (
                      <>
                        <hr />
                        <Row>
                          <Text strong style={{ fontSize: 20 }} type="success">
                            Total price after discount: $
                            {cartFromDB.totalPriceAfterDiscount}
                          </Text>
                        </Row>
                      </>
                    )}

                    <hr />

                    <Row style={{ margin: '30px 0' }}>
                      <Space
                        direction="horizontal"
                        size={20}
                        style={{ width: '100%' }}
                        align="center"
                      >
                        <Button
                          type="primary"
                          disabled={
                            shippingAddress.length < 10 ||
                            !cartFromDB.products.length
                          }
                          size="large"
                          icon={<DollarCircleOutlined />}
                          onClick={createOrder}
                        >
                          Place Order
                        </Button>
                        <Button
                          disabled={!cartFromDB.products.length}
                          type="primary"
                          onClick={emptyUserCartHandler}
                          size="large"
                          icon={<ShoppingCartOutlined />}
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
