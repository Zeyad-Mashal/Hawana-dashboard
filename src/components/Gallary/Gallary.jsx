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

  const deleteImage = (productId, categoryId) => {
    setProductId(productId);
    setCategoryId(categoryId);
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
  const getCategoryId = (e) => {
    const categoryName = e.target.value;
    if (categoryName != "أختر الفئة المطلوبة") {
      const categoryID = allcategory.filter(
        (item) => item.categoryName_Ar == categoryName
      )[0]._id;
      setCategoryId(categoryID);
      getAllProductByCategory(categoryID);
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
    document
      .querySelector(".gallary_conetent_add")
      .classList.replace("d-none", "d-block");
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
        categoryId == ""
      ) {
        setAddProductError("قم بإدخال بيانات المنتج كاملة");
      } else {
        let productData = new FormData();
        productData.append("image", imageURL);
        productData.append("translation.ar.productName", pNameAr);
        productData.append("translation.ar.description", pDescAr);
        productData.append("translation.en.productName", pNameEn);
        productData.append("translation.en.description", pDescEn);
        productData.append("category", categoryId);
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
      productData.append("category", categoryId);
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
      categoryId
    );
  };
  return (
    <div className="gallary">
      <div className="gallary_container">
        <button className="add_btn" onClick={openAdd}>
          أضافة منتج جديد
        </button>
        <select onChange={getCategoryId}>
          <option value="اختر الفئة المطلوبة">اختر الفئة المطلوبة</option>
          {allcategory.map((item) => {
            return (
              <option value={item.categoryName_Ar}>
                {item.categoryName_Ar}
              </option>
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
                <select onChange={getCategoryId}>
                  <option value="أختر الفئة المطلوبة">
                    أختر الفئة المطلوبة
                  </option>
                  {allcategory.map((item) => {
                    return (
                      <option value={item.categoryName_Ar}>
                        {item.categoryName_Ar}
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
                    <button
                      onClick={() => deleteImage(item._id, item.category)}
                    >
                      حذف
                    </button>
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
