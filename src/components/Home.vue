<template>
  <div>
    <el-card class="box-card">
      <el-row  type="flex" justify="end">
        <el-col :span="8">
          <el-input placeholder="通过此处搜索相片" >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" :offset="8">
          <el-button type="primary" >新建相册</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" >删除相册</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>