<template>
  <div>
    <Header />
    <Aside />
    <div class="view">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "./Header.vue";
import Aside from "./Aside.vue";
import Footer from "./Footer.vue";
export default {
  name: "Layout",
  components: {
    Header,
    Aside,
    Footer
  }
};
</script>
<style>
.view {
  padding: 25px;
}
</style>