import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import style from "../style.module.css";
import { JpAxios } from "../JpAxios";
import WithAlert from "../HOC/WithAlert";
import { Alert, Confirm } from "../utils/Alerts";
import useTitle from "../hooks/useTitle";

const Users = (props) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [mainUsers , setMainUsers] = useState([]);
  // const {Confirm , Alert} = props;

  useEffect(() => {
    JpAxios.get("/users").then(res => {
      setUsers(res.data);
      setMainUsers(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  useTitle("کاربران");
  
  const handleDelete = async (itemId) => {
    if (await Confirm(`آیا از حذف رکورد ${itemId} اطمینان دارید؟`)) {
      JpAxios.delete(`/users/${itemId}`).then(res => {
          if (res.status === 200) {
              const newUsers = users.filter(u => u.id !== itemId);
              setUsers(newUsers);
              Alert("حذف با موفقیت انجام شد", "success");
          }
          else {
              Alert("عملیات با خطا مواجه شد" , "error")
          }
      })
  }
  else {
      Alert("شما از حذف رکورد منصرف شدید" , "info")
  }
  }
  const handleSearch = (e) => {
    setUsers(mainUsers.filter(u => u.name.includes(e.target.value)));
  }
  return (
    <div className="container-fluid mt-5">
      <h4 className="text-center">مدیریت کاربران</h4>
      <div className="d-flex justify-content-between px-4 mt-5">
        <input type="text" className={`form-control box_shadow w-50`} placeholder="جستجو" onChange={handleSearch}/>
        <Link to="/user/add">
          <button className="btn btn-success me-2">افزودن کاربر</button>
        </Link>
      </div>
      {users.length ? (
        <div className={`table-responsive mt-5 mx-4`} >
          <table className="table text-center box_shadow rounded" style={{ background: "var(--bs-white)" }}>
            <thead>
              <tr>
                <th>#</th>
                <th>نام</th>
                <th>نام کاربری</th>
                <th>ایمیل</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <i className="fas fa-edit text-warning ms-2 pointer" onClick={() =>
                      navigate(`/user/add/${u.id}`)}></i>
                    <i className="fas fa-trash text-danger pointer" onClick={() => handleDelete(u.id)}></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h4 className="text-center mt-5">لطفا صبر کنید ...</h4>
      )}
    </div>
  )
}

export default Users;