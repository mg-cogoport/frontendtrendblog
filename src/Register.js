import { data } from "autoprefixer";
import React from "react";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import FileBase from 'react-file-base64'
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [intro, setIntro] = useState("");
  const [image, setImage] = useState("");
  const navigate  = useNavigate()
  const submit = (event) => {
    event.preventDefault();
    const url = "http://127.0.0.1:3000/createuser";
    data = {
      email : email,
      password: password,
      mobile : mobile,
      first_name : firstName,
      last_name : lastName,
      intro: intro,
      image : image

    }
    axios.post(url, data)
      .then((res) => {
        console.log(res, "res");
        navigate("/login")
      })
      .catch((e) => {
        console.log("erro", e);
      });
  };
  return (
    <>
     <Navbar />
    <div class="max-width-1 m-auto">
        <hr />
    </div>
    <form onSubmit={submit}>
    <div class="contact-content font1 max-width-1 m-auto">
        <div class="max-width-1 m-auto mx-1">
            <h2>Feel Free to Contact Us</h2>
            <div class="contact-form">
                <div class="form-box">
                    <input type="text" placeholder="Enter Your First Name" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
                </div>
                <div class="form-box">
                    <input type="text" placeholder="Enter Your Last Name" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}/>
                </div>
                <div class="form-box">
                    <input type="text" placeholder="Enter Your Email Id" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="form-box">
                    <input type="password" placeholder="Enter Your Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div class="form-box">
                    <input type="text" placeholder="Enter Your Mobile"
                     value={mobile}
                     onChange={(e) => setMobile(e.target.value)} />
                </div>
                <div class="form-box">
                    <input type="text" placeholder="Enter Your Intro" 
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}/>
                </div>
                <div class="form-box">
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone = {(base64)=>setImage(base64)}
                    />
                    {/* <input type="text" placeholder="Enter Your Image" /> */}
                </div>
                <div class="form-box">
                    <button class="btn" type="submit">Submit</button>
                </div>

            </div>
        </div>
    </div>
 </form>
 <div >
        <Footer/>
    </div>
    </>
  );
}

export default Register;
