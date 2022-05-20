import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeButton } from '../Buttons/HomeButton';
import { Container, Card, Row, Input, Button, Spacer, Text, Divider } from '@nextui-org/react';
import axios from "axios";

const Login = () => {
  const [ state, setState ] = useState(
    { 
      email: '',
      password: ''
    }
  );

  const navigate = useNavigate();

  const signIn = async (values) => {
    console.log('values', values)
    try {
      const send = await axios.post('http://localhost:4141/api/login', {
        email: values.email,
        password: values.password
      })
      localStorage.setItem('MyTemporaryToken', send.data.bearer);
      navigate('/');
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    setState({...state,
      [event.target.name]: event.target.value});
  }
  const onFinish = (e) => {
    e.preventDefault();
    console.log('form values', state)
    signIn(state);
  };

  return (
    <Container
    css={{
      display: 'flex',
      flexDirection: 'column',
      justify: 'center',
      alignItems: 'center'
    }}>
        <Card
        css={{ mw: "400px" , marginTop: 50}}
        >
          <Card.Header>
            <Text h3 b>Sign In</Text>
          </Card.Header>
          <Divider />
          <Card.Body>
            <form onSubmit={onFinish}>
              <Input
                required
                css={{width: '100%'}}
                label="Email"
                name="email"
                onChange={handleChange} />
              <Spacer y={1} />
              <Input.Password
                required
                css={{width: '100%'}}
                label="Password"
                name="password"
                onChange={handleChange} />
              <Spacer y={2} />
              <Row justify="space-around">
               <HomeButton size="sm" light title="Cancel" />
                <Button
                  size="sm"
                  type="submit">
                  Confirm
                </Button> 
              </Row>
            </form>
        </Card.Body>
        <Divider />
        <Card.Footer>
          <Row css={{alignItems: 'center', justifyContent: 'center'}}>
            <Text color="#acacac">
            Still don't have an account?
            </Text>
            <Button
              light
              color="primary"
              auto
              onClick={() => navigate('/signup')}
            >
              SignUp
            </Button>            
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default Login;
