<template>
  <!-- 登录主页面 -->
  <div class="login_container">
    <!-- 登录框 -->
    <div class="login_box">
      <!-- 登录头像 -->
      <div class="login_img">
        <i class="el-icon-user-solid"></i>
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
            <el-input  type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="form.password"></el-input>
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
        //用户名a3,密码a 测试
        username: "",
        password: ""
      },
      //   输入验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
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
      // 表单预校验，验证表单规则
      this.$refs.formref.validate(async valid=>{
        if(!valid) return
        // 检验登录名密码是否存在，发起登录请求
        const { data: res } = await this.$http.get(
        "/api/user/login" ,{params:this.form}
      );
      console.log(res);
      if (res.code !== 0) return this.$message.error("登录失败");
      //将token存入cookie
      this.$cookies.set('token','value') //把token值存入cookie
      this.$message.success("登录成功");
      this.$router.push("/user/home");
      })
      
    }
  }
};
</script>
<style lang="less" scoped>
.login_container {
  background-color: rgb(179, 216, 255);
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
i {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: rgb(236, 245, 255);
  font-size:60px;
  line-height: 80px;
  text-align: center;
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