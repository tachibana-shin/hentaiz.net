<template>
  <v-row>
    <v-col cols="12">
      <v-responsive :aspect-ratio="16 / 9" class="black">
        <iframe
          :src="srcIframe"
          frameborder="0"
          height="100%"
          width="100%"
        ></iframe>
      </v-responsive>
    </v-col>

    <v-col cols="12">
      <div class="">
        <h3 class="text-h6 mb-3 font-weight-medium">Máy chủ</h3>

        <div class="grid-chapter mr-n2 mb-n4">
          <v-btn
            class="mx-2 mb-4"
            color="pink"
            v-for="({ name, src }, index) in servers"
            :key="index"
            @click="indexServerNow = index"
            :outlined="src !== srcIframe"
          >
            {{ name }}
          </v-btn>
        </div>
      </div>
    </v-col>

    <v-col cols="12">
      <div class="">
        <h3 class="text-h6 mb-3 font-weight-medium">Tập phim</h3>

        <div class="grid-chapter mr-n2 mb-n4">
          <v-btn
            class="mx-2 mb-4"
            color="primary"
            v-for="({ name, value }, index) in chapters"
            :to="`/hentai/${$route.params.id}/tap-${value}`"
            :outlined="!isChapter(value)"
            :key="index"
          >
            {{ name }}
          </v-btn>
        </div>
      </div>
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" sm="4" class="d-none d-sm-block">
              <v-img
                width="100%"
                :src="photo"
                :aspect-ratio="100 / 150"
                style="border-radius: 3px"
              >
              </v-img>
            </v-col>
            <v-col cols="12" sm="8">
              <h1 class="text-h5 font-weight-regular">
                {{ name }}
              </h1>
              <h2 class="text-body-1 font-weight-light text--secondary">
                {{ nameJapan || name }}
              </h2>

              <div class="mt-3">
                <v-btn
                  :color="isFavorite ? 'pink' : undefined"
                  @click="toggleFavorite"
                >
                  <v-icon class="mr-1">
                    {{ isFavorite ? "mdi-heart" : "mdi-heart-outline" }}
                  </v-icon>
                  {{ isFavorite ? "Đang theo dõi" : "Theo dõi" }}
                </v-btn>
              </div>

              <div class="mt-5">
                <div class="text-body-1">Nội dung</div>
                <p
                  class="mt-2"
                  style="font-size: 14px; color: rgb(155, 155, 155); font-weight: 400"
                  v-html="description"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <div class="mt-md-3 d-flex">
            <ul class="list-property pl-0 pl-sm-3 pl-md-0">
              <li
                v-for="({ name, text, children }, index) in information"
                :key="index"
                :class="getClassMe(name)"
              >
                <span class="type">
                  <v-progress-circular
                    indeterminate
                    v-if="getIconMe(name) === true"
                    :size="14 * 1.2"
                    :width="3"
                    color="inherit"
                  ></v-progress-circular>

                  <v-icon v-else-if="getIconMe(name)" size="1.2em">
                    {{ getIconMe(name) }}
                  </v-icon>
                  {{ name }}
                </span>

                <span class="value" :class="getClassMe(name)">
                  {{ text }}
                  <template v-for="({ text, href }, index) in children">
                    <nuxt-link
                      :key="index"
                      :to="href"
                      class="text-decoration-none"
                    >
                      {{ text }}
                    </nuxt-link>
                    <template v-if="index < children.length - 1">
                      ,
                    </template>
                  </template>
                </span>
              </li>
            </ul>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <h3 class="text-h6 mb-3 font-weight-medium">Bình luận</h3>
      <div style="width: 100%; background-color: #ffffff">
        <div
          class="fb-comments"
          width="100%"
          data-lazy="true" data-colorscheme="dark" 
          :data-href="`${process.env.BASE_URL}/${$route.params.id}`"
          data-width=""
          data-numposts="10"
        ></div>
      </div>
    </v-col>

    <v-col cols="12">
      <app-section-carousel
        :hentais="haveYouLike"
        title="Có thể bạn sẽ thích"
      />
    </v-col>

    <v-snackbar v-model="snackbar">
      {{ snackbar && snackbar.text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = null">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import AppSectionCarousel from "../../../components/AppSectionCarousel.vue";
export default {
  class: {
    status: "yellow--text"
  },
  icons: {
    "thể loại": "mdi-format-list-bulleted",
    "tên nhật": "mdi-google-translate",
    che: "mdi-eye",
    fansub: "mdi-account-multiple",
    "số tập": "mdi-asterisk",
    "nhà sản xuất": "mdi-account",
    "năm phát sóng": "mdi-calendar",
    status: true /// is loading
  },
  components: { AppSectionCarousel },
  data() {
    return {
      indexServerNow: 0,
      snackbar: null,
      process
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          name: "description",
          hid: "description",
          content: this.og_description
        },
        {
          property: "og:description",
          hid: "og:description",
          content: this.og_description
        },
        {
          property: "og:title",
          hid: "og:title",
          content: this.title
        },

        {
          property: "og:image",
          hid: "og:image",
          content: this.photo
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: this.photo
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: this.photo
        },

        //// for
        {
          property: "twitter:description",
          hid: "twitter:description",
          content: this.og_description
        },
        {
          property: "twitter:title",
          hid: "twitter:title",
          content: this.title
        },
        {
          property: "twitter:image",
          hid: "twitter:image",
          content: this.photo
        },
        {
          hid: "twitter:image:secure_url",
          property: "twitter:image:secure_url",
          content: this.photo
        },
        {
          hid: "twitter:image:alt",
          property: "twitter:image:alt",
          content: this.photo
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
          href: `${process.env.BASE_URL}/hentai/${this.$route.params.id}`
        }
      ]
    };
  },
  async asyncData({ $axios, params: { id, chap }, error }) {
    try {
      const {
        data: {
          photo,
          name,
          description,
          information,
          servers = [],
          chapters,
          haveYouLike,
          nameJapan
        }
      } = await $axios.get(`/hentai/${id}`, {
        params: {
          chapter: chap || 1
        }
      });

      return {
        photo,
        name,
        description,
        information,
        servers,
        chapters,
        haveYouLike,
        nameJapan,
        title: `Xem ${name} - Tập ${chap || 1}`,
        og_description:
          description.length > 320
            ? description.slice(0, 317) + "..."
            : description
      };
    } catch ({ response }) {
      console.log(response);
      error(response);
    }
  },
  watch: {
    snackbar(newValue) {
      clearTimeout(this.timeout);
      if (newValue != null) {
        this.timeout = setTimeout(() => {
          this.snackbar = null;
        }, 5000);
      }
    }
  },
  computed: {
    srcIframe() {
      if (this.indexServerNow >= this.servers.length) {
        // this.snackbar = {
        //   text: "Có một lỗi xảy ra trong trình duyệt dẫn tới crash."
        // };
        return null;
      } else {
        return this.servers[this.indexServerNow].src;
      }
    },
    isFavorite() {
      return !!this.$store.state.favorite.hentais.find(
        ({ id, chapter }) =>
          id === this.$route.params.id &&
          +chapter === +(this.$route.params.chap || 1)
      );
    }
  },
  methods: {
    isChapter(index) {
      if (Number.isNaN(+this.$route.params.chap)) {
        return +index === 1;
      } else {
        return +this.$route.params.chap === +index;
      }
    },
    getClassMe(key) {
      return this.$options.class[key.toLowerCase()];
    },
    getIconMe(key) {
      return this.$options.icons[key.toLowerCase()];
    },
    toggleFavorite() {
      if (this.isFavorite) {
        this.$store.commit("favorite/pop", {
          id: this.$route.params.id,
          chapter: this.$route.params.chap || 1
        });
      } else {
        this.$store.commit("favorite/push", {
          image: this.photo,
          title: this.name,
          href: `/hentai/${this.$route.params.id}/tap-${this.$route.chap || 1}`,
          chapter: this.$route.chap || 1,
          id: this.$route.params.id,
          creator: Date.now()
        });
      }
    }
  },
  mounted() {
    function init() {
      if (typeof FB !== "undefined") {
        /* eslint-no-undeff: "off" */
        FB.XFBML.parse();
        return -1;
      }
      setTimeout(() => init(), 1000);
    }

    init();

    this.$store.commit("history/push", {
      image: this.photo,
      title: this.name,
      href: `/hentai/${this.$route.params.id}/tap-${this.$route.chap || 1}`,
      chapter: this.$route.chap || 1,
      id: this.$route.params.id,
      creator: Date.now()
    });
  }
};
</script>

<style lang="scss" scoped>
.list-property {
  display: table;
  > li {
    display: table-row;
    > span {
      display: table-cell;
    }
  }
}
.list-style-none {
  list-style: none;
}
.type {
  padding-right: 16px;
  padding-bottom: 3px;
  font-size: 14px;
  white-space: nowrap;
}
.value {
  font-size: 14px;
  color: #9b9b9b;
}
</style>
