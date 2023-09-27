<script setup lang="ts">

</script>

<template>
  <div id="hero" class="py-10 max-w-screen-xl mx-auto px-6">
    <div class="grid grid-cols-[2fr_1fr] justify-between gap-10 mx-auto">
      <div id="heroText">
        <div class="text-7xl font-bold mb-5 text-gray-700"><span class="hero-title hero-title-green">Plan</span>, <span class="hero-title hero-title-orange">prep</span>, and <span class="hero-title hero-title-blue">serve</span>.</div>
        <div class="text-4xl font-bold mb-5 text-gray-700">Weekly meal plans made simple!</div> 
        <div id="heroActions"  class="flex items-center justify-start gap-4 text-xl">
          <LayoutActionButton class=" !bg-darky !px-5 !py-3"><NuxtLink to="/meal-planner">Meal Planner</NuxtLink></LayoutActionButton>
          <LayoutActionButton class="!bg-darky !px-5 !py-3"><NuxtLink to="/shopping-list">Shopping List</NuxtLink></LayoutActionButton>
        </div>
      </div>
    </div>
  </div>
</template>
