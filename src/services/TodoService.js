import { JpAxios } from "../JpAxios"
import { Alert, Confirm } from "../utils/Alerts";


export const getTodoService = (setTodos , setMainTodos) => {
  JpAxios.get("/todos").then(res => {
    setMainTodos(res.data);
    setTodos(res.data);
  }).catch(err => 
    console.log(err))
}

export const deleteTodoService = async (id , todos , setTodos) => {
    if(await Confirm(`آیا از حذف کار شماره ${id} اطمینان دارید؟`)) {
      JpAxios.delete(`/todos/${id}`).then(res => {
        if(res.status === 200) {
            const newTodos = todos.filter(t => t.id !== id);
            setTodos(newTodos);
            Alert("حذف با موفقیت انجام شد" , "success");
        }
        else {
            Alert("حذف انجام نشد!" , "error");
        }
      })      
    }
    else {
        Alert("انصراف از حذف", "info");
    }
}

export const updateTodoService = (id , data) => {
   JpAxios.put(`/todos/${id}`, data).then(res => {
    if(res.status == 200) {
      console.log(res);
      Alert(`کار شماره ${id} با موفقیت ویرایش شد`, "success");
    }
   })
}

export const setTodoService = (data) => {
  JpAxios.post("/todos", data).then(res => {
    if(res.status == 201) {
      console.log(res);
      Alert("کار جدید اضافه شد", "success");
    }
  })
}