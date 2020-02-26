<template>
  <div class="events-table">
    <h1 class="text-center mb-5">Your Scheduled Events</h1>

    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Location</th>
          <th scope="col">Description</th>
          <th scope="col">Start Time</th>
          <th scope="col">End Time</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events">
          <th scope="row">{{ event.id }}</th>
          <td><router-link v-bind:to="'/events/' + event.id">{{ event.name }}</router-link></td>
          <td>{{ event.location }}</td>
          <td>{{ event.description }}</td>
          <td>{{ event.start_time }}</td>
          <td>{{ event.end_time }}</td>
          <!-- <td>{{ relativeDate(event.created_at) }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
var axios = require("axios");
// import moment from "moment";

export default {
  data: function() {
    return {
      events: [],
      updatedCounter: ""
    };
  },
  created: function() {
    axios
      .get("/api/events")
      .then(response => {
        this.events = response.data;
      });

  },
  // methods: {
  //   relativeDate: function(date) {
  //     return moment(date).fromNow();
  //   },
  };
</script>