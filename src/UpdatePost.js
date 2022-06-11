import { Route, Link, Routes, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from './auth';
import { useJwt } from "react-jwt";
function UpdatePost() {
    const params = useParams();
    const postId = params.id;
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [post, setPost] = useState(null);
    const auth =  useAuth()
    const { decodedToken, isExpired } = useJwt(auth.user);
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
          })
          .catch((e) => {
            console.log("erro", e);
          });
      };
  return (
    <>
            Update Post
    <form onSubmit={submit}>
    title
    <input type="text"  value={title} onChange={(e)=>setTitle(e.target.value)}/>
    contentet
    <textarea name="" id="" cols="30" rows="5" value={content} onChange={(e)=>setContent(e.target.value)}>

    </textarea>
    image
    <input type="text" value={image} onChange={(e)=>setImage(e.target.value)}/>

    <button type='submit'>submit</button>
    </form>
    </>
  )
}

export default UpdatePost