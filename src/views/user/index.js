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
        name: this.empName,
        current: current,
        size: this.size
      }
      this.listLoading = true
      queryEmpByName(param).then(response => {
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
      this.title = '新增用户'
      this.$refs.addchild.init(null)
    },
    handleCopy(index, row) {
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
      this.uploadLoading = true
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
      this.uploadLoading = false
    }
  }
}
