<template>
  <img :src="imgSource" alt="" class="picture" />
</template>

<script>
export default {
  name: 'AnimalPicture',
  props: {
    photo: {
      type: String,
      default: null
    }
  },
  computed: {
    imgSource() {
      return this.photo
        ? this.photo
        : 'https://via.placeholder.com/300x200/000000/FFFFFF/?text=Animal+Picture+Placeholder'
    }
  }
}
</script>

<style></style>
