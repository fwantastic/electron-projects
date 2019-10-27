<template>
  <v-app>
    <AppBar/>

    <SidebarMenu/>

    <v-content>
      <router-view/>
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
