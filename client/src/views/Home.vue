<template>
	<div class="home">
		<div class="container">
			<h1 class="title">後臺管理系統</h1>
			<p class="lead">個人練習後台管理系統!!</p>
		</div>
	</div>
</template>
<script setup></script>
<style lang="less" scoped>
.home {
	width: 100%;
	height: 100%;
	background: url('../assets/showcase.png') no-repeat;
	background-size: 100% 100%;
	.container {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-top: 100px;
		background: rgba(0, 0, 0, 0.7);
		text-align: center;
		color: #fff;
		.title {
			font-size: 30px;
		}
		.lead {
			margin-top: 50px;
			font-size: 22px;
		}
	}
}
</style>
