<template>
  <div class="song_detail">
    <div class="song_top" @click="toback">返回</div>

    <div class="songletter">
      <div class="c" v-if="flag" :style="{'background':'url('+offarry3[0].al.picUrl+')',
      'background-repeat':'no-repeat','background-size':'320px 320px','background-position':'calc(50% ) calc(50% )'}">
      </div>
      <div class="error" v-show="flag2">纯音乐,无歌词</div>
      <div class="tc font20 mb15">{{g}}</div>
    </div>
    <div v-for="(item,index) in offarry" :key="index" class="audio_box">
      <audio controls="controls" :src="item.url" width="100%" id="player"></audio>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      offlist:
        this.HOST +
        "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=6&offset=0",
      offlist2: this.HOST2 + "/song/url",
      offlist3: this.HOST2 + "/lyric",
      offlist4: this.HOST2 + "/song/detail",
      offarry: [],
      offarry2: [],
      offarry3: [],
      flag: false,
      flag2: true,
      lrc: "",
      p: null,
      lrcObj: null,
      height: "auto",
      g: "",
      gd: {
        up: null,
        down: null
      },

    };
  },
  mounted() {
    //获取歌曲详情
    this.$axios
      .get(this.offlist4, { params: { ids: this.$route.params.songId } })
      .then(res => {
        console.log(res);
        if (res) {
          this.offarry3 = res.data.songs;
          this.flag = true;
        }
      })
      .catch(error => {
        console.log(error);
      });
    //获取音乐
    this.$axios
      .get(this.offlist2, { params: { id: this.$route.params.songId } })
      .then(res => {
        //console.log(res);
        this.offarry = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
    //获取歌词
    this.$axios
      .get(this.offlist3, { params: { id: this.$route.params.songId } })
      .then(res => {
        console.log(res);
        if (res.data.lrc.lyric) {
          this.flag2 = false;
        }
        this.offarry2.push(res.data.lrc.lyric);
        this.lrc = res.data.lrc.lyric;
        if (document.getElementById("player")) {
          this.showsong();
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    toback() {
      this.$router.go(-1);
    },
    jx() {
      var lyrics = this.lrc.split("\n");
      var lrcObj = {};
      for (var i = 0; i < lyrics.length; i++) {
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        var clause = lyric.replace(timeReg, "");
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
          var t = timeRegExpArr[k];
          var min = Number(String(t.match(/\[\d*/i)).slice(1)),
            sec = Number(String(t.match(/:\d*/i)).slice(1));
          var time = min * 60 + sec;
          lrcObj[time] = clause;
        }
      }
      return lrcObj;
    },
    showsong() {
      this.p = document.getElementById("player");
      console.log(this.p);
      let _this = this;
      this.lrcObj = this.jx();
      //console.log(this.lrcObj);
      this.p.addEventListener("timeupdate", function() {
        let obj = _this.lrcObj[Math.floor(this.currentTime)];
        if (obj != undefined) {
          _this.g = obj;
        }
      });
      this.height = window.innerHeight + "px";
      window.onresize = () => {
        _this.height = window.innerHeight + "px";
      };
    },
  }
};
</script>

<style scoped>
.song_detail {
  width: 100%;
}
.song_top {
  padding: 15px 10px;
  width: calc(100% - 20px);
  box-shadow: 1px 3px 3px #ccc;
  text-align: left;
  background-color: #fff;
  color: #333;
}
.audio_box {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
.songletter {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
audio {
  width: 100%;
}
.tc {
  text-align: center;
  margin: 0 auto;
}
.mb15 {
  margin-bottom: 15px;
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  left: 0;
  padding: 30px 0;
}
.font40 {
  font-size: 4rem;
}
.font20 {
  font-size: 2rem;
}
.c {
  color: #927712;
  width: 100%;
  height: 500px;
}
.error {
  font-size: 16px;
  letter-spacing: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 25px;
  margin-top: 30px;
  color: green;
  font-weight: bold;
  position: absolute;
  top: 30px;
  left: 0;
}
.song_box {
  width: 100%;
  margin-top: 10px;
  background: rgba(10, 40, 20, 0.5);
  color: rgba(255, 255, 255, 0.5);
}
</style>