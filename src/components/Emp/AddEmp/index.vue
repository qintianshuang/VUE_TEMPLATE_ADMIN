<template>
  <div class="components-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" :visible.sync="visible" :title="title" style="width: 1400px;" @dragDialog="handleDrag">
      <el-form :inline="true" :label-position="labelPosition" label-width="250px" :model="empForm" class="demo-form-inline">
        <el-form-item label="名称：">
          <el-input v-model="empForm.empName" />
        </el-form-item>
        <el-form-item label="年龄：">
          <el-input v-model="empForm.age" />
        </el-form-item>
        <el-form-item label="身份证号码：">
          <el-input v-model="empForm.identityCard" />
        </el-form-item>
        <el-form-item label="家庭住址：">
          <el-input v-model="empForm.liveAddress" />
        </el-form-item>
        <el-form-item label="现居住地：">
          <el-input v-model="empForm.familyAddress" />
        </el-form-item>
        <el-form-item label="电话号码：">
          <el-input v-model="empForm.phone" />
        </el-form-item>
        <el-form-item label="邮箱：">
          <el-input v-model="empForm.email" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ok">保 存</el-button>
        <el-button @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import { string } from 'jszip/lib/support'
import { saveEmployee } from '@/api/employee'

export default {
  name: 'AddEmp',
  directives: { elDragDialog },
  props: {
    titles: {
      type: string,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      title: this.titles,
      labelPosition: 'right',
      empForm: {
        empNo: '',
        empName: '',
        age: '',
        identityCard: '',
        liveAddress: '',
        familyAddress: '',
        phone: '',
        email: ''
      }
    }
  },
  watch: {
    titles() {
      this.title = this.titles
    }
  },
  methods: {
    init(data) {
      console.log(data)
      this.visible = true
      this.empForm.empNo = ''
      this.empForm.empName = ''
      this.empForm.age = ''
      this.empForm.identityCard = ''
      this.empForm.liveAddress = ''
      this.empForm.familyAddress = ''
      this.empForm.phone = ''
      this.empForm.email = ''
      if (data != null) {
        this.empForm.empNo = data.empNo
        this.empForm.empName = data.empName
        this.empForm.age = data.age
        this.empForm.identityCard = data.identityCard
        this.empForm.liveAddress = data.liveAddress
        this.empForm.familyAddress = data.familyAddress
        this.empForm.phone = data.phone
        this.empForm.email = data.email
      }
    },
    // v-el-drag-dialog onDrag callback function
    handleDrag() {
      this.$refs.select.blur()
    },
    ok() {
      this.save()
    },
    cancel() {
      this.$confirm('确认取消？')
        .then(_ => {
          this.visible = false
        })
        .catch(_ => {})
    },
    save() {
      saveEmployee(this.empForm).then(response => {
        if (response.success) {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          })
          this.visible = false
        } else {
          this.$notify.error({
            title: '错误',
            message: response.message
          })
          return
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
