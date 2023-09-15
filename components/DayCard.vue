<script setup lang="ts">
import type { Day } from '@/types'
type Props = {
  dayTitle: string
}
const { dayTitle } = defineProps<Props>()
const day = reactive<Day>({
  id: 0,
  breakfast: undefined,
  lunch: undefined,
  dinner: undefined
})

const addMeal = (mealType: string, mealTitle: string) => {
  switch (mealType) {
    case "breakfast":
      day.breakfast = { name: mealTitle }
      break;
    case "lunch":
      day.lunch = { name: mealTitle}
      break;
    case "dinner":
      day.dinner = { name: mealTitle }
      break;
    default: 
      break;
  }
}

</script>

<template>
  <div class="shadow rounded-lg p-5 bg-white border-2 border-primary border-opacity-30">
    <div class="title text-xl font-bold mb-2 text-gray-700 flex justify-between items-center">
      {{ dayTitle }}
      <Icon v-if="day.breakfast && day.lunch && day.dinner" name="carbon:checkbox-checked-filled" class="text-green-500" size="2rem" />
    </div>
    <div class="my-3">
      <div class="my-2 font-bold text-primary text-lg flex justify-between items-center">
        Breakfast
        <Icon v-if="day.breakfast" name="carbon:checkbox-checked-filled" class="text-green-500" size="1.5rem"/>
      </div>
      <DayMeal :day="day" :meal="day.breakfast ?? null" @addMeal="(mealTitle: string) => addMeal('breakfast', mealTitle)" />
    </div>
    <div class="my-3">
      <div class="my-2 font-bold text-primary text-lg flex justify-between items-center">
        Lunch
        <Icon v-if="day.lunch" name="carbon:checkbox-checked-filled" class="text-green-500" size="1.5rem"/>
      </div>
      <DayMeal :day="day" :meal="day.lunch ?? null" @addMeal="(mealTitle: string) => addMeal('lunch', mealTitle)" />
    </div>
    <div class="my-3">
      <div class="my-2 font-bold text-primary text-lg flex justify-between items-center">
        Dinner
        <Icon v-if="day.dinner" name="carbon:checkbox-checked-filled" class="text-green-500" size="1.5rem"/>
      </div>
      <DayMeal :day="day" :meal="day.dinner ?? null" @addMeal="(mealTitle: string) => addMeal('dinner', mealTitle)" />
    </div>
  </div>
</template>