<script setup lang="ts">

const daysToShow = ref<number>(7)

const calendarDays = computed(() => {
  const today = new Date()
  return Array.from({ length: daysToShow.value }, (_, i) => {
    const day = new Date(today)
    if (i > 0)
      day.setDate(today.getDate() + i)
    return day
  })
})

</script>

<template>
  <div>
    <h1>What's Cooking?</h1>
    <div>
      <span>Days to show: </span>
      <select v-model="daysToShow">
        <option>5</option>
        <option selected>7</option>
        <option>10</option>
        <option>14</option>
      </select>
    </div>
    <div>
      <DayCard v-for="day in calendarDays" :day-title="day.toLocaleDateString('en-UK', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'})"></DayCard>
    </div>
  </div>
</template>
