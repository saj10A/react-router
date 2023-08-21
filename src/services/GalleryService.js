import { JpAxios } from "../JpAxios"
import { Alert, Confirm } from "../utils/Alerts";


export const getGalleryService = (setPhotos , setMainPhotos) => {

    JpAxios.get(`/photos`).then(res => {
      setPhotos(res.data);
      setMainPhotos(res.data);
    }
    ).catch(err => 
      console.log(err));
}

export const deleteGalleryService = async (photos , setPhotos , id) => {
  if(await Confirm(`آیا از حذف رکورد ${id} اطمینان دارید؟`)) {
    JpAxios.delete(`/photos/${id}`).then(res => {
      if(res.status === 200) {
        const newPhotos = photos.filter(p => p.id !== id);
        setPhotos(newPhotos);
        Alert("حذف با موفقیت انجام شد", "success");
      }
      else {
        Alert("عملیات با خطا مواجه شد", "error");
      }
    })
  }
  else {
    Alert("شما از حدف رکورد منصرف شدید", "info");
  }
}

export const setGalleryService = (data) => {
  JpAxios.post("/photos", data).then(res => {
    if(res.status === 201) {
      console.log(res);
      Alert("رکورد جدید با موفقیت اضافه شد", "success");
    }
  }) 
}