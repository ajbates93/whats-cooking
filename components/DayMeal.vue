<script setup lang="ts">
import type { Meal, Day } from '@/types'
type Props = {
  day: Day,
  meal?: Meal | null
}
const props = defineProps<Props>()
const emit = defineEmits<{
  addMeal: [mealTitle: string]
}>()

const showEdit = ref(false)
const showInput = ref(false)

const newMealTitle = ref("")

const handleAddNewMealClick = () => {
  showInput.value = showEdit.value = false
  emit('addMeal', newMealTitle.value)
}

const handleSubmitEditMealClick = () => {
  if (props.meal && props.meal.name) {
    showInput.value = showEdit.value = false
    emit('addMeal', props.meal.name)
  }
}

</script>

<template>
  <div class="my-3">
    <div v-if="meal" class="flex items-center justify-between">
      <span v-if="!showEdit" class="mr-auto">{{ meal.name }}</span>
      <button v-if="!showEdit" class="bg-gray-400 text-white px-2 py-1 rounded" @click="showEdit = true">Change</button>
      <input v-if="showEdit" class="bg-white border border-primary border-opacity-40 px-2 py-1 rounded" type="text" v-model="meal.name" />
      <button v-if="showEdit" class="bg-gray-400 text-white px-2 py-1 rounded ml-auto mr-1" @click="showEdit = false">Cancel</button>
      <button v-if="showEdit" class="bg-green-500 text-white px-2 py-1 rounded" @click="handleSubmitEditMealClick">Submit</button>
    </div>
    <div class="flex items-center justify-between" v-else>
      <button v-if="!showInput" class="bg-gray-400 text-white px-2 py-1 rounded" @click="showInput = true">Add Meal</button>
      <input v-if="showInput" class="bg-white px-2 py-1 border rounded border-primary border-opacity-40" type="text" v-model="newMealTitle" />
      <button v-if="showInput" class="bg-green-500 text-white px-2 py-1 rounded" @click="handleAddNewMealClick">Submit</button>
    </div>
  </div>
</template>