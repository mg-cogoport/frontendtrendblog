// import { useRouter } from "next/router";
import { Route, Link, Routes, useParams } from "react-router-dom";
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
  const [userData, setUserData] = useState(null);
  const [userId, setId] = useState();
  const auth =  useAuth()
  const { decodedToken, isExpired } = useJwt(localStorage.getItem("token"));
  console.log(decodedToken, "dec");
//   const user_id = decodedToken?.user_id
//   const [liked, setLiked] = useState(false);
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
//   const addMovie = (id) => {
//       axios({
//         method:'PUT',
//         url : `http://0.0.0.0:8000/movies/${id}`,
//         params: {isliked:!liked},
//         headers:{
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin' : '*'
//         }
        
//     }).then((data)=>{
//       console.log(data, "liked");

//     }).catch(err=>console.log(err))
//     getMovieRequest(id);
//     setLiked(!liked)
//   };
  useEffect(() => {
    //   console.log;
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
      getBlogRequest();
      console.log(userData, "dddd");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
    <Navbar />
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
      <div style={{position:"fixed", bottom:"0px", width:"100%"}}>
      <Footer />
      </div>
    </>
  );
};

export default User;
