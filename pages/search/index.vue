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

function clearObject(object) {
  for (const name in object) {
    if (!object[name]) {
      delete object[name];
    }
  }
  return object;
}

export default {
  scrollToTop: true,
  watchQuery: ["query", "producer", "year", "type", "categories", "page"],
  components: {
    AppSectionGrid
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
        data: { hentais, maxPage }
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
      hentais,
      maxPage
    };
  },
  computed: {
    page: {
      get() {
        return Math.max(this.$route.query.page || 1, 1);
      },
      set(value) {
        this.$router.push({
          ...this.$route,
          query: {
            ...this.$route.query,
            page: value
          }
        });
      }
    }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.input-search::v-deep input {
  text-align: center;
}
</style>
