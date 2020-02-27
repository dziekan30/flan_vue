<template>
  <div id="app">

    <div class="jumbotron text-center">
      <h1>FroYo</h1>
      <p>Clear Your Calendar</p>
    </div>

    <div class="container-fluid my-nav-container">
     <nav class="navbar navbar-expand-lg">
      <router-link class="navbar-brand" to="/">Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/signup">Signup</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/logout">Logout</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/events/new">Create</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/table">Your Scheduled Events</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/calendar">Calendar</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
  <div class="container">
    <router-view/>
  </div>
  </div>
</template>

<style>
  .container-fluid.my-nav-container {
    background-color: #23587d;
  }
  .navbar {
    color: #20c997;
  }

  .jumbotron {
    background-color: #23587d; 
    color: #20c997;
  }
</style>
