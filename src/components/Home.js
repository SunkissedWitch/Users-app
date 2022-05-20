import { Text } from "@nextui-org/react";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <>
      <Text>Home</Text>
      <Link to={'/login'}>Sign in</Link>
      <div></div>
      <Link to={'/signup'}>Sign Up</Link>
    </>
  )
}