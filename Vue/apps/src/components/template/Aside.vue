<template>
  <ul class="nav">
    <li>
      <router-link to="/home">
        <i class="la la-home"></i>
        Home
      </router-link>
    </li>
    <li>
      <router-link to="/users">
        <i class="la la-user-circle"></i>
        List User
      </router-link>
    </li>
    <li>
      <router-link to="/user/1">
        <i class="la la-user-circle"></i>
        User 1
      </router-link>
    </li>
    <li>
      <router-link to="/user/2">
        <i class="la la-user-circle"></i>User 2
      </router-link>
    </li>
    <li>
      <router-link to="/hello">
        <i class="la la-book"></i>
        Hello
      </router-link>
    </li>
    <li>
      <router-link to="/hi">
        <i class="la la-dumpster"></i>
        Dummy
      </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'about', params: { message: 'Dibuat utk belajar' } }">
        <i class="la la-info-circle"></i>
        About
      </router-link>
    </li>
    <li>
      <a href="javascript:;" @click="signout()">
        <i :class="'la la-atom ' + (processing_logout ? 'la-spin' : '')"></i>
        Logout
      </a>
    </li>
  </ul>
</template>
<script>
export default {
  data() {
    return {
      processing_logout: false
    };
  },
  methods: {
    signout() {
      this.processing_logout = true;
      this.logout();
    }
  }
};
</script>