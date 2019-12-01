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

      <v-list-item>
      </v-list-item>

      <v-divider></v-divider>

      <TaskLists />

    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import TaskLists from '@/components/TaskLists';

  export default {
    components: {
      TaskLists,
    },
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-view-dashboard' },
          { title: 'Tasks', icon: 'mdi-card-text-outline' },
          { title: 'Important', icon: 'mdi-message-alert' },
          { title: 'Planned', icon: 'mdi-timer' },
          { title: 'About', icon: 'mdi-help-box' },
        ],
      }
    },
    methods: {
      dispatch (selectedItem) {
        var title = selectedItem.title;
        this.$router.push({name: title}).catch(err => console.log('Error dispatching: ' + err));
      },
    },
  }
</script>