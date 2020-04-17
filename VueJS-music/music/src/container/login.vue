<template>
  <div class="login">
    <form class="loginForm" v-if="isQQ">
      <h1>QQ登录</h1>
      <input type="text" class="qqname" v-model="phone" placeholder="请输入您的QQ账号" />
      <input type="password" class="pwd" v-model="password" placeholder="请输入您的QQ密码" />
      <div class="btn_box">
        <input type="submit" class="loginBtn" @click="tologin" />
      </div>
    </form>
    <form class="loginForm" v-if="iswyy">
      <h1>网易云登录</h1>
      <input type="text" class="qqname" v-model="phone" placeholder="请输入您的网易云账号" />
      <input type="password" class="pwd" v-model="password" placeholder="请输入您的网易云密码" />
      <div class="btn_box">
        <input type="submit" class="loginBtn" @click="tologin" />
      </div>
    </form>
    <form class="loginForm" v-if="isweix">
      <h1>微信登录</h1>
      <input type="text" class="qqname" v-model="phone" placeholder="请输入您的微信账号" />
      <input type="password" class="pwd" v-model="password" placeholder="请输入您的微信密码" />
      <div class="btn_box">
        <input type="submit" class="loginBtn" @click="tologin" />
      </div>
    </form>
    <form class="loginForm" v-if="isweib">
      <h1>微博登录</h1>
      <input type="text" class="qqname" v-model="phone" placeholder="请输入您的微博账号" />
      <input type="password" class="pwd" v-model="password" placeholder="请输入您的微博密码" />
      <div class="btn_box">
        <input type="submit" class="loginBtn" @click="tologin" />
      </div>
    </form>
    <div class="loginswitch">
      <span class="switch_item" @click="showqq">QQ登录</span>
      <span class="switch_item" @click="showwyy">网易云登录</span>
      <span class="switch_item" @click="showeix">微信登录</span>
      <span class="switch_item" @click="showweib">微博登录</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isQQ: true,
      iswyy: false,
      isweix: false,
      isweib: false,
      songlist1: this.HOST + "",
      phone: "",
      password: "",
      songlist2: this.HOST2 + "/login/cellphone"
    };
  },
  methods: {
    showqq() {
      this.isQQ = true;
      this.iswyy = false;
      this.isweix = false;
      this.isweib = false;
    },
    showwyy() {
      this.isQQ = false;
      this.iswyy = true;
      this.isweix = false;
      this.isweib = false;
    },
    showeix() {
      this.isQQ = false;
      this.iswyy = false;
      this.isweix = true;
      this.isweib = false;
    },
    showweib() {
      this.isQQ = false;
      this.iswyy = false;
      this.isweix = false;
      this.isweib = true;
    },
    tologin() {
      console.log(this.phone + this.password);
      this.$axios
        .get(this.songlist2, {
          params: { phone: this.phone, password: this.password }
        })
        .then(res => {
          if (res.status) {
            if (res.status == "200") {
              console.log(res);
              var storage = localStorage;
              storage.userInfo = JSON.stringify({
                userId: res.data.account.id,
                username: res.data.account.userName
              });
              this.$router.push("/");
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    created() {
      if (this.$store.state.islogin) {
        this.$router.push("/");
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
h1 {
  font-size: 16px;
}
.login {
  width: 100%;
}
.loginForm {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 0;
  margin-top: 80px;
  width: 100%;
}
.qqname,
.pwd {
  width: 60%;
  appearance: none;
  outline: none;
  margin-top: 15px;
  line-height: 18px;
  font-size: 16px;
  border: 1px solid #ccc;
}
.qqname,
.pwd {
  padding: 10px 0 10px 10px;
}
.btn_box {
  margin-top: 15px;
  width: calc(60% + 10px);
  background-color: #86ce2f;
}
.loginBtn {
  width: 100%;
  text-align: center;
  padding: 10px 5px;
  appearance: none;
  outline: none;
  line-height: 18px;
  font-size: 16px;
  border: 1px solid #ccc;
  background-color: #86ce2f;
}
.loginswitch {
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 12px;
}
.switch_item {
  margin-right: 10px;
  cursor: pointer;
}
</style>