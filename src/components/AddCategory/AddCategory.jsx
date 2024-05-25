import React, { useState, useEffect } from "react";
import "./AddCategory.css";
import getAllCategory from "../../Api/getAllCategory.api";
import addCategory from "../../Api/addCategory.api";
import updateCategory from "../../Api/updateCategory.api.js";
import deleteCategory from "../../Api/deleteCategory.api.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const AddCategory = () => {
  useEffect(() => {
    getAllCategoryApi();
  }, []);
  const [allCategory, setAllCategory] = useState([]);
  const [categoryNameAr, setCategoryNameAr] = useState("");
  const [categoryNameEn, setCategoryNameEn] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState("");
  const [updateCategoryNameAr, setUpdateCategoryNameAr] = useState("");
  const [updateCategoryNameEn, setUpdateCategoryNameEn] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [updateCategoryLoading, setUpdateCategoryLoading] = useState(false);
  const [updateCategoryError, setUpdateCategoryError] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [updatePrevImage, setUpdatePrevImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const getAllCategoryApi = () => {
    getAllCategory(setAllCategory);
  };
  const addCategoryApi = () => {
    if (categoryNameAr == "" || categoryNameEn == "" || imageURL == "") {
      setCategoryError("يجب ملئ جميع البيانات");
    } else {
      let Data = new FormData();
      Data.append("image", imageURL);
      Data.append("categoryName_Ar", categoryNameAr);
      Data.append("categoryName_En", categoryNameEn);
      addCategory(
        Data,
        setCategoryLoading,
        setCategoryError,
        setAllCategory,
        setCategoryNameEn,
        setCategoryNameAr,
        setPrevImage,
        setImageURL
      );
    }
  };
  const openUpdate = (
    updateCategoryNameAr,
    updateCategoryNameEn,
    categoryId,
    updatePrevImage
  ) => {
    setUpdateCategoryNameAr(updateCategoryNameAr);
    setUpdateCategoryNameEn(updateCategoryNameEn);
    setCategoryId(categoryId);
    setUpdatePrevImage(updatePrevImage);
    document
      .querySelector(".update_category")
      .classList.replace("d-none", "d-flex");
  };
  const closeUpdate = () => {
    document
      .querySelector(".update_category")
      .classList.replace("d-flex", "d-none");
  };
  const updateCategoryApi = () => {
    if (updateCategoryNameAr == "" || updateCategoryNameEn == "") {
      setUpdateCategoryError("يجب ملئ البيانات اولا");
    } else {
      let Data = new FormData();
      if (imageURL != "") {
        Data.append("image", imageURL);
      }
      Data.append("categoryName_Ar", updateCategoryNameAr);
      Data.append("categoryName_En", updateCategoryNameEn);
      updateCategory(
        Data,
        setAllCategory,
        setUpdateCategoryLoading,
        setUpdateCategoryError,
        categoryId,
        setUpdatePrevImage,
        setImageURL
      );
    }
  };
  const openDelete = (categoryId) => {
    setCategoryId(categoryId);
    document
      .querySelector(".delete_category")
      .classList.replace("d-none", "d-flex");
  };
  const closeDelete = () => {
    document
      .querySelector(".delete_category")
      .classList.replace("d-flex", "d-none");
  };
  const deleteCategoryApi = () => {
    deleteCategory(
      setAllCategory,
      setUpdateCategoryLoading,
      setUpdateCategoryError,
      categoryId
    );
  };
  const selectImage = (e) => {
    setImageURL(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setPrevImage(image);
  };
  const selectUpdateImage = (e) => {
    setImageURL(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setUpdatePrevImage(image);
  };
  return (
    <div className="category">
      <h2>أضافة فئة جديدة</h2>
      <div className="category_container">
        <div className="add_category">
          <div className="add_category">
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
            </div>
          </div>
          <div>
            <input
              type="Name Of New Category"
              placeholder="Category Name"
              value={categoryNameEn}
              onChange={(e) => setCategoryNameEn(e.target.value)}
            />
            <input
              type="اسم الفئة الجديدة"
              placeholder="أسم الفئة"
              value={categoryNameAr}
              onChange={(e) => setCategoryNameAr(e.target.value)}
            />
          </div>
          <p>{categoryError}</p>
          <button onClick={addCategoryApi}>
            {categoryLoading ? <span class="loader"></span> : "حفظ"}
          </button>
        </div>
        <div className="allCategory">
          {allCategory.map((item) => {
            return (
              <div className="category_item">
                <Link to={`/subcategory/${item._id}`}>
                  <img src={item.categoryPic} style={{ width: 120 }} />
                </Link>
                <h4>{item.categoryName_Ar}</h4>
                <div className="category_item_btn">
                  <button
                    onClick={() =>
                      openUpdate(
                        item.categoryName_Ar,
                        item.categoryName_En,
                        item._id,
                        item.categoryPic
                      )
                    }
                  >
                    تعديل
                  </button>
                  <button onClick={() => openDelete(item._id)}>حذف</button>
                </div>
              </div>
            );
          })}
        </div>
        {/* update */}
        <div className="add_category update_category d-none">
          <h3>تعديل الفئة</h3>
          <div className="add_images">
            <img src={updatePrevImage} />
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
          <div>
            <input
              type="Name Of New Category"
              placeholder="Category Name"
              value={updateCategoryNameEn}
              onChange={(e) => setUpdateCategoryNameEn(e.target.value)}
            />
            <input
              type="اسم الفئة الجديدة"
              placeholder="أسم الفئة"
              value={updateCategoryNameAr}
              onChange={(e) => setUpdateCategoryNameAr(e.target.value)}
            />
          </div>
          <p>{updateCategoryError}</p>
          <div className="update_btn">
            <button onClick={updateCategoryApi}>
              {updateCategoryLoading ? <span class="loader"></span> : "تعديل"}
            </button>
            <button onClick={closeUpdate}>الغاء</button>
          </div>
        </div>
        {/* delete */}
        <div className="add_category delete_category d-none">
          <h3>حذف الفئة</h3>
          <div>
            <p>{updateCategoryError}</p>
            <button onClick={deleteCategoryApi}>
              {updateCategoryLoading ? <span class="loader"></span> : "نعم"}
            </button>
            <button onClick={closeDelete}>لا</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
