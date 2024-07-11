const URL = "https://hwnofficial.host/subCategory/updateSubCategory";
const updateSubCategory = (data, setUpdateSubCategoryLoading, setUpdateSubCategoryError,
    setAllSubCategory, setUpdateNameAr, setUpdateNameEn,
    setUpdatePrevImage, setImageURL, categoryId, subCategoryId) => {
    setUpdateSubCategoryLoading(true)
    fetch(`${URL}/${subCategoryId}/${categoryId}`, {
        method: "PUT",
        body: data
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setUpdateSubCategoryLoading(false)
                setAllSubCategory(responseJson.subCategory)
                setUpdateNameAr("")
                setUpdateNameEn("")
                setUpdatePrevImage("")
                setImageURL("")
                document
                    .querySelector(".update_subcategory")
                    .classList.replace("d-flex", "d-none");
            } else {
                setUpdateSubCategoryError(responseJson.message)
                setUpdateSubCategoryLoading(false)
            }
        }).catch(error => {
            setUpdateSubCategoryError(error.message)
            setUpdateSubCategoryLoading(false)
        })
}
export default updateSubCategory;