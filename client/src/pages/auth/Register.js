import { useState } from 'react';
import { Row, Col, Input, Button, Typography } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { auth } from '../../firebase';

const { Title } = Typography;

const Register = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    //
    e.preventDefault();
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
    // Claer state - email
    setEmail('');
  };

  const registerForm = () => (
    <form style={{ marginTop: 20 }}>
      <Input
        placeholder="Enter your email"
        label="Type your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="large"
        autoFocus
      />
      <Button
        type="primary"
        onClick={handleSubmit}
        style={{ marginTop: 20 }}
        size="large"
      >
        Register
      </Button>
    </form>
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
