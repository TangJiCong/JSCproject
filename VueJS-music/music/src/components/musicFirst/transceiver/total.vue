<template>
  <div class="total">
    <div class="total_title">
      <div class="total_titlebox">
        <p :class="{current: isflag}" @click="tochangearea('全部')">全部</p>
        <p :class="{current: isflag2}" @click="tochangearea('内地')">内地</p>
        <p :class="{current: isflag3}" @click="tochangearea('港台')">港台</p>
        <p :class="{current: isflag4}" @click="tochangearea('欧美')">欧美</p>
        <p :class="{current: isflag5}" @click="tochangearea('日本')">日本</p>
        <p :class="{current: isflag6}" @click="tochangearea('韩国')">韩国</p>
      </div>
    </div>
    <div class="total_content">
      <div class="content_item">
        <div v-for="(item,index) in mvData" :key="index" class="item_box">
          <router-link :to="{path:'/mvDetails/'+item.id}">
            <img :src="item.cover" />
          </router-link>
          <div class="artists_box">{{item.artistName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalMV: this.HOST2 + "/mv/all",
      area: "",
      limit: 40,
      mvData: [],
      isflag:true,
      isflag2:false,
      isflag3:false,
      isflag4:false,
      isflag5:false,
      isflag6:false,
      loading:null,
    };
  },
  methods: {
    toshow() {
      this.$axios
        .get(this.totalMV, { params: { limit: this.limit ,area: this.area} })
        .then(res => {
          //console.log(res);
          this.mvData = res.data.data;
          this.loading.hide();
        })
        .catch(error => {
          console.log(error);
        });
    },
    tochangearea(name){
        this.area=name;
        this.toshow();
        this.toactive(name);
        console.log(name);
    },
    toactive(name){
        switch (name){
            case '全部':
                this.isflag2=this.isflag3=this.isflag4=this.isflag5=this.isflag6=false;
                this.isflag=true;
                break;
            case '内地':
                this.isflag=this.isflag3=this.isflag4=this.isflag5=this.isflag6=false;
                this.isflag2=true;
                break;
            case '港台':
                this.isflag2=this.isflag=this.isflag4=this.isflag5=this.isflag6=false;
                this.isflag3=true;
                break;
            case '欧美':
                this.isflag2=this.isflag3=this.isflag=this.isflag5=this.isflag6=false;
                this.isflag4=true;
                break;
            case '日本':
                this.isflag2=this.isflag3=this.isflag4=this.isflag=this.isflag6=false;
                this.isflag5=true;
                break;
            case '韩国':
                this.isflag2=this.isflag3=this.isflag4=this.isflag5=this.isflag=false;
                this.isflag6=true;
                break;
            default:
                this.isflag2=this.isflag3=this.isflag4=this.isflag5=this.isflag6=false;
                this.isflag=true;
        }
    }
  },
  mounted() {
    this.loading=this.$weui.loading("loading");
    this.toshow();
  }
};
</script>

<style scoped>
.current {
  color: orange;
}
.total {
  width: calc(100% - 20px);
  padding: 0 10px;
}
.total_title {
  padding: 20px 0;
  width: 100%;
  overflow-x: scroll;
}
.total_titlebox {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.total_titlebox p {
  flex: 1px;
  text-align: center;
}
.total_content {
  width: 100%;
  overflow-x: scroll;
}
.content_item {
  display: flex;
  justify-content: flex-start;
}
.item_box {
  width: 150px;
  margin-left: 10px;
}
.content_item div.item_box:nth-child(1) {
  margin-left: 0;
}
.item_box img {
  width: 150px;
  height: 85px;
}
.artists_box {
  font-size: 12px;
}
</style>