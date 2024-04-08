const URL = "https://hawana.onrender.com/auth/login";
const LoginApi = (data, setLoginLoading, setLoginError) => {
    setLoginLoading(true)
    fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(responseJson => {
            if (responseJson.message == 'success') {
                setLoginLoading(false)
                localStorage.setItem("Hawana-Logged-In", "true")
                window.location.reload();
            } else {
                setLoginError(responseJson.message)
                setLoginLoading(false)
            }
        }).catch(error => {
            setLoginError(error.message)
            setLoginLoading(false)
        })
}
export default LoginApi;