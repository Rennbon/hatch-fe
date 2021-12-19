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
    getMyPageV2(params: object) {
        return apiManager.get(
            '/v2/myPage', {
                params: params
            })
    },
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
    getFundIncrement(params: object) {
        return apiManager.get(
            '/fundIncrement', {
                params: params
            })
    },
    getOtherProjects(params: object) {
        return apiManager.get(
            '/otherProjects', {
                params: params
            })
    },
    getOtherProjectsV2(params: object) {
        return apiManager.get(
            '/v2/otherProjects', {
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

    },
    getCounts(params:object){
        return apiManager.get(
            '/v2/counts', {
                params: params
            })
    },
    getProjectMembers(params:object){
        return apiManager.get(
            '/v2/projectMembers', {
                params: params
            })
    }
}
