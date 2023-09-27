<script setup lang="ts">

</script>

<template>
  <div id="hero" class="py-10 md:py-20 max-w-screen-xl xl:max-w-screen-2xl mx-auto">
    <div class="grid grid-cols-[2fr_1fr] justify-between gap-10 mx-auto">
      <div id="heroText">
        <div class="text-7xl font-bold mb-5 text-gray-700"><span class="hero-title hero-title-green">Plan</span>, <span class="hero-title hero-title-orange">prep</span>, and <span class="hero-title hero-title-blue">serve</span>.</div>
        <div class="text-4xl font-bold mb-10 text-gray-700">Weekly meal plans made simple!</div> 
        <div id="heroActions"  class="flex items-center justify-start gap-4 text-xl mb-10">
          <LayoutActionButton class=" bg-darky hover:bg-hero-title transition-all !px-5 !py-3"><NuxtLink to="/meal-planner">Meal Planner</NuxtLink></LayoutActionButton>
          <LayoutActionButton class="bg-darky hover:bg-primary transition-all !px-5 !py-3"><NuxtLink to="/shopping-list">Shopping List</NuxtLink></LayoutActionButton>
        </div>
        <div>
          <ul class="text-gray-600 text-xl flex flex-col gap-4">
            <li><span class="mr-1 text-left w-[50px] inline-block"><Icon size="2rem" name="carbon:list"></Icon></span>Plan your meals 5, 7, or 14 days in advance!</li>
            <li><span class="mr-1 text-left w-[50px] inline-block"><Icon size="2rem" name="carbon:user-profile"></Icon></span>Sign up with an account to take advantage of every feature.</li>
            <li><span class="mr-1 text-left w-[50px] inline-block"><Icon size="2rem" name="carbon:home"></Icon></span>Create a Household and manage your meals and lists with your family or house mates!</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
