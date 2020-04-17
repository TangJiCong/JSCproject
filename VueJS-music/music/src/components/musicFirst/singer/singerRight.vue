<template>
  <div class="singerRight">
      <div class="mine_title">
        <router-link tag="div" :to="{path:'/singerList/mine/concern'}" class="title_left">关注歌手</router-link>
        <router-link tag="div" :to="{path:'/singerList/mine/often'}" class="title_right">常听歌手</router-link>
      </div>
      <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.mine_title{
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: #fff;
}
.title_left,.title_right{
  width: 50%;
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.active {
  color: #31c27c;
}
</style>