import React from "react";
import "./Gallary.css";
import image from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
const Gallary = () => {
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
            <img src={image} />
            <img src={image} />
            <img src={image} />
            <img src={image} />
            <img src={image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallary;
