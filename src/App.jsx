import "./App.css";
import Login from "./pages/Login";
import Navigation from "./components/Navigation";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <>
      <Navigation />
      <ResetPassword />
    </>
  );
}

export default App;
