<template>
  <div class="page text-center">
    <div class="my-8 text-2xl">
      Oops! An unexpected error happened.
    </div>
    <div class="text-xl">
      This is us right now:
    </div>
    <img src="../../assets/img/error-generic.png" alt="generic-error robot" />
    <div>
      Please,
      <InlineLink :routeName="routesInfo.home.name" :text="'go home'" /> and try
      again later.
      <div v-show="!!error" class="mt-6">
        [ If you are curious, this is what we received ⟶
        <span class="error-message">{{ error }}</span> ]
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { routesInfo } from '../../constants/routesInfo'
import InlineLink from '../../components/InlineLink'

export default {
  name: 'GenericError',
  components: {
    InlineLink
  },
  data: () => ({
    routesInfo
  }),
  computed: {
    ...mapState({
      error: state => state.lastError
    })
  }
}
</script>

<style></style>
