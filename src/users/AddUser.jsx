import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";

import { getUserService, setUserService, updateUserService } from "../services/UserService";


const AddUser = () => {
    const { userId } = useParams();
    const [data, setData] = useState({
        name: "",
        username: "",
        email: ""
    })


    useEffect(() => {
        if (userId) {
           getUserService(userId , setData);
        }
    }, [])


    const handleAddUser = (e) => {
        e.preventDefault();
        if (!userId) {
            setUserService(data);
        } else {
            updateUserService(data, userId);
        }
    }
    const navigate = useNavigate();
    return (
        <div className="container mt-4 p-5">
            <h4 className="text-center">{userId ? "ویرایش کاربر" : "افزودن کاربر"}</h4>
            <div className="row justify-content-center mt-5">
                <form onSubmit={handleAddUser} className="col-md-6 bg-light rounded p-3">
                    <div className="my-3">
                        <label className="form-label">نام و نام خانوادگی</label>
                        <input type="text" className="form-control" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">نام کاربری</label>
                        <input type="text" className="form-control" value={data.username} onChange={(e) => setData({ ...data, username: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">ایمیل</label>
                        <input type="email" className="form-control" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
                    </div>
                    <div className="text-start">
                        <button type="button" className="btn btn-danger ms-3" onClick={() => navigate(-1)}>انصراف
                        </button>
                        <button type="submit" className="btn btn-success">تایید</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser;