import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

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
  Space,
  Grid,
  notification,
} from 'antd';

import { MenuUnfoldOutlined } from '@ant-design/icons';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import AdminNav from '../../../components/nav/AdminNav';
import CategoryForm from '../../../components/forms/CategoryForm';
import { LocalSearch, searched } from '../../../components/forms/LocalSearch';
import MobileSideDrawer from '../../../components/drawer/MobileSideDrawer';

import {
  createCategoryAction,
  getAllCategoriesAction,
  deleteCategoryAction,
} from '../../../store/actions/categoryActions';

import { setMobileDrawerVisability } from '../../../store/actions/drawerActions';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CategoryCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const screens = useBreakpoint();
  const {
    createCategoryInProgress,
    allCategories,
    getCategoriesInProgress,
    deleteCategoryInProgress,
  } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  const [idOfClickedItem, setIdOfClickedItem] = useState('');
  const [keyword, setKeyword] = useState(''); // Step 1. Category search filter – Category search input local state

  // here we call useEffect only when component mounts, array with no dependencies
  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  const handleDelete = (category) => {
    if (window.confirm(`Delete ${category.name} category?`)) {
      setIdOfClickedItem(category._id);

      dispatch(deleteCategoryAction(category.slug, user.token)).then(() => {
        // dispatch getAllCategoriesAction after category was deleted
        dispatch(getAllCategoriesAction());
        notification.success({
          message: `Category ${category.name} deleted`,
        });
      });
    }
  };

  // Step 3. Category search filter – onChange handler function
  // const handleSearchChange = (e) => {
  //   e.preventDefault();
  //   setKeyword(e.target.value.toLowerCase());
  // };

  // Step 4. Category search filter – filter method HOC
  // const serached = (keyword) => (category) =>
  //   category.name.toLowerCase().includes(keyword);

  const onFinish = ({ name }) => {
    dispatch(createCategoryAction(name, user.token))
      .then(() => {
        // dispatch getAllCategoriesAction after category was created
        dispatch(getAllCategoriesAction());
      })
      .catch((error) => console.log(error));
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showMobileMenuDrawer = () => {
    dispatch(setMobileDrawerVisability(true));
  };

  // Step 2. Category search filter – input field

  // const searchInput = () => (
  //   <Input
  //     size="large"
  //     placeholder="Category search"
  //     value={keyword}
  //     onChange={handleSearchChange}
  //   />
  // );

  return (
    <>
      <Layout>
        <Header>
          <Space direction="horizontal" size="middle">
            {!screens.md && (
              <Button
                type="primary"
                shape="circle"
                icon={<MenuUnfoldOutlined />}
                size="large"
                onClick={showMobileMenuDrawer}
              />
            )}
            <Title
              level={2}
              style={{ color: 'white', marginTop: '10px', fontSize: 18 }}
            >
              Admin Create Category Page
            </Title>
          </Space>
        </Header>
        <Layout hasSider>
          {!screens.md && (
            <MobileSideDrawer>
              <AdminNav />
            </MobileSideDrawer>
          )}
          {(screens.md || screens.lg || screens.xl) && <AdminNav />}
          <Content style={{ backgroundColor: 'white' }}>
            <Row>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Title level={2} style={{ marginTop: 40 }}>
                  Create New Category
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
                <Divider style={{ fontWeight: 'bold' }}>
                  Create new category
                </Divider>
                <CategoryForm
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  inProgress={createCategoryInProgress}
                  btnText="Add new category"
                  placeholderText="Enter new category name"
                />
              </Col>
              <Col
                xl={{ span: 10, offset: 7 }}
                lg={{ span: 20, offset: 2 }}
                md={{ span: 20, offset: 2 }}
                xs={{ span: 20, offset: 2 }}
              >
                <Divider style={{ fontWeight: 'bold' }}>
                  Category Search
                </Divider>
                <LocalSearch
                  keyword={keyword}
                  setKeyword={setKeyword}
                  placeholderText="Enter new category name"
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
                {getCategoriesInProgress ? (
                  <div className="spiner">
                    <Spin />
                  </div>
                ) : (
                  <>
                    <Divider style={{ fontWeight: 'bold' }}>
                      All Categories
                    </Divider>
                    <List style={{ marginBottom: 40 }}>
                      {allCategories
                        .filter(searched(keyword)) // Step 5. Category search filter – use serached HOC with array filter method
                        .map((category) => (
                          <List.Item key={category._id}>
                            <Text>{category.name}</Text>
                            <Link
                              to={`/admin/category/${category.slug}`}
                              style={{ marginLeft: 'auto', marginRight: 30 }}
                            >
                              <EditOutlined />
                            </Link>
                            {deleteCategoryInProgress && // show loading state on clicked Delete button with conditional rendering
                            idOfClickedItem === category._id ? (
                              <Button
                                danger
                                loading
                                icon={<DeleteOutlined />}
                              ></Button>
                            ) : (
                              <Button
                                danger
                                onClick={() => handleDelete(category)}
                                icon={<DeleteOutlined />}
                              ></Button>
                            )}
                          </List.Item>
                        ))}
                    </List>
                  </>
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default CategoryCreate;
