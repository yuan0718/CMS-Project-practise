<template>
	<div class="login">
		<div class="form_container">
			<div class="manage_tip">
				<span class="title">後臺管理系統</span>
				<el-form
					:model="loginUser"
					:rules="rules"
					ref="loginForm"
					label-width="80px"
					class="loginForm"
				>
					<el-form-item label="Email" prop="email">
						<el-input
							v-model="loginUser.email"
							placeholder="請輸入Email"
						></el-input>
					</el-form-item>
					<el-form-item label="密碼" prop="password">
						<el-input
							type="password"
							v-model="loginUser.password"
							placeholder="請輸入密碼"
						></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="submit_btn" @click="submitForm"
							>登入
						</el-button>
					</el-form-item>
					<div class="tiparea">
						<p>
							還沒有帳號? 現在<router-link to="/register">註冊</router-link>
						</p>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script setup>
import jwt_decode from 'jwt-decode';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from '../http';
const router = useRouter();
const store = useStore();
const loginUser = reactive({
	email: '',
	password: '',
});
// Form 輸入框驗證
const rules = reactive({
	email: [
		{
			type: 'email',
			required: true,
			message: 'email格式不正確',
			trigger: 'blur',
		},
	],
	password: [
		{
			required: true,
			message: '密碼不能為空',
			trigger: 'blur',
		},
		{
			min: 6,
			max: 30,
			message: '長度要在6到30之間',
			trigger: 'blur',
		},
	],
});
const loginForm = ref(null);
// 判斷是否為空
const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	);
};

const submitForm = () => {
	loginForm.value.validate((valid) => {
		if (valid) {
			axios
				.post('/api/users/login', loginUser)
				.then((res) => {
					//登入成功 獲取 token
					const { token } = res.data;
					//存到 localStorage
					localStorage.setItem('eleToken', token);
					//解析 token
					const decoded = jwt_decode(token);
					// token存儲到vuex中
					store.dispatch('setAuthenticated', !isEmpty(decoded));
					store.dispatch('setUser',decoded);
					router.push({
						path: '/index/home',
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
};
</script>

<style lang="less" scoped>
.login {
	position: relative;
	width: 100vw;
	height: 100vh;
	background: url('../assets/bg.jpg') no-repeat center center;
	background-size: 100% 100%;
	.form_container {
		width: 370px;
		height: 210px;
		position: absolute;
		top: 10%;
		left: 36%;
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		.manage_tip {
			.title {
				font-family: 'Microsoft YaHei';
				font-weight: bold;
				font-size: 26px;
				color: #fff;
			}
			.loginForm {
				margin-top: 20px;
				background: #fff;
				padding: 20px 40px 20px 10px;
				border-radius: 5px;
				box-shadow: 0px 5px 10px #cccccc;
				.submit_btn {
					width: 100%;
				}
				.tiparea {
					font-size: 12px;
					color: #333;
					text-align: right;
					p {
						a {
							color: #409eff;
						}
					}
				}
			}
		}
	}
}
</style>
