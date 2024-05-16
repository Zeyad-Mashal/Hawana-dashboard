const URL = "https://hawana.onrender.com/product/addProduct";
const addProduct = (data, setAddProductLoading, setAddProductError, setAllProducts) => {
    setAddProductLoading(true)
    fetch(URL, {
        method: "POST",
        body: data
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAddProductLoading(false)
                setAllProducts(responseJson.allProduct)
                document.querySelector(".gallary_conetent_add").classList.replace("d-block", "d-none");
            } else {
                setAddProductError(responseJson.message)
                setAddProductLoading(false)
            }
        }).catch(error => {
            setAddProductError(error.message)
            setAddProductLoading(false)
        })
}
export default addProduct;