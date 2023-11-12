<script setup lang="ts">
const { user, signOut, signIn } = useAuth()
</script>

<template>
  <header class="sticky top-0 border-t border-transparent backdrop-blur-md border-b border-b-[#ddd] dark:border-b-[#444] z-30 px-6 text-gray-600 dark:text-gray-400">
    <div class="flex items-center justify-between py-4 max-w-screen-xl xl:max-w-screen-2xl mx-auto">
      <h1 class="text-2xl text-center"><NuxtLink to="/">What's <span class="text-primary dark:text-primary-dark">Cooking</span>?</NuxtLink></h1>
      <div class="flex items-center">
        <NuxtLink to="/recipe-suggestion">
          <div class="border rounded-2xl py-1 px-3 border-primary text-primary mx-2 items-center flex"><Icon name="carbon:star" class="mr-1" /> Recipe Suggestions</div> 
        </NuxtLink>
        <NuxtLink to="/meal-planner">
          <LayoutActionButton class="bg-primary dark:bg-primary-dark mr-1">Meal Planner</LayoutActionButton>
        </NuxtLink>
        <NuxtLink to="/shopping-list">
          <LayoutActionButton class="bg-primary dark:bg-primary-dark mr-1">Shopping List</LayoutActionButton>
        </NuxtLink>
        <template v-if="user">
          <NuxtLink to="/account">
            <LayoutActionButton class="bg-gray-600 dark:bg-primary-dark mr-1">Account</LayoutActionButton>
          </NuxtLink>
          <LayoutActionButton @click="signOut">Log Out</LayoutActionButton>
        </template>
        <template v-else>
          <NuxtLink to="/account">
            <LayoutActionButton class="bg-primary dark:bg-primary-dark mr-1">Log In</LayoutActionButton>
          </NuxtLink>
        </template>
      </div>
    </div>
  </header>
  
</template>
