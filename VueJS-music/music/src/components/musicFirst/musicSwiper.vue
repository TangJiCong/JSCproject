<template>
  <div class="swiper">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img src="@/assets/img/b1.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/b2.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/b3.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/b4.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/b5.jpg" alt />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/img/b6.jpg" alt />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: true
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style scoped>
.swiper{
    width: 100%;
    padding: 10px 0;
}
.swiper img{
    width: 100%;
}
</style>