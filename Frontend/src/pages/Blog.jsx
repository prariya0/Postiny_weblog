import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import Gobackbtn from "../components/gobackbtn";
import { Link } from "react-router-dom";
import { blogList, likeArray } from "../dummyData";
import EmptyBlog from '../components/EmptyBlog';
import Comments from "../components/Comment/Comments"

import "../css/pages_css/blog.css";

const Blog = () => {
  const {id} = useParams();
  const [blog, setBlog] = useState(null);
  const [like, setLike] = useState(likeArray[0].like);
  const [likeActive, setLikeActive] = useState(false);
  const startTime = new Date();
  const twoMinutes = 60000;
  const [read, setRead] = useState(false);

  let ismyprofile = false;

  function likeMethod() {
    var canLike = checkTime();
    if (canLike) {
      if(likeActive) {
        setLike(like-1);
        setLikeActive(false);
      } else {
        setLike(like+1);
        setLikeActive(true);
      }
    }
    else {
      alert("you must read the article before liking it")
    }
  }

  function addtodb(){
    console.log("add laew mae")
  }
 
  function checkTime() {
   var timePassed = new Date() - startTime > twoMinutes;
     if (timePassed && !read){
       setRead(true);
       addtodb();
       return true;
     }
     else if (read || ismyprofile){
       return true;
     }
     else {
       return false;
     }
  }

  // useEffect(() => {
  //   let blog = blogList.find(blog => blog.id === parseInt(id));
  //   if (blog) {
  //     setBlog(blog);
  //   }
  // });

  return (
    <div className="blog" style={{marginLeft: "60px"}}>
      <div className="fix-goback">
        <Link to= '/home' >
          <Gobackbtn />
        </Link>
      </div>
      
      <br />
      {blog ? 
      <><div className="blog-wrap">
          <img src={blog.cover} alt="cover img" />
          <h4 className="blog-category">{blog.category}</h4>
          <h1>{blog.title}</h1>
          <p className="blog-author">Written by {blog.authorName}</p>
          <p className="blog-date">Published on {blog.createdAt}</p>
          <p className="blog-desc">{blog.description}</p>
        </div><div className="interect">
            <button
              onClick={likeMethod}
              className={[likeActive ? "active-like" : "inactive-like"].join(' ')}
            >
              ❤︎ {like} Like
            </button>
            <Comments
              commentsUrl="http://localhost:3000/comments"
              currentUserId="1" />
          </div></>
      : 
      <EmptyBlog />
      }
    </div>
  )
}

export default Blog;