import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Stack from 'react-bootstrap/Stack';
import Alert from 'react-bootstrap/Alert';
import { MESSENGER_ROUTE } from '../utils/consts';
import { ApiService } from '../services/apiServiсe';

const Login = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const navigate = useNavigate();

  const [isAuthError, setIsAuthError] = useState(false);

  const getStatusInstance = async () => {
    const isAuth = await ApiService.authorize(idInstance, apiTokenInstance);

    if (isAuth) {
      navigate(MESSENGER_ROUTE);
    } else {
      setIsAuthError(!isAuth);
    }
  };

  return (
    <Stack
      gap={3}
      className="col-md-3 mx-auto p-3 justify-content-md-center vh-100">
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="IdInstance"
          onChange={(event) => setIdInstance(event.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="ApiTokenInstance"
          onChange={(event) => setApiTokenInstance(event.target.value)}
        />
      </InputGroup>
      <Button variant="outline-success" onClick={getStatusInstance}>
        Login
      </Button>
      {isAuthError && <Alert variant={'danger'}>Uncorrect data</Alert>}
    </Stack>
  );
};

export default Login;
