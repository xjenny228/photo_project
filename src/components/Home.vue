<template>
  <div class="container">
    <!-- 搜索，新建相册部分 -->
    <el-card>
      <el-row type="flex" justify="end">
        <el-col :span="8">
          <el-input
            placeholder="通过此处搜索相片"
            @input="inputchange"
            v-model="value"
            clearable
            @clear="clear"
          >
            <el-button slot="append" icon="el-icon-search" @click="getlist"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" :offset="12">
          <el-button type="primary" @click="dialogVisible = true">新建相册</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 新建相册和删除相册部分 -->
    <div class="main">
      <el-table :data="list" style="width: 100%" max-height="400px" @cell-dblclick="enterAlum">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="封面" width="180">
          <template slot-scope="scope">
            <img :src="scope.row.cover" width="70" height="70" class="head_pic" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="相册名" width="180"></el-table-column>
        <el-table-column prop="desc" label="相册描述" width="180"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="ChangeAlum(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteAlum(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新建相册的对话框 -->
    <el-dialog title="新建相册" :visible.sync="dialogVisible" width="50%" @close="clearform()">
      <!-- 对话框主体区域 -->
      <span>
        <!-- 添加相册名和相册描述 -->
        <el-form
          :model="alumForm"
          :rules="rules"
          ref="alumFormref"
          label-width="100px"
          class="addalum"
        >
          <el-form-item label="相册名" prop="name">
            <el-input type="text" v-model="alumForm.name"></el-input>
          </el-form-item>
          <el-form-item label="相册描述" prop="desc">
            <el-input type="text" v-model="alumForm.desc"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改相册的对话框 -->
    <el-dialog title="修改相册" :visible.sync="changedialogVisible" width="50%" @close="clearChange()">
      <!-- 主体部分 -->
      <!-- 修改相册封面 -->
      <span class="upspan">修改相册封面</span>
      <el-upload
        class="avatar-uploader"
        action
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过2M</div>
      </el-upload>

      <!-- 修改相册名和描述 -->
      <el-form :model="listForm" label-width="100px" :rules="changerules" ref="listFormref">
        <el-form-item label="相册名" prop="name">
          <el-input type="text" v-model="listForm.name"></el-input>
        </el-form-item>
        <el-form-item label="相册描述" prop="desc">
          <el-input type="text" v-model="listForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <!--对话框底部 选择按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="changedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitChange()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- wjh 搜索图片-->
    <el-dialog :visible.sync="dialogTableVisible">
      <el-table :data="info ">
      
        <el-table-column property="name" label="name"></el-table-column>
        <el-table-column property="url" label="图片">
          <template slot-scope="scope">
            <el-image :src="scope.row.url" @click="enterphoto(scope.row)"></el-image>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      dialogVisible: false,
      changedialogVisible: false,
      imageUrl: "",
      alumForm: {
        name: "",
        desc: ""
      },
      listForm: {},
      changerules: {
        name: [{ required: true, message: "请输入相册名", trigger: "blur" }],
        desc: [{ required: true, message: "请输入相册描述", trigger: "blur" }]
      },
      rules: {
        name: [{ required: true, message: "请输入相册名", trigger: "blur" }],
        desc: [{ required: true, message: "请输入相册描述", trigger: "blur" }]
      },
      value: "",
      info: [],
      dialogFormVisible: false,
      dialogTableVisible: false
    };
  },
  created() {
    this.getAlbum();
  },
  methods: {
    // 获取相册列表
    async getAlbum() {
      const { data: res } = await this.$http.get("/api/album/list");
      if (res.code !== 0) {
        return this.$message.error("获取相册列表失败！");
      }
      this.list = res.data;
    },
    // 对话框退出后清空上次表单输入内容
    clearform() {
      this.$refs.alumFormref.resetFields();
    },
    // 还原本来的数据
    clearChange() {
      this.$refs.listFormref.resetFields();
    },
    ChangeAlum(mes) {
      this.listForm = mes;
      this.changedialogVisible = true;
    },
    submitAdd() {
      // 表单验证
      this.$refs.alumFormref.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.get("/api/album/create", {
          params: this.alumForm
        });
        if (res.code !== 0) return this.$message.error("添加用户信息失败");
        this.$message.success("添加用户信息成功");
        this.dialogVisible = false;
        // 更新数据
        this.getAlbum();
      });
    },
    submitChange() {
      // 表单验证
      this.$refs.listFormref.validate(async valid => {
        if (!valid) return;
        //发送修改请求
        const { data: res } = await this.$http.get("/api/album/set", {
          params: this.listForm
        });
        if (res.code !== 0) {
          return this.$message.error("修改用户信息失败");
        }
        this.changedialogVisible = false;
        // 更新数据
        this.getAlbum();
        this.$message.success("修改用户信息成功");
      });
    },
    // 上传头像

    beforeAvatarUpload(file) {
      let fd = new FormData();
      fd.append("id", this.listForm.id); //传参数
      fd.append("cover", file);
      this.$http.post("/api/album/setCover", fd);
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      this.imageUrl = URL.createObjectURL(file);
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("上传相册封面图片必须是 JPG/PNG/GIF格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传相册封面图片大小不能超过 2MB!");
      }
      return isJPG && isPNG && isGIF && isLt2M;
    },
    async deleteAlum(alumid) {
      const res = await this.$confirm(
        "此操作将永久删除该相册, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => {
        return err;
      });
      if (res !== "confirm") {
        return this.$message.info("已取消删除操作");
      }
      //删除操作
      const { data: response } = await this.$http.get(
        "/api/album/delete?id=" + alumid
      );
      if (response.code !== 0) return this.$message.error("删除失败");
      this.$message.success("删除成功");
      //更新数据
      this.getAlbum();
    },
    //搜索
    async inputchange() {
      const { data: res } = await this.$http.get("/api/photo/query", {
        params: { message: this.value }
      });
      console.log(res);
    },
    //  wjh
    async getlist() {
      this.info = [];
      const { data: res } = await this.$http.get("/api/photo/query", {
        params: { message: this.value }
      });
      this.dialogFormVisible = true;

      console.log(res.data);
      var i;
      for (i = 0; i < res.data.length; i++) {
        // console.log(res.data[i].id);
        this.info.push(res.data[i]);
      }

      this.dialogTableVisible = true;
    },
    clear() {
      this.info = [];
    },
    enterphoto(row){
      let i;
      let name;
      for(i=0;i<this.listForm.length;i++){
        if(this.listForm[i].id===row.albumId){
          name=listForm[i].name
        }
      }
      console.log(row.id)
      console.log(row.albumId)

       this.$router.push({
        path: "/user/album",
        query: {
          name: name,
          id: row.albumId,
          photoid:row.id
        }
      });
    },
    //携带参数跳转到当前相册
    enterAlum(row, event, column) {
      // 打印当前相册的数据
      this.$router.push({
        path: "/user/album",
        query: {
          name: row.name,
          id: row.id,
          photoid:row.id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  margin-top: 20px;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
}
.avatar {
  width: 100px;
  height: 100px;
  display: inline-block;
}
.upspan {
  padding-right: 12px;
}
.avatar-uploader {
  margin-bottom: 15px;
  display: inline-block;
}
.head_pic {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
}
</style>