<template>
  <div>
    <b-navbar :fixed-top="true" :shadow="true" wrapper-class="container">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="~/assets/logo-navbar.svg"
            alt="Foro Metropolitano"
          >
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="#">
          En vivo&nbsp;<i class="fas fa-circle has-text-primary" />
        </b-navbar-item>
        <b-navbar-item href="#">
          Inicio
        </b-navbar-item>
        <b-navbar-item href="#">
          Stands
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>INSCRIBITE</strong>
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <!-- <nav class="level">
      <div class="level-left">
        <p class="level-item">
          <a href="https://twitter.com" class="has-text-black" target="_blank">Inicio</a>
        </p>
        <p class="level-item">
          <a href="https://twitter.com" class="has-text-black" target="_blank">Escenario</a>
        </p>
      </div>

      <div class="level-right">
        <p class="level-item">
          <a href="https://twitter.com" class="has-text-black" target="_blank"><i class="fab fa-facebook-f" /></a>
        </p>
        <p class="level-item">
          <a href="https://twitter.com" class="has-text-black" target="_blank"><i class="fab fa-twitter" /></a>
        </p>
        <p class="level-item">
          <a href="https://twitter.com" class="has-text-black" target="_blank"><i class="fab fa-instagram" /></a>
        </p>
      </div>
    </nav> -->
    <div class="line-top" />
    <br>
    <div class="columns is-vcentered">
      <div class="column">
        <img src="~/assets/logo-01-01.svg" class="image logo-on-navbar logo-on-left">
      </div>
      <div class="column">
        <img src="~/assets/about.svg" class="image logo-on-navbar logo-on-right">
      </div>
    </div>
    <br>
    <div class="line-bottom" />
  </div>
</template>

<style lang="scss" scoped>
.logo-on-navbar{
  width: 300px;
}
.logo-on-right{
  margin: 0 0 0 auto;
}
.logo-on-left{
  margin: 0 auto 0 0;
}
.line-width{
  height: 100%;
}
</style>
