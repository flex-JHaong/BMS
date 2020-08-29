<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/menu' }">菜单列表</el-breadcrumb-item>
      <el-breadcrumb-item>菜单{{tip}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>
    <el-form
      :model="menuForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="菜单名称" prop="title">
        <el-input v-model="menuForm.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="menuForm.pid" placeholder="请选择">
          <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
          <el-option 
          v-for="item in getmenulist"
          :key='item.id'
          :label="item.title"
          :value="item.id"
          ></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="menuForm.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="menuForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
      </el-col>
      </el-form-item>-->
      <!-- <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="menuForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
      </el-form-item>-->
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="menuForm.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" v-show="menuForm.type==1">
        <el-input v-model="menuForm.icon"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" v-show="menuForm.type==2">
        <el-input v-model="menuForm.url"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch v-model="menuForm.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
        <!-- <el-button @click="resetForm('menuForm')">重置</el-button> -->
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
      menuForm: {
        title: "",
        pid: "",
        status: true,
        type: 1,
        icon: "",
        url: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "菜单名称长度输入不规范",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请输入上级菜单", trigger: "change" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   验证规则都满足时，会执行这里
          //    不管是添加还是修改都在这里操作
          // json序列化，防止数据变化，上面的数据跟着变化
          let data = JSON.parse(JSON.stringify(this.menuForm));
          //    默认url为添加
          let url = this.$api.menuaddUrl;
          //    如果能获取到id ，url的值变为修改
          if (this.$route.params.id) {
            url = this.$api.menueditUrl;
            data.id = Number(this.$route.params.id);
          }
          data.status = data.status ? 1 : 2;
          // alert('submit!');
          console.log(data, "data");
          
          this.$axios.post(url, data).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$router.push("/menu");
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
      });
    },
  },
  computed: {
    ...mapGetters(["getmenulist"]),
  },
  created() {
    let menuid = this.$route.params.id;
    if (menuid) {
      this.tip = "修改";
      // 根据id获取id对应的该条数据 赋值给info
      this.$axios
        .get(this.$api.menuinfoUrl, {
          params: {
            id: menuid,
          },
        })
        .then((res) => {
          console.log(res);
          this.menuForm = res.data.list;
          // 修改status的值为true或者false
          this.menuForm.status = this.menuForm.status == 1 ? true : false;
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