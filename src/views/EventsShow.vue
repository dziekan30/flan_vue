<template>
  <div class="events-show">
    <br>
    <div class="container">
      <div class="card">
        <h5 class="card-header">{{event.name}}</h5>
        <div class="card-body">
          <h5 class="card-title">{{event.location}}</h5>
          <p class="card-text">{{event.description}}</p>
          <p class="card-text">Start Time: {{relativeDate(event.start_time)}}</p>
          <p class="card-text">End Time{{relativeDate(event.start_time)}}</p>
          <router-link v-bind:to="'/events/' + event.id + '/edit'" class="btn btn-primary">Update</router-link>
          <input v-on:click="destroyEvent()" class="btn btn-primary" type="submit" value="Delete">
        </div>
      </div>
    </div>
    <br>
  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');
import moment from "moment";

export default {
  data: function() {
    return {
      event: {
        name: "",
        location: "",
        description: "",
        start_timime: "",
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
    },
    relativeDate: function(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  },
};
</script>