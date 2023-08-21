import React, { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";
import { deleteTodoService, getTodoService } from "../services/TodoService";

const Todos = () => {

    const [todos , setTodos] = useState([]);
    const [mainTodos , setMainTodos] = useState([]);

    useTitle("کارها");

    useEffect(() => {
      getTodoService(setTodos , setMainTodos);  
    } , []);

    const handleDelete = (id) => {
        deleteTodoService(id , todos , setTodos);
    }
    
    const handleSearch = (e) => {
      let value = e.target.value;
      if(value) {
        setTodos(mainTodos.filter(t => t.userId == value));
      }
      else setTodos(mainTodos);      
    }
    return (
        <div className="container mt-5">
          <h4 className="text-center">مدیریت کارها </h4>
          <div className="row justify-content-between mt-4 px-3">
            <div className="form-group col-6 col-lg-4">
              <input className="form-control" type="number" placeholder="جستجو" onChange={handleSearch}/>  
            </div>
            <div className="text-start col-4 col-md-3">
              <Link to="/todo/add">
                <button className="btn btn-primary">افزودن کار</button>  
              </Link>  
            </div>
          </div>
          {
            todos.length ? (
              <div className="table-responsive mt-5 mx-3">
                <table className="table rounded bg-light text-center">
                  <thead>
                    <tr className="align-middle">
                      <th>#</th>   
                      <th>آیدی کاربر</th>   
                      <th>عنوان</th>   
                      <th>وضعیت</th>  
                      <th>عملیات</th> 
                    </tr>
                  </thead>
                  {
                    <tbody>
                      {todos.map(t => (
                      <tr key={t.id}>
                        <td>{t.id}</td>
                        <td>{t.userId}</td>
                        <td>{t.title}</td>
                        <td>{
                        t.completed ? 
                          <i className="fas fa-check text-success"></i> :
                          <i className="fas fa-times text-danger"></i>
                        }
                        </td>
                        <td>
                          <Link to={`/todo/add/${t.id}`}>
                            <i className="fas fa-edit text-secondary ms-2 pointer"></i>
                          </Link>
                          <i className="fas fa-trash text-danger pointer" 
                          onClick={() => handleDelete(t.id)}></i>    
                        </td>
                      </tr>  
                      ))}
                    </tbody>
                  }
                </table>
              </div>  
            ) : (
              <h5 className="text-center mt-4">در حال دریافت...</h5>
            )
          }
          
        </div>
    )
}

export default Todos;