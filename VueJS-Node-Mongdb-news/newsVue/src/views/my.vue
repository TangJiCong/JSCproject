<template>
  <div class="my">
    <div class="userAvatar" v-for="(item,index) in avatarList" :key="index">
      <el-avatar shape="square" :size="160" fit="fill" :src="baseURL+item.avatar"></el-avatar>
      <div style="margin-top:15px;">{{item.username}}</div>
    </div>
    <el-form label-position="right" label-width="80px" :model="formLabelAlign">
      <el-form-item label="旧密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="formLabelAlign.updatePwd"></el-input>
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
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      imageUrl: "",
      formLabelAlign: {
        password: "",
        updatePwd: ""
      },
      imageFile: null,
      avatarList: [],
      baseURL: this.baseUrl + "/images/"
    };
  },
  mounted() {
    if (localStorage.getItem("userInfo")) {
      this.avatarList.push(JSON.parse(localStorage.getItem("userInfo")));
    }
  },
  methods: {
    submitForm() {
      var username = JSON.parse(localStorage.getItem("userInfo")).username;
      var that = this;
      let formData = new FormData();

      formData.append("avatar", that.imageFile);
      formData.append("username", username);
      formData.append("password", that.formLabelAlign.password);
      formData.append("updatePwd", that.formLabelAlign.updatePwd);
      that.$axios
        .post("/updateUser", formData, {
          headers: {
            "Content-Type": "multipart/form-data;"
          }
        })
        .then(function(res) {
          //console.log(res)
          that.$alert("修改成功", "新闻管理系统", {
            confirmButtonText: "确定"
          });
          //alert("修改成功")
          that.reLogin(username, that.formLabelAlign.updatePwd);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    uploadImg(fileObj) {
      this.imageFile = fileObj.file;
    },
    reLogin(name, pass) {
      var userFormData = qs.stringify({
        username: name,
        password: pass
      });
      this.$axios
        .post("/login", userFormData)
        .then(function(userRes) {
          //console.log(userRes)
          if (userRes.data.status == "200") {
            var userInfoJson = {
              username: userRes.data.data.username,
              password: userRes.data.data.password,
              avatar: userRes.data.data.avatar,
              userId: userRes.data.data._id
            };
            var userInfo = JSON.stringify(userInfoJson);
            localStorage.setItem("userInfo", userInfo);
          }
        })
        .catch(function(error2) {
          console.log(error2);
        });
    }
  }
};
</script>

<style scoped>
.my {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.userAvatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 30px;
}
.demo-ruleForm div.el-input {
  width: 390px;
}
.demo-ruleForm .el-upload {
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
form {
  width: 300px;
}
.el-input {
  width: 270px;
}
</style>