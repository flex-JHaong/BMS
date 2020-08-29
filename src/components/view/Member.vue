<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>
    <!-- <el-button type="primary" @click='href("/member/add")'>添加</el-button> -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status==1">启用</el-tag>
          <el-tag effect="dark" v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
         <template slot-scope="item">
          <el-button size="medium" type="primary" @click="edit(item.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods:{
    href(link) {
      this.$router.push(link);
    },
    edit(row) {
      this.$router.push("/member/" + row.id);
    },
  },
  created(){
    this.$axios.get(this.$api.memberlistUrl).then((res) => {
      // console.log(res);
      this.tableData = res.data.list;
    });
  }
};
</script>
<style  scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>