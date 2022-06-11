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
    console.log(responseJSON);
    if (responseJSON) {
        console.log(typeof(responseJSON[0].image, responseJSON[0].image));
        if (responseJSON[0].image.length > 100)
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
    <Navbar />

    <div class="max-width-1 m-auto">
        <hr />
    </div>
    <div class="post-img">
        <img src="../assets/img/11.svg" alt="" />
    </div>
    <div class="m-auto blog-post-content max-width-2 m-auto my-2">
        <h1 class="font1">The heaven for bloggers</h1>
        <div class="blogpost-meta">
            <div class="author-info">
                <div>
                <b>
                  Author - Bill Gates (CEO Microtek)
                </b>
                </div>
                <div>04 January. 6 min read</div>
            </div>
            <div class="social">
                
            </div>
        </div>
         <p class="font1">In communications and information processing, code is a system of rules to convert information—such as a letter, word, sound, image, or gesture—into another form, sometimes shortened or secret, for communication through a communication channel or storage in a storage medium. An early example is the invention of language, which enabled a person, through speech, to communicate what they thought, saw, heard or felt to others. But speech limits the range of communication to the distance a voice can carry, and limits the audience to those present when the speech is uttered . The invention of writing, which converted spoken language into visual symbols, extended the range of communication across space and time.

            The process of encoding converts information from a source into symbols for communication or storage. Decoding is the reverse process, converting code symbols back into a form that the recipient understands, such as English or/and Spanish.
            
            One reason for coding is to enable communication in places where ordinary plain language, spoken or written, is difficult or impossible. For example, semaphore, where the configuration of flags held by a signaler or the arms of a semaphore tower encodes parts of the message, typically individual letters and numbers. Another person standing a great distance away can interpret the flags and reproduce the words sent.</p>
         <p class="font1">In communications and information processing, code is a system of rules to convert information—such as a letter, word, sound, image, or gesture—into another form, sometimes shortened or secret, for communication through a communication channel or storage in a storage medium. An early example is the invention of language, which enabled a person, through speech, to communicate what they thought, saw, heard or felt to others. But speech limits the range of communication to the distance a voice can carry, and limits the audience to those present when the speech is uttered . The invention of writing, which converted spoken language into visual symbols, extended the range of communication across space and time.

            The process of encoding converts information from a source into symbols for communication or storage. Decoding is the reverse process, converting code symbols back into a form that the recipient understands, such as English or/and Spanish.
            
            One reason for coding is to enable communication in places where ordinary plain language, spoken or written, is difficult or impossible. For example, semaphore, where the configuration of flags held by a signaler or the arms of a semaphore tower encodes parts of the message, typically individual letters and numbers. Another person standing a great distance away can interpret the flags and reproduce the words sent.</p>
         <p class="font1">In communications and information processing, code is a system of rules to convert information—such as a letter, word, sound, image, or gesture—into another form, sometimes shortened or secret, for communication through a communication channel or storage in a storage medium. An early example is the invention of language, which enabled a person, through speech, to communicate what they thought, saw, heard or felt to others. But speech limits the range of communication to the distance a voice can carry, and limits the audience to those present when the speech is uttered . The invention of writing, which converted spoken language into visual symbols, extended the range of communication across space and time.

            The process of encoding converts information from a source into symbols for communication or storage. Decoding is the reverse process, converting code symbols back into a form that the recipient understands, such as English or/and Spanish.
            
            One reason for coding is to enable communication in places where ordinary plain language, spoken or written, is difficult or impossible. For example, semaphore, where the configuration of flags held by a signaler or the arms of a semaphore tower encodes parts of the message, typically individual letters and numbers. Another person standing a great distance away can interpret the flags and reproduce the words sent.</p>
         <p class="font1">In communications and information processing, code is a system of rules to convert information—such as a letter, word, sound, image, or gesture—into another form, sometimes shortened or secret, for communication through a communication channel or storage in a storage medium. An early example is the invention of language, which enabled a person, through speech, to communicate what they thought, saw, heard or felt to others. But speech limits the range of communication to the distance a voice can carry, and limits the audience to those present when the speech is uttered . The invention of writing, which converted spoken language into visual symbols, extended the range of communication across space and time.

            The process of encoding converts information from a source into symbols for communication or storage. Decoding is the reverse process, converting code symbols back into a form that the recipient understands, such as English or/and Spanish.
            
            One reason for coding is to enable communication in places where ordinary plain language, spoken or written, is difficult or impossible. For example, semaphore, where the configuration of flags held by a signaler or the arms of a semaphore tower encodes parts of the message, typically individual letters and numbers. Another person standing a great distance away can interpret the flags and reproduce the words sent.</p>
    </div>

    <div class="max-width-1 m-auto"><hr /></div>
      {blogData ? (
        <div className="movie_card" id="bright">
          <div className="info_section">
            <div className="movie_header">
                {blogData.image && <img className="locandina" src={blogData.image.base64} />}
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
      <Footer />
    </>
  );
};

export default Blog;
