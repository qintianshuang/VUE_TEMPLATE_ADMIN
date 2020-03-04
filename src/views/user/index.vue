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
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="clickUpload">
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
      <edit-user ref="editchild" :titles="title" />
    </div>
    <!-- <div>
      <copy-user ref="copychild" :titles="title" :editdata="editdata" />
    </div> -->
    <div class="app-container">
      <upload-excel-component ref="uploadexcel" :out-file="handleFile" :before-upload="beforeUpload" />
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
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { queryEmpByName, deleteEmployee, downloadEmpTemplate, exportEmpList } from '@/api/employee'
export default {
  components: {
    addUser, editUser, UploadExcelComponent
  },
  data() {
    return {
      empName: '',
      tableData: [],
      title: '操作界面',
      show: false,
      downloadLoading: false,
      empFile: null
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
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
      this.$refs.editchild.init(row)
    },
    handleDelete(index, row) {
      this.$confirm('确认取消？')
        .then(_ => {
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
        })
        .catch(_ => { })
    },
    add() {
      this.title = '新增用户'
      this.$refs.addchild.init(null)
    },
    handleCopy(index, row) {
      console.log(row)
      this.title = '复制用户信息'
      this.$refs.addchild.init(row)
    },
    handleDownload() {
      this.downloadLoading = true
      downloadEmpTemplate().then(response => {
        const fileName = '用户信息模板下载.xlsx'
        const excelBlob = response.data
        if ('msSaveOrOpenBlob' in navigator) {
          // Microsoft Edge and Microsoft Internet Explorer 10-11
          window.navigator.msSaveOrOpenBlob(excelBlob, fileName)
        } else {
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          const blob = new Blob([excelBlob])
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          document.body.removeChild(elink)
        }
      })
      this.downloadLoading = false
    },
    clickUpload() {
      this.downloadLoading = true
      this.$refs.uploadexcel.handleUpload()
    },
    handleFile({ results }) {
      console.log(results)
      const param = results
      exportEmpList(param).then(response => {
        console.log(response)
        if (response.success) {
          this.$notify.success({
            title: '成功',
            message: '上传成功'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: response.message
          })
        }
      })
      this.downloadLoading = false
    }
  }
}
</script>
