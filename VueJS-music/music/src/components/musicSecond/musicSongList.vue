<template>
  <div class="songList">
    <h1 class="songlist_title">新手必备歌单</h1>
    <div v-for="(item,index) in offarry" class="songlist_item" :key="index">
      <router-link class="songlist_left" :to="{path:'/toOfficialDetail/'+item.id}">
        <img :src="item.coverImgUrl" />
        <span class="iconfont icon-bofang pos_ico"></span>
        <span class="iconfont icon-huabankaobei- pos_icos"></span>
        <span class="songlist_playCount">{{parseInt((item.playCount)/10000)+'万'}}</span>
      </router-link>
      <div class="songlist_right">
        <p class="pos_left">
          <span v-for="(value,index) in item.tags" :key="index" class="right_5px">{{value}}</span>
        </p>
        <p class="pos_left">{{item.name}}</p>
        <span class="pos_left">{{item.subscribedCount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/font/iconfont.css";
export default {
  data() {
    return {
      offlist:
        this.HOST +
        "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=6&offset=12",
      offarry: [],
      offlist2: this.HOST2 + "/top/playlist/highquality"
    };
  },
  mounted() {

    var loading = this.$weui.loading("loading", {
      className: "loading"
    });

    this.$axios
      .get(this.offlist2)
      .then(res => {
        this.offarry = res.data.playlists;
        //console.log(res);
        loading.hide();
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.loading{
  color: aqua;
}
h1{
  font-size: 16px;
  line-height: 30px;
}
.songlist_item {
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
}
.songlist_title {
  padding-left: 10px;
}
.songlist_left {
  width: 35%;
  position: relative;
  display: flex;
}
.songlist_left img {
  width: 100%;
  border-radius: 28px;
  margin-left: 10px;
  flex-shrink: 1;
}
.pos_ico {
  position: absolute;
  font-size: 18px;
  bottom: 0;
  right: 0;
  margin-bottom: 10px;
  margin-right: 0px;
  color: #fff;
}
.pos_icos {
  position: absolute;
  font-size: 18px;
  bottom: 0px;
  left: 0px;
  margin-bottom: 10px;
  margin-left: 20px;
  color: #fff;
}
.songlist_playCount {
  position: absolute;
  line-height: 26px;
  bottom: 0px;
  left: 0px;
  margin-bottom: 10px;
  margin-left: 50px;
  color: #fff;
  font-size: 12px;
}
.songlist_right {
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;
  line-height: 25px;
}
.pos_left {
  margin-left: 20px;
}
.right_5px{
    padding-right: 5px;
    font-weight: bold;
}
</style>