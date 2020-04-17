<template>
  <div class="rangTop">
    <h2>巅峰榜</h2>
    <div class="rangtop_con" v-for="(item,index) in rankarry" :key="index">
      <router-link tag="div" :to="{path:'/toOfficialDetail/'+item.id}" class="rangtop_box">
        <div class="rangtop_txt">
          <h3>{{item.name}}</h3>
          <ul class="ullist">
            <li>{{item.tracks[0].name}}</li>
            <li>{{item.tracks[1].name}}</li>
            <li>{{item.tracks[3].name}}</li>
          </ul>
        </div>

        <div class="item_ico">
          <img :src="item.coverImgUrl" class="item_img" />
          <span class="iconfont icon-bofang pos_ico"></span>
          <span class="iconfont icon-huabankaobei- pos_icos"></span>
          <span class="songlist_playCount">{{parseInt(item.playCount/10000)+'万'}}</span>
        </div>
      </router-link>
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
    //飙升榜
    this.$axios
      .get(this.ranklist2 + "3")
      .then(res => {
        this.rankarry.push(res.data.playlist);
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
    //新歌榜
    this.$axios
      .get(this.ranklist2 + "27")
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
    //说唱榜
    this.$axios
      .get(this.ranklist2 + "23")
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
  padding-left: 10px;
  font-size: 16px;
  padding-bottom: 15px;
}
.rangTop {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 15px;
}
.rangtop_txt {
  border-radius: 10px;
  padding-top: 15px;
}
.rangtop_con {
  width: calc(100% - 20px);
  margin: 0 10px;
  background-color: #fff;
  border-radius: 15px;
  margin-bottom: 15px;
  overflow: hidden;
}
.rangtop_box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.item_img {
  width: 120px;
}
.item_ico {
  position: relative;
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
h3 {
  margin-left: 50px;
}
.ullist {
  margin-left: 50px;
  font-size: 12px;
  line-height: 25px;
  list-style-type: decimal;
  margin-left: 65px;
}
</style>