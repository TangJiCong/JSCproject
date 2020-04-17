<template>
  <div class="singerOfen">
    <div v-for="(item,index) in songArray" :key="index" class="song_content">
      <img :src="item.img1v1Url" class="head_img" />
      <div class="width_2">{{item.name}}</div>
      <div class="width_1 text_right">
        <span class="tipico">&gt;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songconcern1: this.HOST + "",
      songconcern2: this.HOST2 + "/artist/list?cat=1001",
      songArray: []
    };
  },
  methods: {},
  mounted() {
    this.$axios
      .get(this.songconcern2)
      .then(res => {
        console.log(res);
        this.songArray = res.data.artists;
        console.log(res.data.artists);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.singerOfen {
  width: 100%;
}
.song_content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  position: relative;
}
.head_img {
  width: 50px;
  border: none;
  border-radius: 50%;
  margin-left: 10px;
}
.width_1 {
  position: absolute;
  height: 30px;
  top: 0px;
  right: 0px;
  margin-top: 15px;
  margin-right: 10px;
}
.width_2 {
  padding-left: 10px;
}
.tipico {
  padding: 5px 8px;
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  display: inline-block;
  margin-right: 10px;
}
.text_right {
  text-align: right;
}
</style>