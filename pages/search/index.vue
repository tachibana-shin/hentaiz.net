<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        hide-details
        outlined
        small
        rounded
        placeholder="Từ khóa"
        style="max-width: 350px"
        class="input-search mx-auto text-center"
        v-model="query"
      ></v-text-field>
      <h5 class="text-h6 mt-7">Phân loại</h5>
      <v-row class="mt-0">
        <v-col cols="12" sm="6" md="3" class="pb-0">
          <v-autocomplete
            :items="categories"
            outlined
            chips
            small-chips
            :dense="$vuetify.breakpoint.smAndDown"
            hide-details
            item-value="value"
            item-text="label"
            label="Thể loại"
            multiple
            v-model="hxgenres"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="6" md="3" class="pb-0">
          <v-select
            hide-details
            outlined
            small
            :dense="$vuetify.breakpoint.smAndDown"
            :items="producer"
            item-text="text"
            item-value="value"
            label="Nhà sản xuất"
            v-model="hxproducer"
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" class="pb-0">
          <v-select
            hide-details
            outlined
            small
            :dense="$vuetify.breakpoint.smAndDown"
            :items="year"
            item-text="text"
            item-value="value"
            label="Năm phát hành"
            v-model="hxyear"
          >
          </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3" class="pb-0">
          <v-select
            hide-details
            outlined
            :dense="$vuetify.breakpoint.smAndDown"
            small
            :items="type"
            item-text="text"
            item-value="value"
            label="Thể loại"
            v-model="hxtype"
          >
          </v-select>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <app-section-grid :hentais="hentais" :title="``">
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

function clearObject(object) {
  for (const name in object) {
    if (!object[name]) {
      delete object[name];
    }
  }
  return object;
}

export default {
  components: {
    AppSectionGrid,
    VueInfiniteLoading
  },

  head() {
    return {
      title: `Tìm kiếm ${this.$route.query.query}`,
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
          content: `Tìm kiếm ${this.$route.query.query}`
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
          content: `Tìm kiếm ${this.$route.query.query}`
        }
      ],
      link: [
        {
          rel: "url",
          hid: "url",
          href: `${process.env.BASE_URL}${this.$route.fullPath}`
        },
        {
          rel: "canonical",
          hid: "canonical",
          href: null
        }
      ]
    };
  },
  async asyncData({ $axios, query }) {
    const [
      {
        data: { categories, producer, year, type }
      },
      {
        data: { hentais }
      }
    ] = await Promise.all([
      $axios.get("/setup", {
        params: {
          type: "search"
        }
      }),
      $axios.get(`/search`, {
        params: {
          query: query.query,
          producer: query.hxproducer,
          year: query.hxyear,
          type: query.hxtype,
          categories: query.hxgenres
        }
      })
    ]);

    return {
      categories,
      producer,
      year,
      type,
      query: query.query || "",
      hxgenres: query.category || [],
      hxproducer: query.producer || "",
      hxyear: query.year || "",
      hxtype: query.type || "",
      hentais
    };
  },
  watch: {
    query() {
      this.update();
    },
    hxgenres() {
      this.update();
    },
    hxproducer() {
      this.update();
    },
    hxyear() {
      this.update();
    },
    hxtype() {
      this.update();
    },
    $route() {
      this.hentais = [];
      if (this.$refs.infiniteLoading) {
        this.$refs.infiniteLoading.stateChanger.reset();
      }
    }
  },
  methods: {
    update() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.$router.push({
          ...this.$route,
          query: clearObject({
            ...this.$route.query,
            query: this.query,
            category: this.hxgenres,
            producer: this.hxproducer,
            year: this.hxyear,
            type: this.hxtype
          })
        });
      }, 1000);
    },
    async fetch({ loaded, complete }) {
      const {
        data: { hentais }
      } = await this.$axios.get(`/search`, {
        params: {
          query: this.query,
          producer: this.hxproducer,
          year: this.hxyear,
          type: this.hxtype,
          categories: this.hxgenres,
          page: Math.ceil(this.hentais.length / 18) + 1
        }
      });
      complete()
      return

      if (hentais.length === 0) {
        complete();
      } else {
        loaded();
      }

      this.hentais.push(...hentais);
    }
  }
};
</script>

<style lang="scss" scoped>
.input-search::v-deep input {
  text-align: center;
}
</style>
