const URL = "https://hawana.onrender.com/product/removeProduct";
const deleteProduct = (setAllProducts, setProductLoadingDelete, setProductErrorDelete, productId, categoryId) => {
    setProductLoadingDelete(true)
    fetch(`${URL}/${productId}/${categoryId}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setProductLoadingDelete(false)
                setAllProducts(responseJson.allProduct)
                document.querySelector(".delete_image").classList.replace("d-flex", "d-none")
            } else {
                setProductErrorDelete(responseJson.message)
                setProductLoadingDelete(false)
            }
        }).catch(error => {
            setProductErrorDelete(error.message)
            setProductLoadingDelete(false)
        })
}
export default deleteProduct;