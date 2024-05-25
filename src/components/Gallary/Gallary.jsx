import React, { useState, useEffect } from "react";
import "./Gallary.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
import getAllCategory from "../../Api/getAllCategory.api";
import getProductByCategory from "../../Api/getProductByCategory.api";
import addProduct from "../../Api/addProduct.api";
import udpateProduct from "../../Api/udpateProduct.api";
import deleteProduct from "../../Api/deleteProduct.api";
import getSubCategory from "../../Api/getSubCategory";
const Gallary = () => {
  useEffect(() => {
    getAllCategoryApi();
  }, []);
  const [addProductLoading, setAddProductLoading] = useState(false);
  const [addProductError, setAddProductError] = useState("");
  const [updatePrevImage, setUpdatePrevImage] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [prevImage, setPrevImage] = useState("");
  const [imageId, setImageId] = useState("");
  const [allcategory, setAllCategory] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [pNameAr, setpNameAr] = useState("");
  const [pNameEn, setpNameEn] = useState("");
  const [pDescAr, setpDescAr] = useState("");
  const [pDescEn, setpDescEn] = useState("");
  const [productId, setProductId] = useState("");
  const [productErrorDelete, setProductErrorDelete] = useState("");
  const [productLoadingDelete, setProductLoadingDelete] = useState(false);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [subcategoryError, setSubcategoryError] = useState("");
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const deleteImage = (productId) => {
    setProductId(productId);
    document
      .querySelector(".delete_image")
      .classList.replace("d-none", "d-flex");
  };
  const closeImage = () => {
    document
      .querySelector(".delete_image")
      .classList.replace("d-flex", "d-none");
  };
  const openUpdateImage = (
    productId,
    productImage,
    pNameAr,
    pNameEn,
    pDescAr,
    pDescEn,
    categoryId
  ) => {
    setProductId(productId);
    setUpdatePrevImage(productImage);
    setpNameAr(pNameAr);
    setpNameEn(pNameEn);
    setpDescAr(pDescAr);
    setpDescEn(pDescEn);
    setImageURL("");
    setCategoryId(categoryId);
    document
      .querySelector(".update_product")
      .classList.replace("d-none", "d-flex");
  };
  const closeUpdateImage = () => {
    document
      .querySelector(".update_product")
      .classList.replace("d-flex", "d-none");
  };
  const getAllCategoryApi = () => {
    getAllCategory(setAllCategory);
  };
  const getAllSubCategory = (categoryID) => {
    getSubCategory(
      setAllSubCategory,
      categoryID,
      setSubCategoryLoading,
      setSubcategoryError
    );
  };
  const getCategoryId = (e) => {
    const categoryName = e.target.value;
    if (categoryName != "أختر الفئة الرئيسية") {
      const categoryID = allcategory.filter(
        (item) => item.categoryName_Ar == categoryName
      )[0]._id;
      setMainCategory(categoryName);
      setCategoryId(categoryID);
      getAllSubCategory(categoryID);
    }
  };
  const getSubCategoryId = (e) => {
    const subCategoryName = e.target.value;
    if (subCategoryName != "أختر الفئة الفرعية") {
      const subCategoryId = allSubCategory.filter(
        (item) => item.subCategory_Ar == subCategoryName
      )[0]._id;
      setSubCategoryId(subCategoryId);
      getAllProductByCategory(subCategoryId);
      setSubCategory(subCategoryName);
    }
  };
  const selectImage = (e) => {
    setImageURL(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setPrevImage(image);
  };
  const openAdd = () => {
    setPrevImage("");
    setpNameAr("");
    setpNameEn("");
    setpDescAr("");
    setpDescEn("");
    setCategoryId("");
    setSubCategoryId("");
    document
      .querySelector(".gallary_conetent_add")
      .classList.replace("d-none", "d-block");
    setMainCategory("أختر الفئة الرئيسية");
    setSubCategory("أختر الفئة الفرعية");
  };
  const closeAdd = () => {
    document
      .querySelector(".gallary_conetent_add")
      .classList.replace("d-block", "d-none");
  };
  const getAllProductByCategory = (categoryId) => {
    getProductByCategory(
      setAllProducts,
      categoryId,
      setProductLoading,
      setProductError
    );
  };
  // add product
  const addProductFunc = () => {
    if (imageURL == "") {
      setAddProductError("قم برفع صور المنتج اولا");
    } else {
      if (
        pNameAr == "" ||
        pNameEn == "" ||
        pDescAr == "" ||
        pDescEn == "" ||
        categoryId == "" ||
        subCategoryId == ""
      ) {
        setAddProductError("قم بإدخال بيانات المنتج كاملة");
      } else {
        let productData = new FormData();
        productData.append("image", imageURL);
        productData.append("translation.ar.productName", pNameAr);
        productData.append("translation.ar.description", pDescAr);
        productData.append("translation.en.productName", pNameEn);
        productData.append("translation.en.description", pDescEn);
        productData.append("subCategory", subCategoryId);
        addProduct(
          productData,
          setAddProductLoading,
          setAddProductError,
          setAllProducts
        );
      }
    }
  };
  // update product
  const updateProductApi = () => {
    if (pNameAr == "" || pNameEn == "" || pDescAr == "" || pDescEn == "") {
      setAddProductError("قم بإدخال بيانات المنتج كاملة");
    } else {
      let productData = new FormData();
      if (imageURL != "") {
        productData.append("image", imageURL);
      }
      productData.append("translation.ar.productName", pNameAr);
      productData.append("translation.ar.description", pDescAr);
      productData.append("translation.en.productName", pNameEn);
      productData.append("translation.en.description", pDescEn);
      productData.append("subCategory", subCategoryId);
      udpateProduct(
        productData,
        setAllProducts,
        setUpdateLoading,
        setUpdateError,
        productId
      );
    }
  };
  // delete product
  const deleteProductApi = () => {
    deleteProduct(
      setAllProducts,
      setProductLoadingDelete,
      setProductErrorDelete,
      productId,
      subCategoryId
    );
  };
  return (
    <div className="gallary">
      <div className="gallary_container">
        <button className="add_btn" onClick={openAdd}>
          أضافة منتج جديد
        </button>
        <select onChange={getCategoryId}>
          <option value="اختر الفئة الرئيسية">اختر الفئة الرئيسية</option>
          {allcategory.map((item) => {
            return (
              <option value={item.categoryName_Ar}>
                {item.categoryName_Ar}
              </option>
            );
          })}
        </select>
        <select onChange={getSubCategoryId}>
          <option value="اختر الفئة الفرعية">اختر الفئة الفرعية</option>
          {allSubCategory.map((item) => {
            return (
              <option value={item.subCategory_Ar}>{item.subCategory_Ar}</option>
            );
          })}
        </select>
        <div className="gallary_content">
          <div className="gallary_conetent_add d-none">
            <FontAwesomeIcon icon={faRectangleXmark} onClick={closeAdd} />
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
            <div className="gallary_inputs">
              <div className="inputs_name">
                <input
                  type="text"
                  placeholder="الاسم"
                  value={pNameAr}
                  onChange={(e) => setpNameAr(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={pNameEn}
                  onChange={(e) => setpNameEn(e.target.value)}
                />
              </div>
              <div className="inputs_desc">
                <textarea
                  type="text"
                  placeholder="الوصف"
                  value={pDescAr}
                  onChange={(e) => setpDescAr(e.target.value)}
                />
                <textarea
                  type="text"
                  placeholder="Description"
                  value={pDescEn}
                  onChange={(e) => setpDescEn(e.target.value)}
                />
              </div>
              <div className="section_menu">
                <select onChange={getCategoryId} value={mainCategory}>
                  <option value="اختر الفئة الرئيسية">
                    اختر الفئة الرئيسية
                  </option>
                  {allcategory.map((item) => {
                    return (
                      <option value={item.categoryName_Ar}>
                        {item.categoryName_Ar}
                      </option>
                    );
                  })}
                </select>
                <select onChange={getSubCategoryId} value={subCategory}>
                  <option value="اختر الفئة الفرعية">اختر الفئة الفرعية</option>
                  {allSubCategory.map((item) => {
                    return (
                      <option value={item.subCategory_Ar}>
                        {item.subCategory_Ar}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="addImage_bottem">
                <p className="erro">{addProductError}</p>
                <button onClick={addProductFunc}>
                  {addProductLoading ? <span class="loader"></span> : "اضافة"}
                </button>
              </div>
            </div>
          </div>
          <div className="images_list">
            {allProducts.map((item) => {
              return (
                <div className="images_item" key={item._id}>
                  <img src={item.images} />
                  <h3>{item.translation.ar.productName}</h3>
                  <p>{item.translation.ar.description}</p>
                  <div>
                    <button onClick={() => deleteImage(item._id)}>حذف</button>
                    <button
                      onClick={() =>
                        openUpdateImage(
                          item._id,
                          item.images,
                          item.translation.ar.productName,
                          item.translation.en.productName,
                          item.translation.ar.description,
                          item.translation.en.description,
                          item.category
                        )
                      }
                    >
                      تعديل
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* delete */}
        <div className="delete_image d-none">
          <h4>هل تريد مسح الصورة ؟</h4>
          <p className="error">{productErrorDelete}</p>
          <div>
            <button onClick={deleteProductApi}>
              {productLoadingDelete ? <span class="loader"></span> : "حذف"}
            </button>
            <button onClick={closeImage}>لا</button>
          </div>
        </div>
        {/* update */}
        <div className="gallary_conetent_add d-none update_product">
          <FontAwesomeIcon icon={faRectangleXmark} />
          <div className="add_images">
            {imageURL ? (
              <img
                src={prevImage}
                className="d-flex justify-content-center align-items-center"
              />
            ) : (
              <>
                <img src={updatePrevImage} />
                <label>
                  <p>تعديل</p>
                  <input
                    className="select-input"
                    type="file"
                    name="images"
                    accept=".png, .jpg, .jpeg, .webp"
                    onChange={selectImage}
                  />
                </label>
              </>
            )}
          </div>
          <div className="gallary_inputs">
            <div className="inputs_name">
              <input
                type="text"
                placeholder="الاسم"
                value={pNameAr}
                onChange={(e) => setpNameAr(e.target.value)}
              />
              <input
                type="text"
                placeholder="Name"
                value={pNameEn}
                onChange={(e) => setpNameEn(e.target.value)}
              />
            </div>
            <div className="inputs_desc">
              <textarea
                type="text"
                placeholder="الوصف"
                value={pDescAr}
                onChange={(e) => setpDescAr(e.target.value)}
              />
              <textarea
                type="text"
                placeholder="Description"
                value={pDescEn}
                onChange={(e) => setpDescEn(e.target.value)}
              />
            </div>
            <div className="addImage_bottem">
              <p className="erro">{updateError}</p>
              <button onClick={updateProductApi}>
                {updateLoading ? <span class="loader"></span> : "تعديل"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallary;
