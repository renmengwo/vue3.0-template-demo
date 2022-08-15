import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import App from './App.vue'
import '@/permission';
import router from '@/router';

const app = createApp(App)

app.use(router).use(ElementPlus)
app.mount('#app')
