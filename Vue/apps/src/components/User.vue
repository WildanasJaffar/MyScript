<template>
  <div>
    <h1>
      <i class="las la-user-circle"></i>
      User {{ id }}
    </h1>
    <h2 v-show="datas.length == 0">
      Loading ...
      <i class="las la-atom la-spin"></i>
    </h2>
    <p v-show="datas.length > 0" v-for="row in datas" v-bind:key="row.id">
      {{ row.user_fullname }} ( {{ row.username }} )
      <br />
      - {{ row.user_funfact }}
      <br />
      - Updated: {{ row.updated_by }} - {{ row.updated_date }}
    </p>
  </div>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      datas: []
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
      self.datas = [];

      this.axios({
        url: `${this.rest_url()}users`,
        method: "GET",
        params: { id: id }
      })
        .then(function(response) {
          self.datas = response.data;
        })
        .catch(function(error) {
          // handle error
          self.get_error_msg(error);
        });
    }
  }
};
</script>