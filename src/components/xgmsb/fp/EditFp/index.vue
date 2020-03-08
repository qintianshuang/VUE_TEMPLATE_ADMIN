<template>
  <div class="components-container">
    <el-dialog
      v-el-drag-dialog
      :close-on-click-modal="false"
      :visible.sync="visible"
      :title="title"
      style="width: 2000px;"
      @dragDialog="handleDrag"
    >
      <el-form :inline="true" :label-position="labelPosition" label-width="250px" :model="fpForm" class="demo-form-inline">
        <el-form-item label="登记序号：">
          <el-input v-model="fpForm.djxh" />
        </el-form-item>
        <el-form-item label="纳税人识别号：">
          <el-input v-model="fpForm.nsrsbh" />
        </el-form-item>
        <el-form-item label="社会信用代码：">
          <el-input v-model="fpForm.shxydm" />
        </el-form-item>
        <el-form-item label="所属期起：">
          <el-input v-model="fpForm.skssqq" />
        </el-form-item>
        <el-form-item label="所属期止：">
          <el-input v-model="fpForm.skssqz" />
        </el-form-item>
        <el-form-item label="专用发票自开不含税销售额-货物3%：">
          <el-input v-model="fpForm.zyfpzkbhsxseHw" />
        </el-form-item>
        <el-form-item label="专用发票自开不含税销售额-服物3%：">
          <el-input v-model="fpForm.zyfpzkbhsxseFw1" />
        </el-form-item>
        <el-form-item label="专用发票自开不含税销售额-服物5%：">
          <el-input v-model="fpForm.zyfpzkbhsxseFw2" />
        </el-form-item>
        <el-form-item label="专用发票代开不含税销售额-货物3%：">
          <el-input v-model="fpForm.zyfpdkbhsxseHw" />
        </el-form-item>
        <el-form-item label="专用发票代开不含税销售额-服务3%：">
          <el-input v-model="fpForm.zyfpdkbhsxseFw1" />
        </el-form-item>
        <el-form-item label="专用发票代开不含税销售额-服务5%：">
          <el-input v-model="fpForm.zyfpdkbhsxseFw2" />
        </el-form-item>
        <el-form-item label="普通发票自开不含税销售额-货物3%：">
          <el-input v-model="fpForm.ptfpzkbhsxseHw" />
        </el-form-item>
        <el-form-item label="普通发票自开不含税销售额-服务3%：">
          <el-input v-model="fpForm.ptfpzkbhsxseFw1" />
        </el-form-item>
        <el-form-item label="普通发票自开不含税销售额-服务5%：">
          <el-input v-model="fpForm.ptfpzkbhsxseFw2" />
        </el-form-item>
        <el-form-item label="普通发票代开不含税销售额-货物3%：">
          <el-input v-model="fpForm.ptfpdkbhsxseHw" />
        </el-form-item>
        <el-form-item label="普通发票代开不含税销售额-服务3%：">
          <el-input v-model="fpForm.ptfpdkbhsxseFw1" />
        </el-form-item>
        <el-form-item label="普通发票代开不含税销售额-服务5%：">
          <el-input v-model="fpForm.ptfpdkbhsxseFw2" />
        </el-form-item>
        <el-form-item label="销售不动产普通发票：">
          <el-input v-model="fpForm.xsbdcptfp" />
        </el-form-item>
        <el-form-item label="销售不动产专用发票：">
          <el-input v-model="fpForm.xsbdczyfp" />
        </el-form-item>
        <el-form-item label="开票系统免税销售额：">
          <el-input v-model="fpForm.kpxtmsxse" />
        </el-form-item>
        <el-form-item label="网络发票：">
          <el-input v-model="fpForm.wlfp" />
        </el-form-item>
        <el-form-item label="专用发票自开不含税销售额：">
          <el-input v-model="fpForm.zyfpzkbhsxse" />
        </el-form-item>
        <el-form-item label="普通发票自开不含税销售额：">
          <el-input v-model="fpForm.ptfpzkbhsxse" />
        </el-form-item>
        <el-form-item label="专用发票代开不含税销售额：">
          <el-input v-model="fpForm.zyfpdkbhsxse" />
        </el-form-item>
        <el-form-item label="普通发票代开不含税销售额：">
          <el-input v-model="fpForm.ptfpdkbhsxse" />
        </el-form-item>
        <el-form-item label="操报状态：">
          <el-input v-model="fpForm.cbzt" />
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="ok"
        >保 存</el-button>
        <el-button @click="cancel">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
import { string } from 'jszip/lib/support'
import { editFpData } from '@/api/xgm/fp'

