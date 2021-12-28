import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Typography,
  Row,
  Col,
  List,
  Button,
  Image,
  Table,
  InputNumber,
  Modal,
  Space,
} from 'antd';

import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ExclamationCircleOutlined,
  DeleteTwoTone,
} from '@ant-design/icons';

import {
  setItemQuantity,
  removeFromCart,
  clearCart,
  createCartAction,
} from '../store/actions/cartActions';

import { setCashOnDelivery } from '../store/actions/cashOnDeliveryActions';

const { Title, Text } = Typography;
const { confirm } = Modal;

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    cart: { items, totalQuantity, totalPrice },
    createCartInProgress,
    createCartError,
  } = useSelector((state) => state.cart);

  // indicate loading state for 'Proceed to Checkout' and 'Pay Cash on Delivery' buttons
  const [paymentOption, setPaymentOption] = useState('');

  const listItemsData =
    items.map((item) => ({
      title: item.title,
      imgUrl: item.images[0].url,
      price: item.price,
      cartQuantity: item.cartQuantity,
    })) || [];

  const saveOrderToDB = () => {
    setPaymentOption('card');
    confirm({
      title: `Do you want to go to Checkout page?`,
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        dispatch(setCashOnDelivery(false));
        return dispatch(createCartAction(items, user.token)).then(() => {
          if (!createCartError) history.push('/checkout');
        });
      },
      onCancel() {
        console.log('Cancel checkout');
      },
    });
  };

  const saveCashOnDeliveryOrderToDB = () => {
    setPaymentOption('cash');
    confirm({
      title: `Do you want to go to Checkout page with cash on delivery option?`,
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        dispatch(setCashOnDelivery(true));
        return dispatch(createCartAction(items, user.token)).then(() => {
          if (!createCartError) history.push('/checkout');
        });
      },
      onCancel() {
        console.log('Cancel checkout');
      },
    });
  };

  const removeAllFromCart = () => {
    confirm({
      title: `Do you want to remove all products from cart?`,
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        dispatch(clearCart());
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  // Table //////////////

  const handleDeleteConfirm = (id, title) => {
    confirm({
      title: `Do you want to delete '${title}' from cart?`,
      icon: <ExclamationCircleOutlined />,
      //content: 'Some descriptions',
      onOk() {
        dispatch(removeFromCart(id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onChangeProductCount = (quantity, id) => {
    dispatch(setItemQuantity({ quantity, id }));
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      render: (image) => <Image src={image} className="cart-table-img" />,
      fixed: 'left',
      responsive: ['xl'],
      width: 190,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      render: (title, record) => (
        <Link to={`/product/${record.slug}`}>{title}</Link>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      align: 'center',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'cartQuantity',
      align: 'center',
      render: (cartQuantity, record) => (
        <>
          <InputNumber
            size="small"
            min={1}
            max={record.quantity}
            defaultValue={cartQuantity}
            onChange={(value) => onChangeProductCount(value, record.id)}
            style={{ width: 46 }}
          />
        </>
      ),
    },
    {
      title: 'Shipping',
      key: 'shipping',
      dataIndex: 'shipping',
      align: 'center',
      render: (shipping) =>
        shipping === 'Yes' ? (
          <CheckCircleTwoTone style={{ fontSize: 30 }} twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone style={{ fontSize: 30 }} twoToneColor="#ff4d4f" />
        ),
    },
    {
      title: 'Remove',
      key: 'remove',
      dataIndex: 'remove',
      align: 'center',
      render: (id, record) => (
        <DeleteTwoTone
          twoToneColor="#ff4d4f"
          style={{ fontSize: 26 }}
          onClick={() => handleDeleteConfirm(id, record.title)}
        />
      ),
    },
  ];

  const tableData = items.map((item) => ({
    key: item._id,
    id: item._id,
    title: item.title,
    image: item.images[0].url,
    price: `$${item.price}`,
    brand: item.brand,
    quantity: item.quantity,
    cartQuantity: item.cartQuantity,
    shipping: item.shipping,
    remove: item._id,
    slug: item.slug,
  }));

  /// Table END ////////////
  return (
    <>
      <Row>
        <Col span={24}>
          <Title
            level={2}
            style={{
              color: 'black',
              padding: '20px 0',
              textAlign: 'center',
              backgroundColor: '#ffffb8',
              fontSize: 30,
            }}
          >
            Cart
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
              xl={{ span: 16 }}
              lg={{ span: 16 }}
              md={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Row>
                <Title level={3}>{totalQuantity} Products in Cart</Title>
              </Row>
              <Row>
                {items.length === 0 && (
                  <Text style={{ fontSize: 20, margin: '20px 0' }}>
                    No products in cart.{' '}
                    <Link to="/shop">Continue shopping.</Link>
                  </Text>
                )}
                {items.length > 0 && (
                  <Table
                    columns={columns}
                    dataSource={tableData}
                    pagination={false}
                    bordered={true}
                    scroll={{ x: true }}
                  />
                )}
              </Row>
            </Col>
            <Col
              xl={{ span: 8 }}
              lg={{ span: 8 }}
              md={{ span: 24 }}
              xs={{ span: 24 }}
            >
              <Row>
                <Title level={3}>Order Summary</Title>
              </Row>
              <hr />
              <Row>
                <List
                  itemLayout="vertical"
                  dataSource={listItemsData}
                  renderItem={(item) => (
                    <List.Item>
                      <Text strong style={{ display: 'block' }}>
                        {item.title}
                      </Text>
                      <Text style={{ display: 'block' }}>
                        Quantity: {item.cartQuantity}
                      </Text>
                      <Text style={{ display: 'block' }}>
                        Price: ${item.price}
                      </Text>
                    </List.Item>
                  )}
                />
              </Row>
              <hr />
              <Row>
                <Text strong style={{ fontSize: 20 }}>
                  Total price: ${totalPrice}
                </Text>
              </Row>
              <Row style={{ paddingTop: 40, paddingBottom: 40 }}>
                {user ? (
                  <Space direction="vertical" size={20}>
                    <Button
                      type="primary"
                      size="large"
                      disabled={!items.length}
                      onClick={saveOrderToDB}
                      loading={paymentOption === 'card' && createCartInProgress}
                    >
                      Proceed to Checkout
                    </Button>
                    <Button
                      type="default"
                      size="large"
                      disabled={!items.length}
                      onClick={saveCashOnDeliveryOrderToDB}
                      loading={paymentOption === 'cash' && createCartInProgress}
                    >
                      Pay Cash on Delivery
                    </Button>
                  </Space>
                ) : (
                  <Button type="primary" size="large">
                    <Link to={{ pathname: '/login', state: { from: 'cart' } }}>
                      Login to Checkout
                    </Link>
                  </Button>
                )}
              </Row>
              <Row>
                {items.length > 0 && (
                  <Button
                    type="primary"
                    size="large"
                    disabled={!items.length}
                    danger
                    onClick={removeAllFromCart}
                    style={{ marginBottom: 40 }}
                  >
                    Remove all products from cart
                  </Button>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
