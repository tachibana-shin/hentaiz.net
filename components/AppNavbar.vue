<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app temporary class="d-md-none">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-img>
              <img :src="require('@/assets/logo.png')" height="50px" />
              <!-- <v-list-item-subtitle> Xem phim mọi lúc </v-list-item-subtitle> -->
            </v-img>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list nav dense active-class="deep-purple--text text--accent-4">
        <template v-for="(item, index) in menu">
          <v-list-group v-if="item.children" :key="index">
            <template v-slot:activator>
              <v-list-item-title> {{ item.text }} </v-list-item-title>
            </template>

            <v-list-item
              v-for="(item, index) in item.children"
              :key="index"
              :to="item.href"
            >
              <v-list-item-icon class="px-0 mr-0"> </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title> {{ item.text }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="index" :to="item.href">
            <v-list-item-content>
              <v-list-item-title> {{ item.text }} </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>

        <v-list-item to="/history">
          <v-list-item-icon>
            <v-icon> mdi-history </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Lịch sử </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/favorite">
          <v-list-item-icon>
            <v-icon> mdi-heart </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Yêu thích </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed elevate-on-scroll app color="blackme">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none" />

      <v-spacer class="d-md-none"></v-spacer>

      <v-toolbar-title @click="$router.push('/')" style="cursor: pointer">
        HentaiZ
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <img :src="require('@/assets/logo.png')" height="40px" /> -->

      <template v-for="(item, index) in menu">
        <div class="d-none d-md-block" :key="index">
          <v-menu
            open-on-hover
            right
            offset-y
            transition="scroll-y-reverse-transition"
            v-if="item.children"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                v-bind="attrs"
                v-on="on"
                class="text-capitalize font-weight-regular text--secondary"
                exact-active-class="text--white"
              >
                {{ item.text }}
                <v-icon size="1.3em"> mdi-chevron-down </v-icon>
              </v-btn>
            </template>

            <v-card
              class="py-0 mt-3"
              max-width="800"
              v-if="item.children.length > 3"
            >
              <v-row class="ma-0 py-1 px-3">
                <v-col
                  cols="2"
                  v-for="(item, index) in item.children"
                  :key="index"
                  class="pa-0 ma-0"
                >
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-list-item
                        class="text-center pa-0 ma-0"
                        style="min-height: 35px"
                        :to="item.href"
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-list-item-content class="pa-0 ma-0">
                          <v-list-item-subtitle class="pa-0 ma-0">
                            {{ item.text }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </template>
                    <span> {{ item.tooltip }} </span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-card>
            <v-list v-else class="mt-3">
              <v-list-item
                v-for="(item, index) in item.children"
                :key="index"
                :to="item.href"
              >
                <v-list-item-content>
                  <v-list-item-title> {{ item.text }} </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            text
            v-else
            class="no-before text-capitalize font-weight-regular text--secondary"
            exact-active-class="text--white"
            :to="item.href"
          >
            {{ item.text }}
          </v-btn>
        </div>
      </template>

      <v-spacer class="d-none d-md-block"></v-spacer>
      <v-spacer class="d-none d-md-block"></v-spacer>

      <v-autocomplete
        class="d-none d-md-block"
        dense
        hide-details
        single-line
        filled
        rounded
        prepend-inner-icon="mdi-magnify"
        style="max-width: 250px"
        v-model="search"
        :items="itemsPreSearch"
        :loading="preSearching"
        :search-input.sync="preSearch"
        hide-no-data
        hide-selected
        label="Search"
        append-icon=""
        @keypress.enter="$router.push(`/search?query=${search}`)"
        clearable
      >
        <template v-slot:itdem="{ item, attrs }">
          <v-list-item v-bind="attrs" :to="item.href">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-autocomplete>

      <v-btn icon to="/history" class="d-none d-sm-inline-flex">
        <v-icon> mdi-history </v-icon>
      </v-btn>
      <v-btn icon to="/favorite" class="d-none d-sm-inline-flex">
        <v-icon> mdi-heart </v-icon>
      </v-btn>

      <v-btn class="d-md-none" icon to="/search">
        <v-icon> mdi-magnify </v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      drawer: false,
      search: "",
      itemsPreSearch: [],
      preSearching: false,
      preSearch: ""
    };
  },
  watch: {
    async preSearch(newVal) {
      this.preSearching = true;
      const {
        data: { hentais }
      } = await this.$axios.get(`/pre-search`, {
        params: {
          query: newVal
        }
      });
      this.itemsPreSearch = hentais;
      this.preSearching = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.no-before::before {
  display: none;
}
</style>
