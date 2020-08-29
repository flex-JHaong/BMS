<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <el-button type="primary" @click="href('/category/add')">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <img :src="item.row.img" width="180" alt />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag effect="dark" v-if="scope.row.status==1">启用</el-tag>
          <el-tag effect="dark" v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="medium" type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button size="medium" type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="address" label="地址"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    ...mapActions(["cateAsyncAdd"]),

    href(link) {
      this.$router.push(link);
    },
    edit(id) {
      //编辑
      this.$router.push("/category/" + id);
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
          this.$axios.post(this.$api.catedeleteUrl, { id }).then((res) => {
            // console.log(res)
            if (res.data.code == 200) {
              this.tableData = res.data.list;
              this.tableData.forEach((item) => {
        // console.log(item);
        if(item.img){
            item.img = this.$api.baseUrl + item.img;
        }
        // if (item.children) {
        //   item.children.map((i) => {
        //     i.img = this.$api.baseUrl + i.img;
        //     return i;
        //   });
        // }
      });
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
  created() {
    this.cateAsyncAdd().then((res) => {
      this.tableData = res.data.list;

      // for(let i = 0;i<this.tableData.length;i++){
      //   // this.tableData[i]
      // }
      this.tableData.forEach((item) => {
        // console.log(item);
        if(item.img){
            item.img = this.$api.baseUrl + item.img;
        }
        if (item.children) {
          item.children.map((i) => {
            i.img = this.$api.baseUrl + i.img;
            return i;
          });
        }
      });
      // this.tableData = this.tableData.map(item=>{
      //   console.log(item.children)
      //   item.children.map(i=>{
      //     i.img=this.$api.baseUrl+i.img
      //     return i
      //   })

      // return "<img src='"+ item +"' />"
      // })
      // console.log(this.tableData);
    });
  },
};
</script>

<style  scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>