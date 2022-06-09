import { Text, Container, Row } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container
      fluid
      className="custom-navbar"
      display="flex"
      direction="column"
      justify="center"
      alignItems="center"
      >
        <Row justify="space-around" align="center">
        <div>
          <Text transform="uppercase" onClick={() => navigate('/')}>Home</Text>
        </div>
        <div>
          <Link to={'/login'}>Sign in</Link>
        </div>
        <div>
          <Link to={'/signup'}>Sign Up</Link>
        </div>
        <div>
          <Link to={'/users'}>Users Table</Link>
        </div>
        <div>
          <Link to={'/projects'}>Projects</Link>
        </div>
        </Row>
      </Container>
    </>
  )
}

//protected route -> table users with all interested columns (without password)