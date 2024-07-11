const URL = "https://hwnofficial.host/subCategory/getSubCategory/";
const getSubCategory = (setAllSubCategory, categoryId, setSubCategoryLoading, setSubcategoryError) => {
    setSubCategoryLoading(true);
    fetch(`${URL}${categoryId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllSubCategory(responseJson.subCategory)
                setSubCategoryLoading(false);
            } else {
                setSubcategoryError(responseJson.message);
                setSubCategoryLoading(false);
            }
        }).catch(error => {
            setSubcategoryError('Error:', error.message)
            setSubCategoryLoading(false);
        })
}
export default getSubCategory;