import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { MailOutlined } from '@ant-design/icons';

import { forgotPassword } from '../../store/actions/authActions';

const { Title, Text } = Typography;
const { Item } = Form;

const ForgotPassword = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const sendForgotPasswordEmailInProgress = useSelector(
    (state) => state.auth.sendForgotPasswordEmailInProgress
  );

  const onFinish = ({ email }) => {
    dispatch(forgotPassword(email));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const registerForm = () => (
    <Form
      style={{ marginTop: 20 }}
      form={form}
      size="large"
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid email!',
          },
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input
          placeholder="Enter your email and check inbox"
          size="large"
          autoFocus
        />
      </Item>
      {sendForgotPasswordEmailInProgress ? (
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          size="large"
          block
          icon={<MailOutlined />}
          loading
        >
          Send Email
        </Button>
      ) : (
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: 10 }}
          size="large"
          block
          icon={<MailOutlined />}
        >
          Send Email
        </Button>
      )}
    </Form>
  );

  return (
    <>
      <Row>
        <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
          <Title level={2} style={{ marginTop: 40 }}>
            Forgot Password
          </Title>
          <Text>Please send a reset password link to a valid email!</Text>
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
          {registerForm()}
        </Col>
      </Row>
    </>
  );
};

export default ForgotPassword;
