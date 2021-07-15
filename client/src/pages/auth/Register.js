import { useDispatch, useSelector } from 'react-redux';

import { Row, Col, Form, Input, Button, Typography } from 'antd';

import { sendEmail } from '../../store/actions/authActions';

const { Title, Text } = Typography;
const { Item } = Form;

const Register = (props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const sendEmailInProgress = useSelector(
    (state) => state.auth.sendEmailInProgress
  );

  // submit user email and get link to complete registration via email
  // const submitEmail = async (email) => {
  //   const config = {
  //     url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
  //     handleCodeInApp: true,
  //   };

  //   await auth.sendSignInLinkToEmail(email, config);

  //   toast.success(
  //     `Email is sent to ${email}. Click the link to complete your registration.`
  //   );

  //   // Save user email in localStorage
  //   window.localStorage.setItem('emailForRegistration', email);
  //   // Claer input from email
  //   form.resetFields();
  // };

  const onFinish = ({ email }) => {
    dispatch(sendEmail(email));
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
      {sendEmailInProgress ? (
        <Button type="primary" style={{ marginTop: 10 }} size="large" loading>
          Send Email
        </Button>
      ) : (
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: 10 }}
          size="large"
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
            Register
          </Title>
          <Text>Please send a registration link to a valid email!</Text>
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
