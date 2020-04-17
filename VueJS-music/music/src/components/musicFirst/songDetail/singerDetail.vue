<template>
  <div class="singer">
    <div v-if="flag" class="singer_bg">
      <div class="singer_top" @click="tobackbtn">返回</div>
      <p class="singer_name">{{artistData.artist.name}}</p>
      <p class="singer_care">
        <span class="singer_jia">+</span> 关注
      </p>
      <img :src="artistData.artist.picUrl" width="120" class="singer_bgimg" />
    </div>
    <ul class="singerlist">
      <li v-for="(item,index) in artistData.hotSongs" :key="index">
        <router-link
          tag="div"
          :to="{name:'album',params:{albumId:artistData.artist.id,nowId: item.id}}"
          class="singer_item" @click="clearStorage"
        >
          <div class="singerOl">{{index+1}}</div>
          <img :src="item.al.picUrl" class="singer_img" />
          <p class="singer_title">{{item.name}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tosinger: this.HOST2 + "/artist/album",
      offlist2: this.HOST2 + "/artists",
      flag: false,
      limit: 30,
      offset: 0,
      singerData: {},
      artistData: {}
    };
  },
  mounted() {
    var loading=this.$weui.loading("loading...");
    this.$axios
      .get(this.offlist2, { params: { id: this.$route.params.singerId } })
      .then(res => {
        //console.log(res);
        this.artistData = res.data;

        this.flag = true;
        loading.hide();
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    tobackbtn() {
      this.$router.go(-1);
    },
    clearStorage() {
      if (localStorage.getItem("qqSingerList")) {
        localStorage.removeItem("qqSingerList");
        if (localStorage.getItem("qqsingerCurrent")) {
          localStorage.removeItem("qqsingerCurrent");
        }
      }
    }
  }
};
</script>

<style scoped>
.singer {
  width: 100%;
}
.singer_bg {
  width: 100%;
  position: relative;
}
.singer_bgimg {
  width: 100%;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}
.singer_top {
  width: calc(100%-20px);
  padding: 15px 10px;
  font-size: 16px;
  font-weight: bold;
  position: absolute;
  color: #fff;
  left: 0;
  top: 0;
}
.singer_name {
  position: absolute;
  left: 10px;
  bottom: 30px;
  font-size: 30px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 5px;
}
.singer_care {
  position: absolute;
  right: 10px;
  bottom: 15px;
  right: 10px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 12px;
}
.singer_jia {
  font-size: 22px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.singerlist {
  width: calc(100% - 20px);
  padding: 15px 10px;
}
.singerlist li {
  padding: 10px 0;
  width: 100%;
  background: #fff;
  border-radius: 15px;
  box-shadow: 5px 5px 5px #ccc;
  margin: 10px 0;
}
.singer_item {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.singerOl {
  width: 30px;
  text-align: center;
}
.singer_img {
  width: 120px;
}
.singer_title {
  width: calc(100% - 160px);
  padding-left: 10px;
}
</style>