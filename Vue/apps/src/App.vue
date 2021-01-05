<template>
  <div>
    <!-- With Animation -->
    <!-- <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>-->

    <!-- Without Animation -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    // this.$router.addRoute({
    //   path: "/hello",
    //   name: "/hello",
    //   component: HelloWorld
    // });
    // this.$router.addRoute({
    //   path: "/user/:id",
    //   name: "User",
    //   component: User,
    //   props: true
    // });
  }
};
</script>

<style>
@import "./assets/lineawesome-1.3.0/css/line-awesome.min.css";
#app {
  font-family: Poppins;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

nav a {
  text-decoration: none;
  margin: 0 5px;
  padding: 4px 8px;
  border-radius: 5px;
  color: black;
}

nav a:active {
  background-color: #a9a7a7;
}

nav a:hover {
  background-color: #d3d3d3;
}

.router-link-exact-active {
  background-color: #d3d3d3;
  font-weight: bold;
}
</style>
