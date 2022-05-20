import { useNavigate } from "react-router-dom";
import { Button } from '@nextui-org/react';


export const HomeButton = (prop) => {
  const { title } = prop;
  const navigate = useNavigate();

  return (
    <Button
    // ghost
    size='sm'
    // color="gradient"
    light
    onPress={() => navigate('/')}
    >
      {title}
    </Button>
  )
}