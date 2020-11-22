<template>
  <div class="page text-center text-2xl">
    <img src="../../assets/img/error-404.png" alt="not-found robot" />
    <div class="my-8">
      Oops! We didn't find the page you were looking for.
    </div>
    <div>
      Should we
      <InlineLink :routeName="routesInfo.home.name" :text="'head home'" /> ?
    </div>
  </div>
</template>

<script>
import InlineLink from '../../components/InlineLink'
import { routesInfo } from '../../constants/routesInfo'

export default {
  name: 'NotFound',
  components: {
    InlineLink
  },
  data: () => ({
    routesInfo
  })
}
</script>

<style></style>
