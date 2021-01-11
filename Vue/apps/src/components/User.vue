<template>
  <div>
    <h1>
      <i class="las la-user-circle"></i>
      User {{ id }}
    </h1>
    <button type="button" @click="create()">Create</button>
    <table border="1" width="100%" v-show="!is_crud">
      <thead>
        <tr>
          <th>Username</th>
          <th>Fullname</th>
          <th>Url Qr Code</th>
          <th>Fun Fact</th>
          <th>Created By</th>
          <th>Created Date</th>
          <th>Updated By</th>
          <th>Updated Date</th>
          <th>#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="is_processing">
          <td colspan="9" align="center">
            Loading ...
            <i class="las la-atom la-spin"></i>
          </td>
        </tr>
        <tr v-for="row in datas" v-bind:key="row.id">
          <td>{{ row.username }}</td>
          <td>{{ row.user_fullname }}</td>
          <td>
            <a :href="row.url_qrcode">Get My QrCode</a>
          </td>
          <td>{{ row.user_funfact }}</td>
          <td>{{ row.created_by }}</td>
          <td>{{ row.created_date }}</td>
          <td>{{ row.updated_by }}</td>
          <td>{{ row.updated_date }}</td>
          <td>
            <button type="button" @click="update(row)">Update</button>
            <button type="button" @click="remove(row)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="submit" v-show="is_crud">
      <div>
        <label>Username:</label>
        <input type="text" v-model="data_user.username" />
      </div>
      <div v-if="crud == 'c'">
        <label>Password:</label>
        <input type="password" v-model="data_user.password" />
      </div>
      <div>
        <label>Fullname:</label>
        <input type="text" v-model="data_user.user_fullname" />
      </div>
      <div>
        <label>Fun Fact:</label>
        <textarea v-model="data_user.user_funfact" />
      </div>
      <div>
        <button type="submit">
          Submit
          <i :class="'la la-atom ' + (processing_crud ? 'la-spin' : '')"></i>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      is_processing: false,
      url: "",
      datas: [],

      is_crud: false,
      crud: "c",
      data_user: {},
      processing_crud: false
    };
  },
  created() {
    this.url = this.rest_url() + "users";
    this.users(this.id);
  },
  watch: {
    id: function(val) {
      this.users(val);
    }
  },
  methods: {
    users(id) {
      let self = this;
      self.datas = [];
      self.is_processing = true;

      this.axios({
        url: self.url,
        method: "GET",
        params: { id: id }
      })
        .then(function(response) {
          self.datas = response.data;
          self.is_processing = false;
        })
        .catch(function(error) {
          // handle error
          self.get_error_msg(error);
        });
    },
    create() {
      this.data_user = {};
      this.crud = "c";
      this.is_crud = true;
    },
    update(data) {
      this.data_user.id = data.id;
      this.data_user.username = data.username;
      this.data_user.password = data.password;
      this.data_user.user_fullname = data.user_fullname;
      this.data_user.user_funfact = data.user_funfact;
      this.crud = "u";
      this.is_crud = true;
    },
    remove(data) {
      this.crud = "d";
      this.data_user.id = data.id;
      this.submit();
    },
    get_method() {
      if (this.crud == "c") return "POST";
      if (this.crud == "u") return "PUT";
      if (this.crud == "d") return "GET";
    },
    submit() {
      let self = this;
      let data = {
        update_by: this.getUserInfo().username,
        username: self.data_user.username,
        user_fullname: self.data_user.user_fullname,
        user_funfact: self.data_user.user_funfact
      };

      let axios = {};
      if (this.crud == "c") {
        data.password = self.data_user.password;
      } else if (this.crud == "u") {
        data.id = self.data_user.id;
      }

      if (this.crud == "d") {
        axios = {
          url: self.url + "/delete",
          method: self.get_method(),
          params: { id: self.data_user.id }
        };
      } else {
        axios = {
          url: self.url,
          method: self.get_method(),
          data: data
        };
      }

      this.axios(axios)
        .then(function() {
          self.is_crud = false;
          self.data_user = {};
          self.users();
        })
        .catch(function(error) {
          // handle error
          self.get_error_msg(error);
        });
    }
  }
};
</script>