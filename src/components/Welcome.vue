<template>
  <div class="container">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <span class="title">
          <i class="el-icon-picture-outline"></i>
          个人相册
        </span>
        <!-- 个人信息 -->
        <span class="information" @click="gocenter">
          <img :src="usermessage.avatarUrl" alt />
          <span class="nickname">{{usermessage.nickname}}</span>
        </span>
        <!-- 退出按钮 -->
        <el-button @click="exit">退出</el-button>
      </el-header>
      <el-container>
        <!-- 左侧边栏 -->
        <!-- 根据折叠改变侧边栏宽度 -->
        <el-aside :width="iscollapse?'64px':'200px'">
          <!-- 折叠侧边栏菜单 -->
          <div class="collapse" @click="changeCol">| | |</div>
          <!-- 侧边栏导航菜单 -->
          <el-menu
            active-text-color="rgb(64, 158, 255)"
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
            <el-menu-item index="/user/album" disabled>
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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iscollapse: false,
      usermessage: []
    };
  },
  created() {
    //获取当前用户信息
    this.getUser();
  },
  methods: {
    async getUser() {
      const { data: res } = await this.$http.get("/api/user/getInfo");
      if (res.code === 0) {
        this.usermessage = res.data;
        console.log(this.usermessage);
      }
    },
    changeCol() {
      this.iscollapse = !this.iscollapse;
    },
    async exit() {
      const { data: res } = await this.$http.get("/api/user/logout");
      if (res.code === 0) {
        this.$cookies.remove('token') //清除token
        this.$router.push("/user/login");
      }
    },
    //点击用户名和用户头像进入个人中心
    gocenter(){
      this.$router.push("/user/center")
    }
  }
};
</script>
<style lang="less" scoped>

.container,.el-container {
  height: 100%;
}
.el-header {
  position: relative;
  background-color: #409eff;
}
.collapse {
  background-color: rgb(217, 236, 255);
  text-align: center;
  cursor: pointer;
}
.el-menu {
  border-right: 0;
}
.el-main {
  margin-right: 10px;
}
.title {
  color: #fff;
  line-height: 60px;
  font-size: 25px;
  font-family: "Microsoft YaHei", "黑体-简", "\5b8b\4f53";
  font-weight: 200;
}
.information{
  cursor: pointer;
}
img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;
}
.nickname {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(80%, -50%);
  color: #fff;
}
.el-button {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0, -50%);
}
</style>