import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "./Navbar";
import UseBlog from "./UseBlog";
import { useJwt } from "react-jwt";
import { useAuth } from "./auth";
function Blogs() {
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
       <nav className="marginTop">
       <div className="nav-right">
                <form action="/search.html" method="get">
                    <input className="form-input" type="text" name="query" onChange={handleChange}
              value={searchValue} placeholder="Article Search" />
                    <button className="btn">Search</button>
                </form>
            </div>
       </nav>
    </div>
       
        <div class="m-auto content max-width-1 my-2">
           



        <div class="home-articles max-width-1 m-auto font2">
        <h2>Featured Articles</h2>

        {blog.length > 0 ? 
        (  <>
            {blog.map((m, i) => {
                if (blog.length === i + 1) {
                  return (
                    <div ref={lastBlogRef} className="home-article">
                        <div className="home-article-img">
                            <img src={m.image.base64} alt="article" />
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
                        <img src={m.image.base64} alt="article" />
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

export default Blogs