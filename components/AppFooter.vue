<template>
  <v-footer padless>
    <v-card flat tile class="text-center">
      <v-card-text>
        <v-btn
          v-for="({ icon, href }, index) in icons"
          :key="index"
          class="mx-4 white--text"
          icon
          target="blank"
          :href="href"
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Đây là phiên bản HentaiZ PRO miễn phí không quảng cáo và sẽ luôn như vậy
        cập nhật theo trang web
        <a href="https://hentaiz.net" target="blank">Hentaiz</a>.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} —
        <strong>@NguyenThanhDev (shin dev)</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        {
          icon: "mdi-facebook",
          href: "https://www.facebook.com/profile.php?id=100024588752208"
        },
        {
          icon: "mdi-twitter",
          href: "https://twitter.com/NguyenThanhDev"
        },
        {
          icon: "mdi-discord",
          href: "https://hentaiz.net/discord-hentaiz"
        },
        {
          icon: "mdi-instagram",
          href: "https://www.instagram.com/"
        }
      ]
    };
  }
};
</script>
