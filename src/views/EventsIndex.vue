<template>
  <div class="events-index">
    <h1>All Events</h1>
    <div v-for="event in events">
      <router-link v-bind:to="'/events/' + event.id">
        <h2> {{ event.name }}</h2>
      </router-link>
      <h2>{{event.description}}</h2>
      <br>
    </div>
  </div>
</template>

<style>
</style>

<script>
  var axios = require("axios");

export default {
  data: function() {
    return {
      events: []
    };
  },
  created: function() {
    axios
      .get("/api/events")
      .then(response => {
        this.events = response.data;
      });
  },
  methods: {}
};
</script>