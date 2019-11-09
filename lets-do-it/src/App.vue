<template>
  <v-app>
    <AppBar/>

    <SidebarMenu/>

    <v-content>
      <!-- set unique key to use different routes for the same page -->
      <router-view :key="$route.path"/>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar';
import SidebarMenu from './components/SidebarMenu';

export default {
  name: 'App',
  components: {
    AppBar, 
    SidebarMenu,
  },
  data: () => ({
    //
  }),
};
</script>
