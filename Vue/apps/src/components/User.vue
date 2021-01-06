<template>
  <div>
    <h1>
      <i class="las la-user-circle"></i>
      User {{ id }}
    </h1>
    <h2 v-show="is_processing">
      Loading ...
      <i class="las la-atom la-spin"></i>
    </h2>
    <p v-show="!is_processing" v-for="row in datas" v-bind:key="row.id">
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
      is_processing: false,
      url: "",
      datas: []
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
    }
  }
};
</script>