<template>
  <div class="classify">
      <div class="classify_top">
          <p @click="tobackbtn">返回</p>
      </div>
      <special/>
  </div>
</template>

<script>
import special from '@/components/musicFirst/classify/special.vue'
export default {
    data(){
        return{

        }
    },
    methods:{
        tobackbtn(){
            this.$router.push({path:"/"});
        }
    },
    components:{
        special
    }
}
</script>

<style scoped>
p{
    line-height: 40px;
    height: 40px;
    padding-left: 10px;
}
.classify{
    width: 100%;
}
.classify_top{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    background-color: #fff;
    box-shadow: 1px 3px 3px #ccc;
}
</style>