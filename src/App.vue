<script>
import AppHeader from './components/AppHeader.vue';
import AppMain from './components/AppMain.vue';
import AppEvidence from './components/AppEvidence.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppMain,
    AppEvidence
  }
}
</script>

<template>

  <AppHeader></AppHeader>

  <AppEvidence></AppEvidence>



  <AppMain></AppMain>





</template>

<style scoped></style>
