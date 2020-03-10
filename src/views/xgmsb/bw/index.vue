<template>
  <div class="app-container">
    <div
      class="filter-container;block"
      style="width: 1600px;"
    >
      <el-form
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item label="登记序号：">
          <el-input
            v-model="djxh"
            value="djxh"
            placeholder="请输入"
            style="width: 200px;"
            class="filter-item"
          />
        </el-form-item>
        <el-form-item label="所属期起：">
          <el-date-picker
            v-model="sssqq"
            type="month"
            style="width: 150px;"
            placeholder="选择月"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="-">
          <el-date-picker
            v-model="sssqz"
            disabled
            type="month"
            style="width: 150px;"
            placeholder="选择月"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="是否显示失效数据：">
          <el-select
            v-model="value"
            placeholder="请选择"
            style="width: 100px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="Search(1)"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true">
        <div>
          <el-form-item label="正常申报核定报文：">
            <el-input
              v-model="sbbwForm.zcsbbw"
              value="sbbwForm.zcsbbw"
              type="textarea"
              :autosize="{ minRows: 15, maxRows: 18}"
              placeholder="请输入"
              style="width: 600px;"
              class="filter-item"
            />
          </el-form-item>
          <el-form-item label="申报提交报文：">
            <el-input
              v-model="sbbwForm.sbtjbw"
              value="sbbwForm.sbtjbw"
              type="textarea"
              :autosize="{ minRows: 15, maxRows: 18}"
              placeholder="请输入"
              style="width: 600px;"
              class="filter-item"
            />
          </el-form-item>
        </div>
        <div>
          <el-form-item label="往期申报核定报文：">
            <el-input
              v-model="sbbwForm.wqsbbw"
              value="sbbwForm.wqsbbw"
              type="textarea"
              :autosize="{ minRows: 15, maxRows: 18}"
              placeholder="请输入"
              style="width: 600px;"
              class="filter-item"
            />
          </el-form-item>
          <el-form-item label="其他申报报文：">
            <el-input
              v-model="sbbwForm.qtsbbw"
              value="sbbwForm.qtsbbw"
              type="textarea"
              :autosize="{ minRows: 15, maxRows: 18}"
              placeholder="请输入"
              style="width: 600px;"
              class="filter-item"
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import index from '@/scripts/xgmsb/bw/index'
export default index
</script>

<style>
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
</style>
