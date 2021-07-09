import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { toast } from 'react-toastify';

import { auth } from '../../firebase';

const { Title } = Typography;
const { Item } = Form;

const Register = () => {
  const [form] = Form.useForm();

  // submit user email and get link to complete registration via email
  const submitEmail = async (email) => {
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Email is sent to ${email}. Click the link to complete your registration.`
    );

    // Save user email in localStorage
    window.localStorage.setItem('emailForRegistration', email);
    // Claer input from email
    form.resetFields();
  };

  const onFinish = ({ email }) => {
    console.log('Success:', email);
    submitEmail(email);
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
      <Button
        type="primary"
        htmlType="submit"
        style={{ marginTop: 10 }}
        size="large"
      >
        Register
      </Button>
    </Form>
  );

  return (
    <>
      <Row>
        <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
          <Title level={2} style={{ marginTop: 40 }}>
            Register
          </Title>
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

export default Register;
