<template>
  <div>
    <el-button type="primary" @click="huanyuan" style="margin: 0 30px;">还原</el-button>
    <el-button type="danger" @click="delete1">永久删除</el-button>
    <div style="margin:10px">
      <!-- <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>-->
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group @change="handleCheckedCitiesChange" v-model="checkList">
        <div v-for="(item,i) in info" :key="item.id" class="photo">
          <!--    -->
          <el-checkbox :label="item.name" @change="click(i)" style="display:block;"></el-checkbox>

          <el-image :src="item.url" style=" {margin:5px; width:100px;height:100px;"></el-image>
        </div>
      </el-checkbox-group>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
export default {
  data() {
    return {
      info: [],

      isIndeterminate: true,
      checkAll: false,
      checkList: []
    };
  },
  created() {
    this.getrecyclerlist();
    setTimeout(() => {}, 2000);
  },
  methods: {
    async getrecyclerlist() {
      const { data: r } = await this.$http.get("/api/user/getInfo");
      let userId = r.data.id;
      const { data: res } = await this.$http.get(
        "/api/photo/listAllPhotosInBin",
        {
          params: { userId: userId }
        }
      );
      let i;
      for (i = 0; i < res.data.length; i++) {
        this.info.push(res.data[i]);
        this.info[i].xuan = "unchecked";
      }
      //    res.data.forEach(item => {
      //      this.info.push(item);
      //      this.info[indexof(item)].index =length;

      //       this.info[length].xuan = "checked";
      //     length++;

      //     console.log(this.info);
      //console.log(index)
      //    });
    },
    click(i) {
      this.info[i].xuan =
        this.info[i].xuan == "unchecked" ? "checked" : "unchecked";
    },
    async delete1() {
      let id = [];
      let j = [];
      let count = 0,
        i;
      for (i = 0; i < this.info.length; i++) {
        if (this.info[i].xuan == "checked") {
          count++;
          id.push(this.info[i].id);
          j.push(i);
        }
      }
      if (count === 1) {
        const { data: res } = await this.$http.get(
          "/api/photo/bin/delete/" + id
        );
        if (res.code !== 0) return this.$message.error("删除失败");
        this.$message.success("删除成功");
      }
      if (count > 1) {
        const { data: r } = await this.$http.get(
          "/api/photo/bin/list-delete" + "?ids=" + id
        );
        if (r.code !== 0) return this.$message.error("删除失败");
        this.$message.success("删除成功");
      }
      j.forEach(id => {
        this.info.splice(id, 1);
      });
    },
    async huanyuan() {
      let id = [];
      let j = [];
      let count = 0,
        i;
      for (i = 0; i < this.info.length; i++) {
        if (this.info[i].xuan == "checked") {
          count++;
          id.push(this.info[i].id);
          j.push(i);
        }
      }
      if (count === 1) {
        const { data: r } = await this.$http.get(
          "/api/photo/bin/restore/" + id
        );

        if (r.code !== 0) return this.$message.error("还原失败");
        this.$message.success("还原成功");
      }
      if (count > 1) {
        const { data: r } = await this.$http.get(
          "/api/photo/bin/list-restore" + "?ids=" + id
        );
        if (r.code !== 0) return this.$message.error("还原失败");
        this.$message.success("还原成功");
      }
      j.forEach(id => {
        this.info.splice(id, 1);
      });
    },
    handleCheckAllChange(val) {
      this.checkList = val ? this.info : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.info.length;

      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.info.length;
    }
  }
};
</script>
<style lang="less" scoped>
.photo {
  width: 150px;
  float: left;
  position: relative;
  margin: 10px;
}
</style>