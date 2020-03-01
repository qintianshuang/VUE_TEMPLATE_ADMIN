<template>
  <div class="app-container">
    <div class="filter-container">
      姓名：
      <el-input v-model="empName" value="empName" placeholder="请输入" style="width: 200px;" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="Search">
        查询
      </el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        下载模板
      </el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="exportDownload">
        导入
      </el-button>
    </div>
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="add">
        新增
      </el-button>
    </div>
    <div>
      <add-user ref="addchild" :titles="title" />
    </div>
    <div>
      <edit-user ref="editchild" :titles="title" :editdata="editdata" />
    </div>
    <div>
      <copy-user ref="copychild" :titles="title" :editdata="editdata" />
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        label="姓名"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.empName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="年龄"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="身份证号码"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.identityCard }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="家庭住址"
        width="240"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.liveAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="现居住地址"
        width="240"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.familyAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="电话号码"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="warning"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleCopy(scope.$index, scope.row)"
          >复制</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import addUser from '@/components/User/AddUser'
import editUser from '@/components/User/EditUser'
import copyUser from '@/components/User/CopyUser'
import { queryEmpByName, deleteEmployee, downloadEmpTemplate } from '@/api/employee'
export default {
  components: {
    addUser, editUser, copyUser
  },
  data() {
    return {
      empName: '',
      tableData: [],
      title: '操作界面',
      show: false,
      editdata: '',
      downloadLoading: false
    }
  },
  methods: {
    Search() {
      const param = {
        name: this.empName,
        page: '1',
        limit: '10'
      }
      this.listLoading = true
      queryEmpByName(param).then(response => {
        if (response.success) {
          this.tableData = response.data
        } else {
          this.$notify.error({
            title: '错误',
            message: response.message
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleEdit(index, row) {
      this.title = '编辑用户'
      this.editdata = row
      this.$refs.editchild.init()
    },
    handleDelete(index, row) {
      const param = {
        empNo: row.empNo,
        empName: row.empName,
        identityCard: row.identityCard
      }
      deleteEmployee(param).then(response => {
        if (response.success) {
          this.tableData = response.data
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
          this.Search()
        } else {
          this.$notify.error({
            title: '错误',
            message: response.message
          })
        }
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    add() {
      this.title = '新增用户'
      this.$refs.addchild.init()
    },
    handleCopy(index, row) {
      this.title = '复制用户信息'
      this.editdata = row
      this.$refs.copychild.init()
    },
    handleDownload() {
      this.downloadLoading = true
      downloadEmpTemplate().then(response => {
        console.log(response)
      })
      this.downloadLoading = false
    },
    exportDownload() {
      this.downloadLoading = true
      downloadEmpTemplate().then(response => {
        console.log(response)
      })
      this.downloadLoading = false
    }
  }
}
</script>
