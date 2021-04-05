<template>
  <v-row>
    <v-col cols="12">
      <app-section-grid
        :hentais="blocks"
        title="Yêu thích"
        use-close-btn
        @click:close="
          $store.commit('favorite/pop', $event);
          blocks.splice($event.index, 1);
          $refs.infiniteLoading.stateChanger.reset();
        "
      >
        <client-only>
          <vue-infinite-loading
            @infinite="fetch"
            class="mt-2"
            ref="infiniteLoading"
          >
            <template v-slot:spinner>
              <v-progress-circular indeterminate small color="inherit" />
            </template>
          </vue-infinite-loading>
        </client-only>
      </app-section-grid>
    </v-col>
  </v-row>
</template>

<script>
import AppSectionGrid from "@/components/AppSectionGrid";
import VueInfiniteLoading from "vue-infinite-loading";

export default {
  components: {
    AppSectionGrid,
    VueInfiniteLoading
  },

  head() {
    return {
      title: "Danh sách yêu thích",
      meta: [
        {
          name: "description",
          hid: "description",
          content: null
        },
        {
          property: "og:description",
          hid: "og:description",
          content: null
        },
        {
          property: "og:title",
          hid: "og:title",
          content: "Danh sách yêu thích"
        },

        //// for
        {
          property: "twitter:description",
          hid: "twitter:description",
          content: null
        },
        {
          property: "twitter:title",
          hid: "twitter:title",
          content: "Danh sách yêu thích"
        }
      ],
      link: [
        {
          rel: "url",
          hid: "url",
          href: `${process.env.BASE_URL}/favorite`
        },
        {
          rel: "canonical",
          hid: "canonical",
          href: `${process.env.BASE_URL}/favorite`
        }
      ]
    };
  },
  async asyncData() {
    return {
      blocks: []
    };
  },
  methods: {
    fetch({ loaded, complete }) {
      const blocks = this.$store.state.favorite.hentais.slice(
        this.blocks.length,
        Math.min(
          this.blocks.length + 20,
          this.$store.state.favorite.hentais.length
        )
      );
      if (blocks.length === 0) {
        complete();
      } else {
        loaded();
      }

      this.blocks.push(...blocks);
    }
  }
};
</script>

<style lang="scss">
fieldset {
  border: 0 !important;
}
</style>
