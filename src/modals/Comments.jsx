import React, { useEffect, useState } from "react";
import { JpAxios } from "../JpAxios";
import style from "../style.module.css";

const Comments = (props) => {

    const [comments, setComments] = useState([]);
    const { postId , setShowComments } = props;
    const [message, setMessage] = useState("در حال دریافت...");

    useEffect(() => {
        JpAxios.get(`/comments?postId=${postId}`).then(res =>
            setComments(res.data)
        ).catch(err =>
            setMessage(err.message)
        )
    }, []);
    return (
        <div className={`${style.comments_box}`}>
          <i className="fas fa-times p-2 pointer sticky-top" onClick={() => setShowComments(false)}></i>
          {
            comments.length ? (
              <div className="table-responsive">
                <table className="table text-center align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>نام</th>
                      <th>ایمیل</th>
                      <th>متن کامنت</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      comments.map(c => (
                       <tr key={c.id}>
                         <td>{c.id}</td>
                         <td>{c.name}</td>
                         <td>{c.email}</td>
                         <td>{c.body}</td>
                       </tr>
                      ))
                    }
                  </tbody>
                 </table>
               </div>
              ) : (
                    <h5 className="text-center text-danger mt-5">{message}</h5>
              ) 
            }
        </div>
    )
}

export default Comments;