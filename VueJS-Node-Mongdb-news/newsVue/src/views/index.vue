<template>
  <div id="shouye">
    <el-table
      :data="tableData"
      border
      stripe
      :cell-style="cellStyle"
      :header-cell-style="headClass"
      align="center"
      @row-click="toInfo"
    >
      <el-table-column prop="title" label="标题" width="500"></el-table-column>
      <el-table-column prop="type" label="类型" width="180"></el-table-column>
      <el-table-column prop="time" label="日期" width="180"></el-table-column>
    </el-table>
   
    <div class="pagediv">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="10"
        :total="totalNum"
        :current-page.sync="page"
        @prev-click="handlePrevChange"
        @next-click="handleNextChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      page: 0,
      totalNum: 10
    };
  },
  mounted() {
    this.getNewsNum();
    this.getNewsList(this.page);
  },
  methods: {
    getNewsNum() {
      var that = this;
      this.$axios
        .get("/findNewsNum")
        .then(function(numData) {
          that.totalNum = numData.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getNewsList(num) {
      var that = this;
      var datas = qs.stringify({
        page: num
      });
      this.$axios({
        method: "post",
        url: "/findAllNews",
        data: datas
      })
        .then(function(listData) {
          that.tableData = listData.data.data;
          //console.log(listData);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    cellStyle() {
      return "text-align:center";
    },
    headClass() {
      return "text-align: center";
    },
    handlePrevChange() {
      this.page-=1;
      this.getNewsList(this.page);
    },
    handleNextChange(){
      this.page+=1;
      this.getNewsList(this.page);
    },
    handleCurrentChange(){
      this.getNewsList(this.page);
    },
    toInfo(row, column, event){
      //console.log(row)
      this.$router.push({name:"info",params:{newsId:row._id}})
    }
  }
};
</script>

<style scoped>
.pagediv {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}
</style>