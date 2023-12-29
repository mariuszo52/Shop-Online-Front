import axios from "axios";

function AxiosInterceptor(){
    const loginPage = "http://localhost:3000/account/login"
    axios.interceptors.request.use(
        (config) => {
            const jwtToken = sessionStorage.getItem("jwt");
            if (jwtToken) {
                config.headers.Authorization = jwtToken;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (error.response && error.response.status === 403) {
                const config = {
                    headers: {
                        "refresh-token": sessionStorage.getItem("refreshToken")
                    }
                }
                if (localStorage.getItem("refreshToken")) {
                    axios.get("http://localhost:8080/login/access-token", config)
                        .then(response => {
                            sessionStorage.setItem("jwt", "Bearer " + response.data)
                            if(error.config.method.toLowerCase() === "get"
                                && window.location.href !== loginPage){
                                window.location.reload();
                            }else {
                                    error.config._retry = true;
                                    axios(error.config)
                            }
                        }).catch(reason => {
                        sessionStorage.removeItem("jwt")
                        if(window.location.href !== loginPage) {
                            window.location.href = '/account/login';
                            console.log(reason.response.data)
                        }

                    });
                } else {
                    if(window.location.href !== loginPage)
                        window.location.href = '/account/login';
                }
            }
            return Promise.reject(error);
        }
    );

    return(
        <></>
    )
}
export default AxiosInterceptor;