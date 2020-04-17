<template>
  <div id="uppNews">
    <el-form class="demo-ruleForm" label-width="80px" ref="form" :model="form">
      <el-form-item label="新闻标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="新闻类别">
        <el-select placeholder="请选择类别" v-model="form.type">
          <el-option
            v-for="(item,index) in typeList"
            :key="index"
            :label="item.type"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻内容">
        <!-- <el-input type="textarea" v-model="form.content"></el-input> -->
        <div ref="editor" style="text-align:left"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="uppNews">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
import qs from "qs";
import E from "wangeditor";
export default {
  name: "editor",
  data() {
    return {
      form: {
        type: "",
        title: "",
        content: ""
      },
      typeList: [],
      editorContent: ""
    };
  },
  mounted() {
    if (!localStorage.getItem("userInfo")) {
      this.$router.push({ name: "login" });
    }
    this.initNews();
    // var that=this
    // editor.txt.html("fff")
    // console.log(that.initContent)
  },
  methods: {
    setEditor() {
      this.getType();
      var editor = new E(this.$refs.editor);
      editor.customConfig.onchange = html => {
        this.editorContent = html;
      };
      editor.customConfig.zIndex = 100;
      // 配置服务器端地址
      editor.customConfig.uploadImgServer = this.baseUrl + "/upload";
      // 将图片大小限制为 3M
      editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
      // 限制一次最多上传 12 张图片
      editor.customConfig.uploadImgMaxLength = 12;
      //自定义 fileName
      editor.customConfig.uploadFileName = "avatarArray";
      editor.customConfig.uploadImgShowBase64 = false;
      //跨域上传中如果需要传递 cookie 需设置 withCredentials
      editor.customConfig.withCredentials = false;
      // 将 timeout 时间改为 12s
      editor.customConfig.uploadImgTimeout = 12000;
      editor.customConfig.uploadImgHooks = {
        customInsert: function(insertImg, result, editor) {
          //console.log(result);
          for (var i = 0; i < result.data.length; i++) {
            var url = that.baseUrl + "/uploadImg/" + result.data[i].filename;
            insertImg(url);
          }
        }
      };
      editor.create();
    },
    getType() {
      var that = this;
      that.$axios
        .get("/findType")
        .then(function(res) {
          //console.log(res)
          //that.form.type=res.data.data[0].type
          that.typeList = res.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    uppNews() {
      var that = this;

      var uppData = qs.stringify({
        title: that.form.title,
        // content:that.form.content,
        content: that.editorContent,
        type: that.form.type,
        newsId: that.$route.params.newsId
      });
      this.$axios
        .post("/updateNews", uppData)
        .then(function(res) {
          //console.log(res);
          if (res.data.status == "200") {
            that.$alert("修改成功", "新闻管理系统", {
              confirmButtonText: "确定",
            });
            //alert("修改成功");
          } else {
            that.$alert(res.data.msg, "新闻管理系统", {
              confirmButtonText: "确定",
            });
            //alert(res.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    initNews() {
      var that = this;
      var newsData = qs.stringify({
        newsId: that.$route.params.newsId
      });
      that.$axios
        .post("/findIdOneNews", newsData)
        .then(function(res) {
          //console.log(res);
          that.form.title = res.data.data[0].title;
          that.form.type = res.data.data[0].type;

          var editors = new E(that.$refs.editor);
          editors.customConfig.onchange = html => {
            that.editorContent = html;
          };
          editors.customConfig.zIndex = 100;
          editors.create();
          editors.txt.html(res.data.data[0].content);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.el-form-item__label{
  color: #FD0091;
}

</style>