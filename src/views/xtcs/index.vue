<template>
  <div class="app-container">
    <div class="filter-container" style="width: 900px;">
      参数名：
      <el-input
        v-model="code"
        value="code"
        placeholder="请输入"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="Search(1)"
      >
        查询
      </el-button>
      <el-button
        :loading="downloadLoading"
        :disabled="true"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        下载模板
      </el-button>
      <el-button
        :loading="uploadLoading"
        :disabled="true"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="clickUpload"
      >
        导入
      </el-button>
    </div>
    <div class="filter-container">
      <el-button
        class="filter-item"
        type="primary"
        @click="add"
      >
        新增
      </el-button>
    </div>
    <div>
      <add-xtcs
        ref="addchild"
        :titles="title"
      />
    </div>
    <div>
      <edit-xtcs
        ref="editchild"
        :titles="title"
      />
    </div>
    <div class="app-container">
      <upload-excel-component
        ref="uploadexcel"
        :out-file="handleFile"
        :before-upload="beforeUpload"
      />
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        label="编号"
        width="200"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.xh }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="参数名"
        width="280"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paramCode }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="参数"
        width="480"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paramValue }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="描述"
        width="380"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.paramDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="280"
      >
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
    <div class="block">
      <el-pagination
        :current-page="current"
        :page-sizes="[5, 10, 15, 20]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="size"
        :pager-count="5"
        :page-count="pages"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import addXtcs from '@/components/Xtcs/AddXtcs'
import editXtcs from '@/components/Xtcs/EditXtcs'
// import copyXtcs from '@/components/Xtcs/CopyXtcs'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { getSystemParamBySearch, deleteXtcs, downloadEmpTemplate, exportEmpList } from '@/api/xtcs'
export default {
  components: {
    addXtcs, editXtcs, UploadExcelComponent
  },
  data() {
    return {
      code: '',
      tableData: [],
      title: '操作界面',
      show: false,
      // editdata: '',
      downloadLoading: false,
      uploadLoading: false,
      empFile: null,
      total: 0,
      pages: 0,
      current: 1,
      size: 10
    }
  },
  methods: {
    handleSizeChange(val) {
      this.size = val
      this.Search(1)
    },
    handleCurrentChange(val) {
      this.current = val
      this.Search(this.current)
    },
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
    Search(current) {
      const param = {
        code: this.code,
        current: current,
        size: this.size
      }
      this.listLoading = true
      getSystemParamBySearch(param).then(response => {
        if (response.success) {
          this.tableData = response.data.records
          if (this.tableData.length == 0) {
            this.$notify.success({
              title: '成功',
              message: '查询记录为空'
            })
          }
          this.total = response.data.total
          this.pages = response.data.pages
          this.current = response.data.current
          this.size = response.data.size
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
      this.title = '编辑系统参数'
      this.$refs.editchild.init(row)
    },
    handleDelete(index, row) {
      this.$confirm('确认删除？')
        .then(_ => {
          const param = {
            xh: row.xh,
            code: row.paramCode
          }
          deleteXtcs(param).then(response => {
            if (response.success) {
              this.tableData = response.data
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
              })
              this.Search(1)
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
      this.title = '新增系统参数'
      this.$refs.addchild.init(null)
    },
    handleCopy(index, row) {
      this.title = '复制系统参数'
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
      this.uploadLoading = true
      this.$refs.uploadexcel.handleUpload()
    },
    handleFile({ results }) {
      const param = results
      exportEmpList(param).then(response => {
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
      this.uploadLoading = false
    }
  }
}
</script>
