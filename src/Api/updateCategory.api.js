const URL = "https://hawana.onrender.com/category/updateCategory";
const updateCategory = (data, setAllCategory, setUpdateCategoryLoading, setUpdateCategoryError, categoryId, setUpdatePrevImage, setImageURL) => {
    setUpdateCategoryLoading(true)
    fetch(`${URL}/${categoryId}`, {
        method: "PUT",
        body: data
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setUpdateCategoryLoading(false)
                setAllCategory(responseJson.allCategory)
                document.querySelector(".update_category").classList.replace("d-flex", "d-none")
                setUpdatePrevImage("")
                setImageURL("")
            } else {
                setUpdateCategoryError(responseJson.message)
                setUpdateCategoryLoading(false)
            }
        }).catch(error => {
            setUpdateCategoryError(error.message)
            setUpdateCategoryLoading(false)
        })
}
export default updateCategory;