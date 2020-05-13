<template>
  <div>
    <el-card>
      <!-- 表单上传图片，后端限制了必须用form标签上传 -->
      <form
        method="post"
        action="www.luckycurve.cn:8090/api/photo/upload"
        enctype="multipart/form-data"
        @submit.prevent="submit($event)"
        class="uploadeform"
      >
        <input type="file" name="file" @change="handleFile($event)" />
        <!-- 属于哪个相册: -->
        <input type="text" v-model="id" name="albumId" style="display:none" />
        照片名字:
        <input type="text" name="name" placeholder="记得取名再上传哦~" />
        <!-- 用户id: -->
        <input type="text" name="userId" v-model="userid" style="display:none" />
        <input type="submit" value="上传" />
        <iframe name="ajaxFrame" style="display: none;"></iframe>
      </form>
      <el-button type="primary" @click="imgDelete" class="del">批量删除</el-button>
    </el-card>
    <el-checkbox-group v-model="checkedphoto">
      <el-checkbox v-for="item in photolist" :key="item.id" :label="item.id">
        <el-tooltip placement="right" effect="light">
          <div slot="content">
            图片名称：{{item.name}}
            <br />
            所属相册：{{albumname}}
          </div>
          <el-image
            style="width: 100px; height: 100px"
            :src="item.url"
            :preview-src-list="srcList"
            fit="contain"
          ></el-image>
        </el-tooltip>
        <!-- 下载图片 -->
        <form action="http://www.luckycurve.cn:8090/api/photo/download" method="post">
          <input type="text" name="id" v-model="item.id" style="display:none" />
          <el-input type="submit" value="下载"></el-input>
        </form>
        <!-- 编辑图片信息 -->
        <el-button
          icon="el-icon-edit"
          circle
          style="border:0px"
          @click="edit(item.name,item.id,item.url)"
        ></el-button>
      </el-checkbox>
    </el-checkbox-group>
    <!-- 编辑图片信息的对话框 -->
    <el-dialog title="编辑图片信息" :visible.sync="dialogVisible" width="50%" @close="clearform()">
      <!-- 对话主体区 -->
      <!-- 修改图片名称和所属相册 -->
      <el-form :model="listForm" label-width="100px" :rules="changerules" ref="listFormref">
        <el-form-item label="图片名称" prop="name">
          <el-input type="text" v-model="listForm.name"></el-input>
          <el-input type="text" v-model="listForm.id" style="display:none"></el-input>
          <el-input type="text" v-model="listForm.url" style="display:none"></el-input>
        </el-form-item>
        <el-form-item label="所属相册">
          <el-select v-model="listForm.albumId" placeholder="请选择转移相册">
            <el-option v-for="item in albumList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!--对话框底部 选择按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="changedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitChange()">确 定</el-button>
      </span>
    </el-dialog>
    <div style="width:100%;height: 50px"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      albumname: "",
      photolist: [],
      srcList: [],
      checkedphoto: [],
      fileList: [],
      albumList: [],
      userid: "",
      imageUrl: "",
      dialogVisible: false,
      listForm: {
        name: " ",
        albumId: " ",
        id: " ",
        url: ""
      },
      changerules: {
        name: [{ required: true, message: "请输入图片名", trigger: "blur" }]
      }
    };
  },

  created() {
    // 接收传递过来的参数
    this.id = this.$route.query.id;
    this.albumname = this.$route.query.name;
    //获取当前页面图片
    this.getPhoto();
    //获取当前用户信息
    this.getUserid();
    //获取当前用户所有相册
    this.getAlbum();
  },
  methods: {
    async getPhoto() {
      const { data: res } = await this.$http.get(
        "/api/photo/list?albumId=" + this.id
      );
      if (res.code !== 0) {
        return this.$message.error("获取当前相册的照片失败");
      }
      this.photolist = res.data;
      for (let i = 0; i < res.data.length; i++) {
        this.srcList[i] = res.data[i].url;
      }
      console.log(this.photolist);
    },
    async getUserid() {
      const { data: res } = await this.$http.get("/api/user/getInfo");
      if (res.code === 0) {
        this.userid = res.data.id;
      }
    },
    // 获取相册列表
    async getAlbum() {
      const { data: res } = await this.$http.get("/api/album/list");
      if (res.code === 0) {
        this.albumList = res.data;
      }
    },
    async imgDelete() {
      let idlist = this.checkedphoto[0];
      //拼接图片id
      for (let i = 1; i < this.checkedphoto.length; i++)
        idlist += "," + this.checkedphoto[i];
      const { data: res } = await this.$http.get(
        "/api/photo/list-delete?ids=" + idlist
      );
      if (res.code !== 0) this.$message.error("删除失败");
      this.$message.success("删除成功");
      this.getPhoto(); //刷新数据
    },
    edit(name, id, url) {
      this.listForm.name = name;
      this.listForm.id = id;
      this.listForm.url = url;
      this.dialogVisible = true;
    },
    // 对话框退出后清空上次表单输入内容
    clearform() {
      this.$refs.listFormref.resetFields();
    },
    //提交修改描述
    submitChange() {
      // 表单验证
      this.$refs.listFormref.validate(async valid => {
        if (!valid) return;
        //   //发送修改请求
        const { data: res } = await this.$http.get("/api/photo/set", {
          params: this.listForm
        });
        if (res.code !== 0) {
          return this.$message.error("编辑图片信息失败");
        }
        console.log(this.listForm.albumId)
        this.dialogVisible = false;
        // 更新数据
        this.getPhoto();
        this.$message.success("编辑图片信息成功");
      });
    },
    //表单文件类型验证
    handleFile(event) {
      let file = event.target.files[0];
      //  检验上传的图片是否符合要求
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error("上传相册封面图片必须是 JPG/PNG/GIF格式!");
        return isJPG && isPNG && isGIF;
      }
    },
    // 自定义表单上传
    submit(event) {
      var fd = new FormData(event.target);
      this.$http.post("/api/photo/upload", fd).then(
        res => {
          event.target.reset(); //上传图片之后清空文件名
          this.getPhoto();
          return this.$message.success("上传图片成功");
        },
        err => {
          return this.$message.error("上传图片失败");
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.el-card {
  margin-bottom: 10px;
}
.del {
  float: right;
  height: 20px;
  line-height: 5px;
}
.uploadeform {
  display: inline-block;
}
</style>