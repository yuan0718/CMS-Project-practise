<template>
	<header class="head-nav">
		<el-row>
			<el-col :span="6" class="log-container">
				<img src="../assets/logo.png" class="logo" alt="" />
				<span class="title">後臺管理系統</span>
			</el-col>
			<el-col :span="6" :offset="12" class="user">
				<div class="user-info">
					<img :src="user.avatar" class="avatar" alt="" />
					<div class="welcome">
						<p class="name comename">歡迎</p>
						<p class="name avatarname" v-text="user.name"></p>
					</div>
					<span class="username">
						<!-- 下拉箭頭 -->
						<el-dropdown
							trigger="click"
							placement="bottom-end"
							@command="setDialogInfo"
						>
							<span class="el-dropdown-link">
								<i class="el-icon-caret-bottom el-icon--right"></i>
							</span>
							<template #dropdown>
								<el-dropdown-menu>
									<el-dropdown-item command="info">個人訊息</el-dropdown-item>
									<el-dropdown-item command="logout">退出</el-dropdown-item>
								</el-dropdown-menu>
							</template>
						</el-dropdown>
					</span>
				</div>
			</el-col>
		</el-row>
	</header>
</template>
<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
const store = useStore();
const router = useRouter();
// 獲取 vuex 的 user
const user = reactive({
	avatar: store.state.user.avatar,
	exp: store.state.user.exp,
	iat: store.state.user.iat,
	id: store.state.user.id,
	identity: store.state.user.identity,
	name: store.state.user.name,
});
const setDialogInfo = (comItem) => {
	switch (comItem) {
		case 'info':
			showInfoList();
			break;
		case 'logout':
			logout();
			break;
	}
};
const showInfoList = () => {
	//跳轉
	router.push({
		path: '/index/infoshow',
	});
};
const logout = () => {
	//清除 token
	localStorage.removeItem('eleToken');
	//清除 vuex store
	store.dispatch('clearCurrentState');
	//跳轉
	router.push({
		path: '/login',
	});
};
</script>

<style lang="less" scoped>
.head-nav {
	width: 100vw;
	height: 60px;
	min-width: 600px;
	padding: 5px;
	background: #324057;
	color: #fff;
	border-bottom: 1px solid #1f2d3d;
	.log-container {
		line-height: 60px;
		.logo {
			height: 50px;
			width: 50px;
			margin-right: 5px;
			vertical-align: middle;
			display: inline-block;
		}
		.title {
			vertical-align: middle;
			font-size: 22px;
			font-family: 'Microsoft YaHei';
			letter-spacing: 3px;
		}
	}
	.user {
		line-height: 60px;
		text-align: right;
		float: right;
		padding-right: 10px;
		.user-info {
			.avatar {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				vertical-align: middle;
				display: inline-block;
			}
			.welcome {
				display: inline-block;
				width: auto;
				vertical-align: middle;
				padding: 0 5px;
				.name {
					line-height: 20px;
					text-align: center;
					font-size: 14px;
				}
				.comename {
					font-size: 12px;
				}
				.avatarname {
					color: #409eff;
					font-weight: bolder;
				}
			}
			.username {
				cursor: pointer;
				margin-right: 5px;
				.el-dropdown-link {
					color: #fff;
				}
			}
		}
	}
}
</style>
