import React, { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";
import { deleteGalleryService, getGalleryService } from "../services/GalleryService";

const Gallery = () => {

    const [photos, setPhotos] = useState([]);
    const [mainPhotos , setMainPhotos] = useState([]);

    useEffect(() => {
        getGalleryService(setPhotos , setMainPhotos);
    }, []);

    useTitle("گالری ها");

    const handleDelete = (id) => {
        deleteGalleryService(photos , setPhotos ,id);
    }

    const handleSearch = (e) => {
      let value = e.target.value;  
      if(value) {
        setPhotos(mainPhotos.filter(p => p.albumId == value));
      }
      else setPhotos(mainPhotos);  
    }

    return (
        <div className="container mt-5">
            <h4 className="text-center">مدیریت گالری</h4>
            <div className="row justify-content-between p-4">
                <div className="form-group col-8 col-lg-4">
                    <input className="form-control" type="number" placeholder="جستجو" onChange={handleSearch}/>
                </div>
                <div className="col-4 text-start">
                    <Link to="/gallery/add" >
                        <button className="btn btn-secondary">افزودن عکس</button>
                    </Link>
                </div>
            </div>
            {
              photos.length ? (
                <div className="table-responsive mt-5 px-4">
                  <table className="table bg-light rounded text-center">
                    <thead>
                      <tr className="align-middle">
                        <th>#</th>
                        <th>آیدی آلبوم</th>
                        <th>عنوان</th>
                        <th>لینک عکس</th>
                        <th>حذف رکورد</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                          photos.map(p => (
                            <tr key={p.id}>
                              <td>{p.id}</td>
                              <td>{p.albumId}</td>
                              <td>{p.title}</td>
                              <td><Link to={p.url}>مشاهده عکس</Link></td>
                              <td>
                                <i className="fas fa-trash text-danger pointer" 
                                onClick={() => handleDelete(p.id)}></i>
                              </td>
                            </tr>
                           ))
                        }
                    </tbody>
                   </table>
                </div>
                ) : (
                    <h4 className="text-center" style={{color: "var(--bs-gray)"}}>در حال دریافت...</h4>
                )
            }

        </div>
    )
}

export default Gallery;