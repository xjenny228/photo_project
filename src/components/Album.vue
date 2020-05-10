<template>
  <div>
    <!-- action表示图片要上传的api地址 -->
    <el-upload
      action="uploadurl"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :headers="headerobj"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过500kb</div>
    </el-upload>
    <el-collapse accordion>
      <el-collapse-item>
        
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 上传图片url地址
      uploadurl: "www.luckycurve.cn:8090/api/photo/upload",
      // 图片上传组件headers对象
      headerobj: {
         Authorization:window.sessionStorage.getItem('token')
      },
    //   相册
    list:[]
    };
  },
  created(){
      this.getablumlist()
      //this.getpthotolist()
  },
  methods: {
    // 处理图片预览效果
    handlePreview() {},
    // 处理移除图片操作
    handleRemove() {},
 async getablumlist(){
    
    
      const res= await this.$http.get('/api/album/list')



     console.log(res)
  }
  //async getpthotolist(){
    //   const{ data:res}=await this.$http.get('/api/album/list')
      // console.log(res)
   //}
}
 
};
</script>