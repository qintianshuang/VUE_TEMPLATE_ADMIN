<template>
  <div class="app-container">
    <div class="filter-container" style="width: 900px;">
      <el-form :inline="true" class="demo-form-inline">
        <div>
          <el-form-item label="参数名：">
            <el-input v-model="code" placeholder="审批人" />
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
          <el-form-item>
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
          </el-form-item>
          <el-form-item>
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
  </div>
</template>
<script>
import index from './index.js'
export default index
</script>
