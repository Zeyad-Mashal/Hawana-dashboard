const URL = "https://hawana.onrender.com/picture/updatePicture";
const updateImage = (picture, setAllImages, setUpdateLoading, setUpdateError, imageId) => {
    setUpdateLoading(true)
    fetch(`${URL}/${imageId}`, {
        method: "PUT",
        body: picture
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setUpdateLoading(false)
                setAllImages(responseJson.allPictures)
                document.querySelector(".update_image").classList.replace("d-flex", "d-none")
            } else {
                setUpdateError(responseJson.message)
                setUpdateLoading(false)
            }
        }).catch(error => {
            setUpdateError(error.message)
            setUpdateLoading(false)
        })
}
export default updateImage;