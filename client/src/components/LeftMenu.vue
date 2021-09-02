<template>
	<div>
		<el-row class="menu_page">
			<el-col>
				<el-menu
					:uniqueOpened="true"
					class="el-menu-vertical-demo"
					background-color="#324057"
					text-color="#fff"
					active-text-color="#409eff"
				>
					<router-link to="/index/home">
						<el-menu-item index="0">
							<i class="el-icon-menu"></i>
							<span class="title">首頁</span>
						</el-menu-item>
					</router-link>
					<template v-for="item in items">
						<el-sub-menu :index="item.path">
							<template #title>
								<i :class="'icon ' + item.icon"></i>
								{{ item.name }}
							</template>
							<router-link
								v-for="(citem, cindex) in item.children"
								:to="citem.path"
								:key="cindex"
							>
								<el-menu-item :index="citem.path">{{
									citem.name
								}}</el-menu-item>
							</router-link>
						</el-sub-menu>
					</template>
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>
<script setup>
import { reactive } from 'vue';
const items = reactive([
	{
		icon: 'el-icon-money',
		name: '資金管理',
		path: 'fund',
		children: [
			{
				path: '/index/fundlist',
				name: '資金流水',
			},
		],
	},
	{
		icon: 'el-icon-s-tools',
		name: '信息管理',
		path: 'info',
		children: [
			{
				path: '/index/infoshow',
				name: '個人訊息',
			},
		],
	},
]);
</script>
<style lang="less" scoped>
.menu_page {
	position: fixed;
	top: 71px;
	left: 0;
	min-height: 100%;
	background-color: #324057;
	z-index: 99;
	.title {
		font-size: 24px;
	}
	.icon {
		font-size: 18px;
	}
	.el-menu ::v-deep {
		border: none;
		.el-sub-menu__title {
			width: 200px;
		}
	}
}
</style>
