const URL = "https://hawana.onrender.com/picture/removePicture";
const deleteImageApi = (setAllImages, setImageLoadingDelete, setImageErrorDelete, imageId) => {
    setImageLoadingDelete(true)
    fetch(`${URL}/${imageId}`, {
        method: "delete",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setImageLoadingDelete(false)
                setAllImages(responseJson.allPictures)
                document.querySelector(".delete_image").classList.replace("d-flex", "d-none")
            } else {
                setImageErrorDelete(responseJson.message)
                setImageLoadingDelete(false)
            }
        }).catch(error => {
            setImageErrorDelete(error.message)
            setImageLoadingDelete(false)
        })
}
export default deleteImageApi;