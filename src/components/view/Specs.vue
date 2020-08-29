<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <el-button type="primary" @click="href('/specs/add')">添加</el-button>
    <el-table 
    :data="tableData" 
    border 
    style="width: 100%" 
    row-key="id" 
    lazy
    >
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column prop="attrs" label="规格属性">
        <template slot-scope="item">
          <!-- <p>{{item.row}}</p> -->
          <el-tag v-for="(i,index) in item.row.attrs" :key="index">
            {{i}}
          </el-tag>
          <!-- <el-tag v-html="item.row.attrs[1]"></el-tag> -->
        </template>
        
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status==1">启用</el-tag>
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
    <!-- <el-pagination background layout="prev, pager, next" :total="10"></el-pagination> -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="pagechange"
      :current-page="nowpage"
      :page-size="size"
      :total="total"
    ></el-pagination>
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
    href(link) {
      this.$router.push(link);
    },
    pagechange(n) {
      this.$axios
        .get(this.$api.specslistUrl, {
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
    edit(row) {
      //编辑
      this.$router.push("/specs/" + row.id);
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
          this.$axios.post(this.$api.specsdeleteUrl, { id }).then((res) => {
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
    this.$axios
      .get(this.$api.specslistUrl, {
        params: {
          size: this.size,
          page: this.nowpage,
        },
      })
      .then((res) => {
        console.log(res);
        this.tableData = res.data.list;
      });
    this.$axios.get(this.$api.specscountUrl).then((res) => {
      console.log(res)
      this.total = res.data.list[0].total;
    });
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