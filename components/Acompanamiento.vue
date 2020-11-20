<template>
  <div>
    <VueSlickCarousel v-if="companies.length" v-bind="slickSettings">
      <div v-for="company in companies" :key="company.id">
        <div class="slide-image-normalize">
          <a :href="company.link">
            <img :src="$strapiAsset(company.logo.url)" class="image" alt="">
          </a>
        </div>
      </div>
    </VueSlickCarousel>
  </div>
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
      slickSettings: {
        dots: true,
        autoplay: true,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2
            }
          }
        ]
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.slide-image-normalize {
  height: 130px;
  margin: 10px;
  position: relative;
  img{
    max-height: 60%;
    max-width: 75%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
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
.line-separator{
  margin: 20px 0;
      border-bottom: 4px solid #c42330;

}
</style>
