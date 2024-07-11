const URL = "https://hwnofficial.host/picture/addPicture";
const addImage = (picture, setImageLoading, setImageError, setAllImages, setPrevImage) => {
    setImageLoading(true)
    fetch(URL, {
        method: "POST",
        body: picture
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setImageLoading(false)
                setAllImages(responseJson.allPictures)
                setPrevImage("")
            } else {
                setImageError(responseJson.message)
                setImageLoading(false)
            }
        }).catch(error => {
            setImageError(error.message)
            setImageLoading(false)
        })
}
export default addImage;