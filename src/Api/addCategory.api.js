const URL = "https://hawana.onrender.com/category/addCategory";
const addCategory = (data, setCategoryLoading, setCategoryError, setAllCategory, setCategoryNameEn, setCategoryNameAr, setPrevImage, setImageURL) => {
    setCategoryLoading(true)
    fetch(URL, {
        method: "POST",
        body: data
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setCategoryLoading(false)
                setAllCategory(responseJson.allCategory)
                setCategoryNameEn("")
                setCategoryNameAr("")
                setPrevImage("")
                setImageURL("")
            } else {
                setCategoryError(responseJson.message)
                setCategoryLoading(false)
            }
        }).catch(error => {
            setCategoryError(error.message)
            setCategoryLoading(false)
        })
}
export default addCategory;