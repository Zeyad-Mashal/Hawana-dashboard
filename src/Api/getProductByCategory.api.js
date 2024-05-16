const URL = "https://hawana.onrender.com/product/getByCategory/";
const getProductByCategory = (setAllProducts, categoryId, setProductLoading, setProductError) => {
    setProductLoading(true);
    fetch(`${URL}${categoryId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllProducts(responseJson.allProduct)
                setProductLoading(false);
            } else {
                setProductError(responseJson.message);
                setProductLoading(false);
            }
        }).catch(error => {
            setProductError('Error:', error.message)
            setProductLoading(false);
        })
}
export default getProductByCategory;