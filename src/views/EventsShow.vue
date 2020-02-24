<template>
  <div class="events-show">
    <div class="container">
      <h2> {{events.name}}</h2>
      <router-link v-bind:to="'/events/' + event.id + '/edit'">Update</router-link>
      <div v-on:click="destroyEvent()">Delete</div>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      events: {
        name: "",
        location: "",
        description: "",
        start_time: "",
        end_time: ""
      }
    };
  },
  created: function() {
    axios
      .get("/api/events/" + this.$route.params.id)
      .then(response => {
        this.event = response.data;
      });
  },
  methods: {
    destroyEvent: function() {
      axios
        .delete("api/events/" + this.$route.params.id)
        .then(response => {
          this.$router.push("/")
        });
    }
  }
};
</script>