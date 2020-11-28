<template>
  <ul class="details">
    <li><span>Pet's proposed name: </span> {{ animal.name }}</li>
    <li><span>Species: </span> {{ animal.type }} (Still pending...)</li>
    <li><span>Adoption status: </span>{{ animal.status }}</li>
    <div class="mt-2"><span> Vaccination history</span></div>
    <div v-for="vaccination in animal.vaccinations" :key="vaccination.id">
      <!-- //TODO assembler for preprocessing back response before saving it to state -->
      {{ vaccination.date_vaccinated }} | Vaccine id:
      {{ vaccination.vaccine }} | {{ vaccination.incidences }}
    </div>
  </ul>
</template>

<script>
export default {
  name: 'DetailList',
  props: {
    animal: {
      type: [Object, Array],
      required: true
    }
  }
}
</script>

<style></style>
