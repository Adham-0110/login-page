import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [email,setEmail] = useState()
    const [password, setPassword] = useState("");
    const [err,setErr] = useState()
    const navigate = useNavigate()


    const handleSubmit = async(evt)=>{
        evt.preventDefault()
        console.log("Form Submitted")
        const resp = await axios.post("http://localhost:8080/signup",{email,password})
        if(resp.status === 201){
            alert("SignUp Successful")
            navigate("/")
        }else{
            setErr(resp.data.error.message)
        }
        console.log("Response",resp)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value );
      }
    return (
        <div className="signup-page">
            <div className="signup-card">
                <form onSubmit={handleSubmit}>
                    
                <h1 className="singup-title">Welcome Back</h1>
                <input
                    onChange={(evt)=>setEmail(evt.target.value)}
                    type="email"
                    placeholder="Enter email"
                    className="signup-input"
                    required/>
                
                <input
                    onChange={handlePasswordChange}
                    type="password"
                    placeholder="Enter Password"
                    className="signup-input"
                    required/>

                {err && <h5 style={{color:"red"}}>{err}</h5>}

                <button  className="signup-button">signup</button>
                </form>
            </div>


        </div>
    );
}

export default SignUp
        
        
    