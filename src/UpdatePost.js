import { Route, Link, Routes, useParams, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from './auth';
import { useJwt } from "react-jwt";
import Footer from "./Footer";
import Navbar from "./Navbar";
import FileBase from 'react-file-base64'
function UpdatePost() {
    const params = useParams();
    const postId = params.id;
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [post, setPost] = useState(null);
    const auth =  useAuth()
    const { decodedToken, isExpired } = useJwt(auth.user);
    const navigate = useNavigate()
    console.log(decodedToken, "dec");
    const user_id = decodedToken?.user_id
    const getPost = async () => {
        const url = `http://0.0.0.0:3000/post/${postId}`;
        const response = await fetch(url);
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (responseJSON) {
            console.log(responseJSON[0], "datass");
            setImage(responseJSON[0].image)
            setTitle(responseJSON[0].title)
            setContent(responseJSON[0].content)
            setPost(responseJSON[0]);
        }
    }
    useEffect(()=>{
        getPost()
    }, [])
    const submit = (event) => {
        event.preventDefault();
        const url = `http://127.0.0.1:3000/post/${postId}`;
        const d = new Date();
        const data = {
          title : title,
          image: image,
          content: content,
          publish_date: d,
        }
        axios.put(url, data)
          .then((res) => {
            console.log(res, "res");
            navigate("/")
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
                <h2>Update Blog</h2>
                <div class="contact-form">
                    <div class="form-box">
                        <input type="text" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    </div>
                    <div class="form-box">
                        <FileBase 
                            type="file"
                            multiple={false}
                            onDone = {(base64)=>setImage(base64)}
                        />
                        {/* <input type="file" placeholder="Enter Image" value={image} onChange={(e)=>setImage(e.target.value)} /> */}
                    </div>
                
                    <div class="form-box">
                        <textarea name="" id="" cols="30" rows="10" placeholder="Enter Contenent" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                    </div>
                    
                    
                    <div class="form-box" style={{marginTop:"50px", marginBottom:"40px"}}>
                        <button class="btn" type='submit'>Submit</button>
                    </div>
    
                </div>
            </div>
    
        </div>
     
        </form>
        <Footer />
       
        </>
    
      )
  
}

export default UpdatePost