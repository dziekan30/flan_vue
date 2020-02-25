<template>
  
  <div class="events-new">
    <h1>New Event</h1>
    <ul>
      <li v-for="error in errors"> {{error}} </li>
    </ul>

    <form v-on:submit.prevent="createEvent()">
      <div>Name: 
        <input type="text" v-model="name">
      </div>
      <div>Location: 
        <input type="text" v-model="location">
      </div>
      <div>Description: 
        <input type="text" v-model="description">
      </div>
      <div>Start Time: 
        <input type="text" v-model="startTime">
      </div>
      <div>End Time: 
        <input type="text" v-model="endTime">
      </div>
      <input type="submit" class="btn btn-primary" value="Create Event">
    </form>

  </div>
</template>

<style>
  <link rel="stylesheet" href="vue-datetime.css">
  <datetime v-model="date"></datetime>
  </link>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      name: "",
      location: "",
      description: "",
      startTime: "",
      endTime: "",
      errors: []
    };
  },
  created: function() {},
  methods: {
    createEvent: function() {
      var clientParams = {
        name: this.name,
        location: this.location,
        description: this.description,
        start_time: this.startTime,
        end_time: this.endTime
      };
      axios
      .post("/api/events", clientParams)
      .then(response => {
        this.$router.push("/events");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>

<!-- Datetimepicker components -->
<script src="vue.js"></script>
<script src="luxon.js"></script>
<script src="weekstart.js"></script>
<script src="vue-datetime.js"></script>