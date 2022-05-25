import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { HomeButton } from '../Buttons/HomeButton';
import { Container, Card, Row, Input, Button, Spacer, Text, Divider } from '@nextui-org/react';
import axios from "axios";

const URL = process.env.REACT_APP_URL_API || 'http://localhost:4141/api';

const SignUp = () => {

  const [ state, setState ] = useState(
    { 
      email: "",
      password: "",
      age: null,
      gender:  "",
      department_id: null,
      birthday: "",
    }
  );

  const navigate = useNavigate();

  const handleChange = (event) => {
    setState({...state,
      [event.target.name]: event.target.value});
  }

  const regUser = async (values) => {
    
    try {
      const send = await axios.post(`${URL}/signup`, {
        email: values.email,
        password: values.password,
        age: values.age,
        gender: values.gender,
        department_id: values.department_id,
        birthday: values.birthday,
      })
      localStorage.setItem('MyTemporaryToken', send.data.bearer);
      navigate('/users');
    }
    catch (error) {
      console.log(error)
    }
  }

  const onFinish = (e) => {
    e.preventDefault();
    console.log('form values', state)
    regUser(state);
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
        css={{ mw: "600px" , my: 50}}
        >
          <Card.Header>
            <Text h3 b>Sign Up</Text>
          </Card.Header>
          <Divider />
          <Card.Body>
            <form onSubmit={onFinish}>
              <Input
                type="email"
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
              <Spacer y={1} />
              <Row css={{ justifyContent: 'space-between'}}>
              <Input
                required
                type="number"
                css={{width: '45%'}}
                label="Your current age"
                name="age"
                onChange={handleChange} />

              <Input
                required
                type="number"
                css={{width: '45%'}}
                label="Department ID"
                name="department_id"
                onChange={handleChange} />
              </Row>
              <Spacer y={1} />

              <Input
                required
                css={{width: '100%'}}
                label="Gender"
                name="gender"
                onChange={handleChange} />
              <Spacer y={1} />
              <Input
                required
                type="date"
                css={{width: '100%'}}
                label="Your birthday"
                name="birthday"
                onChange={handleChange} />
              <Spacer y={1} />
              <Row justify="space-around">
               <HomeButton size="md" light title="Cancel" />
                <Button
                  size="md"
                  type="submit">
                  Confirm
                </Button> 
              </Row>
            </form>
        </Card.Body>
        <Divider />
        <Card.Footer>
          <Row align="center" justify='center'>
            <Text color="#acacac">
            Already have an account?
            </Text>
            <Button
              light
              color="primary"
              auto
              onPress={() => navigate('/login')}
            >
              Sign In
            </Button>            
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default SignUp;
