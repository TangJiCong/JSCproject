<template>
  <div id="mainMusic">
      <musicHeader/>
      <menuNav/>
      <musicSwiper/>
      <musicIcon/>
      <musicOfficialList/>
      <musicDARlist/>
      <musicClassification/>
      <div class="space"></div>
  </div>
</template>

<script>

import menuNav from '@/components/menuNav.vue'
import musicHeader from '@/components/musicFirst/musicHeader.vue'
import musicSwiper from '@/components/musicFirst/musicSwiper.vue'
import musicIcon from '@/components/musicFirst/musicIcon.vue'
import musicOfficialList from '@/components/musicFirst/musicOfficialList.vue'
import musicDARlist from '@/components/musicFirst/musicDARlist.vue'
import musicClassification from '@/components/musicFirst/musicClassification.vue'
export default {
    components:{
        menuNav,
        musicHeader,
        musicSwiper,
        musicIcon,
        musicOfficialList,
        musicDARlist,
        musicClassification
    }
}
</script>

<style scoped>
#mainMusic{
    background-color: #fafafa;
    width: 100%;
}
.space{
    height: 68px;
    width: 100%;
}
</style>