export default {
  name: 'EditFp',
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
      fpForm: {
        djxh: '',
        nsrsbh: '',
        shxydm: '',
        jdDm: '',
        skssqq: '',
        skssqz: '',
        zyfpzkbhsxseHw: '',
        zyfpzkbhsxseFw1: '',
        zyfpzkbhsxseFw2: '',
        zyfpdkbhsxseHw: '',
        zyfpdkbhsxseFw1: '',
        zyfpdkbhsxseFw2: '',
        ptfpzkbhsxseHw: '',
        ptfpzkbhsxseFw1: '',
        ptfpzkbhsxseFw2: '',
        ptfpdkbhsxseHw: '',
        ptfpdkbhsxseFw1: '',
        ptfpdkbhsxseFw2: '',
        xsbdcptfp: '',
        xsbdczyfp: '',
        kpxtmsxse: '',
        wlfp: '',
        zyfpzkbhsxse: '',
        ptfpzkbhsxse: '',
        zyfpdkbhsxse: '',
        ptfpdkbhsxse: '',
        sjjcpch: '',
        sjjcsj: '',
        jdcfp: '',
        cbzt: '',
        hyzp: '',
        jsfp: '',
        dzfp: ''
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
      this.fpForm.djxh = ''
      this.fpForm.nsrsbh = ''
      this.fpForm.shxydm = ''
      this.fpForm.jdDm = ''
      this.fpForm.skssqq = ''
      this.fpForm.skssqz = ''
      this.fpForm.zyfpzkbhsxseHw = ''
      this.fpForm.zyfpzkbhsxseFw1 = ''
      this.fpForm.zyfpzkbhsxseFw2 = ''
      this.fpForm.zyfpdkbhsxseHw = ''
      this.fpForm.zyfpdkbhsxseFw1 = ''
      this.fpForm.zyfpdkbhsxseFw2 = ''
      this.fpForm.ptfpzkbhsxseHw = ''
      this.fpForm.ptfpzkbhsxseFw1 = ''
      this.fpForm.ptfpzkbhsxseFw2 = ''
      this.fpForm.ptfpdkbhsxseHw = ''
      this.fpForm.ptfpdkbhsxseFw1 = ''
      this.fpForm.ptfpdkbhsxseFw2 = ''
      this.fpForm.xsbdcptfp = ''
      this.fpForm.xsbdczyfp = ''
      this.fpForm.kpxtmsxse = ''
      this.fpForm.wlfp = ''
      this.fpForm.zyfpzkbhsxse = ''
      this.fpForm.ptfpzkbhsxse = ''
      this.fpForm.zyfpdkbhsxse = ''
      this.fpForm.ptfpdkbhsxse = ''
      this.fpForm.sjjcpch = ''
      this.fpForm.sjjcsj = ''
      this.fpForm.jdcfp = ''
      this.fpForm.cbzt = ''
      this.fpForm.hyzp = ''
      this.fpForm.jsfp = ''
      this.fpForm.dzfp = ''
      if (data != null) {
        this.fpForm.djxh = data.djxh
        this.fpForm.nsrsbh = data.nsrsbh
        this.fpForm.shxydm = data.shxydm
        this.fpForm.jdDm = data.jdDm
        this.fpForm.skssqq = data.skssqq
        this.fpForm.skssqz = data.skssqz
        this.fpForm.zyfpzkbhsxseHw = data.zyfpzkbhsxseHw
        this.fpForm.zyfpzkbhsxseFw1 = data.zyfpzkbhsxseFw1
        this.fpForm.zyfpzkbhsxseFw2 = data.zyfpzkbhsxseFw2
        this.fpForm.zyfpdkbhsxseHw = data.zyfpdkbhsxseHw
        this.fpForm.zyfpdkbhsxseFw1 = data.zyfpdkbhsxseFw1
        this.fpForm.zyfpdkbhsxseFw2 = data.zyfpdkbhsxseFw2
        this.fpForm.ptfpzkbhsxseHw = data.ptfpzkbhsxseHw
        this.fpForm.ptfpzkbhsxseFw1 = data.ptfpzkbhsxseFw1
        this.fpForm.ptfpzkbhsxseFw2 = data.ptfpzkbhsxseFw2
        this.fpForm.ptfpdkbhsxseHw = data.ptfpdkbhsxseHw
        this.fpForm.ptfpdkbhsxseFw1 = data.ptfpdkbhsxseFw1
        this.fpForm.ptfpdkbhsxseFw2 = data.ptfpdkbhsxseFw2
        this.fpForm.xsbdcptfp = data.xsbdcptfp
        this.fpForm.xsbdczyfp = data.xsbdczyfp
        this.fpForm.kpxtmsxse = data.kpxtmsxse
        this.fpForm.wlfp = data.wlfp
        this.fpForm.zyfpzkbhsxse = data.zyfpzkbhsxse
        this.fpForm.ptfpzkbhsxse = data.ptfpzkbhsxse
        this.fpForm.zyfpdkbhsxse = data.zyfpdkbhsxse
        this.fpForm.ptfpdkbhsxse = data.ptfpdkbhsxse
        this.fpForm.sjjcpch = data.sjjcpch
        this.fpForm.sjjcsj = data.sjjcsj
        this.fpForm.jdcfp = data.jdcfp
        this.fpForm.cbzt = data.cbzt
        this.fpForm.hyzp = data.hyzp
        this.fpForm.jsfp = data.jsfp
        this.fpForm.dzfp = data.dzfp
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
        .catch(_ => { })
    },
    save() {
      editFpData(this.fpForm).then(response => {
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
<style>
.text_right{
    display:inline-block;
    width:100px;
	 text-align:right;
}
</style>
