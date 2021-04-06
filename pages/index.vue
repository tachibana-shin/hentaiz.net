<template>
  <v-row>
    <v-col cols="12">
      <app-banner :items="swiper" v-if="swiper.length > 0"></app-banner>

      <app-section-grid
        :hentais.sync="hentaiNew"
        title="Mới nhất"
        to="/top-hentai"
        axios="/special/top-hentai"
        mt-sm="1"
      />
      <app-section-grid :hentais="hentaiTopWeek" title="Hentai top tuần" />
      <app-section-grid
        :hentais="hentaiCommingSoon"
        title="Sắp chiếu"
        to="/trailer-hentai"
        axios="/special/trailer-hentai"
      />
      <app-section-grid
        :hentais.sync="hentaiNoCover"
        title="Không che"
        to="/hentai-uncensored"
        axios="/special/hentai-uncensored"
      />
      <app-section-grid
        :hentais.sync="hentaiFinish"
        title="Hoàn thành"
        to="/completed-hentai"
        axios="/special/completed-hentai"
      />
    </v-col>
  </v-row>
</template>

<script>
import AppBanner from "@/components/AppBanner";
import AppSectionGrid from "@/components/AppSectionGrid";

export default {
  components: {
    AppBanner,
    AppSectionGrid
  },
  async asyncData({ $axios }) {
    const {
      data: {
        hentaiNew,
        hentaiTopWeek,
        hentaiCommingSoon,
        hentaiNoCover,
        hentaiFinish,
        swiper = []
      }
    } = await $axios.get("/index");

    return {
      hentaiNew,
      hentaiTopWeek,
      hentaiCommingSoon,
      hentaiNoCover,
      hentaiFinish,
      swiper
    };
  }
};
</script>
