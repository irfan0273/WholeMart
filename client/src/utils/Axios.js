import axios from "axios";
import SummaryApi, { baseURl } from "../common/SummaryApi";

const Axios= axios.create({
    baseURL: baseURl,
    withCredentials: true
})
// Sending access Token in the Header
Axios.interceptors.request.use(
    async(config)=>{
        const acceestoken = localStorage.getItem('accesstoken')

        if(acceestoken){
            config.headers.Authorization = `Bearer ${acceestoken}`
        }
        return config
    },
    (error) =>{
        return Promise.reject(error)
    }
    )
    //Extent the life of access token with the help of refresh token
        
    Axios.interceptors.request.use(
        (response)=>{
            return response
        },
        async(error)=>{
            let originalRequest = error.config

            if(error.response.status === 401 && !originalRequest._retry){
                originalRequest._retry = true
            const refreshToken = localStorage.getItem('refreshtoken')

            if(refreshToken){
                const newAccessToken =await refreshAccessToken(refreshToken)
                if(newAccessToken){
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originalRequest)
                }
            }
            }

            return Promise.reject(error)
        }
    )

    const refreshAccessToken = async(refreshToken)=>{
        try {
            const response= await Axios({
                ...SummaryApi.refreshToken,
                headers:{
                    Authorization:`Bearer ${refreshToken}`
                }
            })

            const accesstoken = response.data.data.accesstoken
            localStorage.setItem('accesstoken',accesstoken)
            return accesstoken
        } catch (error) {
            console.log(error)
            
        }

    }

   

export default Axios