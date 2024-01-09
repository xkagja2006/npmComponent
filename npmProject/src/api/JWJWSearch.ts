import axios, {AxiosInstance} from axios;

const jwjwSearchApi = async (BaseApi: AxiosInstance, getFlag: Boolean, url: string, param: string, success: (data: unknown) => void, fail: (error: unknown) => void) => {
    if(getFlag){
        BaseApi.get(url + `?keyword=${param}`).then(success).catch(fail);
    }else{
        BaseApi.post(url, JSON.stringify(param)).then(success).catch(fail);
    }
}
