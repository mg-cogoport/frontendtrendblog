import { data } from "autoprefixer";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "./auth";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth()
  const navigate = useNavigate()
  const submit = (event) => {
    event.preventDefault();
    const url = "http://127.0.0.1:3000/auth/login";
    data = {
      email : email,
      password: password
    }
    axios.post(url, data)
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        auth.login(res.data.token)
        navigate("/", {replace : true})
        console.log(res, "res");
      })
      .catch((e) => {
        console.log("erro", e);
      });
  };
  return (
    <>
    <Navbar />
    <div class="max-width-1 m-auto" style={{marginTop: "40px"}}>
        <hr />
    </div>
    <form onSubmit={submit} style={{marginTop: "40px"}}>
    <div class="contact-content font1 max-width-1 m-auto">
        <div class="max-width-1 m-auto mx-1">
            <h2>Login Form</h2>
            <div class="contact-form">
                <div class="form-box">
                    <input type="text" 
                    placeholder="Enter Your Email.." value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div class="form-box">
                    <input type="password" placeholder="Enter Your Password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div class="form-box">
                    <button class="btn" type="submit" style={{marginTop: "30px"}}>Submit</button>
                </div>

            </div>
        </div>

    </div>
    </form>
    <div style={{position:"fixed", bottom:"0px", width:"100%"}}>
        <Footer />
    </div>
    </>
  );
}

export default Login;
