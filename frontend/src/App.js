import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [err,setErr] = useState("")
  const navigate = useNavigate();

  function handleemailChange(event) {
    setemail(event.target.value );
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value );
  }

  const handleSubmit = async(evt)=>{
    evt.preventDefault()
    
    const resp = await axios.post("http://localhost:8080/login",email)
    if(resp.status === 200){
        alert("login Successful")
        navigate("/success")
    }else{
        setErr(resp.data.error.message)
    }
    console.log("Response",resp)
}

  function handleSignUp() {
    navigate("/signup");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <input
          onChange={handleemailChange}
          type="email"
          placeholder="Enter email"
          className="login-input"
          required
        />
        <input
          onChange={handlePasswordChange}
          type="password"
          placeholder="Enter Password"
          className="login-input"
          required
        />
        {err && <h5 style={{color:"red"}}>{err}</h5>}
        <button onClick={handleSubmit} className="login-button">
          Login
        </button>
      </div>
      <div className="signup_card">
        <h5>Don't Have an Account...</h5>
        <button onClick={handleSignUp} className="signup-button">SignUp</button>
      </div>
    </div>
  );
}

export default App;
