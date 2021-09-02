import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus';
import router from './router/index';

let loading;
const startLoading = () => {
	loading = ElLoading.service({
		lock: true,
		text: '拼命加載中...',
		background: 'rgba(0,0,0,.7)',
	});
};
const endLoading = () => {
	loading.close();
};
// Request 攔截
axios.interceptors.request.use(
	(config) => {
		// 加載動畫
		startLoading();
		// 判斷有沒有 token
		if (localStorage.eleToken) {
			// 設置統一的Header
			config.headers.Authorization = localStorage.eleToken;
		}
		return config;
	},
	(err) => {
		// 錯誤提醒
		return Promise.reject(err);
	},
);
// Response 攔截
axios.interceptors.response.use(
	(response) => {
		//結束加載動畫
		endLoading();
		return response;
	},
	(err) => {
		// 錯誤提醒
		endLoading();
		ElMessage.error(err.response.data);
		// 獲取錯誤狀態碼
		const { status } = err.response;
		if (status == 401) {
			ElMessage.error('用戶已登出');
			// 清除Token
			localStorage.removeItem('eleToken');
			// 跳轉到登入頁面
			router.push({
				name: 'login',
			});
		}
		return Promise.reject(err);
	},
);

export default axios;
