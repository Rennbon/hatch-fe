import axios from 'axios'

const apiManager = axios.create({
    baseURL: process.env.VUE_APP_BACKEND_URL,
    timeout: 60000
})

apiManager.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

apiManager.interceptors.response.use(
    response => {
        return response
    }, error => {
        return Promise.reject(error)
    }
)
export const BackendApi = {
    getMyPage(params: object) {
        return apiManager.get(
            '/myPage', {
                params: params
            })
    },
    getOtherProjects(params: object){
        return apiManager.get(
            '/otherProjects', {
                params: params
            })
    }
}
