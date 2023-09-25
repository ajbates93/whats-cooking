<script setup lang="ts">
import { useStore } from '@/store'

const store = useStore()

</script>
<template>
  <div class="px-10">
    <div class="flex justify-between items-center">
      <div class="text-3xl font-bold text-primary">Shopping List</div>
    </div>
    <div v-for="item, idx in store.shoppingList">{{ item }}</div>
  </div>
</template>
