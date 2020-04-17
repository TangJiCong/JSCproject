<template>
  <div id="admin">
    <el-table
      :data="newsInfoList"
      border
      stripe
      :cell-style="cellStyle"
      :header-cell-style="headClass"
      align="center"
      v-if="flag"
    >
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="type" label="类型" width="180"></el-table-column>
      <el-table-column prop="time" label="日期" width="180"></el-table-column>
      <el-table-column prop="operate" label="操作" width="270">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            icon="el-icon-info"
            @click="toInfo(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-popconfirm
            confirmButtonText="确定"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
            style="margin-left:10px;"
            @onConfirm="handleDelete(scope.$index, scope.row)"
          >
            <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference"></el-button>
          </el-popconfirm>
          <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
import qs from "qs";
export default {
  data() {
    return {
      newsIdList: [],
      newsInfoList: [],
      flag: false
    };
  },
  mounted() {
    if (!localStorage.getItem("userInfo")) {
      this.$router.push({ name: "login" });
    }
    this.getNewsId();
  },
  methods: {
    getNewsId() {
      var that = this;
      var userId = JSON.parse(localStorage.getItem("userInfo")).userId;
      var userData = qs.stringify({
        userId: userId
      });
      that.$axios
        .post("/findIdNews", userData)
        .then(function(res) {
          //console.log(res)
          that.newsIdList = res.data.data;
          that.getNewsInfo();
          that.flag = true;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getNewsInfo() {
      var that = this;
      for (var i = 0; i < that.newsIdList.length; i++) {
        var userInfoData = qs.stringify({
          newsId: that.newsIdList[i].newId
        });

        that.$axios
          .post("/findIdOneNews", userInfoData)
          .then(function(res) {
            //console.log(res)
            that.newsInfoList = that.newsInfoList.concat(res.data.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    cellStyle() {
      return "text-align:center";
    },
    headClass() {
      return "text-align: center";
    },
    toInfo(index, row) {
      //console.log(row)
      this.$router.push({ name: "info", params: { newsId: row._id } });
    },
    handleEdit(index, row) {
      //console.log(index, row);
      this.$router.push({ name: "uppNews", params: { newsId: row._id } });
    },
    handleDelete(index, row) {
      //console.log(index, row);
      var that = this;
      var deleData = qs.stringify({
        newsId: row._id
      });
      that.$axios
        .post("/deleteNews", deleData)
        .then(function(res) {
          that.$alert(res.data.msg, "新闻管理系统", {
            confirmButtonText: "确定"
          });
          //alert(res.data.msg);
          that.getNewsId();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
</style>