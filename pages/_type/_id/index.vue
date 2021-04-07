<template>
  <v-row>
    <v-col cols="12">
      <app-section-grid :hentais="blocks" :title="title">
        <template v-slot:after>
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
            item-text="label"
            item-value="value"
            :style="{
              width: '160px'
            }"
          ></v-select>
        </template>

        <div class="text-center mt-5">
          <v-pagination
            v-model="page"
            :length="maxPage"
            circle
            :total-visible="7"
          />
        </div>
      </app-section-grid>
    </v-col>
  </v-row>
</template>

<script>
import AppSectionGrid from "@/components/AppSectionGrid";

function getPath(type, id) {
  if (id) {
    return `/${type}/${id}`;
  } else {
    return `/special/${type}`;
  }
}

export default {
  scrollToTop: true,
  watchQuery: ["sort"],
  components: {
    AppSectionGrid
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
    },
    page: {
      get() {
        return Math.max(this.$route.params.page || 1, 1);
      },
      set(value) {
        const {
          params: { type, id }
        } = this.$route;

        if (id) {
          this.$router.push({
            path: `/${type}/${id}/page-${value}`,
            query: this.$route.query
          });
        } else {
          this.$router.push({
            path: `/${type}/page-${value}`,
            query: this.$route.query
          });
        }
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
  async asyncData({
    $axios,
    params: { type, id, page = 1 },
    query: { sort },
    error
  }) {
    try {
      const {
        data: { title, description, blocks, maxPage }
      } = await $axios.get(getPath(type, id), {
        params: {
          sort,
          page
        }
      });

      return {
        title,
        description:
          description.length > 320
            ? description.slice(0, 317) + "..."
            : description,
        blocks,
        countPage: blocks.length,
        maxPage
      };
    } catch ({ response }) {
      error({});
    }
  }
};
</script>

<style lang="scss">
fieldset {
  border: 0 !important;
}
</style>
