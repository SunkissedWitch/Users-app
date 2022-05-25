import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { Home } from "./components/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/Registration/SignUp";
import IsAuthorized from "./helpers/IsAuthorized";
import UsersTable from "./components/Users/UsersTable"
import { EditUser } from "./components/Users/EditUser"

function App() {
  return (
    <NextUIProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<IsAuthorized />} >
            <Route path="/users" element={<UsersTable />} />
            <Route path="/users/:id" element={<EditUser />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </NextUIProvider>
  );
}

export default App;
