<template>
  <div class="events-edit">
    <div class="container">
      <form v-on:submit.prevent="updateEvent()">
        <h1>Edit Event</h1>
        <ul>
          <li v-for="error in errors"> {{error}} </li>
        </ul>

        <div>
          Name: <input type="text" v-model="event.name">
        </div>

        <div>
          Location: <input type="text" v-model="event.location">
        </div>

        <div>
          Description: <input type="text" v-model="event.description">
        </div>

        <div>
          Start Time: <input type="text" v-model="event.startTime">
        </div>

        <div>
          End Time: <input type="text" v-model="event.endTime">
        </div>

        <div>
          <input type="submit" value="Edit Event">
        </div>

      </form> 
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
      event: {
        name: "",
        location: "",
        description: "",
        startTime: "",
        endTime: ""
      },
      errors: []
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
    updateEvent: function() {
      var clientParams = {
        name: this.event.name,
        location: this.event.location,
        description: this.event.description,
        start_time: this.event.startTime,
        end_time: this.event.endTime,
      };
      axios
      .patch("/api/events/" + this.$route.params.id, clientParams)
      .then(response => {
        this.$router.push("/events/" + this.$route.params.id);
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>