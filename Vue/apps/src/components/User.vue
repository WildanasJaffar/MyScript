<template>
  <div>
    <h1>
      <i class="las la-user-circle"></i>
      User {{ id }}
    </h1>
    <h2 v-show="data.id == 0">
      Loading ...
      <i class="las la-atom la-spin"></i>
    </h2>
    <p v-show="data.id != 0">
      {{ data.name }} ( {{ data.email }} )
      <br />
      - {{ data.fact }}
    </p>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      data: {
        id: 0,
        name: "",
        email: ""
      }
    };
  },
  created() {
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
      self.data = {
        id: 0,
        name: "",
        email: ""
      };

      this.axios({
        url: `${this.rest_url()}main/users`,
        method: "GET",
        params: { id: id }
      })
        .then(function(response) {
          self.data = response.data;
        })
        .catch(function(error) {
          // handle error
          self.get_error_msg(error);
        });
    }
  }
};
</script>