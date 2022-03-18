<template>
  <div class="bg-gray-800 h-screen">
    <div class="grid place-items-center h-full pt-16 pb-8 md:pt-32 md:pb-32">
      <main
        class="
          rounded-lg
          bg-blue-600
          w-10/12
          md:w-4/12
          p-8
          h-full
          text-center
          text-white
          space-y-4
        "
      >
        <div class="flex justify-center">
          <svg
            v-if="path.length > 0"
            class="fill-white h-8 w-8"
            viewBox="0 0 256 512"
            xmlns="http://www.w3.org/2000/svg"
            @click="back"
          >
            <path
              fill="#fff"
              d="M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z"
            />
          </svg>
          <h1 class="text-2xl font-bold">{{ dataShown.title }}</h1>
        </div>
        <section v-for="link in dataShown.links" :key="link.name">
          <a v-if="link.links" class="cursor-pointer" @click="openBranch">
            {{ link.title }}
          </a>
          <a v-else :href="link.url">{{ link.title }}</a>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async asyncData({ $content, params, error }) {
    const slug = params.slug || 'index'

    try {
      const tree = await $content('trees', slug).fetch()
      return { tree }
    } catch {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data: () => {
    return {
      path: [],
    }
  },
  computed: {
    dataShown() {
      let currentData = this.tree
      this.path.forEach((element) => {
        currentData = currentData.links[element]
      })
      return currentData
    },
  },
  mounted() {
    console.log(this.tree)
  },
  methods: {
    openBranch() {
      this.path.push('monitoring')
    },
    back() {
      this.path.pop()
    },
  },
})
</script>
