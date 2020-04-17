<template>
  <div class="radio">
      <div class="radio_nav">
          <router-link :to="{path:'/'}" class="nav_left">返回</router-link>
          <div class="nav_center">
              <router-link tag="p" :to="{path:'/transceiver/total'}">音乐电台</router-link>
              <span class="nav_space">|</span>
              <router-link tag="p" :to="{path:'/transceiver/news'}">有声电台</router-link>
          </div>
          <div class="nav_right"></div>
      </div>
      <router-view/>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.active{
    color: #31c27c;
}
.radio{
    width: 100%;
}
.radio_nav{
    width: calc(100% - 20px);
    padding: 15px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 3px 3px #ccc;
}
.nav_left,.nav_right{
    width: 20%;
}
.nav_left{
    text-align: left;
}
.nav_space{
    margin: 0 5px;
}
.nav_center{
    width: 60%;
    text-align: center;
    display: flex;
    justify-content: center;
}
</style>