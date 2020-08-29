<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">规格列表</el-breadcrumb-item>
      <el-breadcrumb-item>规格{{tip}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="规格名称" prop="specsname">
        <el-input v-model="ruleForm.specsname"></el-input>
      </el-form-item>
      <el-form-item label="规格属性" v-for="(item,index) in specsArr" :key="index">
        <el-input v-model="item.value"></el-input>
        <el-button v-if=" index== 0" type="primary" @click="addDomain">新增规格属性</el-button>
        <el-button v-else type="danger" @click.prevent="removeDomain(index)">删除</el-button>
      </el-form-item>
      <!-- <el-form-item label="所属角色" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>-->

      <!-- <el-form-item label="菜单类型">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="目录"></el-radio>
          <el-radio label="菜单"></el-radio>
        </el-radio-group>
      </el-form-item>-->
      <!-- <el-form-item label="规格属性">
        <el-input v-model="ruleForm.attrs"></el-input>
      </el-form-item>-->
      <el-form-item label="状态">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tip: "添加",
      ruleForm: {
        specsname: "",
        attrs: "",
        status: true,
      },
      specsArr: [{ value: "" }],
      rules: {
        specsname: [
          { required: true, message: "请输入规格属性", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "输入的规格名称长度不符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let arr = [];
          this.specsArr.forEach((item) => {
            arr.push(item.value);
          });
          this.ruleForm.attrs = arr ? arr.join(",") : "";
          console.log(this.ruleForm);
          let url = this.$api.specsaddUrl;
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          if (this.$route.params.id) {
            url = this.$api.specseditUrl;
            data.id = Number(this.$route.params.id);
          }
          data.status = data.status ? 1 : 2;
          this.$axios.post(url, data).then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$router.push("/specs");
            } else {
              this.$message.error(res.data.msg);
            }
          });
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    removeDomain(ind) {
      this.specsArr.splice(ind, 1);
    },
    addDomain() {
      if (this.specsArr.length <= 5) {
        this.specsArr.push({ value: "" });
      }
    },
  },
  created() {
    let specsid = this.$route.params.id;
    if (specsid) {
      this.tip = "修改";
      // 根据id获取id对应的该条数据 赋值给ruleForm
      this.$axios
        .get(this.$api.specsinfoUrl, {
          params: {
            id: specsid,
          },
        })
        .then((res) => {
          console.log(res);
          this.ruleForm = res.data.list[0];
          // 修改status的值为true或者false
          this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
          this.ruleForm.attrs.map((d, i) => {
            if (i == 0) {
              this.specsArr[0].value = d;
            } else {
              this.specsArr.push({ value: d });
            }
          });
        });
    }
  },
};
</script>
<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>