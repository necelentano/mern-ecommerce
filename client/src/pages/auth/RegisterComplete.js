import { Row, Col, Form, Input, Button, Typography } from 'antd';
import { toast } from 'react-toastify';

import { auth } from '../../firebase';

const { Title } = Typography;
const { Item } = Form;

const RegisterComplete = ({ history }) => {
  const [form] = Form.useForm();

  // get user email from localStorage and put it to form.email
  form.setFieldsValue({
    email: window.localStorage.getItem('emailForRegistration'),
  });

  console.log(window.location.href);
  console.log(window.localStorage.getItem('emailForRegistration'));

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

  const signInEmailLink = async (email, password) => {
    //validation
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      console.log('RESULT', result);
      if (result.user.emailVerified) {
        // delete user email from localStorage
        window.localStorage.removeItem('emailForRegistration');

        // get current user
        let user = auth.currentUser;

        // set password for current user
        await user.updatePassword(password);

        // id token
        const idTokenResult = await user.getIdTokenResult();
        console.log('user', user, 'idTokenResult', idTokenResult);
        // redux store
        // will add later
        // redirect
        history.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const onFinish = ({ email, password }) => {
    console.log('Success:', email);
    signInEmailLink(email, password);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const completeRegistrationForm = () => (
    <Form
      {...formItemLayout}
      style={{ marginTop: 20 }}
      form={form}
      size="large"
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      scrollToFirstError
      initialValues={{
        email: form.email,
      }}
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
      <Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password placeholder="Enter your password" size="large" />
      </Item>
      <Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginTop: 10 }}
          size="large"
        >
          Complete Registration
        </Button>
      </Item>
    </Form>
  );

  return (
    <>
      <Row>
        <Col lg={{ span: 8, offset: 8 }} xs={{ span: 20, offset: 2 }}>
          <Title level={2} style={{ marginTop: 40 }}>
            Register Complete
          </Title>
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 12, offset: 4 }} xs={{ span: 20, offset: 2 }}>
          {completeRegistrationForm()}
        </Col>
      </Row>
    </>
  );
};

export default RegisterComplete;
