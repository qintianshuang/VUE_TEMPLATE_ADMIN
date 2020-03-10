<template>
  <div class="app-container">
    <div
      class="filter-container;block"
      style="width: 1200px;"
    >
      <el-form :inline="true" class="demo-form-inline">
        <div>
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
            <el-select v-model="value" placeholder="请选择" style="width: 100px;">
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
        </div>
        <div>
          <el-button
            class="filter-item"
            type="primary"
            @click="add"
          >
            新增
          </el-button>
        </div>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      stripe
      height="700"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form
            label-position="left"
            inline
            class="demo-table-expand"
          >
            <el-form-item label="登记序号：" label-width="260px">
              <span>{{ props.row.djxh }}</span>
            </el-form-item>
            <el-form-item label="纳税人识别号：" label-width="260px">
              <span>{{ props.row.nsrsbh }}</span>
            </el-form-item>
            <el-form-item label="社会信用代码：" label-width="260px">
              <span>{{ props.row.shxydm }}</span>
            </el-form-item>
            <el-form-item label="所属期起：" label-width="260px">
              <span>{{ props.row.skssqq }}</span>
            </el-form-item>
            <el-form-item label="所属期止：" label-width="260px">
              <span>{{ props.row.skssqz }}</span>
            </el-form-item>
            <el-form-item label="专用发票自开不含税销售额—货物3%：" label-width="260px">
              <span>{{ props.row.zyfpzkbhsxseHw }}</span>
            </el-form-item>
            <el-form-item label="专用发票自开不含税销售额—服物3%：" label-width="260px">
              <span>{{ props.row.zyfpzkbhsxseFw1 }}</span>
            </el-form-item>
            <el-form-item label="专用发票自开不含税销售额—服物5%：" label-width="260px">
              <span>{{ props.row.zyfpzkbhsxseFw2 }}</span>
            </el-form-item>
            <el-form-item label="专用发票代开不含税销售额-货物3%：" label-width="260px">
              <span>{{ props.row.zyfpdkbhsxseHw }}</span>
            </el-form-item>
            <el-form-item label="专用发票代开不含税销售额-服务3%：" label-width="260px">
              <span>{{ props.row.zyfpdkbhsxseFw1 }}</span>
            </el-form-item>
            <el-form-item label="专用发票代开不含税销售额-服务5%：" label-width="260px">
              <span>{{ props.row.zyfpdkbhsxseFw2 }}</span>
            </el-form-item>
            <el-form-item label="普通发票自开不含税销售额-货物3%：" label-width="260px">
              <span>{{ props.row.ptfpzkbhsxseHw }}</span>
            </el-form-item>
            <el-form-item label="普通发票自开不含税销售额-服务3%：" label-width="260px">
              <span>{{ props.row.ptfpzkbhsxseFw1 }}</span>
            </el-form-item>
            <el-form-item label="普通发票自开不含税销售额—服务5%：" label-width="260px">
              <span>{{ props.row.ptfpzkbhsxseFw2 }}</span>
            </el-form-item>
            <el-form-item label="普通发票代开不含税销售额-货物3%：" label-width="260px">
              <span>{{ props.row.ptfpdkbhsxseHw }}</span>
            </el-form-item>
            <el-form-item label="普通发票代开不含税销售额-服务3%：" label-width="260px">
              <span>{{ props.row.ptfpdkbhsxseFw1 }}</span>
            </el-form-item>
            <el-form-item label="普通发票代开不含税销售额-服务5%：" label-width="260px">
              <span>{{ props.row.ptfpdkbhsxseFw2 }}</span>
            </el-form-item>
            <el-form-item label="销售不动产普通发票：" label-width="260px">
              <span>{{ props.row.xsbdcptfp }}</span>
            </el-form-item>
            <el-form-item label="销售不动产专用发票：" label-width="260px">
              <span>{{ props.row.xsbdczyfp }}</span>
            </el-form-item>
            <el-form-item label="开票系统免税销售额：" label-width="260px">
              <span>{{ props.row.kpxtmsxse }}</span>
            </el-form-item>
            <el-form-item label="网络发票：" label-width="260px">
              <span>{{ props.row.wlfp }}</span>
            </el-form-item>
            <el-form-item label="专用发票自开不含税销售额：" label-width="260px">
              <span>{{ props.row.zyfpzkbhsxse }}</span>
            </el-form-item>
            <el-form-item label="普通发票自开不含税销售额：" label-width="260px">
              <span>{{ props.row.ptfpzkbhsxse }}</span>
            </el-form-item>
            <el-form-item label="专用发票代开不含税销售额：" label-width="260px">
              <span>{{ props.row.zyfpdkbhsxse }}</span>
            </el-form-item>
            <el-form-item label="普通发票代开不含税销售额：" label-width="260px">
              <span>{{ props.row.ptfpdkbhsxse }}</span>
            </el-form-item>
            <el-form-item label="操报状态：" label-width="260px">
              <span>{{ props.row.cbzt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="登记序号"
        width="200"
        prop="djxh"
      />
      <el-table-column
        label="纳税人识别号"
        width="200"
        prop="nsrsbh"
      />
      <el-table-column
        label="社会信用代码"
        width="200"
        prop="shxydm"
      />
      <el-table-column
        label="所属期起"
        width="100"
        prop="skssqq"
      />
      <el-table-column
        label="所属期止"
        width="100"
        prop="skssqz"
      />
      <el-table-column
        label="专用发票自开不含税销售额—货物3%"
        width="120"
        prop="zyfpzkbhsxseHw"
      />
      <el-table-column
        label="专用发票自开不含税销售额—服物3%"
        width="120"
        prop="zyfpzkbhsxseFw1"
      />
      <el-table-column
        label="专用发票自开不含税销售额—服物5%"
        width="120"
        prop="zyfpzkbhsxseFw2"
      />
      <el-table-column
        label="专用发票代开不含税销售额-货物3%"
        width="120"
        prop="zyfpdkbhsxseHw"
      />
      <el-table-column
        label="专用发票代开不含税销售额-服务3%"
        width="120"
        prop="zyfpdkbhsxseFw1"
      />
      <el-table-column
        label="专用发票代开不含税销售额-服务5%"
        width="120"
        prop="zyfpdkbhsxseFw2"
      />
      <el-table-column
        label="普通发票自开不含税销售额-货物3%"
        width="120"
        prop="ptfpzkbhsxseHw"
      />
      <el-table-column
        label="普通发票自开不含税销售额-服务3%"
        width="120"
        prop="ptfpzkbhsxseFw1"
      />
      <el-table-column
        label="普通发票自开不含税销售额—服务5%"
        width="120"
        prop="ptfpzkbhsxseFw2"
      />
      <el-table-column
        label="普通发票代开不含税销售额-货物3%"
        width="120"
        prop="ptfpdkbhsxseHw"
      />
      <el-table-column
        label="普通发票代开不含税销售额-服务3%"
        width="120"
        prop="ptfpdkbhsxseFw1"
      />
      <el-table-column
        label="普通发票代开不含税销售额-服务5%"
        width="120"
        prop="ptfpdkbhsxseFw2"
      />
      <el-table-column
        label="销售不动产普通发票"
        width="120"
        prop="xsbdcptfp"
      />
      <el-table-column
        label="销售不动产专用发票"
        width="120"
        prop="xsbdczyfp"
      />
      <el-table-column
        label="开票系统免税销售额"
        width="120"
        prop="kpxtmsxse"
      />
      <el-table-column
        label="网络发票"
        width="120"
        prop="wlfp"
      />
      <el-table-column
        label="专用发票自开不含税销售额"
        width="120"
        prop="zyfpzkbhsxse"
      />
      <el-table-column
        label="普通发票自开不含税销售额"
        width="120"
        prop="ptfpzkbhsxse"
      />
      <el-table-column
        label="专用发票代开不含税销售额"
        width="120"
        prop="zyfpdkbhsxse"
      />
      <el-table-column
        label="普通发票代开不含税销售额"
        width="120"
        prop="ptfpdkbhsxse"
      />
      <el-table-column
        label="操报状态"
        width="120"
        prop="cbzt"
      />
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
            type="primary"
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
    <div>
      <add-fp
        ref="addchild"
        :titles="title"
      />
    </div>
    <div>
      <edit-fp
        ref="editchild"
        :titles="title"
      />
    </div>
  </div>
</template>

<script>
import index from '@/scripts/xgmsb/fp/index'
export default index
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
