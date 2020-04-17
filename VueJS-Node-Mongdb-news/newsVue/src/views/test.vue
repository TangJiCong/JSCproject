<template>
    <div>
       <el-form class="demo-ruleForm" label-width="80px" ref="form" :model="form">
      <el-form-item label="新闻标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="新闻类别" style="z-index: 10011">
        <el-select placeholder="请选择类别" v-model="form.type">
          <el-option 
          v-for="(item,index) in typeList" 
          :key="index" 
          :label="item.type" 
          :value="item.type">
         </el-option>
          
        </el-select>
      </el-form-item>
      
      <el-form-item label="新闻内容">
        <!-- <el-input type="textarea" v-model="form.content"></el-input> -->
        <div ref="editor" style="text-align:left"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNews">发布</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
import E from 'wangeditor'
import qs from "qs";
export default {
    name: 'editor',
    data(){
        return {
        form: {
          type: "",
          title:"",
          content:""
        },
        typeList:[],
        editorContent: '',
        imgFile:null
      }
    },
    mounted(){
      if(!localStorage.getItem("userInfo")){
        this.$router.push({name:"login"})
      }
      this.getType()
      var editor = new E(this.$refs.editor)
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.customConfig.zIndex = 100
      editor.customConfig.uploadFileName = 'myFileName'
      var that
      editor.customConfig.customUploadImg = function (files, insert) {
        that.imgFile=files
        console.log(files)
      }
      editor.create()
    },
    methods:{
      getType(){
        var that=this;
        that.$axios.get("/findType").then(function(res){
          //console.log(res)
          that.form.type=res.data.data[0].type
          that.typeList=res.data.data
        })
        .catch(function(error){
          console.log(error)
        })
      },
      addNews(){
        var editor = new E(this.$refs.editor)
        editor.customConfig.customUploadImg = function (files, insert) {
          
          console.log(files)
        }
        editor.create()
       
      }
      
    }
};

</script>



<style scoped>

</style>