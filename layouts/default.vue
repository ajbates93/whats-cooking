<script setup lang="ts">

</script>

<template>
  <header class="sticky top-0 border-t border-transparent backdrop-blur-md shadow-sm shadow-gray-200 dark:shadow-gray-600 z-30">
    <div class="flex items-center justify-between py-4 px-6">
      <h1 class="text-2xl text-center">What's <span class="text-primary">Cooking</span>?</h1>
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
  <main role="main" class="p-10">
    <slot />
  </main>
</template>
