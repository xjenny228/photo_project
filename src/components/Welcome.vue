<template>
  <div class="container">
    <el-container>
      <!-- 头部 -->
      <el-header>
          <span class="title">个人相册管理系统</span>
          <!-- 个人信息 -->
          <span class="information">用户</span>
          <!-- 退出按钮 -->
          <el-button type="info" @click="exit">退出</el-button>
      </el-header>
      <el-container>
        <!-- 左侧边栏 -->
        <!-- 根据折叠改变侧边栏宽度 -->
        <el-aside :width="iscollapse?'64px':'200px'">
          <!-- 折叠侧边栏菜单 -->
          <div class="collapse" @click="changeCol">| | |</div>
          <!-- 侧边栏导航菜单 -->
          <el-menu
            background-color="rgb(30, 40, 44)"
            text-color="#fff"
            active-text-color="rgb(42, 83, 205)"
            unique-opened
            :collapse="iscollapse"
            :collapse-transition="false"
            :default-active="$route.path"
            router
          >
            <el-menu-item index="/user/home">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/user/center">
              <i class="el-icon-user"></i>
              <span slot="title">个人中心</span>
            </el-menu-item>
            <el-menu-item index="/user/album">
              <i class="el-icon-picture-outline"></i>
              <span slot="title">相册</span>
            </el-menu-item>
            <el-menu-item index="/user/recycler">
              <i class="el-icon-delete"></i>
              <span slot="title">回收站</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主体部分 -->
        <el-main>
            <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
    data(){
        return {
            iscollapse: false
        }
    },
    methods:{
        changeCol(){
            this.iscollapse = !this.iscollapse
        },
        exit () {
    //   window.sessionStorage.clear()
      this.$router.push('/user/login')
    },
    }
};
</script>
<style lang="less" scoped>
.container,
.el-container {
  height: 100%;
}
.el-header {
    position: relative;
  background-color: rgb(14, 20, 25);
}
.el-aside {
  background-color: rgb(30, 40, 44);
}
.el_main{
  background-color: rgb(233, 237, 241);
}
.collapse {
  background-color: rgb(193, 193, 193);
  text-align: center;
  cursor: pointer;
}
.title{
    color: #fff;
    line-height: 60px;
    font-size: 25px;
    font-family:'Times New Roman', Times, serif;
    font-weight: 200;
}
.information{
    position: absolute;
    top:50%;
    left: 50%;
        transform: translate(-50%,-50%);
      display: inline-block;
      width: 100px;
      height: 30px;
      background-color: #fff;
    }
    .el-button{
        position: absolute;
        right: 20px;
        top:50%;
        transform: translate(0,-50%);
    }
</style>