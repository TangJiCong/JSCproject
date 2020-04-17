<template>
  <div id="app">
    <el-container>
      <el-header class="userinfo">
        <div style="margin:0 auto;" class="newstitle">新闻管理系统</div>
        <div v-for="(item,index) in userList" :key="index" class="user">
          <el-avatar :src="baseURL+item.avatar" shape="circle" fit="cover" :size="50"></el-avatar>
          <div style="margin:0 15px; color: #eee;" class="useText">{{item.username}}</div>
        </div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px;font-size:30px;color:#ffffff"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/my" tag="div">个人信息</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="loginOut">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container style="height: 659px;">
        <el-aside width="200px" style="background-color:#00bcd4;opacity:0.8">
          <!-- :default-openeds="['1', '2']" -->
          <el-menu
            style="border-right:none;opacity:0.8"
            active-text-color="#0000FF"
            background-color="#00bcd4"
            text-color="#ffffff"
          >
            <el-menu-item>
              <router-link to="/" tag="div">
                <i class="el-icon-s-home" style="color:#ffffff"></i>新闻首页
              </router-link>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu" style="color:#ffffff"></i>新闻管理
              </template>
              <el-menu-item index="1-1">
                <router-link to="/addNews" tag="div">
                  <i class="el-icon-zoom-in" style="color:#ffffff"></i>增加新闻
                </router-link>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="2-1">
              <router-link to="/addList" tag="div">
                <i class="el-icon-document" style="color:#ffffff"></i>分类管理
              </router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/admin" tag="div">
                <i class="el-icon-star-off" style="color:#ffffff"></i>我的
              </router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/login" tag="div">
                <i class="el-icon-user" style="color:#ffffff"></i>登录
              </router-link>
            </el-menu-item>
            <el-menu-item>
              <router-link to="/register" tag="div">
                <i class="el-icon-edit-outline" style="color:#ffffff"></i>注册
              </router-link>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userList: [],
      baseURL: this.baseUrl + "/images/"
    };
  },
  mounted() {
    if (localStorage.getItem("userInfo")) {
      this.userList.push(JSON.parse(localStorage.getItem("userInfo")));
    }
  },
  methods: {
    loginOut() {
      localStorage.removeItem("userInfo");
      this.userList = [];
      this.$router.push({ name: "index" });
    }
  }
};
</script>


<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  background: radial-gradient(
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.15) 30%,
        rgba(255, 255, 255, 0.3) 32%,
        rgba(255, 255, 255, 0) 33%
      )
      0 0,
    radial-gradient(
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.1) 11%,
        rgba(255, 255, 255, 0.3) 13%,
        rgba(255, 255, 255, 0) 14%
      )
      0 0,
    radial-gradient(
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.2) 17%,
        rgba(255, 255, 255, 0.43) 19%,
        rgba(255, 255, 255, 0) 20%
      )
      0 110px,
    radial-gradient(
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.2) 11%,
        rgba(255, 255, 255, 0.4) 13%,
        rgba(255, 255, 255, 0) 14%
      ) -130px -170px,
    radial-gradient(
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.2) 11%,
        rgba(255, 255, 255, 0.4) 13%,
        rgba(255, 255, 255, 0) 14%
      )
      130px 370px,
    radial-gradient(
        rgba(255, 255, 255, 0) 0,
        rgba(255, 255, 255, 0.1) 11%,
        rgba(255, 255, 255, 0.2) 13%,
        rgba(255, 255, 255, 0) 14%
      )
      0 0,
    linear-gradient(
      45deg,
      #343702 0%,
      #184500 20%,
      #187546 30%,
      #006782 40%,
      #0b1284 50%,
      #760ea1 60%,
      #83096e 70%,
      #840b2a 80%,
      #b13e12 90%,
      #e27412 100%
    );
  background-size: 470px 470px, 970px 970px, 410px 410px, 610px 610px,
    530px 530px, 730px 730px, 100% 100%;
  background-color: #840b2a;
}
.useText {
  text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
    0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
  color: #fff6a9;
  font-family: "Sacramento", cursive;
  text-align: center;
  animation: blink 6s infinite;
  -webkit-animation: blink 6s infinite;
}
@keyframes blink {
  20%,
  24%,
  55% {
    color: #111;
    text-shadow: none;
  }
  0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    text-shadow: 0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500,
      0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000;
    color: #fff6a9;
  }
}

.userinfo {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: linear-gradient(
    to right,
    #bb313e25,
    #bb313e25,
    #d7222925,
    #dd4a1625,
    #e4761525,
    #f5c50025,
    #f0e92725,
    #b1ce2425,
    #48a93525,
    #03944525,
    #157c4f25,
    #176a5825,
    #1b556325,
    #1d386f25,
    #1d386f25,
    #20277825,
    #52266325,
    #8a244b25
  );
}
.user {
  display: flex;
  justify-content: center;
  align-items: center;
}
.newstitle {
  font-size: 36px;
  font-weight: bold;
  background-image: -webkit-linear-gradient(
    left,
    blue,
    #66ffff 10%,
    #cc00ff 20%,
    #cc00cc 30%,
    #ccccff 40%,
    #00ffff 50%,
    #ccccff 60%,
    #cc00cc 70%,
    #cc00ff 80%,
    #66ffff 90%,
    blue 100%
  );
  -webkit-text-fill-color: transparent; /* 将字体设置成透明色 */
  -webkit-background-clip: text; /* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;
  letter-spacing: 10px;
}
@keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}

</style>
