<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <el-button type="primary" @click="href('/role/add')">添加</el-button>
    <el-table 
    :data="roles" 
    border 
    style="width: 100%"
    row-key="id"
    lazy
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="角色编号"></el-table-column>
      <el-table-column prop="rolename" label="角色名称"></el-table-column>
      <!-- <el-table-column prop="address" label="所属角色"></el-table-column> -->
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status==1">启用</el-tag>
          <el-tag effect="dark" v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="item">
          <el-button size="medium" type="primary" @click="edit(item.row.id)">编辑</el-button>
          <el-button size="medium" type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      roles: [],
    };
  },
  methods: {
    ...mapActions(["roleAsyncAdd"]),
    href(link) {
      this.$router.push(link);
    },
    edit(id) {
      //编辑
      this.$router.push("/role/" + id);
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
          this.$axios.post(this.$api.roledeleteUrl, { id }).then((res) => {
            // console.log(res)
            if (res.data.code == 200) {
              this.roles = res.data.list
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              
              // this.menuAsyncAdd().then((res) => {
              //   console.log(res.data.list, "123");
              //   this.tableData = res.data.list;
              // });
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
  created(){
    this.roleAsyncAdd()
    .then(res=>{
      // console.log(res)
      this.roles = res.data.list
    })
  }
};
</script>
<style  scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>