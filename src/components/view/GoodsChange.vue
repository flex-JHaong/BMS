<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>商品{{tip}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="一级分类" prop="first_cateid">
        <el-select v-model="ruleForm.first_cateid" placeholder="请选择" @change="catechange">
          <el-option value>请选择</el-option>
          <el-option
            v-for="item of firstarr"
            :key="item.id"
            :value="item.id"
            :label="item.catename"
          >{{ item.catename }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" prop="second_cateid">
        <el-select v-model="ruleForm.second_cateid" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option
            v-for="item of secondarr"
            :key="item.id"
            :value="item.id"
            :label="item.catename"
          >{{ item.catename }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称" prop="goodsname">
        <el-input v-model="ruleForm.goodsname"></el-input>
      </el-form-item>

      <el-form-item label="价格">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价格">
        <el-input v-model="ruleForm.market_price"></el-input>
      </el-form-item>
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
      <el-form-item label="商品规格" prop="specsid">
        <el-select v-model="ruleForm.specsid" placeholder="请选择" @change="specschange">
          <el-option value>请选择</el-option>
          <el-option
            v-for="item in specsarr"
            :key="item.id"
            :value="item.id"
            :label="item.specsname"
          >{{ item.specsname }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性" prop="specsattr">
        <el-select v-model="ruleForm.specsattr" multiple placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option
            v-for="(item,index) in specsattrarr"
            :key="index"
            :value="item"
            :label="item"
          >{{ item }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品">
        <el-radio-group v-model="ruleForm.isnew">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否热卖">
        <el-radio-group v-model="ruleForm.ishot">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item label="商品描述">
        <!-- <el-input v-model="ruleForm.name"></el-input> -->

        <div id="wangeditor" ref="editorElem" style="text-align:left;width:720px"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import E from "wangeditor";

export default {
  name: "Editor",
  data() {
    return {
      tip: "添加",
      firstarr: [],
      secondarr: [],
      specsarr: [],
      specsattrarr: [],
      fileList: [],
      editor: null,
      editorContent: "",
      img: "",
      ruleForm: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        isnew: "",
        ishot: "",
        market_price: "",
        specsid: "",
        specsattr: "",
        status: true,
      },
      rules: {
        goodsname: [
          { required: true, message: "请输入对应信息", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "change" },
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "change" },
        ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  created() {
    //获取一级分类
    this.$axios
      .get(this.$api.catelistUrl, {
        params: {
          pid: 0,
        },
      })
      .then((res) => {
        // console.log(res);
        this.firstarr = res.data.list;
      });
    //获取商品规格
    this.$axios.get(this.$api.specslistUrl).then((res) => {
      // console.log(res,11111111111);
      this.specsarr = res.data.list;
    });
    if (this.$route.params.id) {
      this.tip = "修改";
      this.$axios
        .get(this.$api.goodsinfoUrl, {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((res) => {
          // console.log(res);
          this.ruleForm = res.data.list;
          this.catechange(this.ruleForm.first_cateid);
          this.specschange(this.ruleForm.specsid);
          this.ruleForm.specsattr = this.ruleForm.specsattr.split(",");
          this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
          //图片
          this.fileList = this.ruleForm.img
            ? [{ url: this.$api.baseUrl + this.ruleForm.img }]
            : [];
          // 给富w文本添加内容
          this.editor.txt.html(this.ruleForm.description);
        });
    }
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ["catchData"], // 接收父组件的方法
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = (html) => {
      this.editorContent = html;
      // this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
    };
    this.editor.customConfig.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo", // 重复
    ];
    this.editor.create(); // 创建富文本实例
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.description = this.editor.txt.html();
          let data = JSON.parse(JSON.stringify(this.ruleForm));
          let url = this.$api.goodsaddUrl;
          if (this.$route.params.id) {
            url = this.$api.goodseditUrl;
            data.id = Number(this.$route.params.id);
          }
          data.status = data.status ? 1 : 2;

          let form = new FormData();
          for (let i in data) {
            form.append(i, data[i]);
          }
          if (this.img) {
            form.append("img", this.img);
          }
          console.log(data)
          this.$axios.post(url, form).then((res) => {
            console.log(res);
            // if (res.data.code == 200) {
            //   this.$message({
            //     type: "success",
            //     message: "操作成功!",
            //   });
            //   this.$router.push("/goods");
            // }
          });

          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    catechange(val) {
      // console.log(val);
      if (val == "") {
        return false;
      }
      this.$axios
        .get(this.$api.catelistUrl, {
          params: {
            pid: val,
          },
        })
        .then((res) => {
          // console.log(res);
          this.secondarr = res.data.list;
        });
    },
    specschange(val) {
      // console.log(val,2222222)
      this.$axios
        .get(this.$api.specsinfoUrl, {
          params: {
            id: val,
          },
        })
        .then((res) => {
          // console.log(res);
          this.specsattrarr = res.data.list[0].attrs;
        });
    },
    filechange(file) {
      this.img = file.raw;
    },
  },
};
</script>
<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>