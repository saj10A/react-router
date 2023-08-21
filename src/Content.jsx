import React, { useContext } from "react";
import Users from "./users/Users";
import Posts from "./posts/Posts";
import Gallery from "./gallery/Gallery";
import Todos from "./todos/Todos";
import style from "./style.module.css";
import { MainContext } from "./contexts/MainContext";
import { Route, Routes } from "react-router-dom";
import AddUser from "./users/AddUser";
import WithAlert2 from "./HOC/WithAlert2";
import AddPost from "./posts/AddPost";
import AddGallery from "./gallery/AddGallery";
import AddTodo from "./todos/AddTodo";

const Content = () => {
    const {showMenu, setShowMenu} = useContext(MainContext);

    const handleShowMenu = (event) => {
        event.stopPropagation();
        setShowMenu(!showMenu);
    }
    const renderUser = (Confirm , Alert) => <Users Confirm={Confirm} Alert={Alert} />
    return (
        <div className={style.content_section} onClick={() => setShowMenu(false)}>
            <i className={`${style.menu_button} fas fa-bars pointer`} onClick={handleShowMenu}></i>
            <Routes>
                <Route path="/user" element={<WithAlert2 render={renderUser}/>} />
                <Route path="/user/add" element={<AddUser />}>
                  <Route path=":userId" />
                </Route>
                <Route path="/posts" element={<Posts />}/>
                <Route path="/post/add" element={<AddPost />} >
                    <Route path=":postId" />
                </Route>
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/add" element={<AddGallery />} />
                <Route path="/todos" element={<Todos />} />
                <Route path="/todo/add" element={<AddTodo />}>
                  <Route path=":todoId" />    
                </Route>
                <Route path="*" element={<WithAlert2 render={renderUser} />} />
            </Routes>
        </div>
    )
}

export default Content;