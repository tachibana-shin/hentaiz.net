<template>
  <v-app dark>
    <div id="fb-root"></div>
    <app-navbar :menu="menu" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";

export default {
  components: {
    AppNavbar,
    AppFooter
  },
  data() {
    return {
      menu: []
    };
  },
  head() {
    return {
      title: "Xem Anime Sex Hay 18+ Không che",
      meta: [
        {
          name: "description",
          hid: "description",
          content:
            "Trang web xem phim sex anime hentai vietsub miễn phí chất lượng cao lớn nhất VN. Tải phim hoạt hình người lớn 18+ Full HD Không Che/Uncensored cực nét"
        },
        {
          property: "og:description",
          hid: "og:description",
          content:
            "Trang web xem phim sex anime hentai vietsub miễn phí chất lượng cao lớn nhất VN. Tải phim hoạt hình người lớn 18+ Full HD Không Che/Uncensored cực nét"
        },
        {
          property: "og:title",
          hid: "og:title",
          content: "Phim Hentai Anime Vietsub Hay Nhất"
        },

        {
          property: "og:site_name",
          hid: "og:site_name",
          content: "Phim Hentai Vietsub - Xem Anime Sex Hay 18+ Không che"
        },
        {
          property: "og:type",
          hid: "og:type",
          content: "website"
        },
        {
          property: "og:locale",
          hid: "og:locale",
          content: "vi-VN"
        },
        {
          property: "og:image",
          hid: "og:image",
          content: `${process.env.BASE_URL}/favicon.png`
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: `${process.env.BASE_URL}/favicon.png`
        },
        {
          hid: "og:image:alt",
          property: "og:image:alt",
          content: `${process.env.BASE_URL}/favicon.png`
        },

        //// for twitter
        {
          property: "twitter:image",
          hid: "twitter:image",
          content: `${process.env.BASE_URL}/favicon.png`
        },
        {
          property: "twitter:card",
          hid: "twitter:card",
          content: "summary_large_image"
        },
        {
          property: "twitter:description",
          hid: "twitter:description",
          content:
            "Trang web xem phim sex anime hentai vietsub miễn phí chất lượng cao lớn nhất VN. Tải phim hoạt hình người lớn 18+ Full HD Không Che/Uncensored cực nét"
        },
        {
          property: "twitter:title",
          hid: "twitter:title",
          content: "Phim Hentai Anime Vietsub Hay Nhất"
        },
        {
          hid: "twitter:image:secure_url",
          property: "twitter:image:secure_url",
          content: `${process.env.BASE_URL}/favicon.png`
        },
        {
          hid: "twitter:image:alt",
          property: "twitter:image:alt",
          content: `${process.env.BASE_URL}/favicon.png`
        }
      ],
      link: [
        {
          rel: "url",
          hid: "url",
          href: `${process.env.BASE_URL}`
        },
        {
          rel: "canonical",
          hid: "canonical",
          href: `${process.env.BASE_URL}`
        },
        {
          rel: "shorcut icon",
          hid: "shorcut-icon",
          type: "image/png",
          href: `${process.env.BASE_URL}/favicon.png`
        }
      ],
      script: [
        {
          src:
            "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v10.0&appId=499885728090665&autoLogAppEvents=1",
          nonce: "FPYqlrYx",
          crossorigin: "anonymous",
          async: true,
          defer: true
        }
      ]
    };
  },
  async fetch() {
    const { data } = await this.$axios.get("/setup", {
      params: {
        type: "navbar"
      }
    });

    this.menu = data;
  }
};
</script>
