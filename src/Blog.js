import { Route, Link, Routes, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "./auth";
import { useJwt } from "react-jwt";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Blog = () => {
  const params = useParams();
  const blog = params.id;
  const [blogData, setBlogData] = useState(null);
  const auth = useAuth();
  const { decodedToken, isExpired } = useJwt(auth.user);
  console.log(decodedToken, "dec");
  const user_id = decodedToken?.user_id;
  //   const [liked, setLiked] = useState(false);
  const getBlogRequest = async (resp) => {
    console.log(blog);
    const url = `http://0.0.0.0:3000/post/${blog}`;
    const response = await fetch(url);
    const responseJSON = await response.json();
    console.log(responseJSON[0], "dataaaaaa");
    if (responseJSON) {
        // console.log(typeof(responseJSON[0].image, responseJSON[0].image));
        if (responseJSON[0].image && responseJSON[0].image.length > 100) {
            responseJSON[0].image = JSON.parse(responseJSON[0].image)
            setBlogData(responseJSON[0]);

        }
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
    console.log(blog);
    const timer = setTimeout(() => {
      console.log("This will run after 1 second!");
      getBlogRequest(blog);
      console.log(blogData, "dddd");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
    <Navbar />
    {blogData ? <>
        <div class="max-width-1 m-auto">
        <hr />
    </div>
    <div class="post-img">
        {blogData && <img src={blogData.image.base64} alt="" style={{marginLeft:"50%",marginTop:"100px", transform:"translateX(-50%)"}}/>}
        
    </div>
    <div class="m-auto blog-post-content max-width-2 m-auto my-2">
        <h1 class="font1">{blogData.title}</h1>
        <div class="blogpost-meta">
            <div class="author-info">
                <div>
                <b>
                  Author - {blogData.user_name.first_name} (CEO Microtek)
                </b>
                <br />
                </div>
                <br />

                <div>04 January. 6 min read</div>
                <br />

            </div>
            <div class="social">
                
            </div>
        </div>
            <p>{blogData.content}</p>
    </div>
    <div class="max-width-1 m-auto"><hr /></div>
    </>: ""}
    

      <Footer />
    </>
  );
};

export default Blog;
