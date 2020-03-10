import addFp from '@/components/Xgmsb/Fp/AddFp'
import editFp from '@/components/Xgmsb/Fp/EditFp'
import { getXgmfpxxBySearch, deleteFpData } from '@/api/xgm/fp'
export default {
  components: {
    addFp, editFp
  },
  data() {
    return {
      djxh: '',
      tableData: [],
      title: '操作界面',
      show: false,
      sssqq: '',
      sssqz: '',
      total: 0,
      pages: 0,
      current: 1,
      size: 10,
      value: 'N',
      options: [{
        value: 'N',
        label: '不显示'
      }, {
        value: 'Y',
        label: '显示'
      }]
    }
  },
  watch: {
    sssqq() {
      this.blurDate()
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
        djxh: this.djxh,
        sbsq: this.sssqq == null ? '' : this.sssqq,
        isLoseData: this.value,
        current: current,
        size: this.size
      }
      this.listLoading = true
      getXgmfpxxBySearch(param).then(response => {
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
      this.title = '编辑发票参数'
      this.$refs.editchild.init(row)
    },
    handleDelete(index, row) {
      this.$confirm('确认删除？')
        .then(_ => {
          const param = {
            djxh: row.djxh,
            sssqq: row.skssqq,
            sssqz: row.skssqz
          }
          deleteFpData(param).then(response => {
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
      this.title = '新增发票参数'
      this.$refs.addchild.init(null)
    },
    handleCopy(index, row) {
      this.title = '复制发票参数'
      this.$refs.addchild.init(row)
    },
    blurDate() {
      if (this.sssqq == null || this.sssqq == '') {
        this.sssqz = this.sssqq
      } else {
        const year = this.sssqq.substr(0, 4)
        const month = this.sssqq.substr(5, 2)
        const num = parseInt(month)
        if (num >= 1 && num <= 3) {
          this.sssqq = year + '-01-01'
          this.sssqz = year + '-03-31'
        } else if (num >= 4 && num <= 6) {
          this.sssqq = year + '-04-01'
          this.sssqz = year + '-06-30'
        } else if (num >= 7 && num <= 9) {
          this.sssqq = year + '-07-01'
          this.sssqz = year + '-09-30'
        } else {
          this.sssqq = year + '-10-01'
          this.sssqz = year + '-12-31'
        }
      }
    }
  }
}
