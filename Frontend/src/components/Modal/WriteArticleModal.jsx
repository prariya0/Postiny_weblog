import React, { useEffect, useState } from "react";
import "./writeArticleModal.css";
import DropPicture from '@material-ui/icons/WallpaperRounded';
import Switch from '@mui/material/Switch';
import Axios from 'axios';

function WriteArticleModal({ setOpenModal, setBlur}) {
  const [select, setSelect] = useState([]);
  const [img, setImg] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [lock, setLock] = useState(0);
  const user_id = localStorage.getItem("user_id");

  //get category list
  useEffect( () => {
    Axios.get('http://localhost:8080/getcategory').then((response) => {
      setSelect(response.data);
    });
  }, []);

  const addArticle = async () => {
    Axios.post('http://localhost:8080/writearticle', {
      user_id: user_id,
      category: category,
      title: title,
      content: content,
      article_pic: "https://picsum.photos/1920/1080",
      sub_required: lock
    })
  }

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
			        setBlur(false);
            }}
          >
			    ✕
          </button>
        </div>

        <div className="title">
          <h1>Write new article</h1>
        </div>

        <div className="body">
          <div className="upload">
            <label className="img-frame">
              <DropPicture className="drop-picture" style={{ fontSize: "70px" }} />
			        <p>Drop your image here</p>
              <input className="input-file" type="file" name="slip" accept="image/png, image/jpeg"></input>
            </label>
            <span>
              <div className="detail">
                <p>Category <span style={{color: "red"}}>*</span>
                <span>
                  <select 
                      required
                      value={category}
                      onChange={(event) => {
                        setCategory(event.target.value);
                    }}
                  >
                  <option value="" disabled selected hidden>Category</option>
                  {select.map( item => (
                      <option key={item.category_id} value={item.category_id}>{item.category_name}</option>
                  ))}
                  </select>
                </span>
                </p>
                <p>Title <span style={{color: "red"}}>*</span></p>
                <input 
                  required
                  className="title" 
                  type="text" 
                  placeholder="Once upon a time..." 
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
                <p>Description <span style={{color: "red"}}>*</span></p>
                <textarea  
                  required
                  className="des" 
                  placeholder="The start of  a wonderful story..." 
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                />
              </div>
            </span>
          </div>
        </div>

        <div className="footer">
          <label>{lock? "Only subscribers" : "Public"}</label>
          <Switch checked={lock} onChange={ () => {lock? setLock(0) : setLock(1)}} />
          <button onClick={() => {
              setOpenModal(false);
              setBlur(false);
			        addArticle();
          }}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default WriteArticleModal;