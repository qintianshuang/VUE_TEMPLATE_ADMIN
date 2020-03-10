<template>
  <div class="components-container">
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="visible"
      :title="title"
      style="width:2200px;heigth:600px;top:-10%"
    >
      <el-form
        :inline="true"
        :label-position="labelPosition"
        label-width="300px"
        :model="fpForm"
        class="demo-form-inline"
      >
        <el-form-item label="登记序号：">
          <el-input
            v-model="fpForm.djxh"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="所属期起：">
          <el-date-picker
            v-model="sssqq"
            type="month"
            style="width: 180px;"
            placeholder="选择月"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="所属期止：">
          <el-date-picker
            v-model="sssqz"
            disabled
            type="month"
            style="width: 180px;"
            placeholder="选择月"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="专用发票自开不含税销售额-货物3%：">
          <el-input
            v-model="fpForm.zyfpzkbhsxseHw"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="专用发票自开不含税销售额-服物3%：">
          <el-input
            v-model="fpForm.zyfpzkbhsxseFw1"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="专用发票自开不含税销售额-服物5%：">
          <el-input
            v-model="fpForm.zyfpzkbhsxseFw2"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="专用发票代开不含税销售额-货物3%：">
          <el-input
            v-model="fpForm.zyfpdkbhsxseHw"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="专用发票代开不含税销售额-服务3%：">
          <el-input
            v-model="fpForm.zyfpdkbhsxseFw1"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="专用发票代开不含税销售额-服务5%：">
          <el-input
            v-model="fpForm.zyfpdkbhsxseFw2"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="普通发票自开不含税销售额-货物3%：">
          <el-input
            v-model="fpForm.ptfpzkbhsxseHw"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="普通发票自开不含税销售额-服务3%：">
          <el-input
            v-model="fpForm.ptfpzkbhsxseFw1"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="普通发票自开不含税销售额-服务5%：">
          <el-input
            v-model="fpForm.ptfpzkbhsxseFw2"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="普通发票代开不含税销售额-货物3%：">
          <el-input
            v-model="fpForm.ptfpdkbhsxseHw"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="普通发票代开不含税销售额-服务3%：">
          <el-input
            v-model="fpForm.ptfpdkbhsxseFw1"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="普通发票代开不含税销售额-服务5%：">
          <el-input
            v-model="fpForm.ptfpdkbhsxseFw2"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="销售不动产普通发票：">
          <el-input
            v-model="fpForm.xsbdcptfp"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="销售不动产专用发票：">
          <el-input
            v-model="fpForm.xsbdczyfp"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="开票系统免税销售额：">
          <el-input
            v-model="fpForm.kpxtmsxse"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="网络发票：">
          <el-input
            v-model="fpForm.wlfp"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="专用发票自开不含税销售额：">
          <el-input
            v-model="fpForm.zyfpzkbhsxse"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="普通发票自开不含税销售额：">
          <el-input
            v-model="fpForm.ptfpzkbhsxse"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="专用发票代开不含税销售额：">
          <el-input
            v-model="fpForm.zyfpdkbhsxse"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="普通发票代开不含税销售额：">
          <el-input
            v-model="fpForm.ptfpdkbhsxse"
            class="el-input-style"
          />
        </el-form-item>
        <el-form-item label="操报状态：">
          <el-select v-model="cbzt" placeholder="请选择" style="width: 180px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
import { saveFpData } from '@/api/xgm/fp'
import { date } from 'jszip/lib/defaults'
const moment = require('moment')
export default {
  name: 'AddFp',
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
      sssqq: '',
      sssqz: '',
      cbzt: '',
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
      },
      options: [{
        value: 'Y',
        label: 'Y'
      }, {
        value: 'F',
        label: 'F'
      }, {
        value: 'Z',
        label: 'Z'
      }, {
        value: 'N',
        label: 'N'
      }]
    }
  },
  watch: {
    titles() {
      this.title = this.titles
    },
    sssqq() {
      this.blurDate()
    },
    cbzt() {
      this.fpForm.cbzt = this.cbzt
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
      this.sssqq = ''
      this.sssqz = ''
      this.cbzt = ''
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
        this.sssqq = moment(data.skssqq).format('YYYY-MM-DD')
        this.sssqz = moment(data.skssqz).format('YYYY-MM-DD')
        this.cbzt = data.cbzt
      }
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
      this.fpForm.cbzt = this.cbzt
      saveFpData(this.fpForm).then(response => {
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
        }
        this.$parent.Search(1)
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
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
        this.fpForm.skssqq = this.sssqq
        this.fpForm.skssqz = this.sssqz
      }
    }
  }
}
</script>
<style>
.text_right {
  display: inline-block;
  width: 100px;
  text-align: right;
}
.el-input-style {
  width: 180px;
}
/* .el-dialog-css {
  width: 2200px;
  height: 1000px; */
  /* display: flex;
      flex-direction: column; */
  /* margin: 0 !important; */
  /* position:absolute;  */
  /* top: 00%; */
  /* left:50%; */
  /* transform:translate(-50%,-50%);  */
  /* max-height:calc(100% - 10px);
      max-width:calc(100% - 10px); */
  /* display: flex;
  align-items: center;
  justify-content: center; */
/* }
.el-dialog .el-dialog__body {
  flex: 1;
  overflow:hidden;
} */
</style>
