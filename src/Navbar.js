import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./auth";
import { useJwt } from "react-jwt";
function Navbar() {
  const auth = useAuth();
  const { decodedToken, isExpired } = useJwt(auth.user);
  console.log(decodedToken, "dec");
  const user_id = decodedToken?.user_id;
  const postId = 32;
  const navigate = useNavigate;
  const logouts = () => {
    auth.logout();
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <nav className="navigation max-width-1 m-auto">
        <div className="nav-left">
          <a href="/">
            <span>
              <img src="../assets/img/logo.png" width="94px" alt="" />
            </span>
          </a>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <NavLink to={`/blogs`}>Blogs</NavLink>
            </li>
            {!auth.user && <li><NavLink to="/Login">Login</NavLink> </li>}
            {!auth.user && <li><NavLink to="/Register">Register</NavLink></li>}
            <li>
              <NavLink to={`/profile/${user_id}`}>My Profile</NavLink>
            </li>
            <li>
              <NavLink to={`/createpost`}>Create Blog</NavLink>
            </li>
            <li>
              {auth.user && (
                <a href="" onClick={logouts}>
                  Logout
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
