import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JpAxios } from "../JpAxios";
import { Alert } from "../utils/Alerts";
import { init, reducer } from "./PostReducer";



const AddPost = () => {
    const navigate = useNavigate();
    const { postId } = useParams();

    const [data , dispatch] = useReducer(reducer , init);

    useEffect(() => {
        JpAxios.get("/users").then(res => 
            dispatch({
                type: "changeUser", 
                payload: res.data
            })
        ).catch(err => 
        console.log(err));
        
        if (postId) {
            JpAxios.get(`/posts/${postId}`).then(res =>
                dispatch({
                    type: "isUpdate",
                    payload: res.data
                }))
        }

    }, [])

    const setInputValues =(e , propName) => {
        dispatch({
            type: "setInputValue",
            propName: propName,
            propValue: e.target.value
        })
    }

    const handleAddPost = (e) => {
        e.preventDefault();
        if (postId) {
            JpAxios.put(`/posts/${postId}`, data.postData).then(res => {
                if (res.status === 200) {
                    Alert("اطلاعات با موفقیت ویرایش شد", "success");
                }
            }
            )
        }
        else {
            JpAxios.post('/posts', data.postData).then(res => {
                if (res.status === 201) {
                    Alert("پست با موفقیت اضافه شد", "success")
                }
            })
        }

    }

    return (
        <div className={`container mt-5`}>
            <h4 className="text-center ">{postId ? "ویرایش پست" : "افزودن پست"}</h4>
            <div className="row justify-content-center mt-5">
                <form onSubmit={handleAddPost} className="bg-light p-4 rounded col-md-6">
                    <div className="form-group mt-3">
                        <select className="form-select" value={data.postData.userId} 
                         onChange={(e) => setInputValues(e , "userId")}>
                            <option>کاربر مورد نظر را انتخاب کنید</option>
                            {
                                data.users.map(u => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="form-group mt-3">
                      <label className="form-label">آیدی کاربر</label>
                      <input type="number" className="form-control" value={data.postData.userId} onChange={(e) =>
                        setInputValues(e , "userId")} />
                    </div>
                    <div className="form-group mt-3">
                        <label className="form-label">عنوان</label>
                        <input type="text" className="form-control" value={data.postData.title} onChange={(e) =>
                            setInputValues(e , "title")} />
                    </div>
                    <div className="form-group my-3">
                        <label className="form-label">متن اصلی</label>
                        <textarea className="form-control" rows="4" value={data.postData.body} 
                        onChange={(e) => setInputValues(e , "body")}></textarea>
                    </div>
                    <div className="text-start">
                        <button type="submit" className="btn btn-primary ms-3">ثبت</button>
                        <button type="button" className="btn btn-danger" onClick={() => navigate(-1)}>برگشت</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default AddPost;