<template>
  <v-row>
    <v-col cols="12">
      <app-banner :items="swiper" v-if="swiper.length > 0"></app-banner>

      <app-section-grid :hentais="hentaiNew" title="Mới nhất">
        <template v-slot:actions>
          <v-btn text to="/top-hentai">
            Xem thêm
          </v-btn>
        </template>
      </app-section-grid>
      <app-section-grid :hentais="hentaiTopWeek" title="Hentai top tuần" />
      <app-section-grid :hentais="hentaiCommingSoon" title="Sắp chiếu" />
      <app-section-grid :hentais="hentaiNoCover" title="Không che" />
      <app-section-grid :hentais="hentaiFinish" title="Hoàn thành" />
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
