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
    getOtherFunds(params: object) {
        return apiManager.get(
            '/otherFunds', {
                params: params
            })
    },
    getOtherProjects(params: object) {
        return apiManager.get(
            '/otherProjects', {
                params: params
            })
    },
    getProjectsByFund(params: object) {
        return apiManager.get(
            '/projectsByFund', {
                params: params
            })
    },
    getProjectInfo(params: object) {
        return apiManager.get(
            '/projectInfo', {
                params: params
            })
    },
    getProjectMethodLogs(params: object) {
        return apiManager.get(
            '/projectMethodLogs', {
                params: params
            })
    },
    getProjectFirstMethodHeight(params: object) {
        return apiManager.get(
            '/projectFirstMethodHeight', {
                params: params
            })
    },
    getDailyFund(params: object) {
        return apiManager.get(
            '/dailyFund', {
                params: params
            })

    },
    getInboxes(params: object) {
        return apiManager.get(
            '/inbox', {
                params: params
            })

    }
}
