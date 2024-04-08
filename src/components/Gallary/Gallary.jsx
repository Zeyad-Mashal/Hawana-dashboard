import React, { useState, useEffect } from "react";
import "./Gallary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import addImage from "../../Api/addImage.api";
import getAllImages from "../../Api/getAllImages.api";
import deleteImageApi from "../../Api/deleteImageApi.api";
const Gallary = () => {
  useEffect(() => {
    getAllImagesApi();
  }, []);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [imageLoadingDelete, setImageLoadingDelete] = useState(false);
  const [imageErrorDelete, setImageErrorDelete] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [imageId, setImageId] = useState("");
  const deleteImage = (imageId) => {
    setImageId(imageId);
    document
      .querySelector(".delete_image")
      .classList.replace("d-none", "d-flex");
  };
  const closeImage = () => {
    document
      .querySelector(".delete_image")
      .classList.replace("d-flex", "d-none");
  };
  const updateImage = () => {
    document
      .querySelector(".update_image")
      .classList.replace("d-none", "d-flex");
  };
  const closeUpdateImage = () => {
    document
      .querySelector(".update_image")
      .classList.replace("d-flex", "d-none");
  };
  const addImageApi = () => {
    if (prevImage == "") {
      setImageError("يجب اختيار الصورة اولا!");
    } else {
      const picture = new FormData();
      picture.append("image", imageURL);
      addImage(
        picture,
        setImageLoading,
        setImageError,
        setAllImages,
        setPrevImage
      );
    }
  };
  const getAllImagesApi = () => {
    getAllImages(setAllImages);
  };
  const selectImage = (e) => {
    setImageURL(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setPrevImage(image);
  };
  const handleDeleteImage = () => {
    deleteImageApi(
      setAllImages,
      setImageLoadingDelete,
      setImageErrorDelete,
      imageId
    );
  };
  return (
    <div className="gallary">
      <div className="gallary_container">
        <div className="gallary_content">
          <div className="add_images">
            {prevImage ? (
              <img src={prevImage} />
            ) : (
              <label>
                <div className="d-flex justify-content-center align-items-center flex-direction-column add-product-pic">
                  <FontAwesomeIcon icon={faCamera} />
                  <p>اختر صورة جديدة</p>
                </div>
                <input
                  className="select-input"
                  type="file"
                  name="images"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={selectImage}
                />
              </label>
            )}

            <div className="addImage_bottem">
              <p className="erro">{imageError}</p>
              <button onClick={addImageApi}>
                {imageLoading ? <span class="loader"></span> : "اضافة"}
              </button>
            </div>
          </div>
          <div className="images_list">
            {allImages.map((item) => {
              return (
                <div className="images_item" key={item._id}>
                  <img src={item.picURL} />
                  <div>
                    <button onClick={() => deleteImage(item._id)}>حذف</button>
                    <button onClick={updateImage}>تعديل</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* delete */}
        <div className="delete_image d-none">
          <h4>هل تريد مسح الصورة ؟</h4>
          <p className="error">{imageErrorDelete}</p>
          <div>
            <button onClick={handleDeleteImage}>
              {imageLoadingDelete ? <span class="loader"></span> : "حذف"}
            </button>
            <button onClick={closeImage}>لا</button>
          </div>
        </div>
        {/* update */}
        <div className="update_image d-none">
          <div className="add_images">
            <label>
              <div className="d-flex justify-content-center align-items-center flex-direction-column add-product-pic">
                <FontAwesomeIcon icon={faCamera} />
                <p>اختر صورة جديدة</p>
              </div>
              <input
                className="select-input"
                multiple
                type="file"
                name="images"
                accept=".png, .jpg, .jpeg, .webp"
              />
            </label>
            <div>
              <button>نعم</button>
              <button onClick={closeUpdateImage}>لا</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallary;
