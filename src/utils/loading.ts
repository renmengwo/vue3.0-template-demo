import { ElLoading } from 'element-plus'
import _ from 'lodash';
let needLoadingRequestCount = 0;
let loading:any;

function startLoading() {
    loading = ElLoading.service({
        lock: true,
        text: '加载中，请稍后......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
    });
}

function endLoading() {
    loading.close();
}

const tryCloseLoading = () => {
    if (needLoadingRequestCount === 0) {
        endLoading();
    }
};

export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading();
    }
    needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return;
    needLoadingRequestCount--;
    if (needLoadingRequestCount === 0) {
        _.debounce(tryCloseLoading, 300)();
    }
}
