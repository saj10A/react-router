import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import Comments from "../modals/Comments";
import { deletePostService, getPostService } from "../services/PostService";
import style from '../style.module.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [mainPosts , setMainPosts] = useState([]);
  const [message , setMessage] = useState("لطفا صبر کنید...");
  const [showComments , setShowComments] = useState(false);
  const [postId , setPostId] = useState();
  const [uId , setUId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getPostService(setPosts , setMainPosts);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [uId]);

  useTitle("پست ها");
  
  const handleDelete = (postId) => {
    deletePostService(postId , posts , setPosts);
  }

  const handleSearch = () => {
    if(uId) {
      let newPosts = mainPosts.filter(p => p.userId === Number(uId))
      setPosts(newPosts);
      if(!newPosts.length) {
        setMessage("موردی یافت نشد")
      }
    }
    else {
      setPosts(mainPosts);
    }
  }
  const handleShowComments = (postId) => {
    setShowComments(true);
    setPostId(postId);
  }
  return (
    <div className="container-fluid mt-5 p-4">
      <h4 className="text-center" style={{color: "#6c757d"}}>مدیریت پست ها</h4>
      <div className="row mt-4 justify-content-between ">
        <div className="form-group col-7 col-lg-4">
          <input className="form-control" type="number" placeholder=" جستجو با آیدی کاربر" 
          onChange={(e) => setUId(e.target.value)}/>
        </div>
        <div className="col-5 col-sm-3 text-start">
          <Link to="/post/add">
            <button className="btn" style={{ background: "var(--bs-gray)", color: "white" }}>افزودن پست</button>
          </Link>
        </div>
      </div>
      {posts.length ? (
        <div className={`table-responsive mt-5`} >
          <table className={`table text-center rounded align-middle ${style.posts_table}`} style={{ background: "var(--bs-white)" }}>
            <thead>
              <tr className="align-middle">
                <th>#</th>
                <th>آیدی کاربر</th>
                <th>عنوان پست</th>
                <th>متن پست</th>
                <th >عملیات</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.userId}</td>
                  <td >{p.title}</td>
                  <td>{p.body}</td>
                  <td>
                    <i className="fas fa-edit text-warning ms-2 pointer" onClick={() =>
                      navigate(`/post/add/${p.id}`)}></i>
                    <i className="fas fa-trash text-danger pointer" onClick={() =>
                      handleDelete(p.id)}></i>
                    <i className="fas fa-comments pointer text-secondary mt-2" 
                     onClick={() => handleShowComments(p.id)}></i>  
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 className="text-center mt-5" style={{color: "red"}}>{message}</h4>
      )}
      {showComments ? <Comments postId={postId} setShowComments={setShowComments}/> : null}
    </div>
  )
}

export default Posts;