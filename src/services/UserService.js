import { JpAxios } from "../JpAxios";
import swal from "sweetalert";

export const setUserService = async (data) => {
    const res = await JpAxios.post("/users", data);
    console.log(res);
    swal(`${res.data.name} با موفقیت ایجاد شد`, {
        icon: "success",
        buttons: "متوجه شدم"
    })
}

export const updateUserService = async (data, userId) => {
    const res = await JpAxios.put(`/users/${userId}`, data);
    console.log(res);
    swal(`${res.data.name} با موفقیت ویرایش شد`, {
        icon: "success",
        buttons: "متوجه شدم"
    })
}

export const getUserService = async (userId, setData) => {
    const res = await JpAxios.get(`/users/${userId}`);
    setData({
        name: res.data.name,
        username: res.data.username,
        email: res.data.email
    })
}


