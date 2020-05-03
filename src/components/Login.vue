<template>
  <!-- 登录主页面 -->
  <div class="login_container">
    <!-- 登录框 -->
    <div class="login_box">
      <!-- 登录头像 -->
      <div class="login_img">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 注册 -->
      <div class="register">
        <el-link type="info" @click="register">没有账号,点击此处注册哦~~^_^~~</el-link>
      </div>
      <div class="login_form">
        <!-- 输入框 -->
        <el-form :rules="rules" :model="form" ref="formref">
          <!-- 用户名输入框 -->
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" prefix-icon="el-icon-s-custom" v-model="form.username"></el-input>
          </el-form-item>
          <!-- 密码输入框 -->
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
        <!-- 按钮 -->
        <div class="bth">
          <el-button type="primary" plain @click="load">登录</el-button>
          <el-button type="info" plain @click="reset">重置</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      //   输入验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //   重置方法
    reset() {
      this.$refs.formref.resetFields();
    },
    //编程式导航页面跳转
    register() {
      this.$router.push("/user/register");
    },
    load() {
      this.$router.push("/user/home");
    }
  }
};
</script>
<style lang="less" scoped>
.login_container {
  background-color: rgb(30, 40, 44);
  height: 100%;
  position: relative;
}
.login_box {
  width: 400px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login_img {
  width: 80px;
  height: 80px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px;
}
img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgb(193, 193, 193);
}
.login_form {
  position: absolute;
  padding: 20px;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
}
.bth {
  display: flex;
  justify-content: flex-end;
}
.register {
  text-align: center;
  margin-top: 70px;
}
</style>