<template>
  <div id="register">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action
          :show-file-list="false"
          :http-request="uploadImg" 
          style="border: 1px dashed #d9d9d9;width:60px;height:60px;"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="toLogin">
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      var userReg = /^[a-zA-Z]\w{3,15}$/;
      if (!userReg.test(value)) {
        return callback(new Error("4到16位（字母，数字，下划线，减号）"));
      }
      setTimeout(() => {
        callback();
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      var pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/;
      if (!pwdReg.test(value)) {
        callback(new Error("最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: "",
      ruleForm: {
        pass: "",
        checkPass: "",
        username: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }]
      },
      imageFile:null
    };
  },
  methods: {
    submitForm(formName) {
      var that=this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          
          let formData = new FormData();
          formData.append("avatar", that.imageFile);
          formData.append("username", that.ruleForm.username);
          formData.append("password", that.ruleForm.pass);
          that.$axios.post('/register',formData ,{
            headers: {
              'Content-Type': 'multipart/form-data;'
              } 
          })
          .then(function(res){
            //console.log(res)
            if(res.data.status=="200"){
              that.$alert("注册成功", "新闻管理系统", {
                confirmButtonText: "确定",
              });
              //alert("注册成功");
              that.$router.push({name:"login"})
            }
          })
          .catch(function(error){
            console.log(error)
          });
        } else {
          that.$alert("注册异常", "新闻管理系统", {
            confirmButtonText: "确定",
          });
          //alert("注册异常")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    
    uploadImg(fileObj){
      this.imageFile=fileObj.file
     
    },
      
  },
  mounted(){
    
  }
};
</script>

<style scoped>
#register {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.toLogin {
  padding-left: 112px;
}
.demo-ruleForm div.el-input{
  width: 390px;
}
.demo-ruleForm .el-upload{
  width: 60px;
  height: 60px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 60px;
  width: 60px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 60px;
  height: 60px;
  display: block;
}
</style>