import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { MultiSelect } from "react-multi-select-component";
import { useAuth } from './auth';
import { useJwt } from "react-jwt";
import Navbar from './Navbar';
import Footer from './Footer';
import FileBase from 'react-file-base64'
function CreatePost() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)
    const [selected, setSelected] = useState([]);
    const [options, setOption] = useState([]);
    const auth =  useAuth()
    const { decodedToken, isExpired } = useJwt(auth.user);
    console.log(decodedToken, "dec");
    const user_id = decodedToken?.user_id
    const [tags, setTag] = useState([])
    const getAllTags = async () => {
        const url = "http://127.0.0.1:3000/tags"
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json', // notice the Bearer before your token
            }
        })
          const responseJSON = await response.json();
          console.log(responseJSON);
          if (responseJSON) {
            setTag(responseJSON)
            let arr = []
            for (let i = 0; i < responseJSON.length; i++) {
                console.log(responseJSON[i]);
                let obj = {
                    label: responseJSON[i].title,
                    value: responseJSON[i].title
                }
                arr.push(obj)
            }
            setOption(arr)
          }
    }
    
    useEffect(() => {
        getAllTags()
    }, []);
    const submit = (event) => {
        event.preventDefault();
        const url = "http://127.0.0.1:3000/createpost";
        const d = new Date();
        console.log(selected);
        let t = []
        for (let i = 0; i < selected.length; i++) {
            console.log(selected[i].value);
            t.push(selected[i].value)
        }
        const data = {
          title : title,
          image: image,
          content: content,
          publish_date: d,
          user_id: user_id,
          tags: t
        }
        axios.post(url, data)
          .then((res) => {
              setContent("")
              setTitle("")
              setImage("")
            console.log(res, "res");
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
            <h2>Feel Free to Contact Us</h2>
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
                {image && <img src={image.base64} alt="okk"></img>}
                
                <div class="form-box">
                    <textarea name="" id="" cols="30" rows="10" placeholder="Enter Contenent" value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
                </div>
                <MultiSelect 
                    options={options}
                    value={selected}
                    onChange={setSelected}
                    labelledBy="Select"
                />
                
                <div class="form-box">
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

export default CreatePost