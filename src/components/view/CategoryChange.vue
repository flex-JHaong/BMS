<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/category' }">商品分类列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类{{tip}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="上级分类" prop="pid">
        <el-select v-model="ruleForm.pid" placeholder="请选择">
          <el-option label="顶级分类" :value="0">顶级分类</el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
          <el-option 
           v-for="item in getcatelist"
          :key='item.id'
          :label="item.catename"
          :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="ruleForm.catename"></el-input>
      </el-form-item>

      <!-- <el-form-item label="菜单类型">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="目录"></el-radio>
          <el-radio label="菜单"></el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item label="图片">
        <el-upload
          action="#"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :auto-upload="false"
          :on-change="filechange"
          :file-list="fileList"
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      img: "",
      // 图片
      tip: "添加",
      ruleForm: {
        catename: "",
        pid: "",
        status: true,
      },
      rules: {
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 1, max: 20, message: "分类名称长度不符合", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请输入上级分类", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapGetters(["getcatelist"]),
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          let url = this.$api.cateaddUrl;
          if (this.$route.params.id) {
            url = this.$api.cateeditUrl;
            data.id = Number(this.$route.params.id);
            
          }
          data.status = data.status ? 1 : 2;
          //   获取图片
          let form = new FormData();
          for (let i in data) {
            form.append(i, data[i]);
          }
          if (this.img) {
            form.append("img", this.img);
          }
          // console.log(form);
          this.$axios.post(url, form).then(res=>{
            // console.log(res)
            if(res.data.code==200){
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              this.$router.push('/category')
            }
          })

          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    filechange(file) {
      console.log(file);
      this.img = file.raw;
      console.log(this.img)
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
  },
  created() {
    // 页面刷新  需要数据
    let cateid = this.$route.params.id;
    if (cateid) {
      this.tip = "修改";
      // 根据id获取id对应的该条数据 赋值给ruleForm
      this.$axios
        .get(this.$api.cateinfoUrl, {
          params: {
            id: cateid,
          },
        })
        .then((res) => {
          console.log(res);
          this.ruleForm = res.data.list;
          //   把img转化为filelist需要的格式
          this.fileList = this.ruleForm.img ? [{ url: this.$api.baseUrl + this.ruleForm.img }] : [];
          //   // 修改status的值为true或者false
          this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
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