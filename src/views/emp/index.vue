<template>
  <div class="app-container">
    <div class="filter-container" style="width: 900px;">
      <el-form :inline="true" class="demo-form-inline">
        <div>
          <el-form-item label="姓名：">
            <el-input v-model="empName" placeholder="姓名：" />
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
        label="姓名"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.empName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="年龄"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="身份证号码"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.identityCard }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="家庭住址"
        width="240"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.liveAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="现居住地址"
        width="240"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.familyAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="电话号码"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="邮箱"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="280">
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
      <add-emp
        ref="addchild"
        :titles="title"
      />
    </div>
    <div>
      <edit-emp
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
import index from '@/scripts/emp/index'
export default index
</script>
