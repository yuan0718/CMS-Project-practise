<template>
	<div class="fillContainer">
		<div>
			<el-form :inline="true" ref="add_data" :model="search_date">
				<!-- 篩選 -->
				<el-form-item label="按照時間篩選:">
					<el-date-picker
						v-model="search_date.startTime"
						type="datetime"
						placeholder="選擇開始時間"
					>
					</el-date-picker>
					<span> -- </span>
					<el-date-picker
						v-model="search_date.endTime"
						type="datetime"
						placeholder="選擇結束時間"
					>
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						size="small"
						icon="search "
						@click="handleSearch"
					>
						篩選
					</el-button>
				</el-form-item>
				<el-form-item class="btnRight">
					<el-button
						type="primary"
						size="small"
						icon="view"
						@click="handleAdd"
						v-if="user.identity == 'manager'"
					>
						添加
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="table_container">
			<el-table
				v-if="tableData.length > 0"
				max-height="450"
				border
				:data="tableData"
				style="width: 100%"
			>
				<el-table-column type="index" align="center" label="序號" width="70">
				</el-table-column>
				<el-table-column
					prop="date"
					align="center"
					label="創建時間"
					width="250"
				>
					<template #default="scope">
						<i class="el-icon-time"></i>
						<span style="margin-left: 10px">{{ scope.row.date }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="type"
					align="center"
					label="收支類型"
					width="150"
				>
				</el-table-column>
				<el-table-column
					prop="describe"
					align="center"
					label="收支描述"
					width="180"
				>
				</el-table-column>
				<el-table-column prop="income" align="center" label="收入" width="170">
					<template #default="scope">
						<span style="color:#00d053">{{ scope.row.income }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="expend" align="center" label="支出" width="170">
					<template #default="scope">
						<span style="color:#f56767">{{ scope.row.expend }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="cash"
					align="center"
					label="帳戶現金"
					width="170"
				>
					<template #default="scope">
						<span style="color:#4db3ff">{{ scope.row.cash }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="remark" align="center" label="備註" width="220">
				</el-table-column>
				<el-table-column
					align="center"
					prop="operation"
					fixed="right"
					width="300"
					label="操作"
					
				>
					<template #default="scope">
						<el-button
							type="warning"
							size="small"
							icon="edit"
							@click="handleEdit(scope.$index, scope.row)"
							>編輯</el-button
						>
						<el-button
							size="small"
							type="danger"
							icon="delete"
							@click="handleDelete(scope.$index, scope.row)"
							>刪除</el-button
						>
					</template>
				</el-table-column>
			</el-table>
			<el-row>
				<el-col :span="24">
					<div class="pagination">
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							v-model:current-page="paginations.page_index"
							:page-sizes="paginations.page_sizes"
							:page-size="paginations.page_size"
							:layout="paginations.layout"
							:total="paginations.total"
						>
						</el-pagination>
					</div>
				</el-col>
			</el-row>
		</div>
		<Dialog :dialog="dialog" :formDate="formDate" @update="getProfile"></Dialog>
	</div>
</template>
<script>
import axios from '../http';
import Dialog from '../components/Dialog.vue';
import { ElMessage } from 'element-plus';
export default {
	name: 'fundList',
	data() {
		return {
			tableData: [],
			allTableData: [],
			filterTableDate: [],
			dialog: {
				show: false,
				title: '',
				option: 'edit',
			},
			formDate: {
				type: '',
				describe: '',
				income: '',
				expend: '',
				cash: '',
				remark: '',
			},
			paginations: {
				page_index: 1,
				total: 0,
				page_size: 5,
				page_sizes: [5, 10, 15, 20],
				layout: 'total,sizes,prev,pager,next,jumper',
			},
			search_date: {
				startTime: null,
				endTime: null,
			},
		};
	},
	components: {
		Dialog,
	},
	created() {
		this.getProfile();
	},
	methods: {
		getProfile() {
			axios
				.get('/api/profiles')
				.then((res) => {
					this.allTableData = res.data;
					this.filterTableDate = res.data;
					// 設置分頁數據
					this.setPaginations();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		handleEdit(index, row) {
			//編輯
			this.dialog = {
				show: true,
				title: '修改資金訊息',
				option: 'edit',
			};
			this.formDate = {
				type: row.type,
				describe: row.describe,
				income: row.income,
				expend: row.expend,
				cash: row.cash,
				remark: row.remark,
				id: row._id,
			};
		},
		handleDelete(index, row) {
			//刪除
			axios
				.delete(`/api/profiles/delete/${row._id}`)
				.then((res) => {
					ElMessage.success({
						message: '刪除成功!',
						type: 'success',
					});
					this.getProfile();
				})
				.catch((err) => {
					console.log(err);
				});
		},
		handleAdd() {
			//添加
			this.dialog = {
				show: true,
				title: '添加資金訊息',
				option: 'add',
			};
			this.formDate = {
				type: '',
				describe: '',
				income: '',
				expend: '',
				cash: '',
				remark: '',
			};
		},
		handleSizeChange(page_size) {
			// 切換size
			this.paginations.page_index = 1;
			this.paginations.page_size = page_size;
			this.tableData = this.allTableData.filter((item, index) => {
				return index < page_size;
			});
		},
		handleCurrentChange(page) {
			// 獲取當前頁
			let index = this.paginations.page_size * (page - 1);
			// 數據的總數
			let nums = this.paginations.page_size * page;
			let tables = [];
			for (let i = index; i < nums; i++) {
				if (this.allTableData[i]) {
					tables.push(this.allTableData[i]);
				}
			}
			this.tableData = tables;
		},
		setPaginations() {
			// 分頁屬性設置
			this.paginations.total = this.allTableData.length;
			this.paginations.page_index = 1;
			this.paginations.page_size = 5;
			// 設置默認的分頁數據
			this.tableData = this.allTableData.filter((item, index) => {
				return index < this.paginations.page_size;
			});
		},
		handleSearch() {
			// 篩選功能
			if (!this.search_date.endTime || !this.search_date.startTime) {
				// 判斷時間區間是否選擇
				ElMessage.warning({
					message: '請選擇時間區間',
					type: 'warning',
				});
				this.setPaginations();
				return;
			}
			const sTime = this.search_date.startTime.getTime();
			const eTime = this.search_date.endTime.getTime();
			this.allTableData = this.filterTableDate.filter((item) => {
				let date = new Date(item.date);
				let time = date.getTime();
				return time >= sTime && time <= eTime;
			});
			//分頁數據調用
			this.setPaginations();
		},
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
};
</script>
<style lang="less" scoped>
.fillContainer {
	width: 100%;
	height: 100%;
	padding: 16px;
	box-sizing: border-box;
	overflow: hidden;
	.btnRight {
		float: right;
	}
	.pagination {
		text-align: right;
		margin-top: 10px;
	}
}
</style>
