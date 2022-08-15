import { ElMessage } from 'element-plus'
let messageInstance:any = null;
const resetMessage = (options:any) => {
    if (messageInstance) {
        messageInstance.close();
    }
    messageInstance = ElMessage(options);
};

['error', 'success', 'info', 'warning'].forEach(type => {
    // @ts-ignore
    resetMessage[type] = (options:any) => {
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options.type = type;
        return resetMessage(options);
    };
});

export default resetMessage;
