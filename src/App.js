import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./components/NotFound";
import { Home } from "./components/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/Registration/SignUp";
import IsAuthorized from "./helpers/IsAuthorized";
import ProtectedRoute from "./components/Users/ProtectedRoute"

function App() {
  return (
    <NextUIProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="/user"
            element={
            <IsAuthorized >
              <ProtectedRoute />
            </IsAuthorized>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </NextUIProvider>
  );
}

export default App;
