<template>
  <div class="offlists">
    <div class="title">
      <strong>分类专区</strong>
      <span>更多&gt;</span>
    </div>
    <div class="box">
      <div class="content">
        <div class="song_item" v-for="(item,index) in offarry2" :key="index">
          <router-link :to="{path:'/toOfficialDetail/'+item.id}" tag="div" class="pos_relative">
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
        "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=8&offset=12",
      offarry: [],
      offarry2: [],
      offlist2: this.HOST2 + "/top/playlist"
    };
  },
  mounted() {
    var loading = this.$weui.loading("loading", {
      className: "loading"
    });

    this.$axios
      .get(this.offlist2, { params: { order: "hot", limit: 10 } })
      .then(res => {
        this.offarry2 = res.data.playlists;
        loading.hide()
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
  justify-content: flex-start;
}
.song_item {
  position: relative;
  width: 120px;
  margin-right: 10px;
}
.content div.song_item:nth-child(1) {
  margin-left: 10px;
}
.pos_relative {
  position: relative;
  width: 100%;
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
  font-size: 12px;
  line-height: 25px;
  height: 25px;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
</style>