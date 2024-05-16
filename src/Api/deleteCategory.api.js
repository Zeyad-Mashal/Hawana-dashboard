const URL = "https://hawana.onrender.com/category/removeCategory";
const deleteCategory = (setAllCategory, setUpdateCategoryLoading, setUpdateCategoryError, categoryId) => {
    setUpdateCategoryLoading(true)
    fetch(`${URL}/${categoryId}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setUpdateCategoryLoading(false)
                setAllCategory(responseJson.allCategory)
                document.querySelector(".delete_category").classList.replace("d-flex", "d-none")
            } else {
                setUpdateCategoryError(responseJson.message)
                setUpdateCategoryLoading(false)
            }
        }).catch(error => {
            setUpdateCategoryError(error.message)
            setUpdateCategoryLoading(false)
        })
}
export default deleteCategory;