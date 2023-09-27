<script setup lang="ts">

</script>

<template>
  <header class="bg-[#faf9f6] sticky top-0 border-t border-transparent backdrop-blur-md shadow-sm shadow-gray-200 dark:shadow-gray-600 z-30 px-6">
    <div class="flex items-center justify-between py-4 max-w-screen-xl mx-auto">
      <h1 class="text-2xl text-center"><NuxtLink to="/">What's <span class="text-primary">Cooking</span>?</NuxtLink></h1>
      <div class="flex items-center">
        <NuxtLink to="/meal-planner">
          <LayoutActionButton class="bg-primary mr-1 ">Meal Planner</LayoutActionButton>
        </NuxtLink>
        <NuxtLink to="/shopping-list">
          <LayoutActionButton class="bg-primary mr-1 ">Shopping List</LayoutActionButton>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
