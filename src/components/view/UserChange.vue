<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }">管理员列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户{{tip}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
    <!-- {{getrolelist}} -->
      <el-form-item label="所属角色" prop='roleid'>
        <el-select v-model="ruleForm.roleid" placeholder="请选择">
          <!-- <el-option label="顶级菜单" :value="0"></el-option> -->
          <el-option 
          v-for="item in getrolelist"
          :key='item.id'
          :label="item.rolename" 
          :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>

      <!-- <el-form-item label="菜单类型">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="目录"></el-radio>
          <el-radio label="菜单"></el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="密码">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
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
      ruleForm: {
        roleid: "",
        username: "",
        password: "",
        status: true,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 20, message: "输入的用户名长度不符", trigger: "blur" },
        ],
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["getrolelist"]),
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ruleForm));

          let url = this.$api.useraddUrl;
          // console.log(this.$route.params.uid)
          if (this.$route.params.uid) {
            url = this.$api.usereditUrl;
            data.uid = String(this.$route.params.uid);
          }
          
          data.status = data.status ? 1 : 2;
          // console.log(data)
          this.$axios.post(url, data).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$router.push("/user");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created(){
    let useruid = this.$route.params.uid;
    if(useruid){
      this.tip = "修改";
      this.$axios.get(this.$api.userinfoUrl,{
        params:{
          uid:useruid
        }
      })
      .then(res=>{
        console.log(res)
        this.ruleForm = res.data.list;
        this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
      })
    }
  }
};
</script>
<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>