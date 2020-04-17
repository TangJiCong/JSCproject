<template>
  <div id="alllist">
    <el-table
      class="tablelist"
      stripe
      :data="tableData"
      :cell-style="cellStyle"
      :header-cell-style="rowClass"
    >
      <el-table-column prop="type" label="类别" width="180"></el-table-column>
      <el-table-column prop="operate" label="操作" width="180">
        <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-edit"
          @click="handleEdit(scope.$index, scope.row)"></el-button>
        <el-popconfirm
          confirmButtonText='确定'
          cancelButtonText='取消'
          icon="el-icon-info"
          iconColor="red"
          title="确定删除吗？"
          style="margin:0 10px"
          @onConfirm="handleDelete(scope.$index, scope.row)"
        >
          <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference"></el-button>
        </el-popconfirm>
      </template>
      </el-table-column>
    </el-table>

   
    <div class="addInput">
        <el-input  placeholder="请输入类别" v-model="addType"></el-input>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">添加</el-button>
    </div>
  </div>
</template>


<script>
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      addType:""
    };
  },
  methods: {
    handleAdd(){
      var that=this;
      var TypeData=qs.stringify({
        type:that.addType
      })
      that.$axios.post("/addType",TypeData).then(function(res){
        alert(res.data.msg)
        that.getType()
      })
      .catch(function(error){
        console.log(error);
      })
    },
    handleEdit(index, row) {
      //console.log(index, row);
      var that=this;
      this.$prompt('请输入类型', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '不能为空'
        }).then(({ value }) => {
           var TypeData=qs.stringify({
            type:value,
            typeId:row._id
          })
          var that2=this;
          that.$axios.post("/updateType",TypeData).then(function(res){
            //console.log(res)
            that2.$message({
              type: 'success',
              message: '修改类型为:' + value
            });
            that.getType()
          })
          .catch(function(error){
            console.log(error)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
    },
    handleDelete(index, row){
      //console.log(index, row);
      var that=this;
      var TypeData=qs.stringify({
        type:row.type
      })
      that.$axios.post("/deleteType",TypeData).then(function(res){
        //console.log(res);
        alert(res.data.msg)
        that.getType()
      })
      .catch(function(error){
        console.log(error);
      })
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return "text-align:center";
    },
    rowClass({ row, rowIndex }) {
      return "text-align:center";
    },
    getType(){
        var that=this;
        that.$axios.get("/findType").then(function(res){
          //console.log(res)
          that.tableData=res.data.data;
        })
        .catch(function(error){
          console.log(error)
        })
      }
  },
  mounted(){
    if(!localStorage.getItem("userInfo")){
      this.$router.push({name:"login"})
    }
    this.getType()
  }
};
</script>

<style scoped>
#alllist {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
}
.tablelist {
  width: 360px;
  margin: 0 auto;
  max-width: 360px;
}
.addInput{
    width: 360px;
    display: flex;
    padding-top: 20px;
}
</style>