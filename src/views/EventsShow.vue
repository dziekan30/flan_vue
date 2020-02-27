<template>
  <div class="events-show">
    <div class="container">
      <h2> {{event.name}}</h2>
      
      <h4>Location: {{event.location}}</h4>
      <h4>Description: {{event.description}}</h4>
      <h4>Start Time: {{relativeDate(event.start_time)}}</h4>
      <h4>End Time: {{relativeDate(event.start_time)}}</h4>
      

      <router-link v-bind:to="'/events/' + event.id + '/edit'">Update</router-link>
      <div>
       <input v-on:click="destroyEvent()" type="submit" value="Delete">
      </div>
    </div>
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