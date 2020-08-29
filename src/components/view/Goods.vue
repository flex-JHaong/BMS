<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <el-button type="primary" @click="href('/goods/add')">添加</el-button>
    <el-table :data="tableData" border style="width: 100%" row-key="id" lazy>
      <el-table-column prop="id" label="商品编号"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <img :src="item.row.img" width="100" alt />
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.isnew==1">是</el-tag>
          <el-tag effect="dark" v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.ishot==1">是</el-tag>
          <el-tag effect="dark" v-else type="danger">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag effect="dark" v-if="item.row.status==1">启用</el-tag>
          <el-tag effect="dark" v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" width="200" label="操作">
        <template slot-scope="item">
          <el-button size="medium" type="primary" @click="edit(item.row)">编辑</el-button>
          <el-button size="medium" type="danger" @click="del(item.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    pagechange(n) {
      this.$axios
        .get(this.$api.goodslistUrl, {
          params: {
            size: this.size,
            page: n,
          },
        })
        .then((res) => {
          console.log(res, 1111111111111);
          this.tableData = res.data.list;
          this.tableData.forEach((item) => {
          // console.log(item);
          if (item.img) {
            item.img = this.$api.baseUrl + item.img;
          }
          // if (item.children) {
          //   item.children.map((i) => {
          //     i.img = this.$api.baseUrl + i.img;
          //     return i;
          //   });
          // }
        });
        });
    },
    href(link) {
      this.$router.push(link);
    },
    edit(row) {
      //编辑
      this.$router.push("/goods/" + row.id);
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
          this.$axios.post(this.$api.goodsdeleteUrl, { id }).then((res) => {
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
      .get(this.$api.goodslistUrl, {
        params: {
          size: this.size,
          page: this.nowpage,
        },
      })
      .then((res) => {
        console.log(res,22222222);
        this.tableData = res.data.list;
        this.tableData.forEach((item) => {
          // console.log(item);
          if (item.img) {
            item.img = this.$api.baseUrl + item.img;
          }
          // if (item.children) {
          //   item.children.map((i) => {
          //     i.img = this.$api.baseUrl + i.img;
          //     return i;
          //   });
          // }
        });
      });
    this.$axios.get(this.$api.goodscountUrl).then((res) => {
      // console.log(res)
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