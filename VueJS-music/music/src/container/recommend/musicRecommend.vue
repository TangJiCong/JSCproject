<template>
  <div id="recommend">
      <musicSearch/>
      <menuNav/>
      <musicSongList/>
  </div>
</template>

<script>
import menuNav from '@/components/menuNav.vue'
import musicSearch from '@/components/musicSecond/musicSearch.vue'
import musicSongList from '@/components/musicSecond/musicSongList.vue'
export default {
    components:{
      menuNav,
      musicSearch,
      musicSongList
    }
}
</script>

<style scoped>
#recommend{
  background-color: #fafafa;
}
</style>