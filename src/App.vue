<template>
  <div id="app">
    <div class=".container-fluid" >
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
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
            <router-link class="nav-link" to="events/table">Your Scheduled Events</router-link>
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
</style>
