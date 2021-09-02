<template>
	<div class="info-show">
		<el-row class="row-bg">
			<el-col :span="8">
				<div class="user">
					<img :src="user.avatar" class="avacta" alt="" />
				</div>
			</el-col>
			<el-col :span="16">
				<div class="userinfo">
					<div class="user-item">
						<el-icon :size="size">
							<avatar />
						</el-icon>
						<span v-text="user.name"></span>
					</div>
					<div class="user-item">
						<el-icon :size="size">
							<tools />
						</el-icon>
						<span v-text="position"></span>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>
<script setup>
import { Tools, Avatar } from '@element-plus/icons';
import { reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const size = ref(24);
// 獲取 vuex 的 user
const user = reactive({
	avatar: store.state.user.avatar,
	identity: store.state.user.identity,
	name: store.state.user.name,
});
// 判斷登入人員身分
const position = computed(() => {
	switch (user.identity) {
		case 'manager':
			return '管理員';
		case 'employee':
			return '員工';
	}
});
</script>
<style lang="less" scoped>
.info-show {
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	.row-bg {
		width: 100%;
		height: 100%;
		.user {
			text-align: center;
			position: relative;
			top: 30%;
			img {
				width: 150px;
				border-radius: 50%;
			}
		}
		.userinfo {
			height: 100%;
			background: #eee;
		}
		.user-item {
			position: relative;
			top: 30%;
			padding: 26px;
			font-size: 28px;
			color: #333;
			span {
				font-size: 36px;
				font-weight: bold;
			}
		}
	}
}
</style>
