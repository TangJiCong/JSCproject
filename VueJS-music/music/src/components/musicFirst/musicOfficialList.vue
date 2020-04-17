<template>
  <div class="offlists">
    <div class="title">
      <strong>官方歌单</strong>
      <span>更多&gt;</span>
    </div>
    <div class="box">
      <div class="content">
        <div v-for="(item,index) in offarry" :key="index" class="song_item">
          <router-link  :to="{path:'/toOfficialDetail/'+item.id}" class="pos_relative">
              <img :src="item.coverImgUrl" class="song_img" />
            <div class="bofangico">
              <span class="iconfont icon-bofang"></span>
            </div>
          </router-link>
          <p class="item_title">{{item.name}}</p>
        </div>
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
        "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=6&offset=0",
        offlist2:this.HOST2 + '/playlist/detail?id=1',
        offlist3:this.HOST2 + '/top/playlist/highquality',
      offarry: [],
    };
  },
  mounted() {
    
    var loading = this.$weui.loading("loading", {
      className: "loading"
    });

      this.$axios
      .get(this.offlist3)
      .then(res => {
        this.offarry = res.data.playlists;
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
.offlists {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
  background-color: #fff;
  margin-top: 15px;
}
.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.title strong {
  font-size: 16px;
  padding-left: 12px;
}
.title span {
  font-size: 12px;
  padding-right: 12px;
}
.box {
  width: 100%;
  overflow-x: scroll;
}
.content {
  padding: 10px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.song_item {
  position: relative;
  width: 120px;
  display: inline-block;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.content div.song_item:nth-child(1){
  margin-left: 10px;
}
.bofangico {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  margin-left: -35px;
  margin-top: -35px;
}
.pos_relative{
  position: relative;
}
.bofangico span {
  font-size: 40px;
  color: aliceblue;
}
.song_img {
  width: 120px;
  height: 120px;
  border-radius: 15px;
}
.item_title {
  width: 100%;
  font-size: 12px;
  line-height: 25px;
  height: 25px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>