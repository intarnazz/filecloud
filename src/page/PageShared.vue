<script setup>
import SectionShared from '@/components/section/SectionShared.vue'

const props = defineProps(['token'])
</script>

<template>
  <SectionShared :token="props.token" />
</template>

<style scoped></style>
