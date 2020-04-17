<template>
  <div class="rangkRecom">
    <h1>推荐</h1>
    <div class="rangkRecom_item">
      <div class="item_example">
        <div class="item_ico" v-for="(item,index) in rankarry" :key="index">
          <router-link tag="div" :to="{path:'/toOfficialDetail/'+item.id}">
            <img :src="item.coverImgUrl" class="item_img" />
            <span class="iconfont icon-bofang pos_ico"></span>
            <span class="iconfont icon-huabankaobei- pos_icos"></span>
            <span class="songlist_playCount">{{parseInt(item.playCount/10000)+'万'}}</span>
          </router-link>
          <!-- <p class="rang_title">{{item.name}}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ranklist:
        this.HOST +
        "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=6&offset=12",
      rankarry: [],
      ranklist2: this.HOST2 + "/toplist"
    };
  },
  mounted() {
    var loading = this.$weui.loading("loading");
    this.$axios
      .get(this.ranklist2)
      .then(res => {
        //console.log(res);
        for (var i = 0; i < 8; i++) {
          this.rankarry.push(res.data.list[i]);
        }
        loading.hide();
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
h1 {
  padding-left: 10px;
  font-size: 18px;
  padding-bottom: 15px;
  padding-top: 15px;
}
.rangkRecom {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.rangkRecom_item {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
}
.item_example {
  flex-direction: row;
  display: flex;
  justify-content: flex-start;
}
.item_ico {
  width: 120px;
  height: 120px;
  border-radius: 15px;
  position: relative;
  margin: 0 10px;
}
.item_img {
  width: 120px;
  height: 120px;
  border-radius: 15px;
}
.pos_ico,
.pos_icos,
.songlist_playCount {
  position: absolute;
  font-size: 26px;
  bottom: 0;
  margin-bottom: 10px;
}
.pos_ico {
  right: 0;
  margin-right: 10px;
  color: #fff;
  font-size: 16px;
}
.pos_icos {
  left: 0;
  margin-left: 10px;
  color: #fff;
  font-size: 16px;
}
.songlist_playCount {
  left: 0;
  margin-left: 32px;
  font-size: 12px;
  color: #fff;
}
.rang_title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  text-align: center;
  margin-top: 50px;
  color: #fff;
}
</style>