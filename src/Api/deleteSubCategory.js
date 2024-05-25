const URL = "https://hawana.onrender.com/subCategory/removeSubCategory";
const deleteSubCategory = (setAllSubCategory, setUpdateSubCategoryLoading, setUpdateSubCategoryError, categoryId, subcategoryId) => {
    setUpdateSubCategoryLoading(true)
    fetch(`${URL}/${subcategoryId}/${categoryId}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setUpdateSubCategoryLoading(false)
                setAllSubCategory(responseJson.subCategory)
                document
                    .querySelector(".delete_subcategory")
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
export default deleteSubCategory;