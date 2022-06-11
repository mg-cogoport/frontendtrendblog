import { Route, Link, Routes, useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "./auth";
import { useJwt } from "react-jwt";
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
    console.log(responseJSON);
    if (responseJSON) {
        console.log(typeof(responseJSON[0].image));
        responseJSON[0].image = JSON.parse(responseJSON[0].image)
      setBlogData(responseJSON[0]);
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
      {blogData ? (
        <div className="movie_card" id="bright">
          <div className="info_section">
            <div className="movie_header">
              <img className="locandina" src={blogData.image.base64} />
              <h1>{blogData.title}</h1>
              <h4>
                {blogData.created_at}, {blogData.intro}
              </h4>
              <span className="minutes">{blogData.updated_at}</span>
              {/* <p className="type">{blogData.Genre}</p> */}
            </div>
            <div className="movie_desc">
              <p className="text">{blogData.intro}</p>
            </div>
            <div className="movie_social">
              {/* <ul onClick={() => {addMovie(blogData.imdbID);}}>
                <li>
                  <i className="material-icons">
                    {" "}
                    {blogData.isliked ? "Unlike" : "Like"} &hearts;
                  </i>
                </li>
              </ul> */}
            </div>
          </div>
          <div
            className="blur_back"
            style={{ backgroundImage: `url(${blogData.image})` }}
          ></div>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default Blog;
