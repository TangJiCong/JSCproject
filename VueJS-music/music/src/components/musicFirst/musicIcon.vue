<template>
  <div class="list">
      <router-link tag="div" :to="{path:'/singerList'}" class="list_ico">
          <span class="iconfont icon-geshou"></span>
          歌手
      </router-link>
      <router-link tag="div" :to="{path:'/songRanking'}" class="list_ico">
          <span class="iconfont icon-paihang"></span>
          排行
      </router-link>
      <router-link tag="div" :to="{path:'/classify'}" class="list_ico">
          <span class="iconfont icon-fenleishouye"></span>
          分类歌单
      </router-link>
      <router-link tag="div" :to="{path:'/transceiver'}" class="list_ico">
          <span class="iconfont icon-diantai"></span>
          电台
      </router-link>
      <div class="list_ico">
          <span class="iconfont icon-huabankaobei-"></span>
          一起听
      </div>
  </div>
</template>

<script>
import "@/assets/font/iconfont.css";
export default {

}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.list{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 15px 0;
    background-color: #fff;
}
.list_ico{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    font-size: 12px;
    cursor: pointer;
}
.list_ico span{
    color: #31c27c;
    display: block;
    margin-bottom: 5px;
    font-size: 30px;
}
</style>