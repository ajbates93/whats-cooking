<script setup lang="ts">
type Props = {
  dayTitle: string
}
const { dayTitle } = defineProps<Props>()

</script>

<template>
  <div class="shadow rounded-lg p-5 bg-white border-2 border-primary border-opacity-30">
    <div class="title text-xl font-bold">{{ dayTitle }}</div>
    <div>Breakfast</div>
    <div>...</div>
    <div>Lunch</div>
    <div>...</div>
    <div>Dinner</div>
    <div>...</div>
  </div>
</template>