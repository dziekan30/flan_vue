<template>
  <div class="events-edit">
    <div class="container">
      <form v-on:submit.prevent="updateEvent()">
        <h1>Edit Event</h1>
        <ul>
          <li v-for="error in errors"> {{error}} </li>
        </ul>

        <div>
          Name: <input type="text" class="form-control" v-model="event.name">
        </div>

        <div>
          Location: <input type="text" class="form-control" v-model="event.location">
        </div>

        <div>
          Description: <input type="text" class="form-control" v-model="event.description">
        </div>

        <div>Need a little extra time?
          <input
            type="checkbox"
            v-model="buffer"
            true-value="true"
            false-value="false"
          >
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
              <font-awesome-icon :icon="['fas', 'frown-open']" />
              Cancel
            </template>
            <template slot="button-confirm">
              <font-awesome-icon :icon="['fas', 'check-circle']" />
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
              <font-awesome-icon :icon="['fas', 'frown-open']" />
              Cancel
            </template>
            <template slot="button-confirm">
              <!-- <fa :icon="['fas', 'check-circle']"></fa> -->
              <font-awesome-icon :icon="['fas', 'check-circle']" />
              Confirm
            </template>
          </datetime>
        </div>

        <div>
          <input type="submit" class="btn btn-primary" value="Edit Event">
        </div>

      </form> 
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');
import { Datetime } from 'vue-datetime';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  data: function() {
    return {
      event: {
        name: "",
        location: "",
        description: "",
        startTime: "",
        endTime: "",
        buffer: ""
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
  components: {
    datetime: Datetime,
    "font-awesome-icon": FontAwesomeIcon
  },
  methods: {
    updateEvent: function() {
      var clientParams = {
        name: this.event.name,
        location: this.event.location,
        description: this.event.description,
        start_time: this.event.startTime,
        end_time: this.event.endTime,
        buffer: this.event.buffer
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