<template>
  <div class="bg-gray-800 h-screen">
    <div class="grid place-items-center h-full pt-32 pb-32">
      <main
        class="
          rounded-lg
          bg-blue-600
          w-5/12
          p-8
          h-full
          text-center text-white
          space-y-4
        "
      >
        <h1 class="text-xl">Netzwerk</h1>
        <section class="text-white">Link1</section>
        <section>Link1</section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content, params, error }) {
    const trees = await $content('trees').fetch()
    return { trees }
  },
  mounted() {
    console.log(this.trees)
  },
})
</script>
