<template>
  <section>
    <div class="separator title is-4 has-text-weight-bold">Apoyan el XVII Foro Metropolitano</div>
    <div class="columns is-centered is-vcentered is-multiline is-mobile">
      <div class="column is-6-mobile is-6-tablet is-2-desktop" v-for="company in companiesUpper" :key="company.id">
        <div class="image-container-upper">
          <a :href="company.link">
            <img :src="$strapiAsset(company.logo.url)" class="image" :alt="company.nombre" loading="lazy">
          </a>
        </div>

      </div>
    </div>
    <div class="columns is-centered is-vcentered is-multiline is-mobile">
      <div class="column is-2-tablet is-1-desktop" v-for="company in companiesLower" :key="company.id">
        <div class="image-container-lower">
          <a :href="company.link">
            <img :src="$strapiAsset(company.logo.url)" class="image" :alt="company.nombre" loading="lazy">
          </a>
        </div>

      </div>
    </div>
    <div class="line-separator"></div>
  </section>
</template>

<script>
export default {
  async fetch () {
    const companies = await this.$strapi.$acompanamientos.find()
    this.companies = companies
  },
  fetchOnServer: false,
  data () {
    return {
      companies: [],
    }
  },
  computed: {
    companiesUpper: function(){
      if(this.companies.length == 0) return []
      return this.companies.filter( x => x.nivel == 'encima')
    },
    companiesLower: function(){
      if(this.companies.length == 0) return []
      return this.companies.filter( x => x.nivel == 'debajo')
    },
  },
}
</script>

<style lang="scss" scoped>
.image-container-upper {
  height: 130px;
  //margin: 10px;
  position: relative;
  img{
    max-height: 75%;
    max-width: 95%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
  }
}
.image-container-lower {
  height: 130px;
  //margin: 10px;
  position: relative;
  img{
    max-height: 60%;
    max-width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 50;
  }
}
.separator {
  margin: 20px 0;
    display: flex;
    align-items: center;
    text-align: center;
}
.separator::before, .separator::after {
  content: '';
    flex: 1;
    border-bottom: 4px solid #c42330;
}
.separator::before {
  margin-right: .25em;
}
.separator::after {
  margin-left: .25em;
}
</style>
