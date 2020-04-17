<template>
  <div class="song_detail">
    <div class="song_box">
      <div class="song_top" @click="toback">返回</div>
      <header>
        <h1 class="song-title" ref="songtitle"></h1>
        <div class="singer" ref="singer"></div>
      </header>
      <div class="content">
        <div class="record-wrapper" style="display: block;" ref="recordwrapper">
          <div class="record-bg mid">
            <div class="record-pic mid" ref="recordpic">
              <img src="@/assets/img/pic.jpg" alt="唱片图片" ref="recordImg" />
            </div>
          </div>
        </div>
        <div class="lyrics-wrapper">
          <ul class="lyrics" ref="lyrics"></ul>
        </div>
      </div>
      <footer>
        <div class="channel" data-channel-id ref="channel"></div>
        <div class="progress-bar" ref="progressBar" @click="setclick($event)">
          <div class="progress" ref="progress"></div>
          <div
            class="progress-btn"
            ref="progressBtn"
            @touchend="setTouchends($event)"
            @touchmove="setTouchmoves($event)"
            @touchstart="setTouchstarts()"
          ></div>
        </div>
        <div class="btns">
          <div class="show-lyrics icon-sides" ref="lyricBtn" @click="lyricBtn"></div>
          <div class="change-channel icon-middle" ref="changeChannel" @click="changeChannelBtn"></div>
          <div class="play" @click="playBtns" ref="play"></div>
          <div class="next icon-middle" ref="nextBtn" @click="nextBtn"></div>
          <div class="mode icon-sides" ref="mode" @click="modeBtn"></div>
        </div>
      </footer>
      <div class="glass">
        <img ref="bigBg" />
      </div>
      <audio id="mic_audio" ref="mic_audio" src="@/assets/default.mp3" @oncanplay="canplay" autoplay muted></audio>
    </div>
  </div>
</template>

