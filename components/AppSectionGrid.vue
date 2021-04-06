<template>
  <div class="mt-5" :class="[`mt-sm-${mtSm}`]">
    <v-banner
      tag="h2"
      app
      single-line
      sticky
      class="text-h6 text-sm-h5"
      color="theme"
    >
      {{ title }}
      <template v-slot:actions>
        <template v-if="!!to">
          <v-btn icon class="d-md-none text--secondary" :to="to">
            <v-icon> mdi-chevron-right </v-icon>
          </v-btn>
          <v-btn
            text
            class="d-none d-md-inline-flex text--secondary text-capitalize"
            :to="to"
          >
            Xem thêm
          </v-btn>
        </template>
        <slot name="actions" v-else />
      </template>
    </v-banner>

    <slot name="after" />

    <v-row class="mt-4">
      <v-col
        cols="6"
        sm="4"
        md="2"
        v-for="({ href, image, pratical, title, subtitle, id, chapter },
        index) in hentais"
        :key="index"
      >
        <v-card width="100%" color="transparent" flat :to="href">
          <v-img :src="image" :aspect-ratio="100 / 141.5">
            <v-chip
              rounded
              small
              color="success"
              absolute
              top
              left
              class="mt-1 ml-1"
              v-if="pratical"
            >
              {{ pratical }}
            </v-chip>
            <v-btn
              icon
              style="background-color: rgba(0,0,0,.3)"
              v-if="useCloseBtn"
              @click.prevent="$emit('click:close', { id, chapter, index })"
            >
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </v-img>

          <v-card-title
            class="text-body-2 pt-2 px-0"
            :class="{
              'pb-0': !subtitle
            }"
          >
            {{ title }}
          </v-card-title>
          <v-card-subtitle class="text--secondary px-0 pb-0" v-if="!!subtitle">
            {{ subtitle }} lượt xem
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center mt-3" v-if="!!to || !!axios">
      <v-btn
        rounded
        class="text--secondary text-capitalize"
        :loading="loading"
        @click="fetch"
        v-if="false"
      >
        Xem thêm
      </v-btn>
      <v-btn class="text--secondary text-capitalize" rounded :to="to">
        Xem thêm
      </v-btn>
    </div>

    <slot name="default" />
  </div>
</template>

<script>
export default {
  props: {
    hentais: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    useCloseBtn: Boolean,
    to: String,
    axios: String,
    mtSm: {
      type: String,
      default: "7"
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    page() {
      if (this.hentais.length < 18) {
        return 1;
      } else {
        return Math.ceil(this.hentais.length / 18) + 1;
      }
    }
  },
  methods: {
    merge(hentais) {
      if (this.hentais.length < 18) {
        this.$emit("update:hentais", [
          ...this.hentais,
          ...hentais.slice(this.hentais.length)
        ]);
      } else {
        this.$emit("update:hentais", [...this.hentais, ...hentais]);
      }
    },
    async fetch() {
      this.loading = true;

      const {
        data: { blocks }
      } = await this.$axios.get(!!this.axios ? this.axios : this.to, {
        params: {
          page: this.page
        }
      });
      this.merge(blocks);

      this.loading = false;
    }
  }
};
</script>
