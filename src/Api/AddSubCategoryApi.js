const URL = "https://hawana.onrender.com/subCategory/addSubCategory";
const AddSubCategoryApi = (data, setSubCategoryLoading, setSubcategoryError, setAllSubCategory, setSubNameAr, setSubNameEn, setPrevImage, setImageURL, categoryId) => {
    setSubCategoryLoading(true)
    fetch(`${URL}/${categoryId}`, {
        method: "POST",
        body: data
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setSubCategoryLoading(false)
                setAllSubCategory(responseJson.subCategory)
                setSubNameAr("")
                setSubNameEn("")
                setPrevImage("")
                setImageURL("")
            } else {
                setSubcategoryError(responseJson.message)
                setSubCategoryLoading(false)
            }
        }).catch(error => {
            setSubcategoryError(error.message)
            setSubCategoryLoading(false)
        })
}
export default AddSubCategoryApi;