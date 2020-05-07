<template>
  <div class="container">
    <!-- 搜索，新建相册，删除相册部分 -->
    <el-card>
      <el-row type="flex" justify="end">
        <el-col :span="8">
          <el-input placeholder="通过此处搜索相片">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" :offset="8">
          <el-button type="primary" @click="bulid">新建相册</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="info" @click="del">删除相册</el-button>
        </el-col>
      </el-row>
    </el-card>
    <!-- 新建相册和删除相册部分 -->
    <div class="main">
      <!-- 无限滚动 -->
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul v-infinite-scroll="load" infinite-scroll-disabled="disabled">
          <!-- 实现相册全选和统计 -->
          <li class="head">
            <el-checkbox
              v-model="checkAll"
              @change="CheckAllChange"
              :indeterminate="isIndeterminate"
            >全部相册</el-checkbox>
            <span>共有{{list.length}}个相册</span>
          </li>
          <el-checkbox-group v-model="checkList" @change="CheckListChange">
            <li v-for="(item,index) in list" :key="item" class="list-item" >
              <el-checkbox :label="item">
                <i class="el-icon-folder"></i>
              </el-checkbox>
              <input type="text" v-model="list[index]" value="item" :disabled="isable" ref="index" @contextmenu.prevent="rightClick()"/>
            </li>
          </el-checkbox-group>
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
        <!-- 右键菜单 -->
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 2,
      loading: false,
      new: 0,
      checkAll: false,
      list: ["默认相册1", "默认相册2"],
      checkList: [],
      checkAll: false,
      isIndeterminate: false,
      isable: false,
      menuVisible: false
    };
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
    bulid() {
      this.new++; //新建相册的个数
      this.count++; //总的相册个数
      this.list.push("新建相册" + this.new); //向数组添加相册名称
    },
    del() {
      let i, j;
      if (this.checkList.length == this.list.length) {
        this.list.splice(0);
      }
      for (i = 0; i < this.list.length; i++) {
        for (j = 0; j < this.checkList.length; j++) {
          if (this.list[i] === this.checkList[j]) this.list.splice(i, 1);
        }
      }
    },
    CheckAllChange(val) {
      this.checkList = val ? this.list : [];
      this.isIndeterminate = false;
    },
    CheckListChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.list.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.list.length;
    },
    rightClick(){
      console.log(this.$refs)
      
    }
    
  },
  computed: {
    noMore() {
      return this.count > 20; //文件数目大于this.count停止加载
    },
    disabled() {
      return this.loading || this.noMore;
    }
  }
};
</script>
<style lang="less" scoped>
li {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid rgb(220, 232, 244);
  list-style: none;
}
p {
  height: 100px;
}
.main {
  line-height: 40px;
}
.head span {
  float: right;
}
.menu__item {
  display: block;
  line-height: 20px;
  text-align: center;
  margin-top: 10px;
}
.menu {
  height: 100px;
  width: 100px;
  position: absolute;
  border-radius: 10px;
  border: 1px solid #999999;
  background-color: #f4f4f4;
}
.menu li:hover {
  background-color: #1790ff;
  color: white;
}
</style>