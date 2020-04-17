<template>
  <div class="singerList">
    <div class="singer_top">
      <div class="top_left">
        <span class="grow_son left_10px" @click="toback">返回</span>
      </div>
      <div class="grow_son">
        <router-link :to="{path:'/singerList/singer'}" tag="span" class="right_10px">歌手</router-link>|
        <router-link :to="{path:'/singerList/mine'}" tag="span" class="left_10px">我的</router-link>
      </div>
      <div class="top_right">
        <span class="grow_son iconfont icon-sousuo right_10px"></span>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    toback(){
      this.$router.push({path:'/'});
    }
  }
};
</script>

<style scoped>
.active{
  color: #31c27c;
}
.singerList {
  width: 100%;
  background-color: #fafafa;
  overflow: hidden;
}
.singer_top {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 15px 0;
}
.grow_son {
  width: 40%;
  text-align: center;
}
.top_left,.top_right{
    width: 30%;
}
.top_left{
    text-align: left;
}
.top_right{
    text-align: right;
}
.left_10px{
    margin-left: 10px;
}
.right_10px{
    margin-right: 10px;
}
</style>