const URL = "https://hawana.onrender.com/category/getcategory";
const getAllCategory = (setAllCategory) => {
    fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllCategory(responseJson.allCategory)
            } else {
                console.log(responseJson.message);
            }
        }).catch(error => {
            console.log('Error:', error.message)
        })
}
export default getAllCategory;