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
      <div>
        <datetime 
          type="datetime"
          v-model="startTime" 
          input-id="startDate"
          :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }"
          :minute-step="15"
          use12-hour
          auto
          >
          <label for="startDate" slot="before">Start Time</label>
          <span class="description" slot="after"></span>
          <template slot="button-cancel">
            <!-- <fa :icon="['far', 'times']"></fa> -->
            Cancel
          </template>
          <template slot="button-confirm">
            <!-- <fa :icon="['fas', 'check-circle']"></fa> -->
            Confirm
          </template>
        </datetime>
      </div>
      <div>
        <datetime
          type="datetime"
          v-model="endTime" 
          input-id="endDate"
          :format="{ year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }"
          :minute-step="15"
          use12-hour
          auto
          >
          <label for="endDate" slot="before">End Time</label>
          <span class="description" slot="after"></span>
          <template slot="button-cancel">
            <!-- <fa :icon="['far', 'times']"></fa> -->
            Cancel
          </template>
          <template slot="button-confirm">
            <!-- <fa :icon="['fas', 'check-circle']"></fa> -->
            Confirm
          </template>
        </datetime>
      </div>
      <input type="submit" class="btn btn-primary" value="Create Event">
    </form>

  </div>
</template>

<style></style>

<script>
var axios = require("axios");
import { Datetime } from 'vue-datetime';

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
  components: {
    datetime: Datetime
  },
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