const URL = "https://hawana.onrender.com/contact/getContact";
const getContact = (setAllContact, setContactLoading, setContactError) => {
    setContactLoading(true)
    fetch(URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setAllContact(responseJson.allContact);
                setContactLoading(false)
            } else {
                setContactLoading(false)
                setContactError(responseJson.message)
            }
        }).catch(error => {
            setContactLoading(false)
        })
}
export default getContact;