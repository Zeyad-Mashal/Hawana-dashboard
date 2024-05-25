import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./AddSubCategory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import image from "../../images/logo.png";
import getSubCategory from "../../Api/getSubCategory";
import AddSubCategoryApi from "../../Api/AddSubCategoryApi";
import updateSubCategory from "../../Api/updateSubCategory";
import deleteSubCategory from "../../Api/deleteSubCategory";
const AddSubCategory = () => {
  useEffect(() => {
    getAllSubCategory();
  }, []);
  const [prevImage, setPrevImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [subNameAr, setSubNameAr] = useState("");
  const [subNameEn, setSubNameEn] = useState("");
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);
  const [subcategoryError, setSubcategoryError] = useState("");
  const [category, setCategory] = useState("");
  const { categoryId } = useParams();
  const [subCategoryId, setSubCategoryId] = useState("");
  const [updateSubCategoryLoading, setUpdateSubCategoryLoading] =
    useState(false);
  const [updateNameAr, setUpdateNameAr] = useState("");
  const [updateNameEn, setUpdateNameEn] = useState("");
  const [updateSubCategoryError, setUpdateSubCategoryError] = useState("");
  const [updateprevImage, setUpdatePrevImage] = useState("");
  const selectImage = (e) => {
    setImageURL(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setPrevImage(image);
  };

  const openUpdateSubCategory = (
    updateNameAr,
    updateNameEn,
    subCategoryId,
    updateprevImage
  ) => {
    setUpdateNameAr(updateNameAr);
    setUpdateNameEn(updateNameEn);
    setSubCategoryId(subCategoryId);
    setUpdatePrevImage(updateprevImage);
    document
      .querySelector(".update_subcategory")
      .classList.replace("d-none", "d-flex");
  };
  const closeUpdateSubCategory = () => {
    document
      .querySelector(".update_subcategory")
      .classList.replace("d-flex", "d-none");
  };
  const openDeleteSubCategory = (subCategoryId) => {
    setSubCategoryId(subCategoryId);
    document
      .querySelector(".delete_subcategory")
      .classList.replace("d-none", "d-flex");
  };
  const closeDeleteSubCategory = () => {
    document
      .querySelector(".delete_subcategory")
      .classList.replace("d-flex", "d-none");
  };
  const getAllSubCategory = () => {
    getSubCategory(
      setAllSubCategory,
      categoryId,
      setSubCategoryLoading,
      setSubcategoryError
    );
  };
  const addSubCategoryApi = () => {
    if (subNameAr == "" || subNameEn == "" || imageURL == "") {
      subcategoryError("يجب ملئ جميع البيانات");
    } else {
      let Data = new FormData();
      Data.append("image", imageURL);
      Data.append("subCategory_Ar", subNameAr);
      Data.append("subCategory_En", subNameEn);
      AddSubCategoryApi(
        Data,
        setSubCategoryLoading,
        setSubcategoryError,
        setAllSubCategory,
        setSubNameAr,
        setSubNameEn,
        setPrevImage,
        setImageURL,
        categoryId
      );
    }
  };
  const updateSubCategoryApi = () => {
    if (updateNameAr == "" || updateNameEn == "") {
      setUpdateSubCategoryError("يجب ملئ البيانات اولا");
    } else {
      let Data = new FormData();
      if (imageURL != "") {
        Data.append("image", imageURL);
      }
      Data.append("subCategory_Ar", updateNameAr);
      Data.append("subCategory_En", updateNameEn);
      updateSubCategory(
        Data,
        setUpdateSubCategoryLoading,
        setUpdateSubCategoryError,
        setAllSubCategory,
        setUpdateNameAr,
        setUpdateNameEn,
        setUpdatePrevImage,
        setImageURL,
        categoryId,
        subCategoryId
      );
    }
  };
  const selectUpdateImage = (e) => {
    setImageURL(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setUpdatePrevImage(image);
  };
  const deleteSubCategoryApi = () => {
    deleteSubCategory(
      setAllSubCategory,
      setUpdateSubCategoryLoading,
      setUpdateSubCategoryError,
      categoryId,
      subCategoryId
    );
  };
  return (
    <section className="subcategory">
      <div className="subcategory_container">
        <div className="subcategory_list">
          <div className="subcategory_image">
            {prevImage ? (
              <img src={prevImage} />
            ) : (
              <label>
                <div className="d-flex justify-content-center align-items-center flex-direction-column add-product-pic subcategory_addImage">
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
          </div>
          <div className="subcategory_content">
            <input
              type="text"
              placeholder="اسم الفئة"
              value={subNameAr}
              onChange={(e) => setSubNameAr(e.target.value)}
            />
            <input
              type="text"
              placeholder="Sub Category Name"
              value={subNameEn}
              onChange={(e) => setSubNameEn(e.target.value)}
            />
          </div>
          <div className="subcategory_btns">
            <button onClick={addSubCategoryApi}>
              {subCategoryLoading ? <span class="loader"></span> : "اضافة"}
            </button>
          </div>
        </div>
        <div className="subcategory_review">
          {allSubCategory?.map((item) => {
            return (
              <div className="subcategory_item">
                <img src={item.subCategoryPic} />
                <div className="subcategory_item_content">
                  <h3>{item.subCategory_Ar}</h3>
                  <div className="item_btns">
                    <button
                      onClick={() =>
                        openUpdateSubCategory(
                          item.subCategory_Ar,
                          item.subCategory_En,
                          item._id,
                          item.subCategoryPic
                        )
                      }
                    >
                      تعديل
                    </button>
                    <button onClick={() => openDeleteSubCategory(item._id)}>
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* update */}
        <div className="update_subcategory d-none">
          <div className="subcategory_list">
            <div className="subcategory_image">
              <FontAwesomeIcon
                icon={faRectangleXmark}
                onClick={closeUpdateSubCategory}
              />
              <img src={updateprevImage} />
              <label>
                <p>اختر صورة جديدة</p>
                <input
                  className="select-input"
                  type="file"
                  name="images"
                  accept=".png, .jpg, .jpeg, .webp"
                  onChange={selectUpdateImage}
                />
              </label>
            </div>
            <div className="subcategory_content">
              <input
                type="text"
                placeholder="اسم الفئة"
                value={updateNameAr}
                onChange={(e) => setUpdateNameAr(e.target.value)}
              />
              <input
                type="text"
                placeholder="Sub Category Name"
                value={updateNameEn}
                onChange={(e) => setUpdateNameEn(e.target.value)}
              />
            </div>
            <div className="subcategory_btns">
              <button onClick={updateSubCategoryApi}>
                {updateSubCategoryLoading ? (
                  <span class="loader"></span>
                ) : (
                  "تعديل"
                )}
              </button>
            </div>
          </div>
        </div>
        {/* delete */}
        <div className="delete_subcategory d-none ">
          <div className="delete_btns">
            <button onClick={deleteSubCategoryApi}>
              {updateSubCategoryLoading ? <span class="loader"></span> : "حذف"}
            </button>
            <button onClick={closeDeleteSubCategory}>إلغاء</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddSubCategory;
