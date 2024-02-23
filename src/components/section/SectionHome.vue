<script setup>
import {} from 'vue-router'
import { ref } from 'vue'
import { FileAdd } from '@/api/api.js'

const props = defineProps(['token'])
const file = ref()
const files = ref([])

function fileAddInArr() {
  files.value = [...files.value, file.value.files[0]]
  console.log(files.value)
}

async function filePush() {
  await FileAdd(props.token, files.value)
}
</script>

<template>
  <section class="file-section boxY flex1">
    <div class="wrapper flex1 boxY">
      <div class="">
        <ul>
          <li v-for="(value, key) in files" :key="key">
            {{ value.name }}
          </li>
        </ul>
      </div>
      <form @submit.prevent="fileAddInArr">
        <input ref="file" multiple type="file" />
        <input value="Добавить файл" type="submit" />
        <button @click="filePush" class="button" type="button">Отправить файлы</button>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
