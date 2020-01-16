<template>
  <div class="app-container">
    <div class="filter-container">
      姓名：
      <el-input v-model="empName" value="empName" placeholder="请输入" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="Search">
        Search
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
    </div>
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="add">
        新增
      </el-button>
    </div>
    <div>
      <addUser :model="addModle" />
    </div>
    <el-table
      :data="tableData"
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
        width="180"
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
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
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
import addUser from './addUser'
import { queryEmpByName } from '@/api/employee'
export default {
  data() {
    return {
      empName: '小红',
      addModle: false,
      tableData: []
    }
  },
  component: {
    addUser
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
        this.tableData = response.data
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.MessageBoxTitle = '编辑用户'
      // this.button='编辑'
      this.editdata = row
      this.$refs.chirld.open
      this.centerDialogVisible = true
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    // add(){
    // //   this.MessageBoxTitle = '增加用户'
    // //   // this.button='增加'
    // //   this.editdata = row
    // //   this.$refs.chirld.open
    // //   // this.centerDialogVisible = true
    // },
    add() {
      debugger
      // this.$refs.chirld.open
      this.addModle = true
    }
  }
}
</script>
