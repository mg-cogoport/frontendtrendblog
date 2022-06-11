// import { useRouter } from "next/router";
import { Route, Link, Routes, useParams, useNavigate } from "react-router-dom";
import axios from 'axios'
import React, { useEffect, useState } from "react";
import { useAuth } from './auth';
import { useJwt } from "react-jwt";
import Navbar from "./Navbar";
import Footer from "./Footer";
const User = () => {
//   const router = useRouter();
//   const  user  = router.query.profile;
    const params = useParams();
  const user = params.id;
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null);
  const [userId, setId] = useState();
  const [post, setPost] = useState([])
  const auth =  useAuth()
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("token"));
  console.log(decodedToken, "dec");
            const getBlogRequest = async () => {
            console.log(user);
            const url = `http://0.0.0.0:3000/user/${user}`;
            const response = await fetch(url, {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${auth.user}`
                }
            }).catch((error)=> {
                console.log("error", error)
                // throw error
            })
            const responseJSON = await response.json();
            console.log(responseJSON.error);
            // if (responseJSON)
            if (responseJSON) {
                responseJSON.image = JSON.parse(responseJSON.image)
                console.log("okkkkkk", responseJSON);
                setUserData(responseJSON);
            }
  };
  const getPost = async () => {
    console.log(user, "checkkkkkkkkkkkkk");
    const url = `http://0.0.0.0:3000/userpost/${user}`;
    const response = await fetch(url, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${auth.user}`
        }
    }).catch((error)=> {
        console.log("error", error)
        // throw error
    })
    const responseJSON = await response.json();
    console.log(responseJSON.error);
    // if (responseJSON)
    if (responseJSON) {
        for (let i = 0; i < responseJSON.length; i++) {
            if (responseJSON[i].image) {
                responseJSON[i].image = JSON.parse(responseJSON[i].image)
            }
        }
        setPost(responseJSON);
    }
};

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   console.log("This will run after 1 second!");
    getPost();
      getBlogRequest();
    //   console.log(userData, "dddd");
    // }, 1000);
    // return () => clearTimeout(timer);
  }, []);
  const edit = (id) => {
    navigate(`/updatepost/${id}`)
  }
  return (
    <>
    <Navbar />
    <div style={{marginTop:"50px", marginBottom: "500px"}}>
    {userData ? (
        <div class="card">
            {userData.image && <img src={userData.image.base64} alt="John" style={{width:"100%"}} />}
            
            <h1>{userData.first_name}</h1>
            <p class="title">CEO & Founder, Example</p>
            <p>{userData.email}</p>
            <div style={{margin: "24px 0;"}}>
            <a href="#"><i class="fa fa-dribbble"></i></a> 
            <a href="#"><i class="fa fa-twitter"></i></a>  
            <a href="#"><i class="fa fa-linkedin"></i></a>  
            <a href="#"><i class="fa fa-facebook"></i></a> 
            </div>
            <p><button>Contact</button></p>
        </div>)
           : (
        "Loading..."
      )}
      </div>
    <h1 style={{marginLeft:"40px"}}>My Post</h1>
    {
        post.length > 0 && (
            post.map((m, i) => {
                if (post.length === i + 1) {
                  return (
                    <div className="home-article">
                        <div className="home-article-img">
                            {m.image && <img src={m.image.base64} alt="article" />}
                            
                        </div>
                        <div className="home-article-content font1">
                            <a href="/blogpost.html">
                                <h3>{m.title}</h3>
                            </a>

                            <div>{m.user_name.first_name}</div>
                            <span>07 January | 6 min read</span>
                            <p className="editClass" onClick={()=>{edit(m.id)}}>Edit</p>
                        </div>
                    </div>
                  );
                } else {
                  return (
                    <div  className="home-article">
                    <div className="home-article-img">
                    {m.image && <img src={m.image.base64} alt="article" />}
                    </div>
                    <div className="home-article-content font1">
                        <a href="/blogpost.html">
                            <h3>{m.title}</h3>
                        </a>
                        <div>{m.user_name.first_name}</div>
                        <span>07 January | 6 min read</span>
                        <p className="editClass" onClick={()=>{edit(m.id)}}>Edit</p>
                    </div>
                </div>
              
                  );
                }
              }
        )
        )
    }
      
      <div style={{position:"fixed", bottom:"0px", width:"100%"}}>
      <Footer />
      </div>
    </>
  );
};

export default User;
