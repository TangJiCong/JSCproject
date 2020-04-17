<template>
  <div class="mine">
    <div class="mineHead">
      <div class="mine_title">我的</div>
      <div class="header_search">
        <span class="iconfont icon-sousuo"></span>
        <input type="text" placeholder="请输入搜索内容" class="search_input" />
      </div>
      <div class="mine_ico">三</div>
    </div>
    <div class="userInfo" >
      <div class="userIco">
        <img :src="userData.avatarUrl" class="userIco_img" @click="userInfo">
        <p>{{userData.nickname}}</p>
        <button @click="logout" class="logoutbtn">退出登录</button>
      </div>
    </div>
    <menuNav></menuNav>
    <router-view />
  </div>
</template>

<script>
import menuNav from "@/components/menuNav.vue";
export default {
  data() {
    return {
      songlist2: this.HOST2 + "/logout" ,
      songlist3: this.HOST2 + "/login/status" ,
      songlist4: this.HOST2 + "/user/detail" ,
      userData:{}
    };
  },
  methods: {
    logout() {
      this.$axios
        .get(this.songlist2)
        .then(res => {
          console.log(res)
          localStorage.removeItem("userInfo");
          this.$router.push('/login');
        })
        .catch(error => {
          console.log(error);
        });
    },
    userInfo(){
      this.$axios
        .get(this.songlist4,{params:{uid:JSON.parse(localStorage.getItem('userInfo')).userId}})
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    menuNav
  },
  mounted(){
    this.$axios
        .get(this.songlist4,{params:{uid:JSON.parse(localStorage.getItem('userInfo')).userId}})
        .then(res => {
          console.log(res)
          this.userData=res.data.profile;
        })
        .catch(error => {
          console.log(error);
        });
  }
};
</script>

<style scoped>
.mine {
  width: 100%;
  background-color: #fafafa;
}
.mineHead {
  width: calc(100% - 20px);
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: #fff;
  box-shadow: 1px 3px 3px #ccc;
}
.mine_title {
  width: 30%;
  text-align: left;
}
.userInfo{
  margin: 30px 10px;
  width: calc(100% - 20px);
  background-color: #fff;
  border-radius: 15px;
}
.userIco{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 12px;
  padding: 15px 10px;
}
.userIco_img{
  width: 60px;
  border-radius: 50%;
  margin-right: 10px;
}
.logoutbtn{
  appearance: none;
  outline: none;
  background-color: #31c27c;
  padding: 5px 6px;
  border-radius: 10px;
  margin-left: auto;
}
.header_search {
  border-radius: 32px;
  width: 50%;
  height: 30px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  padding-right: 15px;
  padding-left: 15px;
}
.search_input {
  appearance: none;
  display: block;
  width: 100%;
  height: 26px;
  border: none;
  padding-left: 15px;
  outline: none;
}
.mine_ico {
  width: 20%;
  text-align: right;
}
.logoutbox{
    padding-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.btn{
    background-color: green;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-top: 10px;
}
</style>