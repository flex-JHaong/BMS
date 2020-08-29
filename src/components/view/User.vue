<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>
    <el-button type="primary" @click="href('/user/add')">添加</el-button>
    <el-table
      :data="tableData"
      border
      row-key="id"
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="用户编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="rolename" label="所属角色"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status==1">启用</el-tag>
          <el-tag effect="dark" v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="item">
          <el-button size="medium" type="primary" @click="edit(item.row)">编辑</el-button>
          <el-button size="medium" type="danger" @click="del(item.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination 
    background 
    layout="prev, pager, next" 
    @current-change='pagechange' 
    :current-page='nowpage' 
    :page-size="size"
    :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      size: 2,
      nowpage: 1,
      total: 0,
    };
  },
  methods: {
    pagechange(n){
      console.log(n)
      this.$axios.get(this.$api.userlistUrl, {
        params: {
          size: this.size,
          page: n,
        },
      })
      .then((res) => {
        console.log(res);
        this.tableData = res.data.list;
      });
    },
    href(link) {
      this.$router.push(link);
    },
    edit(row) {
      //编辑
      this.$router.push("/user/" + row.uid);
    },
    del(uid) {
      //删除
      // 1出现提示信息

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 成功
          this.$axios.post(this.$api.userdeleteUrl, { uid }).then((res) => {
            // console.log(res)
            if (res.data.code == 200) {
              this.tableData = res.data.list;
              this.$message({
                type: "success",
                message: "删除成功!",
              });
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
    this.$axios.get(this.$api.userlistUrl, {
        params: {
          size: this.size,
          page: this.nowpage,
        },
      })
      .then((res) => {
        console.log(res);
        this.tableData = res.data.list;
      });
      this.$axios.get(this.$api.usercountUrl)
      .then(res=>{
        // console.log(res)
        this.total = res.data.list[0].total
      })
  },
};
</script>
<style scoped>
.el-pagination {
  float: right;
}
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>