<script>
import "@/assets/css/bofang.css";
export default {
  data() {
    return {
      offlist:
        this.HOST +
        "/v1/restserver/ting?method=baidu.ting.billboard.billList&type=1&size=6&offset=0",
      offlist2: this.HOST2 + "/song/url",
      offlist3: this.HOST2 + "/lyric",
      offlist4: this.HOST2 + "/song/detail",
      offlist5: this.HOST2 + "/playlist/detail",
      offarry: [],
      lyricsLiArr: null, //记录歌词数组
      num: 1, //自动播放标识
      channelArr: [], //用来记录“歌单”的数组
      isLoading: false,
      progressTimer: null,
      numId: null,
      playTime: null
    };
  },
  mounted() {
    var listId = "";
    if (localStorage.getItem("qqSongList")) {
      this.numId = JSON.parse(localStorage.getItem("qqSongList")).songId;
      listId = JSON.parse(localStorage.getItem("qqSongList")).songlistId;
      if (localStorage.getItem("qqsongCurrent")) {
        this.playTime = localStorage.getItem("qqsongCurrent");
      }
    } else {
      this.numId = this.$route.params.songId || "33894312";
      listId = this.$route.params.songlistId || "24381616";
      this.$refs.mic_audio.play();
    }
    this.getChannel(listId);
    this.progressTimer = setInterval(this.activeProgressBar, 300);
    console.log(
      this.$route.params.songId + "---" + this.$route.params.songlistId
    );
  },
  methods: {
    canplay() {
      console.log("加载成功");
      this.$refs.mic_audio.play();
      if (this.playTime) {
        this.$refs.mic_audio.currentTime = this.playTime;
      }
      this.playTime = null;
    },
    toback() {
      this.$router.go(-1);
    },
    setTouchstarts() {
      this.progressTimer = clearInterval(this.progressTimer);
    },
    setTouchends(e) {
      var percentNum =
        (e.changedTouches[0].pageX - this.getref().progressBar.offsetLeft) /
        this.getref().progressBar.offsetWidth;
      this.getref().musicAudio.currentTime =
        this.getref().musicAudio.duration * percentNum;
      this.getref().progressBtn.style.left = percentNum * 100 + "%";
      this.getref().progress.style.width = percentNum * 100 + "%";
      this.progressTimer = setInterval(this.activeProgressBar, 300);
    },
    setTouchmoves(e) {
      var percentNum =
        (e.targetTouches[0].pageX - this.getref().progressBar.offsetLeft) /
        this.getref().progressBar.offsetWidth;
      if (percentNum > 1) {
        percentNum = 1;
      } else if (percentNum < 0) {
        percentNum = 0;
      }
      this.getref().musicAudio.currentTime =
        this.getref().musicAudio.duration * percentNum;
      this.getref().progressBtn.style.left = percentNum * 100 + "%";
      this.getref().progress.style.width = percentNum * 100 + "%";
    },
    setclick(e) {
      var percentNum =
        (e.pageX - this.getref().progressBar.offsetLeft) /
        this.getref().progressBar.offsetWidth;
      if (percentNum > 1) {
        percentNum = 1;
      } else if (percentNum < 0) {
        percentNum = 0;
      }
      this.getref().musicAudio.currentTime =
        this.getref().musicAudio.duration * percentNum;
      this.getref().progressBtn.style.left = percentNum * 100 + "%";
      this.getref().progress.style.width = percentNum * 100 + "%";
    },
    getref() {
      return {
        musicAudio: this.$refs.mic_audio, //audio标签
        channel: this.$refs.channel, // 频道标签节点
        songTitle: this.$refs.songtitle, // 歌名标签节点
        singer: this.$refs.singer, // 歌手标签节点
        recordImg: this.$refs.recordImg, // 专辑图片
        recordPic: this.$refs.recordpic, // 专辑图片外层div节点
        recordWrap: this.$refs.recordwrapper, // 专辑区域
        playBtn: this.$refs.play, // 播放按钮
        nextBtn: this.$refs.nextBtn, // 下一区按钮
        changeChannelBtn: this.$refs.changeChannel, // 更换频道
        modeBtn: this.$refs.mode, // 切换播放模式
        progressBar: this.$refs.progressBar, // 进度条外层div
        progress: this.$refs.progress, // 进度条长度
        progressBtn: this.$refs.progressBtn, // 进度条拖动按钮
        lyricBtn: this.$refs.lyricBtn, // 显示歌词按钮
        lyrics: this.$refs.lyrics, // 歌词的包裹节点
        bigBg: this.$refs.bigBg
      };
    },
    activeProgressBar() {
      if (this.getref().musicAudio) {
        var percentNum =
          Math.floor(
            (this.getref().musicAudio.currentTime /
              this.getref().musicAudio.duration) *
              10000
          ) /
            100 +
          "%";
        this.getref().progress.style.width = percentNum;
        this.getref().progressBtn.style.left = percentNum;
        if (
          percentNum == "100%" &&
          !this.isLoading &&
          !this.getref().musicAudio.loop
        ) {
          this.isLoading = true;
          this.nextBtn();
        }
        if (
          this.getref().musicAudio.paused &&
          this.getref().recordPic.className != "record-pic mid"
        ) {
          this.getref().recordPic.className = "record-pic mid";
          this.getref().playBtn.style.backgroundImage =
            "url(" + require("@/assets/img/puase.png") + ")";
          return;
        } else if (
          this.getref().recordPic.className != "record-pic mid rotate" &&
          !this.getref().musicAudio.paused
        ) {
          this.getref().recordPic.className = "record-pic mid rotate";
          this.getref().playBtn.style.backgroundImage =
            "url(" + require("@/assets/img/bofang.png") + ")";
        }

        localStorage.setItem(
          "qqsongCurrent",
          JSON.stringify(this.getref().musicAudio.currentTime)
        );
        // 控制歌词动态滚动
        if (this.lyricsLiArr) {
          for (var i = 0, len = this.lyricsLiArr.length - 1; i < len; i++) {
            var curT = parseFloat(
              this.lyricsLiArr[i].getAttribute("data-time")
            );
            var nexT = parseFloat(
              this.lyricsLiArr[i + 1].getAttribute("data-time")
            );
            var curtTime = this.getref().musicAudio.currentTime;

            if (curtTime > curT && curtTime < nexT) {
              this.lyricsLiArr[i].style.color = "#31c27c";
              if (
                this.getref().lyrics.offsetHeight -
                  this.lyricsLiArr[i].offsetTop >
                  300 &&
                i >= 2
              ) {
                this.getref().lyrics.style.marginTop =
                  -(
                    this.lyricsLiArr[i].offsetTop -
                    this.getref().lyrics.offsetTop -
                    50
                  ) + "px";
              }
            } else {
              this.lyricsLiArr[i].style.color = "#fff";
            }
          }
        }
      }
    },
    lyricBtn() {
      if (this.getref().recordWrap.style.display == "block") {
        this.getref().recordWrap.style.display = "none";
        this.getref().channel.style.fontSize = 0;
        if (!this.getref().lyricsLiArr) {
          this.getlyric(this.numId);
        }
      } else {
        this.getref().recordWrap.style.display = "block";
        this.getref().channel.style.fontSize = "12px";
      }
    },
    modeBtn() {
      if (this.getref().musicAudio.loop) {
        this.getref().musicAudio.loop = false;
        this.getref().modeBtn.style.backgroundImage =
          "url(" + require("@/assets/img/random.png") + ")";
      } else {
        this.getref().musicAudio.loop = true;
        this.getref().modeBtn.style.backgroundImage =
          "url(" + require("@/assets/img/switchfor.png") + ")";
      }
    },
    changeChannelBtn() {
      if (!this.getref().musicAudio.loop) {
        for (var i = 0; i < this.channelArr[0].length; i++) {
          if (this.channelArr[0][i].id === this.numId) {
            if (i > 0) {
              this.numId = this.channelArr[0][i - 1].id;
              break;
            } else {
              this.numId = this.channelArr[0][this.channelArr[0].length - 1].id;
              break;
            }
          }
        }
      }

      this.getMusic(this.numId);
      this.$refs.mic_audio.play();
    },
    nextBtn() {
      if (!this.getref().musicAudio.loop) {
        for (var i = 0; i < this.channelArr[0].length; i++) {
          if (this.channelArr[0][i].id === this.numId) {
            if (i < this.channelArr[0].length - 1) {
              this.numId = this.channelArr[0][i + 1].id;
              break;
            } else {
              this.numId = this.channelArr[0][0].id;
              break;
            }
          }
        }
      }
      this.getMusic(this.numId);
      this.$refs.mic_audio.play();
    },
    playBtns() {
      //播放按钮

      this.getref().musicAudio.onplaying = null;
      if (this.getref().musicAudio.paused) {
        this.getref().playBtn.style.backgroundImage =
          "url(" + require("@/assets/img/bofang.png") + ")";
        this.getref().musicAudio.play();
      } else {
        this.getref().playBtn.style.backgroundImage =
          "url(" + require("@/assets/img/puase.png") + ")";
        this.getref().musicAudio.pause();
      }
    },
    getChannel(listId) {
      //获取歌单
      //var listId = this.$route.params.songlistId || "24381616";
      this.$axios
        .get(this.offlist5, { params: { id: listId } })
        .then(res => {
          //console.log(res);
          this.channelArr.push(res.data.playlist.tracks);
          //this.numId = this.$route.params.songId || "33894312";
          this.getMusic(this.numId);

        
          let songlistdata = JSON.stringify({
            songlistId: listId,
            songId: this.numId
          });
          localStorage.setItem("qqSongList", songlistdata);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getRandomChannel(channelArr) {
      // 获取随机频道
      var randomNum = Math.floor(channelArr.length * Math.random());
      var randomChannel = channelArr[randomNum];
      this.$refs.channel.innerHTML = randomChannel.name;
      this.$refs.channel.setAttribute("data-channel-id", randomChannel.id);
    },
    getMusic(numId) {
      //获取音乐地址

      if(localStorage.getItem("qqSongList")){
        let songlistdata=JSON.parse(localStorage.getItem("qqSongList"));
        songlistdata.songId=numId;
        localStorage.setItem("qqSongList",JSON.stringify(songlistdata));
      }
      this.$axios
        .get(this.offlist2, { params: { id: numId } })
        .then(res => {
          //获取歌曲详情

          this.$axios
            .get(this.offlist4, { params: { ids: numId } })
            .then(ress => {
              var songObj = res.data.data[0];
              var songObj2 = ress.data.songs[0];
              this.$refs.songtitle.innerHTML = songObj2.name;
              this.$refs.singer.innerHTML = songObj2.ar[0].name;
              this.$refs.recordImg.src = songObj2.al.picUrl;
              this.$refs.bigBg.src = songObj2.al.picUrl;
              this.$refs.mic_audio.src = songObj.url;
              this.$refs.mic_audio.setAttribute("data-sid", songObj2.id);
              this.$refs.mic_audio.setAttribute("data-ssid", songObj2.id);
              this.$refs.mic_audio.autoplay;
              this.isLoading = false;

              this.getlyric(numId);

              if (this.playTime) {
                this.$refs.mic_audio.currentTime = this.playTime;
              }
              this.playTime = null;

            })
            .catch(errors => {
              console.log(errors);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    getlyric(Id) {
      //获取歌词
      var lyricId = Id || "33894312";

      this.$axios
        .get(this.offlist3, { params: { id: lyricId } })
        .then(res => {
          //console.log(res)
          var lyricsObj = res.data;
          if (lyricsObj.lrc.lyric) {
            this.$refs.lyrics.innerHTML = "";
            var lineArr = lyricsObj.lrc.lyric.split("\n");
            var timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g;
            var result = [];
            for (var i in lineArr) {
              var time = lineArr[i].match(timeReg);
              if (!time) continue;
              var curStr = lineArr[i].replace(timeReg, "");
              for (var j in time) {
                var t = time[j].slice(1, -1).split(":");
                var curSecond = parseInt(t[0], 10) * 60 + parseFloat(t[1]);
                result.push([curSecond, curStr]);
              }
            }
            result.sort(function(a, b) {
              return a[0] - b[0];
            });

            // 渲染歌词到界面
            this.renderLyrics(result);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    renderLyrics(lyricArr) {
      var str = "";
      for (var i = 0, len = lyricArr.length; i < len; i++) {
        str +=
          '<li data-time="' + lyricArr[i][0] + '">' + lyricArr[i][1] + "</li>";
      }
      this.$refs.lyrics.innerHTML = str;
      this.lyricsLiArr = this.$refs.lyrics.getElementsByTagName("li");
    }
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
  text-align: left;
  color: #fff;
  font-weight: bold;
  position: fixed;
  top: 0;
  left: 0;
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
  background: rgba(10, 40, 20, 0.5);
  color: rgba(255, 255, 255, 0.5);
  position: relative;
}
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  padding: 40px 0 10px;
  width: 100%;
  text-align: center;
}
header .song-title {
  width: 100%;
  font-size: 16px;
  line-height: 25px;
  height: 25px;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
header .singer {
  width: 100%;
  font-size: 12px;
  line-height: 25px;
  height: 25px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.content {
  width: 100%;
  height: 310px;
  overflow: hidden;
}
.content .record-wrapper {
  position: relative;
  height: 100%;
  width: calc(100% - 80px);
  padding: 0 40px;
}
.content .mid {
  margin: auto;
}
.content .record-pic {
  width: calc(100% - 60px);
  padding: 30px 30px;
}
.content .record-pic img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
  overflow: hidden;
}

.content .lyrics-wrapper {
  position: relative;
  width: 100%;
  min-height: 200px;
  overflow: hidden;
}
.lyrics-wrapper .lyrics {
  width: 100%;
  transition: top 0.5s;
  text-align: center;
  line-height: 25px;
  font-size: 12px;
}
.lyrics-wrapper .lyrics li {
  line-height: 25px;
  height: 25px;
  font-size: 12px;
}
.lyrics-wrapper .lyrics li.active {
  color: #fff;
}

footer {
  width: 100%;
  height: 70px;
}
footer .channel {
  text-align: center;
  font-size: 0.5rem;
  line-height: 0.625rem;
}
.progress-bar {
  position: relative;
  height: 5px;
  width: calc(100% - 50px);
  border-radius: 0.0625rem;
  background: rgba(255, 255, 255, 0.4);
  margin: 15px 25px 15px;
}
.progress {
  height: 100%;
  width: 0;
  background: red;
  border-radius: 0.0625rem;
}
.progress-btn {
  position: absolute;
  left: 0;
  top: -0.09375rem;
  width: 0.5rem;
  height: 0.375rem;
  margin-left: -0.25rem;
  background: #fff;
  border-radius: 0.125rem;
}

.btns {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
}
.icon-sides {
  width: 25px;
  height: 25px;
  background-size: 100% 100%;
}
.icon-middle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-size: 100% 100%;
}

.rotate {
  animation: recordRotate 30s linear 1s infinite;
}

@keyframes recordRotate {
  to {
    transform: rotate(360deg);
  }
}

/* 全局背景 */
.glass {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}
.glass img {
  width: 100%;
  height: 100%;
  filter: blur(20px);
}
</style>