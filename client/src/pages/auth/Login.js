import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

import { login } from '../../store/actions/authActions';

const { Title } = Typography;
const { Item } = Form;

const Login = ({ history }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { loginInProgress, isAuthenticated, loginError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      toast.info('You are logged in already.');
      return history.push('/');
    }

    if (loginError) {
      history.push('/register');
    }
  }, [history, loginError, isAuthenticated]);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const onFinish = ({ email, password }) => {
    // simple validation
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    dispatch(login(email, password));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const loginForm = () => (
    <Form
      {...formItemLayout}
      style={{ marginTop: 20 }}
      form={form}
      size="large"
      name="login"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
    >
      <Item
        name="email"
        label="Email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail again!',
          },
        ]}
      >
        <Input size="large" autoFocus />
      </Item>
      <Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Enter your password" size="large" />
      </Item>
      <Item {...tailFormItemLayout}>
        {loginInProgress ? (
          <Button
            type="primary"
            style={{ marginTop: 10 }}
            size="large"
            icon={<MailOutlined />}
            loading
          >
            Login with Email/Password
          </Button>
        ) : (
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: 10 }}
            size="large"
            icon={<MailOutlined />}
          >
            Login with Email/Password
          </Button>
        )}
      </Item>
    </Form>
  );

  return (
    <>
      <Row>
        <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
          <Title level={2} style={{ marginTop: 40 }}>
            Login
          </Title>
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 12, offset: 4 }} xs={{ span: 20, offset: 2 }}>
          {loginForm()}
        </Col>
      </Row>
    </>
  );
};

export default Login;
