import { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from 'mdb-react-ui-kit';

const Register = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    //
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <MDBInput
        label="Type your email"
        type="email"
        className="form-control mt-4"
        size="lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <MDBBtn type="submit" className="mt-4">
        Register
      </MDBBtn>
    </form>
  );

  return (
    <MDBContainer className="p-5">
      <MDBRow>
        <MDBCol size={6} className="offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;
