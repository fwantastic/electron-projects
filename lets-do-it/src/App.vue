<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-toolbar-title class="headline text-uppercase">
        <span>LETS-DO-IT</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="font-weight-light">A Simple TO DO App</span>
    </v-app-bar>

    <SidebarMenu/>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import SidebarMenu from './components/SidebarMenu';

export default {
  name: 'App',
  components: {
    SidebarMenu
  },
  data: () => ({
    //
  }),
};
</script>
