<template>
  <v-row>
    <v-col cols="12">
      <app-section-grid :hentais="blocks" title="Lịch sử">
        <client-only>
          <vue-infinite-loading @infinite="fetch" class="mt-2">
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
      title: "Lịch sử quay tay",
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
          content: "Lịch sử quay tay"
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
          content: "Lịch sử quay tay"
        }
      ],
      link: [
        {
          rel: "url",
          hid: "url",
          href: `${process.env.BASE_URL}/history`
        },
        {
          rel: "canonical",
          hid: "canonical",
          href: `${process.env.BASE_URL}/history`
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
      const blocks = this.$store.state.history.hentais.slice(
        this.blocks.length,
        Math.min(
          this.blocks.length + 20,
          this.$store.state.history.hentais.length
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
