<template>
  <div class="main_container">
    <div class="reg_box">
      <i class="el-icon-close" @click="close"></i>
      <div class="title">欢迎注册</div>
      <el-form label-width="80px" :model="form" :rules="rules" ref="formref">
        <el-form-item label="用户名：" prop="username">
          <el-input placeholder="用于登录的用户名一定要记住哦~~" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称：" prop="nickname">
          <el-input placeholder="取个名字让别人更好认识你吧~~" v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="info" @click="reg()">立即注册</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: "",
        nickname: "",
        password: "",
        email: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" }
        ],
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods:{
    close(){
      this.$router.push("/user/login");
    },
    // 表单预校验
    reg(){
      this.$refs.formref.validate(valid=>{
        if(!valid) return
      })
    }
  }
};
</script>
<style lang="less" scoped>
.title{
  font-size: 30px;
  padding-left: 20px;
}
.main_container {
  background-color:rgb(179, 216, 255);
  height: 100%;
  position: relative;
}
.reg_box {
  width: 400px;
  height: 500px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.el-form-item {
  margin-bottom: 40px;
}
.el-form {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  position: absolute;
  bottom: 40px;
}
.el-button {
  width: 350px;
  margin-left: 30px;
  position: absolute;
  bottom: 30px;
  box-sizing: border-box;
}
i{
  margin-top: 10px;
  margin-left: 370px;
}
h2 {
  padding-left: 30px;
  line-height: 40px;
}
</style>