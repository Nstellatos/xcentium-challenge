import "./App.css";
import Login from "./components/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userUtils from "./utils/userUtils";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    //Check local storage for user if it doesn't exist redirect to /login endpoint
    if (!!userUtils.isLoggedIn) {
      navigate("/login");
    }
  }, [userUtils.isLoggedIn]);
  return <div className="App">Home Page to be protected...</div>;
}

export default App;
