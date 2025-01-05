import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { UsersList } from "./components/Users/UsersList";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="flex justify-center mt-5">
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
