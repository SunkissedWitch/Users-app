import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

const IsAuthorized = () => {

  const token = localStorage.getItem('MyTemporaryToken');

  try { 
    const decoded_token = jwt_decode(token);

    if (decoded_token) {
      return <Outlet />;
    }
  }
  catch (error) {
    console.log (error);
    return <Navigate to='/' replace />;
  }
}

export default IsAuthorized
