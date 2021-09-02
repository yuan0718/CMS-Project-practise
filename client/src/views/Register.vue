<template>
	<div class="register">
		<div class="form_container">
			<div class="manage_tip">
				<span class="title">後臺管理系統</span>
				<el-form
					:model="registerUser"
					:rules="rules"
					ref="registerForm"
					label-width="80px"
					class="registerForm"
				>
					<el-form-item label="用戶名" prop="name">
						<el-input
							v-model="registerUser.name"
							placeholder="請輸入用戶名"
						></el-input>
					</el-form-item>
					<el-form-item label="Email" prop="email">
						<el-input
							v-model="registerUser.email"
							placeholder="請輸入Email"
						></el-input>
					</el-form-item>
					<el-form-item label="密碼" prop="password">
						<el-input
							type="password"
							v-model="registerUser.password"
							placeholder="請輸入密碼"
						></el-input>
					</el-form-item>
					<el-form-item label="確認密碼" prop="password2">
						<el-input
							type="password"
							v-model="registerUser.password2"
							placeholder="請確認密碼"
						></el-input>
					</el-form-item>
					<el-form-item label="選擇身分">
						<el-select v-model="registerUser.identity" placeholder="請選擇身分">
							<el-option label="管理員" value="manager"></el-option>
							<el-option label="員工" value="employee"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" class="submit_btn" @click="submitForm"
							>註冊
						</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
import axios from '../http';
const router = useRouter()
const registerUser = reactive({
	name: '',
	email: '',
	password: '',
	password2: '',
	identity: '',
});
// 密碼驗證
const validatePass2 = (rule, value, callback) => {
	if (value !== registerUser.password) {
		callback(new Error('兩次輸入密碼不一致!'));
	} else {
		callback();
	}
};
// Form 輸入框驗證
const rules = reactive({
	name: [
		{
			required: true,
			message: '用戶名不能為空',
			trigger: 'blur',
		},
		{
			min: 2,
			max: 30,
			message: '用戶名長度要在2到30之間',
			trigger: 'blur',
		},
	],
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
	password2: [
		{
			required: true,
			message: '確認密碼不能為空',
			trigger: 'blur',
		},
		{
			min: 6,
			max: 30,
			message: '長度要在6到30之間',
			trigger: 'blur',
		},
		{
			validator: validatePass2,
			trigger: 'blur',
		},
	],
});
const registerForm = ref(null);
const submitForm = () => {
	registerForm.value.validate((valid) => {
		if (valid) {
			axios
				.post('/api/users/register', registerUser)
				.then((res) => {
					//註冊成功
					ElMessage.success({
						message: '帳號註冊成功',
						type: 'success',
					});
					router.push({
						path:'/login'
					})
				})
				.catch((err) => {
					console.log(err);
				});
			
		}
	});
};
</script>

<style lang="less" scoped>
.register {
	position: absolute;
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
			.registerForm {
				margin-top: 20px;
				background: #fff;
				padding: 20px 40px 20px 10px;
				border-radius: 5px;
				box-shadow: 0px 5px 10px #cccccc;
				.submit_btn {
					width: 100%;
				}
			}
		}
	}
}
</style>
