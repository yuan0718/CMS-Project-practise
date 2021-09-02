<template>
	<div class="index">
		<HeadNav />
		<LeftMenu />
		<div class="rightContainer">
			<router-view />
		</div>
	</div>
</template>
<script setup>
import HeadNav from '../components/HeadNav.vue';
import LeftMenu from '../components/LeftMenu.vue';
import jwt_decode from 'jwt-decode';
import { useStore } from 'vuex';
const store = useStore();
// 判斷是否為空
const isEmpty = (value) => {
	return (
		value === undefined ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	);
};
if (localStorage.eleToken) {
	const decoded = jwt_decode(localStorage.eleToken);
	store.dispatch('setAuthenticated', !isEmpty(decoded));
	store.dispatch('setUser', decoded);
}
</script>
<style lang="less" scoped>
.index {
	width: 100%;
	height: 100vh;
	overflow: hidden;
	.rightContainer {
		position: relative;
		top: 0;
		left: 200px;
		width: calc(100% - 200px);
		height: calc(100% - 71px);
	}
}
</style>
