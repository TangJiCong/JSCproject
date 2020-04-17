<template>
  <div id="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username" >
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="toRegister">
      <router-link to="/register">注册</router-link>
    </div>
  </div>
</template>


<script>
import qs from "qs";
export default {
    data() {
    var validateUsername = (rule, value, callback) => {
      var userReg = /^[a-zA-Z]\w{3,15}$/;
      if (!userReg.test(value)) {
        return callback(new Error("4到16位（字母，数字，下划线，减号）"));
      }
      //console.log(userReg.test(value))
      setTimeout(() => {
        callback();
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      var pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/;
      //console.log(pwdReg.test(value))
      if (!pwdReg.test(value)) {
        callback(new Error("最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    
    return {
      ruleForm: {
        pass: "",
        username: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      var that=this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var userFormData=qs.stringify({
            username: that.ruleForm.username,
            password: that.ruleForm.pass
          })
          that.$axios.post("/login",userFormData).then(function(res){
            //console.log(res);
            if(res.data.status=="200"){
  
                var userInfoJson={
                  username:res.data.data.username,
                  password:res.data.data.password,
                  avatar:res.data.data.avatar,
                  userId:res.data.data._id
                }
              var userInfo=JSON.stringify(userInfoJson)
              localStorage.setItem("userInfo",userInfo)
              that.$alert("登录成功", "新闻管理系统", {
                confirmButtonText: "确定",
              });
              //alert("登录成功");
              that.$router.push({name:"index"})
            }else if(res.data.status=="504"){
              that.$alert("密码错误", "新闻管理系统", {
                confirmButtonText: "确定",
              });
              //alert("密码错误")
            }else{
              that.$alert("未注册该用户名", "新闻管理系统", {
                confirmButtonText: "确定",
              });
              //alert("未注册该用户名")
            }
          })
          .catch(function(error){
            console.log(error)
          })
        } else {
            that.$alert("登录异常", "新闻管理系统", {
              confirmButtonText: "确定",
            });
          //alert("登录异常")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
#login{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}
.demo-ruleForm div.el-input{
  width: 390px;
}
.toRegister{
    padding-left: 112px;
}
.el-form-item__label{
  color: #FD0091;
}

</style>