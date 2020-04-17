<template>
  <div class="special">
    <h2>专区</h2>
    <div class="special_item">
      <div class="item_box" v-for="(item,index) in songArray" :key="index">
        <router-link :to="{path:'/toOfficialDetail/'+item.id}">
          <img :src="item.coverImgUrl" class="special_img" />
        </router-link>
        <p class="special_title">
          <span v-for="(items,index) in item.tags" :key="index">{{items}}</span>
        </p>
      </div>
      <div class="item_box">国风</div>
      <div class="item_box">影视</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songconcern1: this.HOST + "",
      songconcern2: this.HOST2 + "/top/playlist",
      songArray: []
    };
  },
  methods: {},
  mounted() {
    var loading=this.$weui.loading("loading");
    this.$axios
      .get(this.songconcern2)
      .then(res => {
        //console.log(res);
        this.songArray = res.data.playlists;
        loading.hide();
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
h2 {
  padding: 15px 0 15px 20px;
  font-size: 16px;
}
.special {
  width: 100%;
}
.special_item {
  padding: 0 10px;
  width: calc(100% -20px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.item_box {
  border-radius: 15px;
  width: 50%;
  padding-bottom: 5px;
  position: relative;
}
.special_title {
  position: absolute;
  top: 15px;
  left: 15px;
  font-size: 12px;
  color: #fff;
}
.special_img {
  width: calc(100% - 10px);
  margin-left: 10px;
}
</style>