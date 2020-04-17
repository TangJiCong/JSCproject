<template>
  <div class="off_detail">
    <!-- <router-link class="off_top" tag="div" :to="{path:'/'}">返回</router-link> -->
    <div class="off_top" @click="tobackbtn">返回</div>
    <div class="swiper_box">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item,index) in offarry.subscribers" :key="index">
          <img :src="item.backgroundUrl" class="swiper_img" alt />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <ul class="off_list">
      <li v-for="(item,index) in offarry.tracks" :key="index">
        <strong class="list_ol">{{index+1}}</strong>
        <!-- <router-link :to="{path:'/officialDetailItem/'+item.id}"> -->
        <router-link :to="{name:'officialDetailItem',params:{songlistId:songlistId,songId:item.id}}" @click="clearStore">
          <img :src="item.al.picUrl" width="60" />
        </router-link>
        <div class="off_list_txt">
          <p class="song_name">{{item.name}}</p>
          <p class="singer">
            <span v-for="(al,index) in item.ar" :key="index">{{al.name}}</span>
          </p>
        </div>
        <div class="list_ico">下载</div>
      </li>
    </ul>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true,
        songlistId:null,
      },
      offlist:
        this.HOST +
        "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=6&offset=0",
      offlist2: this.HOST2 + "/playlist/detail",
      offarry: {}
    };
  },
  mounted() {
    var loading=this.$weui.loading("loading...");
    this.songlistId=this.$route.params.songid;
    this.$axios
      .get(this.offlist2, { params: { id: this.$route.params.songid } })
      .then(res => {
        //console.log(res);
        //console.log(this.songlistId)
        this.offarry = res.data.playlist;
        loading.hide();
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods:{
    tobackbtn(){
      this.$router.go(-1);
    },
    clearStore(){
      if(localStorage.getItem("qqSongList")){
        localStorage.removeItem("qqSongList");
        if(localStorage.getItem("qqsongCurrent")){
          localStorage.removeItem("qqsongCurrent");
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
.off_detail {
  width: 100%;
  background-color: #fafafa;
}
.off_top {
  width: calc(100% - 20px);
  padding: 15px 10px;
  box-shadow: 1px 3px 3px #ccc;
}
.off_list {
  width: calc(100% - 20px);
  padding: 15px 10px;
}
.off_list li {
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 18px;
  background-color: #fff;
  margin: 10px 0;
  padding: 10px 0;
}
.off_list_txt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.list_ol {
  width: calc((100% - 60px) / 10 * 2);
  text-align: center;
}
.off_list_txt {
  width: calc((100% - 60px) / 10 * 5);
}
.song_name,
.singer {
  padding-left: 5px;
  width: calc(100% - 5px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.song_name {
  font-size: 14px;
  font-weight: bold;
}
.singer {
  font-size: 12px;
}
.list_ico {
  width: calc((100% - 60px) / 10 * 3);
}
.swiper_box {
  width: calc(100% - 20px);
  padding: 15px 10px 0;
}
.swiper_img {
  width: 100%;
}

</style>