<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <el-button type="primary" @click="href('/seckill/add')">添加</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
      <!-- <el-table-column prop="name" label="轮播图标题" width="180"></el-table-column> -->
      <!-- <el-table-column prop="address" label="图片"></el-table-column> -->
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" type="success" v-if="item.row.status==1">启用</el-tag>
          <el-tag effect="dark" v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="item">
          <el-button size="medium" type="primary" @click="edit(item.row)">编辑</el-button>
          <el-button size="medium" type="danger" @click="del(item.row.id)">删除</el-button>
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
  methods: {
    href(link) {
      this.$router.push(link);
    },
    edit(row) {
      this.$router.push("/seckill/" + row.id);
    },
    del(id) {
      //删除
      // 1出现提示信息

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 成功
          this.$axios.post(this.$api.seckdeleteUrl, { id }).then((res) => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.tableData = res.data.list;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.$axios.get(this.$api.secklistUrl).then((res) => {
      console.log(res);
      this.tableData = res.data.list;
    });
  },
};
</script>
<style  scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>