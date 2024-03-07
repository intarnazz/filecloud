<script setup>
import {} from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import {
  FileAdd,
  FileDisk,
  FileChange,
  FileDelete,
  FileDownLoad,
  AccessAdd,
  AccessDelete
} from '@/api/api.js'

const props = defineProps(['token'])
const file = ref()
const files = ref([])
const UpLoadfiles = ref([])
const fileChangeKey = ref(null)
const fileNewName = ref('')
const accessIsOpen = ref(null)
const coAitorEmail = ref('')

async function init() {
  files.value = await FileDisk(props.token)
}

onMounted(async () => {
  await init()
})

function fileAddInArr() {
  if (file.value.files[0]) {
    UpLoadfiles.value = [...UpLoadfiles.value, file.value.files[0]]
  }
}

async function filePush() {
  await FileAdd(props.token, UpLoadfiles.value)
  UpLoadfiles.value = []
  init()
}

function fileChangeEvent(key, name) {
  if (fileChangeKey.value === null || fileChangeKey.value !== key) {
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
  await FileChange(props.token, key, name)
  fileChangeKey.value = null
  init()
}

async function deleteFileEvent(key) {
  await FileDelete(props.token, key)
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

async function accessOpenEvent(key) {
  if (accessIsOpen.value === null || accessIsOpen.value !== key) {
    accessIsOpen.value = key
  } else {
    accessIsOpen.value = null
  }
}

async function addAccess(key) {
  const res = await AccessAdd(props.token, key, coAitorEmail.value)
  init()
}

async function deleteAccess(key, email) {
  await AccessDelete(props.token, key, email)
  init()
}

watch(() => props.token, init)
</script>

<template>
  <section class="file-section boxY flex1">
    <div class="wrapper flex1 boxY">
      <div class="">
        <div class="boxY">
          <ul v-if="files.message !== 'Login failed'" class="boxY">
            <li
              class="boxY file-section__item"
              v-for="(value, key) in files"
              :key="key"
              :style="
                accessIsOpen == value.file_id
                  ? `height: ${135 + 45 * (value.accesses.length - 1) + 34 + 16 * value.accesses.length}px`
                  : `height: 45px`
              "
            >
              <div class="boxX">
                <div v-if="fileChangeKey !== value.file_id" class="boxX">
                  {{ value.name }}
                </div>
                <div v-else class="boxX flex1">
                  <form class="flex1 boxX" @submit.prevent="fileNameChangeEvent(value.file_id)">
                    <input style="margin: -1px" class="flex1" v-model="fileNewName" type="text" />
                  </form>
                </div>
                <div class="boxX">
                  <button class="cursor" @click="downLoadEvent(value.file_id, value.name)">
                    <span style="color: hsla(160, 100%, 37%, 1)" class="material-symbols-outlined">
                      download
                    </span>
                  </button>
                  <button class="cursor" @click="accessOpenEvent(value.file_id)">
                    <span class="material-symbols-outlined"> group </span>
                  </button>
                  <button class="cursor" @click="fileChangeEvent(value.file_id, value.name)">
                    <span style="color: hsla(184, 60%, 45%, 1)" class="material-symbols-outlined">
                      edit_document
                    </span>
                  </button>
                  <button class="cursor" @click="deleteFileEvent(value.file_id)">
                    <span style="color: hsla(0, 60%, 55%, 0.8)" class="material-symbols-outlined">
                      delete
                    </span>
                  </button>
                </div>
              </div>
              <div class="boxY">
                <div class="boxX">
                  <hr class="flex1" />
                  Список со-авторов
                  <hr class="flex1" />
                </div>
                <ul class="boxY">
                  <li class="boxX" v-for="(access, key) in value.accesses" :key="key">
                    <div class="">{{ access.fullname }} | {{ access.email }}</div>
                    <button
                      v-if="access.type == 'co-author'"
                      class="cursor"
                      @click="deleteAccess(value.file_id, access.email)"
                    >
                      <span
                        style="color: hsla(0, 00%, 100%, 0.5)"
                        class="material-symbols-outlined"
                      >
                        delete
                      </span>
                    </button>
                  </li>
                </ul>
                <div class="boxX">
                  <div class="boxX">
                    Email:
                    <div class="boxX box-defaut">
                      <input v-model="coAitorEmail" type="text" />
                      <button @click="addAccess(value.file_id)" class="button boxX">
                        <span class="material-symbols-outlined"> person_add </span>
                        Добавить пользователя
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <div class="boxY" v-if="true">
            <div v-if="UpLoadfiles != false" class="boxX">
              <hr class="flex1" />
              Новые файлы
              <hr class="flex1" />
            </div>
            <ul class="boxY">
              <li class="boxX" v-for="(value, key) in UpLoadfiles" :key="key">
                <div v-if="fileChangeKey !== value.file_id" class="boxX">
                  {{ value.name }}
                </div>
                <div v-else class="boxX flex1">
                  <form class="flex1 boxX" @submit.prevent="fileNameChangeEvent(value.file_id)">
                    <input class="flex1" v-model="fileNewName" type="text" />
                  </form>
                </div>
                <div style="color: hsla(0, 0%, 100%, 0.4)" class="boxX">
                  * файл пока не загружен
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <form class="boxX" @submit.prevent="fileAddInArr">
        <input class="flex1 file-section__button" ref="file" multiple type="file" />
        <button class="button boxX file-section__button" type="submit">
          <span class="material-symbols-outlined"> add </span> Добавить файл
        </button>
        <button
          @click="filePush"
          class="button boxX file-section__button file-section__cloud"
          type="button"
        >
          <span class="material-symbols-outlined"> cloud_upload </span> Загрузить на облако
        </button>
      </form>
    </div>
  </section>
</template>

<style lang="sass" scoped>
.file-section
  &__item
    height: 45px
  &__button
    border-radius: 30px
  &__cloud
    background-color: hsla(184, 100%, 35%, 1)
    border: 1px solid hsla(184, 100%, 17%, 1)

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
  transition: .4s
  overflow: hidden

.displayNone
  height: auto
</style>
