import { useState } from "react"
import { setGalleryService } from "../services/GalleryService";
import { useNavigate } from "react-router-dom";

const AddGallery = () => {
    const [data , setData] = useState({
      albumId: "",
      title: "",
      link: ""
    });

    const navigate = useNavigate();

    const handleAddPhoto = (e) => {
      e.preventDefault();
      setGalleryService(data);
    }
    
    return (
        <div className="container mt-5">
            <h4 className="text-center">افزودن عکس</h4>
            <div className="row justify-content-center mt-5">
              <form onSubmit={handleAddPhoto} className="bg-light rounded col-md-6 p-4">
                <div className="form-group">
                    <label className="form-label">آیدی آلبوم</label>
                    <input type="number" className="form-control" value={data.albumId} onChange={(e) => 
                    setData({...data , albumId: e.target.value})}/>
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">عنوان</label>
                  <input type="text" className="form-control" value={data.title} onChange={(e) => 
                  setData({...data , title: e.target.value})}/>
                </div>
                <div className="form-group my-3">
                  <label className="form-label">لینک عکس</label>
                  <input type="text" className="form-control" value={data.link} onChange={(e) =>
                  setData({...data , link: e.target.value})}/>
                </div>
                <div className="text-start">
                  <button type="submit" className="btn btn-primary ms-3">افزودن</button>
                  <button type="button" className="btn btn-secondary" onClick={() => 
                  navigate(-1)}>برگشت</button>
                </div>
              </form>
            </div>
        </div>
    )
}

export default AddGallery;

