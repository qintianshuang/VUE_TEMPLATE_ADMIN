<template>
  <div class="components-container">
    <el-dialog v-el-drag-dialog :close-on-click-modal="false" :visible.sync="visible" :title="title" @dragDialog="handleDrag">
      <div class="demo-input-suffix">
        <label>参&#12288;数&#12288;名：</label>
        <el-input v-model="xtcsForm.paramCode" placeholder="请输入" style="width: 600px;" />
      </div>
      <div class="demo-input-suffix">
        <label>描&#12288;&#12288;&#12288;述：</label>
        <el-input v-model="xtcsForm.paramValue" type="textarea" autosize placeholder="请输入" style="width: 600px;" />
      </div>
      <div class="demo-input-suffix">
        <label>描&#12288;&#12288;&#12288;述：</label>
        <el-input v-model="xtcsForm.paramDesc" type="textarea" autosizeplaceholder="请输入" style="maxWidth: 600px;" />
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
import { editXtcs } from '@/api/xtcs'

export default {
  name: 'EditXtcs',
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
      xtcsForm: {
        xh: '',
        paramCode: '',
        paramValue: '',
        paramDesc: ''
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
      this.visible = true
      this.xtcsForm.xh = data.xh
      this.xtcsForm.paramCode = data.paramCode
      this.xtcsForm.paramValue = data.paramValue
      this.xtcsForm.paramDesc = data.paramDesc
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
        .catch(_ => { })
    },
    save() {
      editXtcs(this.xtcsForm).then(response => {
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
        .catch(_ => { })
    }
  }
}
</script>
