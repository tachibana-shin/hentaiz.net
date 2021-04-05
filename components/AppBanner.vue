<template>
  <swiper
    :options="{
      pagination: {
        el: '.pagination',
        clickable: true
      },
      loop: true,
      slidePreview: 1,
      spaceBetween: 10,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    }"
    class="banner.swiper"
  >
    <swiper-slide
      class="swiper-item"
      v-for="({ pratical, href, image, title }, index) in items"
      :key="index"
    >
      <router-link :to="href">
        <img :src="image" />
        <div class="information">
          <h2>{{ title }}</h2>
          <h3>{{ pratical }}</h3>
        </div>
      </router-link>
    </swiper-slide>
    <div class="pagination" slot="pagination"></div>
  </swiper>
</template>
<style lang="scss" scoped>
@mixin mX($value) {
  margin: {
    left: $value;
    right: $value;
  }
}

$width-expand: 922px;
.banner\.swiper {
  position: relative;
  border-radius: 5px;
  @media (min-width: 772px) {
    border-radius: 10px;
  }
  .swiper-item {
    position: relative;
    img {
      width: 100%;
      max-height: 186px;
      @media (min-width: $width-expand) {
        max-height: 416px;
      }
      object: {
        fit: cover;
        position: center top;
      }
      border-radius: 5px;
    }
    .information {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border: {
        bottom-left-radius: 5px;
        bottom-right-radius: 5px;
      }
      background-image: linear-gradient(
        -180deg,
        rgba(0, 0, 0, 0) 0,
        rgb(1, 1, 1) 100%
      );
      padding: 40px 15px 15px 15px;
      @media (min-width: 772px) {
        padding: 95px 22.5px 22.5px 22.5px;
      }
      @media (min-width: $width-expand) {
        padding: 150px 30px 30px 30px;
      }
      h2 {
        font-family: SF-Pro-Display-Heavy;
        font-size: 16px;
        font-weight: 400;
        margin-bottom: 5px;
        color: rgb(255, 255, 255);
        @media (min-width: 772px) {
          font-size: 25px;
        }
        @media (min-width: $width-expand) {
          font-size: 30px;
        }
      }
      h3 {
        font-size: 14px;
        line-height: 1.3em;
        color: rgb(155, 155, 155);
        margin-bottom: 10px;
        @media (min-width: 772px) {
          font-size: 18px;
        }
        @media (min-width: $width-expand) {
          font-size: 25px;
        }
      }
    }
  }
  .pagination {
    position: absolute;
    top: 5px;
    right: 16px;
    z-index: 2;
    margin: 0;
    padding: 0;
    & >>> span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      margin-right: 5px;
      display: inline-block;
      &.swiper-pagination-bullet-active {
        background-color: rgb(255, 255, 255);
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>
<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/swiper.scss";
import {
  Swiper as SwiperClass,
  Pagination,
  Mousewheel,
  Autoplay
} from "swiper";
SwiperClass.use([Pagination, Mousewheel, Autoplay]);
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  components: { Swiper, SwiperSlide },
  directives: {
    swiper: directive
  }
};
</script>
