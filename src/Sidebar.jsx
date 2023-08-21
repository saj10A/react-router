import React, { useContext } from "react";
import { Link , NavLink } from "react-router-dom";
import { MainContext } from "./contexts/MainContext";
import style from "./style.module.css";

const Sidebar = () => {
    const {showMenu, setShowMenu} = useContext(MainContext);
    return (
        <div className={`${style.sidebar_section} bg-dark`} style={showMenu ? {right: "0"} : {}} >
            <img className="rounded-circle d-block mx-auto" src="/assets/images/profile-3-120x120.jpg" alt="" />
            <ul className={`${style.sidebar_list} p-0 mt-3`}>
                <li><NavLink className={({isActive}) => { return isActive ? "active_nav" : ""}} to="/user">کاربران</NavLink></li>
                <li><NavLink className={({isActive}) => {return isActive ? "active_nav" : ""}} to="/posts">پست ها </NavLink></li>
                <li><NavLink className={({isActive}) => {return isActive ? "active_nav" : ""}} to="/gallery">گالری</NavLink></li>
                <li><NavLink className={({isActive}) => {return isActive ? "active_nav" : ""}} to="/todos">کارها</NavLink></li>
            </ul>
        </div>
    )
}

export default Sidebar;