<script setup lang="ts">
import { useStore } from '@/store';
import { onKeyStroke } from '@vueuse/core'
import type { Meal } from '@/types';
const { meal } = defineProps<{
  meal: Meal,
}>()

const store = useStore()
const input = ref('')

onKeyStroke('Enter', () => {
  if (input.value !== '')
    handleSubmitMissingIngredientClick()
})

const handleSubmitMissingIngredientClick = () => {
  const match = store.meals.find(x => x === meal)
  if (!match) throw Error("Could not find meal.")
  match.missingIngredients.push(input.value)
  input.value = ''
}

const handleRemoveMissingIngredientClick = (miIdx: number) => {
  const match = store.meals.find(x => x === meal)
  if (!match) throw Error("Could not find meal.")
  match.missingIngredients.splice(miIdx, 1)
}

</script>

<template>
  <div class="p-2 rounded rounded-t-none border border-t-none animate-wiggle bg-gray-100 dark:bg-[#353535] dark:border-[#555]">
    <ul v-if="meal.missingIngredients" class="pb-2">
      <li class="pb-1 flex items-center" v-for="mi, idx in meal.missingIngredients" :key="idx">
        <Icon class="text-gray-400" size="0.75rem" name="carbon:checkbox-indeterminate-filled"></Icon> 
        <span class="ml-1 dark:text-gray-400">{{ mi }}</span>
        <Icon name="carbon:close" class="text-gray-600 dark:text-gray-400 ml-auto" @click="handleRemoveMissingIngredientClick(idx)"></Icon>
      </li> 
    </ul>
    <div class="flex items-center gap-2">
      <input class="border dark:bg-[#444] dark:text-gray-300 dark:border-[#555] px-2 py-1 rounded w-full" v-model="input" placeholder="Missing ingredients..."/>
      <LayoutActionButton class="bg-green-500 hover:bg-green-600" @click="handleSubmitMissingIngredientClick">Add</LayoutActionButton>
    </div>
  </div>
</template>
