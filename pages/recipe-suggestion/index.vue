<template>
  <div class="flex items-center">
    <div class="mr-2">Ingredients:</div>
    <input class="border p-1 mr-2" type="text" v-model="newIngredient" /> 
    <LayoutActionButton :class="{'bg-primary': newIngredient.length > 0 }">Submit</LayoutActionButton>
  </div>
</template>

<script lang="ts" setup>

const newIngredient = ref('')

</script>

<style>

</style>

