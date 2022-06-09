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
import { ChangePassword } from "./components/Users/ChangePassword"
import { TableProjects } from "./components/Projects/TableProjects"
import { ProjectDetails } from "./components/Projects/ProjectDetails"

function App() {
  return (
    <NextUIProvider>
      <div className="App">
      <Home />
        <Routes>
          <Route path="/" index element={''}/>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route element={<IsAuthorized />} >
            <Route path="/users" element={<UsersTable />} />
            <Route path="/users/:id" element={<EditUser />} />
            <Route path="/users/:id/change_password" element={<ChangePassword />} />
            <Route path="/projects" element={<TableProjects />} />
            <Route path="/projects/:id" element={<ProjectDetails/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </NextUIProvider>
  );
}

export default App;
