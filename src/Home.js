import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "./Navbar";
import UseBlog from "./UseBlog";
import { useJwt } from "react-jwt";
import { useAuth } from "./auth";
function Home() {
    const auth = useAuth()
    const isAuthenticateUser =  () => {
        const token = localStorage.getItem('token')
        const url = `http://0.0.0.0:3000/check`;
        let obj = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        axios.get(url, obj).then(response => response)
        .then(json => {
            auth.login(token)
            console.log("data ===", json);
        }).catch(error=>console.log(error))
      }
      useEffect(()=>{
        console.log("checking");
        isAuthenticateUser()
        console.log("okk");
      },[])
      const postId = 32
    const [searchValue, setSearchValue] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const { loading, blog, hasMore } = UseBlog(searchValue, pageNumber);
    const observer = useRef();
    const userId = 1
    const lastBlogRef = useCallback(
        (node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((e) => {
            if (e[0].isIntersecting && hasMore) {
            console.log("visible");
            setPageNumber(pageNumber + 1);
            }
        });
        if (node) observer.current.observe(node);
        console.log("last");
        },
        [loading, hasMore]
    );
    function handleChange(e) {
        setSearchValue(e.target.value);
        setPageNumber(1);
    }
  return (
    <>
    <div className="navBar">
       <Navbar />
    </div>
       <div class="max-width-1 m-auto">
        <hr />
        </div>
        <div class="m-auto content max-width-1 my-2">
            <div class="content-left">
                <h1>The heaven for bloggers</h1>
                <p>iBlog is a website which lets you submit an article which upon approval will be up on our website and you
                    can get a good amount of reach from here!</p>
                <p>My Halloween decorations are staying in the box this year. To be honest, they didn’t make it out of the
                    box last year either. My Halloween spirit has officially been bludgeoned to death by teenagers who no
                    longer care and a persistent October fear of the Northern California wildfires. And speaking of fear,
                    isn’t there more than enough of that going around? Maybe all of us can pretend that Halloween isn’t even
                    happening this year?</p>
            </div>
            <div class="content-right">
                <img src="../assets/img/home.svg" alt="iBlog" />
            </div>
        </div>
      <div>
      <div class="max-width-1 m-auto">
        <hr />
    </div>
        



        <div class="home-articles max-width-1 m-auto font2">
        <h2>Featured Articles</h2>

        {blog.length > 0 ? 
        (  <>
            {blog.map((m, i) => {
                if (blog.length === i + 1) {
                  return (
                    <div ref={lastBlogRef} className="home-article">
                        <div className="home-article-img">
                            <img src="../assets/img/3.png" alt="article" />
                        </div>
                        <div className="home-article-content font1">
                            <a href="/blogpost.html">
                                <h3>{m.title}</h3>
                            </a>

                            <div>Author Name</div>
                            <span>07 January | 6 min read</span>
                        </div>
                    </div>
                  );
                } else {
                  return (
                    <div  className="home-article">
                    <div className="home-article-img">
                        <img src="../assets/img/3.png" alt="article" />
                    </div>
                    <div className="home-article-content font1">
                        <a href="/blogpost.html">
                            <h3>{m.title}</h3>
                        </a>
                        <div>Author Name</div>
                        <span>07 January | 6 min read</span>
                    </div>
                </div>
              
                  );
                }
              })}
            </>

        ) : "No Blogs found"}

        
    </div>
      </div>
    </>
    
  )
}

export default Home