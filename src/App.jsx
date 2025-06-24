import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddSummary from "./pages/AddSummary";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Refresh from "./pages/Refresh";

function App() {
  const { accessToken } = useSelector((state) => state.user);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route
            index
            element={
              accessToken ? <Navigate to="/transcripts" replace /> : <Login />
            }
          />
          <Route
            path="transcripts"
            element={accessToken ? <Home /> : <Login />}
          />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={accessToken ? <Home /> : <Login />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="refresh" element={<Refresh />} />
          <Route
            path="transcripts/:videoId"
            element={accessToken ? <AddSummary /> : <Login />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
