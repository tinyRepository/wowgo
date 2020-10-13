<template>
  <div id="app">
    <Header class="main-header" />
    <router-view class="content-block" />
  </div>
</template>

<script>
import Header from "Common/Header";
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
.main-header {
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  background-color: $black-color2;
}
.content-block {
  margin-top: 70px;
  max-width: 1920px;
  margin: 70px auto 0;
}
</style>
