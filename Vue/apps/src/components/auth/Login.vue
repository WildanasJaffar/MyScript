<template>
  <div v-if="!in_2fa">
    <h3>Login Vue Apps</h3>
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
  <div v-else>
    <h3>Gen with GAuth</h3>
    <label>Code:</label>
    <input type="number" v-model="code" />
    <button type="button" @click="submit_2fa">
      Submit
      <i :class="'la la-atom ' + (processing_login ? 'la-spin' : '')"></i>
    </button>
    <button type="button" @click="in_2fa = false;">
      Cancel
      <i :class="'la la-times'"></i>
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
      code: "",
      processing_login: false,
      in_2fa: false
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
        this.in_2fa = true;
        this.processing_login = false;
      } else {
        this.get_error_msg(res);
      }
    },
    async submit_2fa() {
      this.processing_login = true;
      var formdata = new FormData();
      formdata.append("username", this.username);
      formdata.append("password", this.password);
      formdata.append("code", this.code);

      let res = await this.axios({
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: `${this.rest_url()}auth/login_code`,
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