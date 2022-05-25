import { Text, Container, Row } from "@nextui-org/react";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <>
      <Container
      fluid
      className="custom-navbar"
      >
        <Row justify="space-around">
        <div>
          <Text>Home</Text>
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
        </Row>
      </Container>
    </>
  )
}

//protected route -> table users with all interested columns (without password)