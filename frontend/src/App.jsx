import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { UsersList } from "./components/Users/UsersList";
function App() {
  return (
    <>
      <div className="p-4 flex items-center justify-center">
        <Home />
      </div>
    </>
  );
}

export default App;
