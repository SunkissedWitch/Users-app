import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Row, Input, Button, Spacer, Text, Divider } from '@nextui-org/react';
import axios from "axios";

const URL = process.env.REACT_APP_URL_API || 'http://localhost:4141/api';

export const ChangePassword = () => {

  const [ state, setState ] = useState(
    {
      password: '',
      repeat_password: '',
    }
  );
  const [ bindings, setBindings ] = useState({});
  const [ updateStatus, setUpdateStatus ] = useState({
    text: 'status',
    color: '#fff'
  })

  const navigate = useNavigate();
  const { id } = useParams();


  const updatePass = async (value) => {
    console.log('value', value)
    try {
      await axios.put(`${URL}/users/${id}/change_pass`, {
        password: value
      })
      setTimeout(() => {
        navigate(`/users/${id}`)
      }, 1000);
    }
    catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    setState({...state,
      [event.target.name]: event.target.value});
  }

  const validate = (values) => {
    if (values.password !== values.repeat_password) {
      setBindings({
        status: "error",
        helperText: "passwords are not match"})
      return false;
    }
    setBindings({
      status: "success",
      helperText: ""})
    return true;
  }

  const onFinish = (e) => {
    e.preventDefault();
    if (!validate(state)) {
      setUpdateStatus({text: 'Check values and try again', color: 'error'});
      return;
    }
    setUpdateStatus({text: 'Successfull', color: 'success'})
    updatePass(state.password);
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
        css={{ mw: "400px" , my: 50}}
        >
          <Card.Header>
            <Text h3>Change password</Text>
          </Card.Header>
          <Divider />
          <Card.Body>
            <form onSubmit={onFinish}>
            <Input.Password
                required
                {...bindings}
                css={{width: '100%'}}
                label="Password"
                name="password"
                onChange={handleChange} />
              <Spacer y={1} />
              <Input.Password
              {...bindings}
                required
                css={{width: '100%'}}
                label="Repeat password"
                name="repeat_password"
                onChange={handleChange} />
              <Spacer y={2} />
              <Row justify="space-around" align="center">
                <Button
                  light
                  color="default"
                  size="sm"
                  onPress={() => navigate(`/users/${id}`)}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  type="submit">
                  Confirm password
                </Button> 
              </Row>
            </form>
        </Card.Body>
        <Divider />
        <Card.Footer>
          <Row css={{alignItems: 'center', justifyContent: 'center'}}>
            <Text color={updateStatus.color}>
              {updateStatus.text}
            </Text>         
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  )
}
