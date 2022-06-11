import './App.css';
import Home from './Home';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from './Blog';
import User from './Profile';
import Login from './Login';
import Register from './Register';
import CreatePost from './CreatePost';
import UpdatePost from './UpdatePost';
import { AuthProvider } from './auth';
import RequireAuth from './RequireAuth';
import Blogs from './Blogs';
function App() {
  
  useEffect(() => {
    // console.log("okkkkk");
    // isAuthenticateUser()
  }, []);
  
  return (
    <>
  <BrowserRouter>
    <AuthProvider>
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path=":id" element={<Blog />}></Route>
              <Route path="/createpost" element={<RequireAuth> <CreatePost /></RequireAuth> }></Route>
              <Route path="/profile/:id" element={<RequireAuth> <User /></RequireAuth>}></Route>
              <Route path="/updatepost/:id" element={<UpdatePost />}></Route>
              <Route path="/blogs" element={<Blogs />}></Route>
              <Route path="/blog/:id" element={<Blog />}></Route>
              </Routes>
    </AuthProvider>
  </BrowserRouter>
    </>
  );
}

export default App;
