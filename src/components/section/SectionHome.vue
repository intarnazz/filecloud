<script setup>
import {} from 'vue-router'
import {} from 'vue'
import { FileAdd } from '@/api/api.js'

const props = defineProps(['token'])

async function filePost() {
  const res = await FileAdd(props.token)
}
</script>

<template>
  <section class="file-section boxY flex1">
    <div class="wrapper flex1 boxY">
      <div class=""></div>
      <form @submit.prevent="filePost">
        <input type="file" />
        <input type="submit" />
      </form>
    </div>
  </section>
</template>

<style scoped></style>
