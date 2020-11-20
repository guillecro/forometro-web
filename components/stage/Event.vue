<template>
  <div class="my-4">
      <div class="columns is-mobile">
          <div class="column is-narrow">
              <div class="time-container has-text-right">
            <p class="is-size-4 has-text-weight-bold has-text-white">{{timeLabel}}</p>
            <p class="is-size-6 has-text-white">{{dateLabel.toUpperCase()}}</p>
              </div>
          </div>
          <div class="column">
            <h1 class="title is-3 has-text-weight-bold">{{event.titulo}}</h1>
            <h6 class="subtitle is-5" v-if="event.participantes.length > 0">Participan:</h6>
            <p v-for="participante in event.participantes" :key="`event-${event.id}-part-${participante.id}`"><b>{{participante.nombre}}</b> (<i>{{participante.titulo}}</i>)</p>
            <h6 class="subtitle is-5 mt-5 mb-1" v-if="event.moderador">Modera:</h6>
            <p v-if="event.moderador"><b>{{event.moderador.nombre}}</b> (<i>{{event.moderador.titulo}}</i>)</p>
          </div>
      </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default {
    props: ['event'],
    computed: {
        timeLabel: function(){
            return format(this.event.cuandoObject, "HH:mm 'Hr'", {locale: es})
        },
        dateLabel: function(){
            return format(this.event.cuandoObject, "EEE, d/MM", {locale: es})
        }
    }
}
</script>

<style lang="scss" scoped>
.time-container{
    // background-color: #FFF;
    padding-right: 10px;
    border-right: 2px solid #FFF;
    // color: #c42330;
    color: #FFF;
    // border-radius: 5px;
}
</style>