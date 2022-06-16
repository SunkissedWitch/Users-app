import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Row, Input, Button, Spacer, Text, Divider } from '@nextui-org/react';
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

const URL = process.env.REACT_APP_URL_API || 'http://localhost:4141/api';

export const EditUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const [ userData, setUserData ] = useState(
    { 
      email: "",
      password: "",
      age: "",
      gender:  "",
      department_id: "",
      birthday: "",
      first_name: "",
      last_name: "",
      upwork_account_name: ""
    }
  );

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(`${URL}/users/${id}`);
      for (const property of Object.keys(data)) {
        if (data[property] === null) {
          data[property] = '';
        }
      }
      setUserData(data);
    } catch (error) {
      console.log('EditUser', error)  
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [])

  const handleChange = (event) => {
    setUserData({...userData,
      [event.target.name]: event.target.value});
  }

  const editUser = async (values) => {
    console.log("values", values)
    try {
      await axios.put(`${URL}/users/${id}`, {
        email: values.email,
        password: values.password,
        age: values.age,
        gender: values.gender,
        department_id: values.department_id,
        birthday: values.birthday,
        first_name: values.first_name,
        last_name: values.last_name,
        upwork_account_name: values.upwork_account_name
      })

      navigate('/users');
    }
    catch (error) {
      console.log(error)
    }
  }

  const onFinish = (e) => {
    e.preventDefault();
    editUser(userData);
  };

  return(
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
            <Text h3 b>Edit</Text>
          </Card.Header>
          <Divider />
          <Card.Body>
            <form onSubmit={onFinish}>
              <Input
                required
                value={userData.email}
                type="email"
                css={{width: '100%'}}
                label="Email"
                name="email"
                onChange={handleChange} />
              <Spacer y={1} />
              <Input
                value={userData.first_name}
                css={{width: '100%'}}
                label="First Name"
                name="first_name"
                onChange={handleChange} />
              <Spacer y={1} />
              <Input
                value={userData.last_name}
                css={{width: '100%'}}
                label="Last Name"
                name="last_name"
                onChange={handleChange} />
              <Spacer y={1} />
              <Row css={{ justifyContent: 'space-between'}}>
              <Input
                required
                value={userData.age}
                type="number"
                css={{width: '45%'}}
                label="Your current age"
                name="age"
                onChange={handleChange} />
              <Input
                required
                value={userData.department_id}
                type="number"
                css={{width: '45%'}}
                label="Department ID"
                name="department_id"
                onChange={handleChange} />
              </Row>
              <Spacer y={1} />

              <Input
                required
                value={userData.gender}
                css={{width: '100%'}}
                label="Gender"
                name="gender"
                onChange={handleChange} />
              <Spacer y={1} />
              <Input
                required
                value={dayjs(userData.birthday).format('YYYY-MM-DD')}
                type="date"
                css={{width: '100%'}}
                label="Your birthday"
                name="birthday"
                onChange={handleChange} />
              <Spacer y={1} />
              <Input
                value={userData.upwork_account_name}
                css={{width: '100%'}}
                label="Upwork Account"
                name="upwork_account_name"
                onChange={handleChange} />
              <Spacer y={1} />
              <Row justify="space-around">
                <Button
                  light
                  color="default"
                  auto
                  onPress={() => navigate('/users')}
                >
                  Cancel
                </Button>
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
              Want to change your password?
            </Text>
            <Button
              light
              color="primary"
              auto
              onPress={() => navigate(`/users/${id}/change_password`)}
            >
              Change password
            </Button>          
          </Row>
        </Card.Footer>
      </Card>
    </Container>
  )
}