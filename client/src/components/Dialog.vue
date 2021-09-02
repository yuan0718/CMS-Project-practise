<template>
	<div class="dialog">
		<el-dialog
			:title="props.dialog.title"
			v-model="props.dialog.show"
			:close-on-click-modal="false"
			:close-on-press-escape="false"
			:append-to-body="false"
		>
			<div class="form">
				<el-form
					ref="form"
					:model="props.formDate"
					:rules="form_rules"
					label-width="120px"
					style="margin:10px;width:auto;"
				>
					<el-form-item label="收支類型:">
						<el-select v-model="props.formDate.type" placeholder="收支類型">
							<el-option
								v-for="(formtype, index) in format_type_list"
								:key="index"
								:label="formtype"
								:value="formtype"
							>
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item prop="describe" label="收支描述:">
						<el-input
							type="describe"
							v-model="props.formDate.describe"
						></el-input>
					</el-form-item>
					<el-form-item prop="income" label="收入:">
						<el-input type="income" v-model="props.formDate.income"></el-input>
					</el-form-item>
					<el-form-item prop="expend" label="支出:">
						<el-input type="expend" v-model="props.formDate.expend"></el-input>
					</el-form-item>
					<el-form-item prop="cash" label="帳戶現金:">
						<el-input type="cash" v-model="props.formDate.cash"></el-input>
					</el-form-item>
					<el-form-item prop="remark" label="備註:">
						<el-input
							type="textarea"
							v-model="props.formDate.remark"
						></el-input>
					</el-form-item>
					<el-form-item class="text_right">
						<el-button @click="props.dialog.show = false">取消</el-button>
						<el-button type="primary" @click="onSubmit">提交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>
<script setup>
import { defineProps, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import axios from '../http';
const props = defineProps({ dialog: Object, formDate: Object });
const emit = defineEmits(['update']);
const format_type_list = reactive([
	'提現',
	'手續費',
	'儲值',
	'優惠券',
	'儲值禮券',
	'轉帳',
]);
const form_rules = reactive({
	describe: [
		{
			required: true,
			message: '收支描述不能為空',
			trigger: 'blur',
		},
	],
	income: [
		{
			required: true,
			message: '收入不能為空',
			trigger: 'blur',
		},
	],
	expend: [
		{
			required: true,
			message: '支出不能為空',
			trigger: 'blur',
		},
	],
	cash: [
		{
			required: true,
			message: '帳戶現金不能為空',
			trigger: 'blur',
		},
	],
});
const form = ref(null);
// 提交表單
const onSubmit = () => {
	form.value.validate((value) => {
		if (value) {
			// 判斷是添加還是修改API
			const url =
				props.dialog.option === 'add' ? 'add' : `edit/${props.formDate.id}`;
			console.log(url);
			axios
				.post(`/api/profiles/${url}`, props.formDate)
				.then((res) => {
					//添加成功
					ElMessage.success({
						message: '添加成功',
						type: 'success',
					});
					//隱藏dialog
					props.dialog.show = false;
					emit('update');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	});
};
</script>
<style lang="less" scoped></style>
