<template>
  <el-container>
    <el-aside width="200px">
      <el-col :span="12">
        <!-- <h5>自定义颜色</h5> -->
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          router
          @open="handleOpen"
          @close="handleClose"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu :index="item.id.toString()" v-for="item in userinfo.menus" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item :index="val.url" v-for="val in item.children" :key="val.id">{{val.title}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-aside>
    <el-container>
      <el-header>
        <el-row class="block-col-2">
          <el-col :span="12">
            <!-- <span class="demonstration">click 激活</span> -->
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                下拉菜单
                <i class="el-icon-setting el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      defaultActive: "",
    };
  },
  computed: {
    ...mapGetters(["userinfo"]),
  },
  created() {
    // console.log(this.$route)
    this.defaultActive=this.$route.meta.select;
  },
  methods: {
    ...mapActions(['loginOutSync']),
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    href(link) {
      this.$router.push(link);
    },
    handleCommand(command){
      // console.log(this)
      
      this.loginOutSync();
      this.$router.push('/login');
      

    }
  },
};
</script>
<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
  line-height: 60px;
}

.el-aside {
  background-color: #1d1e26;
  color: #fff;
  /* text-align: center; */
  line-height: 200px;
}

.el-main {
  background-color: #fff;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
}

body > #app > .el-container {
  /* margin-bottom: 40px; */
  width: 100%;
  height: 100%;
}

.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-col-12 {
  width: 100%;
}
.el-menu-item-group > ul {
  background-color: #20222a;
}
.el-dropdown-link {
  cursor: pointer;
  color: #000;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
