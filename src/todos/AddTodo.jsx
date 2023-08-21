import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { JpAxios } from "../JpAxios";
import { setTodoService, updateTodoService } from "../services/TodoService";
import style from "../style.module.css";

const AddTodo = () => {
  const [data, setData] = useState({
    userId: "",
    id: "",
    title: "",
    completed: ""
  });
  const [users, setUsers] = useState([]);

  const { todoId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    JpAxios.get("/users").then(res =>
      setUsers(res.data)
    ).catch(err => console.log(err))

    
    if (todoId) {
      JpAxios.get(`/todos/${todoId}`).then(res => {
        setData(res.data);
        let completed = res.data.completed;
        const radiobuttons = document.getElementsByName("todoStatus");
        if (completed) {
          radiobuttons[0].setAttribute("checked", "true");
        }
        else {
          radiobuttons[1].setAttribute("checked", "true");
        }
      })
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoId) {
      updateTodoService(todoId, data);
    }
    else {
      setTodoService(data);
    }
  }

  return (
    <div className="container mt-5">
      <h4 className="text-center">{todoId ? "ویرایش کار" : "افزودن کار"}</h4>
      <div className="row justify-content-center px-4 mt-5">
        <form onSubmit={handleSubmit} className="col-md-6 bg-light p-4 rounded">
          <div className="form-group">
            <select className="form-select" value={data.userId} onChange={(e) =>
              setData({ ...data, userId: e.target.value })}>
              <option value="">کاربر موردنظر را انتخاب کنید</option>
              {
                users.map(u => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))
              }
            </select>
          </div>
          <div className="form-group my-3">
            <label className="form-label">عنوان کار</label>
            <input type="text" className="form-control" value={data.title} onChange={(e) =>
              setData({ ...data, title: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">وضعیت</label>
            <br />
            <div className="form-check form-check-inline">
              <input type="radio" className={`form-check-input ${style.radio_button}`}
                name="todoStatus" value={true} onClick={() => setData({...data, completed: true})}/>
              <label className="form-check-label">انجام شده</label>
            </div>
            <div className="form-check form-check-inline">
              <input type="radio" className={`form-check-input ${style.radio_button}`}
                name="todoStatus" value={false} onClick={() => setData({...data, completed: false})}/>
              <label className="form-check-label">انجام نشده</label>
            </div>
          </div>
          <div className="text-start mt-3">
            <button type="submit" className="btn btn-success ms-2">ثبت</button>
            <button type="button" className="btn btn-warning" onClick={() => navigate(-1)}>برگشت</button>
          </div>
        </form>
      </div>

    </div>
  )

}

export default AddTodo;