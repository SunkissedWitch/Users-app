import { Spacer, Text, Container } from "@nextui-org/react";
import { HomeButton } from "../Buttons/HomeButton";

const ProtectedRoute = () => {

  return (
    <Container css={{paddingTop: 40}}>
      <Text>Protected</Text>
      <Spacer y={2}/>
      <HomeButton title="back home" />
    </Container>
  )
}
export default ProtectedRoute;
