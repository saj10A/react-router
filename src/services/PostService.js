import { JpAxios } from "../JpAxios";
import { Alert, Confirm } from "../utils/Alerts";

export const getPostService = (setPosts , setMainPosts) => {
  JpAxios.get("/posts").then(res => {
    setPosts(res.data);
    setMainPosts(res.data);
  }).catch(err => {
    console.log(err);
  })
}

export const deletePostService = async (postId , posts, setPosts) => {
    if (await Confirm(`آیا از حذف رکورد ${postId} اطمینان دارید؟`)) {
        JpAxios.delete(`/posts/${postId}`).then(res => {
          if (res.status === 200) {
            const newPosts = posts.filter(p => p.id !== postId);
            setPosts(newPosts);
            Alert("حذف با موفقیت انجام شد", "success");
          }
          else {
            Alert("عملیات با خطا مواجه شد", "error")
          }
        })
      }
      else {
        Alert("شما از حذف رکورد منصرف شدید", "info")
      }
}

