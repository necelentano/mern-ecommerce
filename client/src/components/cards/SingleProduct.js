import { Link } from 'react-router-dom';

import { Row, Col, Card, Carousel, Image, Typography, Tabs, Rate } from 'antd';

import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import ProductInfoList from './ProductInfoList';
import Placeholder from '../../images/placeholder.png';
import RatingModal from '../modal/RatingModal';
import RatingAverage from './RatingAverage';

const { Title } = Typography;
const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const { title, images, price, description, ratings } = product;

  return (
    <>
      <Row style={{ marginTop: 16 }}>
        <Col
          xl={{ span: 16 }}
          lg={{ span: 16 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
        >
          {images && images.length ? (
            <Carousel
              autoplay
              dots
              style={{
                textAlign: 'center',
              }}
            >
              {images &&
                images.map((image) => (
                  <div key={image.public_id}>
                    <Image
                      src={image.url}
                      style={{
                        objectFit: 'cover',
                        height: 450,
                      }}
                    />
                  </div>
                ))}
            </Carousel>
          ) : (
            <div
              style={{
                backgroundColor: '#f1eff0',
                textAlign: 'center',
              }}
            >
              <Image
                src={Placeholder}
                preview={false}
                style={{
                  objectFit: 'cover',
                  height: 450,
                }}
              />
            </div>
          )}
        </Col>
        <Col
          xl={{ span: 8 }}
          lg={{ span: 8 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <Title
            style={{ padding: 10, backgroundColor: '#d3adf7', fontSize: 26 }}
          >
            {`${title} – $${price}`}
          </Title>
          <RatingAverage ratings={ratings} />
          <Card
            actions={[
              <>
                <ShoppingCartOutlined style={{ color: '#73d13d' }} />
                <br /> Add to Cart
              </>,
              <Link to={`/`}>
                <HeartOutlined style={{ color: '#69c0ff' }} /> <br />
                Add to Wishlist
              </Link>,
              <>
                <RatingModal />
              </>,
            ]}
          >
            <ProductInfoList product={product} />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tabs type="card">
            <TabPane
              tab="Description"
              key="1"
              style={{ maxWidth: '100%', padding: 8 }}
            >
              {description}
            </TabPane>
            <TabPane
              tab="More"
              key="2"
              style={{ maxWidth: '100%', padding: 8 }}
            >
              More static content about product, ordering, shipping etc.
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default SingleProduct;
