const URL = "https://hawana.onrender.com/product/updateProduct";
const udpateProduct = (data, setAllproducts, setUpdateLoading, setUpdateError, productId) => {
    setUpdateLoading(true)
    fetch(`${URL}/${productId}`, {
        method: "PUT",
        body: data
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setUpdateLoading(false)
                setAllproducts(responseJson.allProduct)
                document.querySelector(".update_product").classList.replace("d-flex", "d-none")
            } else {
                setUpdateError(responseJson.message)
                setUpdateLoading(false)
            }
        }).catch(error => {
            setUpdateError(error.message)
            setUpdateLoading(false)
        })
}
export default udpateProduct;