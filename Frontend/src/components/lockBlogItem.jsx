import React from 'react'
import { Link } from 'react-router-dom';
import '../css/myblogitem.css';
import LockIcon from '@mui/icons-material/Lock';

const lockBlog = ({blog,author_id}) => {

    const needSub = () => {
        alert("You need to subscribe before red this blog");
    }

    return(
        <div className="myBlogItem">
        <div className="lockIcon" >
         <LockIcon style={{fontSize: '58px', color: '#000000'}}/>
       </div>
     <div class="lockArticle">
       <div className='myblogItem-wrap'>
         <img className="myblogItem-cover" src={blog.article_pic} alt="myatccoverImage" />
         <h5 className="myblogItem-category">{blog.category_name}</h5>
        <h3>{blog.title}</h3>
        <p className="myblogItem-desc">{blog.content}</p>

         <footer>
           <div className="myblogItem-info">
             <p>{blog.created_at.substring(0,10)}</p>
           </div>
          <Link onClick={needSub} className="myblogItem-link" to={`/profile/${author_id}`}>
              Read more ➜
          </Link>
        </footer>
      </div>
     </div>
   </div>
    )
}

export default lockBlog;