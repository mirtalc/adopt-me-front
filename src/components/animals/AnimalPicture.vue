<template>
  <div>
    <img v-if="animal.photo" :src="animal.photo" class="picture" />
    <img
      v-else
      :src="require(`@/assets/img/default/${imgSrc}`)"
      class="picture"
    />
  </div>
</template>

<script>
export default {
  name: 'AnimalPicture',
  props: {
    animal: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgSrc() {
      const speciesRelation = {
        CAT: 'cat-pic.png',
        DOG: 'dog-pic.jpg'
      }
      return speciesRelation[this.animal.species.uid]
    }
  }
}
</script>

<style>
img {
  max-height: 300px;
}
</style>
