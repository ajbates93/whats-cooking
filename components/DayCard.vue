<script setup lang="ts">
import draggable from 'vuedraggable'
import { useStore } from '@/store'
import type { Day, Meal } from '@/types'
import { MealType } from '@/types'

interface Props {
  dayTitle: string
  dayDate: Date
}

const { dayTitle, dayDate } = defineProps<Props>()

const store = useStore()

const day = reactive<Day>({
  id: 0,
  date: dayDate,
  breakfast: undefined,
  lunch: undefined,
  dinner: undefined,
})
const breakfast = ref<HTMLDivElement>()
const lunch = ref<HTMLDivElement | null>(null)
const dinner = ref<HTMLDivElement | null>(null)

function findMealsForDay() {
  const meals = store.meals.filter(x => x.date.toLocaleDateString() === dayDate.toLocaleDateString())
  if (meals.length > 0) {
    meals.forEach((x, idx) => {
      switch (x.type) {
        case MealType.Breakfast:
          day.breakfast = x
          break
        case MealType.Lunch:
          day.lunch = x
          break
        case MealType.Dinner:
          day.dinner = x
          break
        default:
          break
      }
    })
  }
}
function addMeal(mealType: MealType, mealTitle: string, date?: Date) {
  const meal: Meal = {
    name: mealTitle,
    type: mealType,
    date: date || dayDate,
    missingIngredients: [],
  }
  store.addMeal(meal)
}

onMounted(() => {
  findMealsForDay()
})
</script>

<template>
  <div class="shadow rounded-lg p-5 bg-white dark:bg-[#333] border-2 border-primary dark:border-[#555] border-opacity-30">
    <div class="title text-xl font-bold mb-2 text-gray-600 dark:text-gray-300 flex justify-between items-center">
      {{ dayTitle }}
      <Icon v-if="day.breakfast && day.lunch && day.dinner" name="carbon:checkbox-checked-filled" class="text-green-500" size="2rem" />
    </div>
    <div class="my-3">
      <div class="my-2 font-bold text-primary dark:text-primary-dark text-lg flex justify-between items-center">
        Breakfast
        <Icon v-if="day.breakfast" name="carbon:checkbox-checked-filled" class="text-green-500" size="1.5rem" />
      </div>
      <div ref="breakfast" class="area">
        <DayMeal :day="day" :meal="day.breakfast ?? null" @addMeal="(mealTitle: string) => addMeal(MealType.Breakfast, mealTitle)" />
      </div>
    </div>
    <div class="my-3">
      <div class="my-2 font-bold text-primary dark:text-primary-dark text-lg flex justify-between items-center">
        Lunch
        <Icon v-if="day.lunch" name="carbon:checkbox-checked-filled" class="text-green-500" size="1.5rem" />
      </div>
      <div ref="lunch" class="area">
        <DayMeal :day="day" :meal="day.lunch ?? null" @addMeal="(mealTitle: string) => addMeal(MealType.Lunch, mealTitle)" />
      </div>
    </div>
    <div class="my-3">
      <div class="my-2 font-bold text-primary dark:text-primary-dark text-lg flex justify-between items-center">
        Dinner
        <Icon v-if="day.dinner" name="carbon:checkbox-checked-filled" class="text-green-500" size="1.5rem" />
      </div>
      <div ref="dinner" class="area">
        <DayMeal :day="day" :meal="day.dinner ?? null" @addMeal="(mealTitle: string) => addMeal(MealType.Dinner, mealTitle)" />
      </div>
    </div>
  </div>
</template>
