<script setup lang="ts">
import { useStore } from '@/store'

const store = useStore()

const calendarDays = computed(() => {
  const today = new Date()
  return Array.from({ length: store.calendarDaysToShow}, (_, i) => {
    const day = new Date(today)
    if (i > 0)
      day.setDate(today.getDate() + i)
    return day
  })
})

// seed meals to simulate fetching data from DB
onBeforeMount(() => store.seedMeals())

</script>

<template>
  <div class="px-10">
    <div class="max-w-screen-xl mx-auto">
      <div class="flex justify-between items-center">
        <div class="text-3xl font-bold text-primary">Meal Planner</div>
        <div class="my-5 font-bold text-lg">
          <span class="mr-2">Days: </span>
          <select v-model="store.calendarDaysToShow" class="px-3 py-2 border border-primary border-opacity-30 rounded-lg min-w-[100px]">
            <option selected>5</option>
            <option>7</option>
            <option>10</option>
            <option>14</option>
          </select>
        </div>
      </div>
      <div class="grid grid-cols-3 gap-5">
        <DayCard v-for="day in calendarDays" :day-date="day" :day-title="day.toLocaleDateString('en-UK', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})"></DayCard>
      </div>
    </div>
  </div>
</template>
