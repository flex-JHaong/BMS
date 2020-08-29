<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/banner' }">轮播图列表</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图{{tip}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <!-- <el-form-item label="上级分类" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <!-- <el-form-item label="菜单类型">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="目录"></el-radio>
          <el-radio label="菜单"></el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :on-change="filechange"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
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
      tip:"添加",
      img:"",
      fileList:[],
      ruleForm: {
        title: "",
        status: true,
      },
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 1, max: 20, message: "您输入的轮播图名称长度不符", trigger: "blur" },
        ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ruleForm))
          let url = this.$api.banneraddUrl;
          if(this.$route.params.id){
            url = this.$api.bannereditUrl
            data.id = this.$route.params.id
          }
          data.status = data.status ? 1 : 2;
          let form = new FormData()
          for(let i in data){
            form.append(i,data[i])
          }
          if(this.img){
            form.append("img", this.img);
          }
          this.$axios.post(url,form)
          .then(res=>{
            if(res.data.code==200){
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.$router.push('/banner')
            }
          })

          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    filechange(file){
      this.img = file.raw
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  created(){
    // 页面刷新  需要数据
    let bannerid = this.$route.params.id;
    if(bannerid){
      this.tip = "修改";
      this.$axios.get(this.$api.bannerinfoUrl,{
        params:{
          id:bannerid
        }
      })
      .then(res=>{
        this.ruleForm = res.data.list;
          //   把img转化为filelist需要的格式
          this.fileList = this.ruleForm.img ? [{ url: this.$api.baseUrl + this.ruleForm.img }] : [];
          //   // 修改status的值为true或者false
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