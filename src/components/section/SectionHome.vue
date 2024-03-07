<script setup>
import {} from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { FileAdd, FileDisk, FileChange, FileDelete, FileDownLoad } from '@/api/api.js'

const props = defineProps(['token'])
const file = ref()
const files = ref([])
const UpLoadfiles = ref([])
const fileChangeKey = ref(null)
const fileNewName = ref('')

async function init() {
  files.value = await FileDisk(props.token)
}

onMounted(async () => {
  await init()
})

function fileAddInArr() {
  UpLoadfiles.value = [...UpLoadfiles.value, file.value.files[0]]
  console.log(UpLoadfiles.value)
}

async function filePush() {
  await FileAdd(props.token, UpLoadfiles.value)
}

function fileChangeEvent(key, name) {
  if (fileChangeKey.value === null) {
    fileChangeKey.value = key
    fileNewName.value = name
  } else {
    fileChangeKey.value = null
  }
}

async function fileNameChangeEvent(key) {
  let name = fileNewName.value
  const nameArr = name.split('.')
  if (nameArr.length > 1) {
    name = ''
    for (let i = 0; i < nameArr.length - 1; i++) {
      name += nameArr[i]
    }
  }
  const res = await FileChange(props.token, key, name)
  fileChangeKey.value = null
  init()
}

async function deleteFileEvent(key) {
  const res = await FileDelete(props.token, key)
  init()
}

async function downLoadEvent(key, name) {
  const url = await FileDownLoad(props.token, key)

  const link = document.createElement('a')
  link.href = url
  link.download = name

  link.click()

  URL.revokeObjectURL(url)
}

watch(() => props.token, init)
</script>

<template>
  <section class="file-section boxY flex1">
    <div class="wrapper flex1 boxY">
      <div class="">
        <ul class="boxY">
          <li class="boxX" v-for="(value, key) in files" :key="key">
            <div v-if="fileChangeKey !== value.file_id" class="">
              {{ value.name }}
            </div>
            <div v-else class="boxX">
              <form @submit.prevent="fileNameChangeEvent(value.file_id)">
                <input v-model="fileNewName" type="text" />
              </form>
            </div>
            <div class="boxX">
              <button class="cursor" @click="downLoadEvent(value.file_id, value.name)">
                <span class="material-symbols-outlined"> download </span>
              </button>
              <button class="cursor" @click="fileChangeEvent(value.file_id, value.name)">
                <span class="material-symbols-outlined"> edit_document </span>
              </button>
              <button class="cursor" @click="deleteFileEvent(value.file_id)">
                <span style="color: hsla(0, 60%, 55%, 0.8)" class="material-symbols-outlined">
                  delete
                </span>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <form class="boxX" @submit.prevent="fileAddInArr">
        <input class="flex1" ref="file" multiple type="file" />
        <input value="Добавить файл" type="submit" />
        <button @click="filePush" class="button" type="button">Отправить файлы</button>
      </form>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.material-symbols-outlined
  color: hsla(0, 0%, 100%, .8)
  transition: .2s
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24

.material-symbols-outlined:active
  transform: scale(1.3)

li
  background-color: rgba(255,255 ,255 ,.1)
  padding: .5em 1em
  border-radius: 10px
  height: 45px
</style>
