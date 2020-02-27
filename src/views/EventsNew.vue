<template>
  

  <div class="events-new">
    <h1>New Event</h1>
    <ul>
      <li v-for="error in errors"> {{error}} </li>
    </ul>

    <form v-on:submit.prevent="createEvent()">
      <div class="form-group">
        <div>Name: 
          <input type="text" class="form-control" v-model="name">
        </div>
        <div>Location: 
          <input type="text" class="form-control" v-model="location">
        </div>
        <div>Description: 
          <input type="text" class="form-control" v-model="description">
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
        <input type="submit" class="btn btn-primary" value="Create Event">
      </div>
    </form>

  </div>
</template>

<style></style>

<script>
var axios = require("axios");
import { Datetime } from 'vue-datetime';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  data: function() {
    return {
      name: "",
      location: "",
      description: "",
      startTime: "",
      endTime: "",
      buffer: "",
      errors: []
    };
  },
  created: function() {},
  components: {
    datetime: Datetime,
    "font-awesome-icon": FontAwesomeIcon
  },
  methods: {
    createEvent: function() {
      var clientParams = {
        name: this.name,
        location: this.location,
        description: this.description,
        start_time: this.startTime,
        end_time: this.endTime,
        buffer: this.buffer,
      };
      axios
      .post("/api/events", clientParams)
      .then(response => {
        this.$router.push("/table");
      }).catch(error => {
        this.errors = error.response.data.errors;
      });
    }
  }
};
</script>



<!-- Datetimepicker components -->