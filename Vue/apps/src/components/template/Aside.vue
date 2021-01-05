<template>
  <nav>
    <router-link to="/home">
      <i class="la la-home"></i>
      Home
    </router-link>
    <router-link to="/user/1">
      <i class="la la-user-circle"></i>
      User 1
    </router-link>
    <router-link to="/user/2">
      <i class="la la-user-circle"></i>User 2
    </router-link>
    <router-link to="/hello">
      <i class="la la-book"></i>
      Hello
    </router-link>
    <router-link to="/hi">
      <i class="la la-dumpster"></i>
      Dummy
    </router-link>
    <a href="javascript:;" @click="to_about()">
      <i class="la la-info-circle"></i>
      About
    </a>
    <a href="javascript:;" @click="signout()">
      <i :class="'la la-atom ' + (processing_logout ? 'la-spin' : '')"></i>
      Logout
    </a>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      processing_logout: false
    };
  },
  methods: {
    to_about() {
      this.$router.push({
        name: "about",
        params: { message: "Dibuat utk belajar" }
      });
    },
    signout() {
      this.processing_logout = true;
      this.logout();
    }
  }
};
</script>