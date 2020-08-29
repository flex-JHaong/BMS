<template>
  <!-- <el-tree
    :data="data"
    show-checkbox
    default-expand-all
    node-key="id"
    ref="tree"
    highlight-current
    :props="defaultProps"
  ></el-tree>-->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>角色{{tip}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>

    <el-form :model="info" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="info.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限">
        <el-tree
          :data="menus"
          show-checkbox
          ref="tree"
          default-expand-all
          node-key="id"
          :default-checked-keys="defaultkeys"
          :props="defaultProps"
        ></el-tree>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="info.status"></el-switch>
      </el-form-item>
      <!-- <el-form-item label="特殊资源" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
      </el-form-item>-->
      <!-- <el-form-item label="活动形式" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tip: "添加",
      info: {
        rolename: "",
        menus: "",
        status: true,
      },
      menus: [],
      defaultkeys: [],
      // defaultProps: {
      //   children: "children",
      //   label: "label",
      // },
      defaultProps: {
        children: "children",
        label: "title",
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "输入的角色名称长度不符合",
            trigger: "blur",
          },
        ],
      },
      
    };
  },
  computed: {
    ...mapGetters(["getmenulist"]),
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   验证规则都满足时，会执行这里
          //    不管是添加还是修改都在这里操作
          // json序列化，防止数据变化，上面的数据跟着变化
          let data = JSON.parse(JSON.stringify(this.info));
          //    默认url为添加
          let url = this.$api.roleaddUrl;
          if (this.$route.params.id) {
            url = this.$api.roleeditUrl;
            data.id = Number(this.$route.params.id);
          }
          data.status = data.status ? 1 : 2;
          //   this.$refs.tree.getCheckedKeys()  获取选中的tree的值  得到的是数组
          // 数据库中存储的是字符串
          data.menus = this.$refs.tree.getCheckedKeys()
            ? this.$refs.tree.getCheckedKeys().join(",")
            : "";
          // 发送请求
          // alert("submit!");
          this.$axios.post(url, data).then((res) => {
            if (res.data.code == 200) {
              this.$router.push("/role");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    }
  },
  created(){
    this.menus=this.getmenulist;
    // 页面刷新  需要数据
        let roleid=this.$route.params.id;
        if(roleid){
          this.tip="修改";
          // 根据id获取id对应的该条数据 赋值给info
          this.$axios.get(this.$api.roleinfoUrl,{
            params:{
              id:this.$route.params.id
            }
          })
          .then(res=>{
            // console.log(res)
            this.info = res.data.list;
            // 修改status的值为true或者false
            this.info.status=this.info.status==1?true:false;
            //给选中的tree赋值
            this.defaultkeys=this.info.menus?this.info.menus.split(','):[];
            // console.log(this.info)
          })
        }
  }
};
</script>