<template>
  <p>redirecting...</p>
</template>

<script lang="ts">
import Vue from 'vue'
import { Config } from '@/types/config'

export default Vue.extend({
  async mounted() {
    const rawConfig = await this.$content('config').fetch()
    if (!Array.isArray(rawConfig)) {
      const config: Config = rawConfig
      if (config.homeTree) {
        this.$router.push(config.homeTree)
      }
    }
  },
})
</script>
