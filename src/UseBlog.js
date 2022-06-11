import {useEffect, useState} from 'react'
import axios from 'axios'
export default function UseBlog(searchValue, pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [blog, setBlog] = useState([])
    const [hasMore, setHasMore] = useState(false)
    useEffect (()=> {
        setLoading(true)
        setError(false)
        let cancel;
        axios({
            method:'GET',
            url : `http://127.0.0.1:3000/post`,
            params: {search:searchValue, page: pageNumber},
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*'
            },
            cancelToken: new axios.CancelToken(c=>cancel=c)
        }).then((res)=>{
            // console.log(res.data, "dataallllaa");
            if (res.data ) {
                let pre = blog;
                // let d = res.data;
                // console.log(res.data, "res dattttttt");
                // res.data = res.data.map((val)=> val.image = JSON.parse(val.image))
            for (let  i = 0; i < res.data.length; i++) {
                // if (d[i].image.length >100)
                // d[i].image = JSON.parse(d[i].image);
                console.log(res.data[i], typeof(res.data[i].image), res.data[i].image.length);
                if (res.data[i].image.length > 100)
                res.data[i].image = JSON.parse(res.data[i].image)
                // console.log(d[i], "d[i]");
                // if (res.data[])
                pre.push(res.data[i])

            }
            if (pageNumber == 1)
            setBlog(res.data)
            else 
            setBlog(pre)
            // console.log(movie ,"movie");
            setHasMore(res.data.length > 0)
            setLoading(false)
        }}).catch(e=>{
            if(axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    },[searchValue, pageNumber])
  return {loading, error, blog, hasMore}
}
