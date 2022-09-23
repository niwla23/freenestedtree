<template>
  <div v-if="tree" :style="{
    'background-image': `url(${tree.theme.backgroundImage})`,
  }" class="background h-screen bg-cover bg-center">
    <div class="grid place-items-center h-full pt-16 pb-8 md:pt-32 md:pb-32">
      <main class="rounded-lg w-10/12 md:w-4/12 p-8 h-full text-center space-y-4" :style="{
        'background-color': tree.theme.boxColor,
        color: tree.theme.textColor,
        'backdrop-filter': `blur(${tree.theme.boxBlur})`,
        'box-shadow': `0 16px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)`,
      }">
        <div class="flex cursor-pointer" :style="{'justify-content': tree.theme.alignText}" @click="back">
          <svg v-if="path.length > 0" class="fill-white h-8 w-8" viewBox="0 0 256 512"
            xmlns="http://www.w3.org/2000/svg">
            <path fill="#fff"
              d="M137.4 406.6l-128-127.1C3.125 272.4 0 264.2 0 255.1s3.125-16.38 9.375-22.63l128-127.1c9.156-9.156 22.91-11.9 34.88-6.943S192 115.1 192 128v255.1c0 12.94-7.781 24.62-19.75 29.58S146.5 415.8 137.4 406.6z" />
          </svg>

          <h1 class="flex">
            <div v-if="path.length > 0" class="flex flex-col justify-center">
              <p class="border rounded-md border-2 w-8 h-6 mr-2">ESC</p>
            </div>
            <p class="font-bold text-2xl ">{{ dataShown.title }}</p>
          </h1>
        </div>
        <section v-for="(link, name, index) in dataShown.links" :key="name">
          <div class="flex" :style="{'justify-content': tree.theme.alignText}">
            <p class="border rounded-md border-2 w-6 h-6 mr-2">{{ indexToKey[index] }}</p>
            <a v-if="link.links" class="cursor-pointer" @click="openBranch(name)">
              {{ link.title }}
            </a>
            <a v-else :href="link.url">{{ link.title }}</a>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import _ from 'lodash'
import { Root, Branch } from '@/types/tree'


@Component
export default class TreeSlug extends Vue {
  path: string[] = []
  tree?: Root | null = null
  indexToKey: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F'
  ]

  head() {
    return {
      title: `${this.dataShown?.title} - ${this.tree?.title}`,
    }
  }

  async mounted() {
    const slug = this.$route.params.slug || 'index'

    try {
      const tree: unknown = await this.$content('trees', slug).fetch()
      if (!Array.isArray(tree)) {
        this.tree = tree as Root
      }
    } catch {
      this.$nuxt.error({ statusCode: 404, message: 'Page not found' })
    }

    document.addEventListener('keyup', this.handleKeypress);
  }


  destroyed() {
    document.removeEventListener('keyup', this.handleKeypress)
  }

  get dataShown(): Branch | null {
    if (!this.tree) {
      return null
    }
    let currentData: Branch = this.tree
    this.path.forEach((element) => {
      if (currentData.links) {
        currentData = currentData.links[element]
      }
    })
    return currentData
  }

  openBranch(branch: string) {
    this.path.push(branch)
  }

  back() {
    this.path.pop()
  }

  handleKeypress(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.back()
      return
    }

    const x = this.indexToKey.indexOf(event.key.toUpperCase())

    if (x === undefined || x === -1) {
      return
    }
    // @ts-ignore (this works but ts won't accept it so it can shut up)
    const branch: string = Object.keys(this.dataShown?.links)[x]

    if (!branch) {
      return
    }
    if (!this.dataShown?.links) {
      return
    }
    if (this.dataShown?.links[branch].links) {
      this.openBranch(branch)
    } else if (this.dataShown?.links[branch].url) {
      document.location.href = this.dataShown?.links[branch].url || document.location.href
    }
  }
}
</script>
