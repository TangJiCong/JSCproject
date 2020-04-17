<template>
  <div class="regional">
    <div class="regional_box">
      <h2>特色榜</h2>
      <div class="regional_item">
        <div class="item_ico" v-for="(item,index) in rankarry" :key="index">
          <router-link tag="div" :to="{path:'/toOfficialDetail/'+item.id}">
            <img :src="item.coverImgUrl" class="item_img" />
            <span class="iconfont icon-bofang pos_ico"></span>
            <span class="iconfont icon-huabankaobei- pos_icos"></span>
            <span class="songlist_playCount">{{parseInt(item.playCount/10000)+'万'}}</span>
          </router-link>
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
      ranklist2: this.HOST2 + "/top/list?idx="
    };
  },
  mounted() {
    var loading = this.$weui.loading("loading");
    setTimeout(function() {
      loading.hide();
    }, 3000);
    //抖音排行榜
    this.$axios
      .get(this.ranklist2 + "26")
      .then(res => {
        this.rankarry.push(res.data.playlist);
        //console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    //网络歌曲榜
    this.$axios
      .get(this.ranklist2 + "5")
      .then(res => {
        this.rankarry.push(res.data.playlist);
        //console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    //电音榜
    this.$axios
      .get(this.ranklist2 + "20")
      .then(res => {
        this.rankarry.push(res.data.playlist);
        //console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    //新歌榜榜
    this.$axios
      .get(this.ranklist2 + "0")
      .then(res => {
        this.rankarry.push(res.data.playlist);
        //console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    //热歌榜
    this.$axios
      .get(this.ranklist2 + "1")
      .then(res => {
        this.rankarry.push(res.data.playlist);
        //console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    //综艺新歌榜
    this.$axios
      .get(this.ranklist2 + "16")
      .then(res => {
        this.rankarry.push(res.data.playlist);
        //console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    //影视金曲榜
    this.$axios
      .get(this.ranklist2 + "29")
      .then(res => {
        this.rankarry.push(res.data.playlist);
        //console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    //腾讯音乐人榜
    this.$axios
      .get(this.ranklist2 + "33")
      .then(res => {
        this.rankarry.push(res.data.playlist);
        //console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    //全面K歌榜
    this.$axios
      .get(this.ranklist2 + "30")
      .then(res => {
        this.rankarry.push(res.data.playlist);
        //console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
h2 {
  font-size: 16px;
  padding-left: 10px;
  padding-bottom: 10px;
}
.regional {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.regional_box {
  width: 100%;
  padding: 15px 0;
}
.regional_item {
  width: calc(100% - 10px);
  padding: 0 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.item_ico {
  width: calc((100% - 30px) / 3);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin: 0 5px 15px;
}
.item_img {
  width: 100%;
}
.pos_ico,
.pos_icos,
.songlist_playCount {
  position: absolute;
  font-size: 26px;
  bottom: 0;
  margin-bottom: 10px;
}
.songlist_playCount {
  left: 0;
  margin-left: 32px;
  font-size: 12px;
  color: #fff;
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
</style>