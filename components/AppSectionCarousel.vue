<template>
  <div>
    <h3 class="text-h6 mb-3 font-weight-medium">{{ title }}</h3>

    <div class="mt-4">
      <swiper
        :options="{
          spaceBetween: 15,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          breakpoints: {
            960: {
              slidesPerView: 6.3
            },
            600: {
              slidesPerView: 3.3
            },
            1: {
              slidesPerView: 2
            }
          }
        }"
      >
        <swiper-slide
          v-for="({ href, image, pratical, title, subtitle }, index) in hentais"
          :key="index"
        >
          <v-card width="100%" color="transparent" flat :to="href">
            <v-img :src="image" :aspect-ratio="100 / 141.5">
              <v-chip
                rounded
                small
                color="pink"
                absolute
                top
                left
                class="mt-1 ml-1"
                v-if="pratical"
              >
                {{ pratical }}
              </v-chip>
            </v-img>

            <v-card-title
              class="text-body-2 pt-2 px-0"
              :class="{
                'pb-0': !subtitle
              }"
            >
              {{ title }}
            </v-card-title>
            <v-card-subtitle
              class="text--secondary px-0 pb-0"
              v-if="!!subtitle"
            >
              {{ subtitle }} lượt xem
            </v-card-subtitle>
          </v-card>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/navigation/navigation.scss";
import {
  Swiper as SwiperCore,
  Pagination,
  Mousewheel,
  Autoplay,
  Navigation
} from "swiper";

SwiperCore.use([Pagination, Mousewheel, Autoplay, Navigation]);

export default {
  props: {
    hentais: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
};
</script>

<style lang="scss" scoped>
.overflow-x-scroll {
  overflow-y: hidden;
  overflow-x: scroll;
}
.main {
  display: flex;
  > * {
    display: inline-block;
  }
}
</style>
