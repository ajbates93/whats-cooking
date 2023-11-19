<template>
  <div>
    <form class="flex items-center" @submit.prevent="handleNewIngredientSubmit" @input:enter="handleNewIngredientSubmit">
      <div class="mr-2">
        Enter Ingredient:
      </div>
      <input v-model="newIngredient" class="border p-1 mr-2" type="text" @input:enter="handleNewIngredientSubmit">
      <button type="submit">
        <LayoutActionButton
          :class="{ 'bg-primary': newIngredient.length > 0 }"
        >
          Submit
        </LayoutActionButton>
      </button>
    </form>
    <div class="my-3">
      {{ allIngredients.join(", ") }}
    </div>
    <div class="my-3 inline-block">
      <LayoutActionButton class="bg-[#a5da4f]">
        Generate Ideas
      </LayoutActionButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Ingredients
const newIngredient = ref('')
const allIngredients = ref<string[]>([])

// Handle
function handleNewIngredientSubmit() {
  if (allIngredients.value.includes(newIngredient.value))
    return
  allIngredients.value.push(newIngredient.value)
  newIngredient.value = ''
}
</script>

<style></style>
