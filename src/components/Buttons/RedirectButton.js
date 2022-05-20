import { useNavigate } from "react-router-dom";
import { Button } from '@nextui-org/react';


export const RedirectButton = (prop) => {
  const { path, color, title } = prop;

  const navigate = useNavigate();

  return (
    <Button
    shadow
    color={color}
    onPress={() => navigate(path)}
    >
      {title}
    </Button>
  )
}