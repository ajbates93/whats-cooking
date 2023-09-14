<script setup lang="ts">
type Props = {
  dayTitle: string
}
const { dayTitle } = defineProps<Props>()

</script>

<template>
  <div>
    <div class="title">{{ dayTitle }}</div>
    <div>Breakfast</div>
    <div>...</div>
    <div>Lunch</div>
    <div>...</div>
    <div>Dinner</div>
    <div>...</div>
  </div>
</template>