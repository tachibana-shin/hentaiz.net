<template>
  <div class="mt-5">
    <v-banner app single-line sticky class="text-h5" color="theme">
      {{ title }}
      <template v-slot:actions>
        <slot name="actions" />
      </template>
    </v-banner>

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
              color="pink"
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
    useCloseBtn: Boolean
  }
};
</script>
