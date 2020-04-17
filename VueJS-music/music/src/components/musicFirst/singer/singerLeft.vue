<template>
  <div class="singleft">
    <div class="sing_list1">
      <div class="sing_item">
        <span class="border_radius pos_left" :class="{greenActive:singerType=='1001'}" @click="changeType('1001')">全部</span>
        <span class="border_radius pos_left" :class="{greenActive:singerType=='5001'}" @click="changeType('5001')">内地</span>
        <span class="border_radius pos_left" :class="{greenActive:singerType=='1002'}" @click="changeType('1002')">港台</span>
        <span class="border_radius pos_left" :class="{greenActive:singerType=='2002'}" @click="changeType('2002')">欧美</span>
        <span class="border_radius pos_left" :class="{greenActive:singerType=='6002'}" @click="changeType('6002')">日本</span>
        <span class="border_radius pos_left" :class="{greenActive:singerType=='7002'}" @click="changeType('7002')">韩国</span>
        <span class="border_radius pos_left" :class="{greenActive:singerType=='4002'}" @click="changeType('4002')">其他</span>
      </div>
    </div>
    <div class="sing_list2">
      <div class="sing_item">
        <span class="border_radius pos_left" :class="{greenActive:sexflag=='1'}" @click="changeSex('1')">全部</span>
        <span class="border_radius pos_left" :class="{greenActive:sexflag=='2'}" @click="changeSex('2')" >男</span>
        <span class="border_radius pos_left" :class="{greenActive:sexflag=='3'}" @click="changeSex('3')">女</span>
        <span class="border_radius pos_left" :class="{greenActive:sexflag=='4'}" @click="changeSex('4')">组合</span>
      </div>
    </div>
    <div class="sing_list3">
      <div class="sing_item">
        <div class="border_radius pos_left" :class="{greenActive:listflag=='1'}" @click="changeList('1')">全部</div>
        <div class="border_radius pos_left" :class="{greenActive:listflag=='2'}" @click="changeList('2')">流行</div>
        <div class="border_radius pos_left" :class="{greenActive:listflag=='3'}" @click="changeList('3')">嘻哈</div>
        <div class="border_radius pos_left" :class="{greenActive:listflag=='4'}" @click="changeList('4')">摇滚</div>
        <div class="border_radius pos_left" :class="{greenActive:listflag=='5'}" @click="changeList('5')">电子</div>
        <div class="border_radius pos_left" :class="{greenActive:listflag=='6'}" @click="changeList('6')">民谣</div>
        <div class="border_radius pos_left" :class="{greenActive:listflag=='7'}" @click="changeList('7')">民歌</div>
        <div class="border_radius pos_left" :class="{greenActive:listflag=='8'}" @click="changeList('8')">轻音乐</div>
        <div class="border_radius pos_left" :class="{greenActive:listflag=='9'}" @click="changeList('9')">爵士</div>
        <div class="border_radius pos_left" :class="{greenActive:listflag=='10'}" @click="changeList('10')">古典</div>
        <div class="border_radius pos_left" :class="{greenActive:listflag=='11'}" @click="changeList('11')">乡村</div>
        <div class="border_radius pos_left" :class="{greenActive:listflag=='12'}" @click="changeList('12')">蓝调</div>
      </div>
    </div>
    <div v-for="(item,index) in songArray" :key="index" class="song_content">
      <router-link :to="{path:'/singerDetail/'+item.id}">
        <img :src="item.img1v1Url" class="head_img" />
      </router-link>
      <div class="width_2">{{item.name}}</div>
      <div class="width_1 text_right">
        <span class="tipico">关注</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songlist1: this.HOST + "",
      songlist2: this.HOST2 + "/artist/list",
      songArray: [],
      singerType:'1001',
      flag:true,
      sexflag:'1',
      listflag:'1',
      loading:null
    };
  },
  methods: {

    

    changeList(id){
      this.listflag=id;
    },
    changeSex(id){
      this.sexflag=id;
    },
    changeType(id){
      this.singerType=id
      this.getsingerData();
    },
    getsingerData(){
      this.$axios
      .get(this.songlist2,{params:{cat:this.singerType,initial:'a'}})
      .then(res => {
        //console.log(res);
        this.songArray = res.data.artists;
        //console.log(res.data.artists);
        this.loading.hide();
      })
      .catch(error => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.loading = this.$weui.loading("loading", {
      className: "loading"
    });
    this.getsingerData();
  }
};
</script>

<style scoped>
.singleft {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.sing_list3 {
  width: 100%;
  overflow-x: scroll;
}
.sing_item {
  width: 200%;
  color: #333;
  font-size: 12px;
  padding-top: 10px;
  display: flex;
  justify-content: flex-start;
}
.border_radius {
  border-radius: 15px;
  display: inline-block;
  padding: 5px 6px;
  background-color: #fff;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  text-align: center;
  
}
.greenActive {
  color: #fff;
  background-color: #31c27c;
}
.pos_left {
  margin-left: 10px;
  text-align: center;
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
  font-size: 12px;
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