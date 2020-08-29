<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/Seckill' }">活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动{{tip}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>

      <el-form-item label="活动时间" required>
        <!-- <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
        </el-form-item>
        </el-col>-->
        <el-date-picker
          v-model="dateval"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          staplaceholder="选择时间范围"
          type="datetimerange"
          value-format="timestamp"
          :picker-options="pickerOptions"
          @change="datechange"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="一级分类">
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
      <el-form-item label="二级分类">
        <el-select v-model="ruleForm.second_cateid" placeholder="请选择" @change="catechange2">
          <el-option value>请选择</el-option>
          <el-option
            v-for="item of secondarr"
            :key="item.id"
            :value="item.id"
            :label="item.catename"
          >{{ item.catename }}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品">
        <el-select v-model="ruleForm.goodsid" placeholder="请选择">
          <el-option value>请选择</el-option>
          <el-option
            v-for="(item,index) in goodsarr"
            :key="index"
            :value="item.id"
            :label="item.goodsname"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="活动性质" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
      </el-form-item>-->
      <!-- <el-form-item label="菜单类型">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="目录"></el-radio>
          <el-radio label="菜单"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标">
        <el-input v-model="ruleForm.desc"></el-input>
      </el-form-item>-->
      <el-form-item label="状态">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">{{tip}}</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tip: "添加",
      firstarr: [],
      secondarr: [],
      goodsarr: [],
      ruleForm: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: true,
      },
      dateval: [],
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = JSON.parse(JSON.stringify(this.ruleForm))
          let url = this.$api.seckaddUrl
          if(this.$route.params.id){
            url = this.$api.seckeditUrl
            data.id = Number(this.$route.params.id)
          }
          data.status = data.status?1:2
          this.$axios.post(url,data)
          .then(res=>{
            console.log(res)
            // if(res.data.code == 200){
            //   this.$router.push("/seckill")
            // }else{
            //   alert(res.data.msg)
            // }
          })

          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    datechange(e) {
      console.log(e);
      this.ruleForm.begintime = e[0];
      this.ruleForm.endtime = e[1];
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
    catechange2(val) {
      // console.log(val);
      if (val == "") {
        return false;
      }
      this.$axios.get(this.$api.goodslistUrl).then((res) => {
        // console.log(res);
        this.goodsarr = res.data.list.filter((item) => {
          return item.second_cateid == val;
        });
        // console.log(this.goodsarr)
        // this.secondarr = res.data.list;
      });
    },

    getlist(val) {
      return this.$axios.get(this.$api.catelistUrl, { params: { pid: val } });
    },
    getgoods() {
      return this.$axios.get(this.$api.goodslistUrl);
    },

    // async getdata() {
    //   let result = await axios.all([
    //     this.getfirst(),
    //     this.getsecond(),
    //     this.getgoods(),
    //   ]);

    //   return result;
    // },
  },
  created() {
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
    // this.catechange(0)
    if (this.$route.params.id) {
      this.tip = "修改";
      this.$axios
        .get(this.$api.seckinfoUrl, {
          params: {
            id: this.$route.params.id,
          },
        })
        .then((res) => {
          // console.log(res, "qqqqqqqqq");
          this.ruleForm = res.data.list;
          this.dateval = [this.ruleForm.begintime, this.ruleForm.endtime];
          this.ruleForm.status = this.ruleForm.status == 1 ? true : false;
          this.getlist(this.ruleForm.first_cateid).then((res) => {
            // console.log(res)
            this.secondarr = res.data.list;
            this.getgoods().then((res) => {
              // console.log(res);
              this.goodsarr = res.data.list.filter((item) => {
                return item.second_cateid == this.ruleForm.second_cateid;
              });
            });
          });
        });
    }
    // this.getdata()
    // .then(
    //       axios.spread((getfirst, getsecond, getgoods) => {
    //         console.log(getfirst.data.list)
    //         this.firstarr = getfirst.data.list;
    //         this.secondarr = getsecond.data.list;
    //         this.goodsarr = getgoods.data.list.filter((item, index) => {
    //           return (
    //             item.first_cateid == this.ruleForm.first_cateid &&
    //             item.second_cateid == this.ruleForm.second_cateid
    //           );
    //         });
    //         console.log(this.firstarr, 111);
    //         console.log(this.secondarr, 22222);
    //         console.log(this.goodsarr, 33333);
    //       })
    //     );
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>  