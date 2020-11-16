<template>
  <section>
    <br />
    <div class="columns">
      <!--<div class="column is-1 is-hidden-touch">
        <img src="@/assets/line-balls.svg" class width="25" style="margin-right:10px;" />
      </div>-->
      <div class="column is-11" v-if="showWillStart">
        <h1 class="title is-2 is-700">¡El evento comienza Martes 01/12 a las 10.00Hrs!</h1>
        <h1 class="subtitle is-4">Consultá la agenda, ¡Te esperamos para el vivo!</h1>
        <a href="https://preguntarparaacordar.typeform.com/to/tCYJb6WE" target="_blank">
          <!--<img
            src="@/assets/participa-button.svg"
            class="image elboton animate__animated animate__pulse animate__infinite"
            alt
          />-->
        </a>
      </div>
      <div class="column is-11" v-if="soonWeWillStart">
        <h1 class="title is-2 is-700">¡Comenzaremos muy pronto!</h1>
        <h1 class="subtitle is-4">¡Quedate en linea!</h1>
        <a href="https://preguntarparaacordar.typeform.com/to/tCYJb6WE" target="_blank">
          <!--<img
            src="@/assets/participa-button.svg"
            class="image elboton animate__animated animate__pulse animate__infinite"
            alt
          />-->
        </a>
      </div>
      <div class="column is-11" v-if="showEnded">
        <h1 class="title is-2 is-700">¡Gracias a todas y todos!</h1>
        <h1 class="subtitle is-4">¡Por habernos acompañado en este gran evento!</h1>
      </div>
      <div class="column is-5" v-if="happeningNow != null">
        <h1 class="subtitle is-3">AHORA&nbsp;&nbsp;&nbsp;<i class="fas fa-play"></i></h1>
        <!-- <hr class="border-bottom-title"> -->
        <event :event="calendar.agenda[happeningNow]"></event>
      </div>
      <div class="column is-offset-1 is-5" v-if="happeningNext != null">
        <h1 class="subtitle is-3">Próximamente&nbsp;&nbsp;&nbsp;<i class="fas fa-fast-forward"></i></h1>
        <!-- <hr class="border-bottom-title"> -->
        <event :event="calendar.agenda[happeningNext]"></event>
      </div>
    </div>
  </section>
</template>
<script>
import Event from "./Event.vue";

export default {
  props: ["now"],
  data() {
    return {
    //   starts: new Date(Date.UTC(2020, 12, 1, 9, 0, 0)),
      ends: new Date(Date.UTC(2020, 11, 5, 1, 0, 0)),
    };
  },
  components: {
    Event,
  },

  methods: {
  //   updateTime: function () {
  //     // this.now = new Date();
  //     this.now = this.addMinutes(Math.floor(Math.random() * 10) + 5)
  //   },
  //   addMinutes(minutes) {
  //     return new Date(this.now.getTime() + minutes*60000);
  // }
  },
  computed: {
    calendar: function () {
      return this.$store.state.calendar
    },
    happeningNow: function () {
      if (this.calendar.agenda.length == 0) return null;
      let indexHappeningNow = this.calendar.agenda.findIndex((event,index,theArr) => {
        let nextCuando = null
        if(index+1 < this.calendar.agenda.length ){
            nextCuando = theArr[index+1].cuandoObject
        } else {
            nextCuando = this.ends
        }
        if (event.cuandoObject <= this.now && this.now < nextCuando) return true;
        return false;
      });
      if (indexHappeningNow == -1) return null;
      return indexHappeningNow;
    },
    happeningNext: function () {
      if (this.happeningNow == null) return null;
      if (this.happeningNow + 1 < this.calendar.agenda.length)
        return this.happeningNow + 1;
      return null;
    },
    showWillStart: function () {
      let hasta = new Date(Date.UTC(2020, 11, 1, 9, 0, 0));
      if (this.now < hasta) return true;
      return false;
    },
    soonWeWillStart: function () {
      let desde = new Date(Date.UTC(2020, 11, 1, 9, 0, 0));
      let hasta = new Date(Date.UTC(2020, 11, 1, 13, 0, 0));
      if (desde <= this.now && this.now < hasta) return true;
      return false;
    },
    showEnded: function () {
      let desde = new Date(Date.UTC(2020, 11, 5, 1, 0, 0));
      if (desde <= this.now) return true;
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.elboton {
  width: 200px;
}
.border-bottom-title{
    background-color: #FFF;
    max-width: 300px
}
// .coming-next{
//   background-color: #FFF;
//   padding: 25px;
//   // max-height: 800px;
// }
// .the-time {
//   text-align: center;
//   margin-bottom: 10px;
//   // font-weight: 800;
// }
// .media-left {
//   width: 35px;
// }
// .type-icon {
//   width: 20px;
//   display: inline;
//   margin: 15px 5px;
// }
// .type-text {
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   font-weight: 300;
//   font-size: 0.8rem;
//   // margin-left: -1px;
//   margin-top: 2px;
// }
// .title-text {
//   font-weight: 600;
//   font-size: 1.2rem;
//   line-height: 1.5rem;
//   margin-bottom: 6px;
//   margin-top: 3px;
// }
// .who-text {
//   font-size: 0.9rem;
//   margin-bottom: 4px;
// }
// .icon-twitter {
//   width: 20px;
//   border-radius: 4px;
//   vertical-align: top;
//   margin-right: 4px;
// }
// .hashtag-text{
//   font-size:0.9rem;
// }
// .who-org{
//   font-size:0.9rem;
//   // white-space: nowrap;
//   color: rgb(100, 100, 100);
// }
// .custom-hr{
//   background-color: #000;
//   height: 1px;
//   width: 35%;
// }
</style>