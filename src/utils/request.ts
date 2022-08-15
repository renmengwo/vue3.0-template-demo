import axios from 'axios';
import { showFullScreenLoading, tryHideFullScreenLoading } from './loading'
import { ElMessage } from 'element-plus'
const service = axios.create({
    baseURL: '',
    timeout: 60000
})

service.interceptors.request.use(
    config => {
      showFullScreenLoading();
      return config
    },
    error => {
        showFullScreenLoading();
        return Promise.reject(error);
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data;
        const headers = response.headers;
        tryHideFullScreenLoading();
        // 直接下载的时候判断请求头处理下载
        if (headers && (headers['content-type'] === 'application/pdf' || headers['content-type'] === 'application/octet-stream' || headers['content-type'] === 'application/x-msdownload' || headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || headers['content-type'] === 'application/vnd.ms-excel')) {
            downloadBlob(response);
            return response; // 是为了后面
        }
        // if the custom code is not 20000, it is judged as an error.
        if (res.code && res.code !== 200) {
            ElMessage({
                message: res.msg || 'Error',
                type: 'error',
                duration: 5 * 1000
            });
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            return Promise.reject(new Error(res.msg || 'Error'));
        } else {
            return response;
        }
    },
    error => {
        tryHideFullScreenLoading();
        if (error.response) {
            switch (error.response.status) {
                case 401:
                  /*  MessageBox.confirm(`${error.response.data.msg}`, '登录超时', {
                        confirmButtonText: '登录',
                        type: 'warning'
                    }).then(() => {
                        store.dispatch('user/resetToken').then(() => {
                            // location.reload();
                        });
                    });*/
                    break;
                case 500:
                    ElMessage.error('服务器错误，请联系管理员！');
                    break;
                case 404:
                    ElMessage.error('资源不存在！');
                    break;
                case 503:
                    ElMessage.error('服务当前无法处理请求!');
                    break;
                default:
                    ElMessage.error('其他错误，请联系管理员！');
                    break;
            }
        } else {
            ElMessage({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            });
        }
        return Promise.reject(error);
    }
)

export function fetch(url:string, params:any) {
    return service({
        method: 'get',
        url,
        params
    });
}

export function post(url:string, data = {}, config:any) {
    return service({
        ...{
            method: 'post',
            url,
            data
        },
        ...config
    });
}
export function delet(url:string, params:any) {
    return service({
        method: 'delete',
        url,
        params
    });
}

export const downloadBlob = (res:any) => {
    const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' });
    // @ts-ignore
    if (window.navigator.msSaveOrOpenBlob) {
        // @ts-ignore
        navigator.msSaveBlob(blob, res.headers.filename);
    } else {
        const link = document.createElement('a');
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', false, false);
        link.href = URL.createObjectURL(blob);
        link.download = decodeURI(res.headers.filename);
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(link.href);
    }
};

export default service;
