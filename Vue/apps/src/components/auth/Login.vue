<template>
  <div>
    <label>Username:</label>
    <input type="text" v-model="username" />
    <br />
    <label>Password:</label>
    <input type="password" v-model="password" />
    <br />
    <button type="button" @click="login">
      Login
      <i :class="'la la-atom ' + (processing_login ? 'la-spin' : '')"></i>
    </button>
  </div>
</template>

<script>
// loginUser
export default {
  name: "Login",
  created() {
    let is_auth = this.isLoggedIn();
    if (is_auth) this.home();
  },
  data() {
    return {
      username: "admin",
      password: "1234",
      processing_login: false
    };
  },
  methods: {
    home() {
      this.$router.push({ name: "/home" });
    },
    async login() {
      this.processing_login = true;
      var formdata = new FormData();
      formdata.append("username", this.username);
      formdata.append("password", this.password);

      let res = await this.axios({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: `${this.rest_url()}auth/login`,
        type: "json",
        method: "POST",
        data: formdata
      })
        .then(function(response) {
          // handle success
          return response;
        })
        .catch(function(error) {
          // handle error
          return error;
        });

      if (res.status == 200) {
        this.setAuthToken(res.data.token);
        this.home();
      } else {
        this.get_error_msg(res);
      }
    }
  }
};
</script>
<style>
label {
  width: 125px;
  margin: 2%;
}

input[type="password"] {
  margin-left: 4px;
}

button {
  margin-left: 7px;
  border: 0;
  border-radius: 5px;
  padding: 4px 8px;
  margin: 10px;
  background-color: #d3d3d3;
}

button:hover {
  cursor: pointer;
}
</style>