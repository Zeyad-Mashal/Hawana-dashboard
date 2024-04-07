import React from "react";
import "./Gallary.css";
import image from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
const Gallary = () => {
  const deleteImage = () => {
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
  return (
    <div className="gallary">
      <div className="gallary_container">
        <div className="gallary_content">
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
          </div>
          <div className="images_list">
            <div className="images_item">
              <img src={image} />
              <div>
                <button onClick={deleteImage}>حذف</button>
                <button onClick={updateImage}>تعديل</button>
              </div>
            </div>
            <div className="images_item">
              <img src={image} />
              <div>
                <button>حذف</button>
                <button>تعديل</button>
              </div>
            </div>
            <div className="images_item">
              <img src={image} />
              <div>
                <button>حذف</button>
                <button>تعديل</button>
              </div>
            </div>
            <div className="images_item">
              <img src={image} />
              <div>
                <button>حذف</button>
                <button>تعديل</button>
              </div>
            </div>
            <div className="images_item">
              <img src={image} />
              <div>
                <button>حذف</button>
                <button>تعديل</button>
              </div>
            </div>
          </div>
        </div>
        {/* delete */}
        <div className="delete_image d-none">
          <h4>هل تريد مسح الصورة ؟</h4>
          <div>
            <button>نعم</button>
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
