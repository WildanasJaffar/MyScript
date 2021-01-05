<template>
  <div>
    <h1>
      <i class="la la-home"></i>
      Home Page
    </h1>
    <!-- <button type="button" @click="signout()">Logout</button> -->
    <!-- <button @click="to_about()">About</button> -->
  </div>
</template>
<script>
export default {
  methods: {
    to_about() {
      this.$router.push({ name: "about", params: { data: "oi" } });
    },
    signout() {
      this.logout();
    }
  }
};
</script>