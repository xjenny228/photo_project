<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="editform" :rules=" editformrules" ref="editformref" label-width="100px">
      <el-form-item label="昵称" prop="nickname">
        <el-input class="input" v-model="editform.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editform.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="edit ">修改</el-button>
        <el-button @click="reseteditform">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    //   验证邮箱规则
    var checkemail = (rule, value, cb) => {
      const regemail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})/;
      if (regemail.test(value)) {
        return cb();
        //合法
      }
      cb(new Error("请输入合法邮箱"));
    };
    return {
      //   查询到的用户信息对象
      editform: {
        nickname: "",
        email: ""
      },

      //   修改用户信息验证规则
      editformrules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkemail, trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.geteditform();
  },
  methods: {
    async geteditform() {
      //   const data = await this.$http.get('/api/user/info/set')
      // console.log(data);
    },
    //点击重置按钮
    reseteditform() {
      console.log(this);
      this.$refs.editformref.resetFields()
    },
    edit(){
        this.$refs.editformref.validate(async valid=>{
            if(!valid)return
            
            //const res=await this.$http.get('/api/user/info/set',this.editform)
            //console.log(res)
            //if(res.meta!==200)return console.log('更新成功')
            //console.log('更新失败')
        })
    }
  }
};
</script>
<style lang="less" scoped>
.el-form{
    width: 50%;
     border:0px;
}
.input{
     border:0px ;
    outline: none;
}
.el-input_inner{
     border:0px ;
     border-radius: 0px;
}
</style>