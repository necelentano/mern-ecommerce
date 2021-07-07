import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from '../../firebase';

const { Title } = Typography;
const { Item } = Form;

const Register = () => {
  const [form] = Form.useForm();

  // submit user email and get link to complete registration
  const submitEmail = async (email) => {
    const config = {
      url: 'http://localhost:3000/register/complete',
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
      style={{ marginTop: 40 }}
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
          placeholder="Enter your email"
          //onChange={(e) => setEmail(e.target.value)}
          size="large"
          autoFocus
        />
      </Item>
      <Button
        type="primary"
        htmlType="submit"
        style={{ marginTop: 20 }}
        size="large"
      >
        Register
      </Button>
    </Form>
  );

  return (
    <Row>
      <Col lg={{ span: 8, offset: 8 }} xs={{ span: 16, offset: 4 }}>
        <Title level={2} style={{ marginTop: 40 }}>
          Register
        </Title>
        <ToastContainer />
        {registerForm()}
      </Col>
    </Row>
  );
};

export default Register;
