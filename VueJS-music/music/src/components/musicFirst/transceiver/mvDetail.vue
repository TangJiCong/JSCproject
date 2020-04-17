<template>
  <div class="mvDetail">
      <div class="mvHead">
          <div @click="toBack">返回</div>
      </div>
      <video :src="mvData.url" controls="controls" class="video_ico" width="100%"></video>
  </div>
</template>

<script>
export default {
    data(){
        return{
            totalMV: this.HOST2 + "/mv/url",
            mvData: {}
        }
    },
    methods:{
        toBack(){
            this.$router.go(-1);
        }
    },
    mounted(){
        this.$axios
        .get(this.totalMV, { params: { id: this.$route.params.mvid}})
        .then(res => {
          this.mvData = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
}
</script>

<style scoped>
.mvDetail{
    width: 100%;
}
.mvHead{
    width: calc(100% - 20px);
    padding: 15px 10px;
    box-shadow: 1px 3px 3px #ccc;
    margin-bottom: 20px;
}
</style>