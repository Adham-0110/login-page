import { useNavigate } from "react-router-dom";

function FailedPage() {
  const navigate = useNavigate()
  function handleSignUp() {
    navigate("/signup");
  }
    return (
      <div className="failed-page">
        <h1 className="failed-message">❌ Login Failed</h1>
        <button onClick={handleSignUp} className="signup_button">SignUp</button>

      </div>
    );
  }
  
  export default FailedPage;
  