<template>
  <v-row>
    <v-col cols="12">
      <app-section-grid :hentais="blocks" :title="title">
        <template v-slot:actions>
          <v-select
            :items="items"
            v-model="sortBy"
            dense
            outlined
            single-line
            hide-details
            small
            width="50"
            rounded
            tile
            item-text="label"
            item-value="value"
            :style="{
              width: '160px'
            }"
          ></v-select>
        </template>
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

function getPath(type, id) {
  if (id) {
    return `/${type}/${id}`;
  } else {
    return `/special/${type}`;
  }
}

export default {
  components: {
    AppSectionGrid,
    VueInfiniteLoading
  },
  data() {
    return {
      items: [
        { label: "Lượt xem", value: "view" },
        { label: "Tên A-Z", value: "ASC" },
        { label: "Tên Z-A", value: "DESC" }
      ]
    };
  },
  computed: {
    sortBy: {
      get() {
        return this.$route.query.sort || "view";
      },
      set(value) {
        this.$router.push({
          ...this.$route,
          query: {
            ...this.$route.query,
            sort: value
          }
        });
      }
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          name: "description",
          hid: "description",
          content: this.description
        },
        {
          property: "og:description",
          hid: "og:description",
          content: this.description
        },
        {
          property: "og:title",
          hid: "og:title",
          content: this.title
        },

        //// for
        {
          property: "twitter:description",
          hid: "twitter:description",
          content: this.description
        },
        {
          property: "twitter:title",
          hid: "twitter:title",
          content: this.title
        }
      ],
      link: [
        {
          rel: "url",
          hid: "url",
          href:
            process.env.BASE_URL +
            getPath(this.$route.params.type, this.$route.params.id)
        },
        {
          rel: "canonical",
          hid: "canonical",
          href:
            process.env.BASE_URL +
            getPath(this.$route.params.type, this.$route.params.id)
        }
      ]
    };
  },
  async asyncData({ $axios, params: { type, id }, query: { sort }, error }) {
    try {
      const {
        data: { title, description, blocks }
      } = await $axios.get(getPath(type, id), {
        params: {
          sort
        }
      });

      return {
        title,
        description:
          description.length > 320
            ? description.slice(0, 317) + "..."
            : description,
        blocks,
        countPage: blocks.length
      };
    } catch ({ response }) {
      error({});
    }
  },
  watch: {
    $route() {
      this.blocks = [];
      if (this.$refs.infiniteLoading) {
        this.$refs.infiniteLoading.stateChanger.reset();
      }
    }
  },
  methods: {
    async fetch({ loaded, complete }) {
      const {
        data: { blocks }
      } = await this.$axios.get(
        getPath(this.$route.params.type, this.$route.params.id),
        {
          params: {
            sort: this.$route.query.sort || "view",
            page: ~(this.blocks.length / this.countPage)
          }
        }
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
