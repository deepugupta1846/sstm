import Header from "./Components/Pages/Header";
import Signup from "./Components/Pages/Signup";
import AuthService from "./api/auth/AuthService";
import Routers from "./app/routes/Routers";
import logo from "./logo.svg";

function App() {
  const token = AuthService.getAuthToken();
  return (
    <>
      <Routers />
    </>
  );
}

export default App;
