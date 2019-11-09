<template>
  <v-navigation-drawer
    app
    permanent
    clipped
  >
    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        @click="dispatch(item)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Tasks', icon: 'mdi-image' },
          { title: 'Important', icon: 'mdi-image' },
          { title: 'Planned', icon: 'mdi-image' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
        right: null,
      }
    },
    methods: {
      dispatch (selectedItem) {
        var title = selectedItem.title;
        this.$router.push({name: title}).catch(err => err);
      }
    }
  }
</script>