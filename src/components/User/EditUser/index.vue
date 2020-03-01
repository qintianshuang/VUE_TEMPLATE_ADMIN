<template>
  <div class="components-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" :visible.sync="visible" :title="title" @dragDialog="handleDrag">
      <div class="demo-input-suffix">
        名&#12288;&#12288;&#12288;称：
        <el-input
          v-model="empForm.empName"
          placeholder="请输入"
          style="width: 200px;"
        />
        &#12288;&#12288;&#12288;年&#12288;&#12288;龄：
        <el-input v-model="empForm.age" placeholder="请输入" style="width: 200px;" />
      </div>
      <div class="demo-input-suffix">
        身份证号码：
        <el-input
          v-model="empForm.identityCard"
          placeholder="请输入"
          style="width: 200px;"
        />
        &#12288;&#12288;&#12288;家庭住址：
        <el-input
          v-model="empForm.liveAddress"
          placeholder="请输入"
          style="width: 200px;"
        />
      </div>
      <div class="demo-input-suffix">
        现居住地&#12288;：
        <el-input
          v-model="empForm.familyAddress"
          placeholder="请输入"
          style="width: 200px;"
        />
        &#12288;&#12288;&#12288;电话号码：
        <el-input
          v-model="empForm.phone"
          placeholder="请输入"
          style="width: 200px;"
        />
      </div>
      <div class="demo-input-suffix">
        邮&#12288;&#12288;&#12288;箱：
        <el-input
          v-model="empForm.email"
          placeholder="请输入"
          style="width: 200px;"
        />
      </div>
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
import { editEmployee } from '@/api/employee'

export default {
  name: 'EditUser',
  directives: { elDragDialog },
  props: {
    titles: {
      type: string,
      default: ''
    },
    editdata: {
      type: string,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      title: this.titles,
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
    },
    editdata() {
      this.empForm = this.editdata
    }
  },
  methods: {
    init() {
      this.visible = true
      this.empForm.empNo = this.editdata.empNo
      this.empForm.empName = this.editdata.empName
      this.empForm.age = this.editdata.age
      this.empForm.identityCard = this.editdata.identityCard
      this.empForm.liveAddress = this.editdata.liveAddress
      this.empForm.familyAddress = this.editdata.familyAddress
      this.empForm.phone = this.editdata.phone
      this.empForm.email = this.editdata.email
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
      editEmployee(this.empForm).then(response => {
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
