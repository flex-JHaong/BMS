<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/member' }">会员列表</el-breadcrumb-item>
      <el-breadcrumb-item>会员修改</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>

      <!-- <el-form-item label="菜单类型">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="目录"></el-radio>
          <el-radio label="菜单"></el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="密码">
        <el-input v-model="ruleForm.password"></el-input>
        <span>留空则不修改</span>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        nickname: "",
        password: "",
        phone: "",
        status: true,
      },
      rules: {
        nickname: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ruleForm))
          data.uid = this.$route.params.uid
          data.status = data.status?1:2
          this.$axios.post(this.$api.membereditUrl,data)
          .then(res=>{
            // console.log(res)
            if(res.data.code==200){
              this.$router.push("/member")
            }else{
              alert(res.data.msg)
            }
          })
          // alert("submit!");
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
    this.$axios.get(this.$api.memberinfoUrl,{
      params:{
        uid:this.$route.params.uid
      }
    })
    .then(res=>{
      this.ruleForm = res.data.list
      // this.ruleForm.phone = Number(this.ruleForm.phone)
      this.ruleForm.status = this.ruleForm.status==1?true:false
    })
  }
};
</script>
<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>