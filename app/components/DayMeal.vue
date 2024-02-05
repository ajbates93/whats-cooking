<script setup lang="ts">
import { onKeyStroke, useDropZone } from '@vueuse/core'
import { useDragAndDrop } from '@/composables/useDragAndDrop'
import type { Day, Meal } from '@/types'
import { useStore } from '@/store'

interface Props {
  day: Day
  meal?: Meal | null
}
const props = defineProps<Props>()
const emit = defineEmits<{
  addMeal: [mealTitle: string]
}>()
const store = useStore()

const { dragMeal, getMealPositions } = useDragAndDrop()
const drag = ref<HTMLElement | null>(null)

const showEdit = ref(false)
const showInput = ref(false)
const showMissingIngredientsForm = ref(false)

const newMealTitle = ref('')

const handleSubmitNewMealClick = () => {
  showInput.value = showEdit.value = false
  emit('addMeal', newMealTitle.value)
}

const handleSubmitEditMealClick = () => {
  if (props.meal && props.meal.name) {
    showInput.value = showEdit.value = false
    emit('addMeal', props.meal.name)
  }
}

onKeyStroke('Enter', () => {
  if (showInput.value && !showEdit.value)
    handleSubmitNewMealClick()
  if (showEdit.value && !showInput.value)
    handleSubmitEditMealClick()
})

const { x, y, isDragging } = dragMeal(drag)
const { x: xBounding, y: yBounding, left, right, bottom, top } = getMealPositions(drag)

const hasBeenDroppedOnto = computed(() => {
  const droppedValue = store.droppedValue
  const width = right.value - left.value
  const center = width / 2

  const marginOfError = 50
  return (droppedValue.x >= left.value - marginOfError && droppedValue.x <= right.value + marginOfError
  && droppedValue.y >= top.value - marginOfError && droppedValue.y <= bottom.value + marginOfError)
})
const hasBeenDragged = computed(() => {
  const current = store.draggedValue
})

watch(isDragging, (newValue) => {
  if (newValue && props.meal)
    store.draggedMeal = props.meal
})
watch(hasBeenDroppedOnto, (newValue) => {
  if (newValue && props.meal) {
    console.log(`${props.meal.name} has been dropped onto!`)
    store.droppedMeal = props.meal
    store.swapMeals(store.draggedMeal, store.droppedMeal)
  }
})
</script>

<template>
  <div class="my-3" :style="isDragging ? `height: ${drag?.clientHeight}px` : ''">
    <div
      class="transition py-2 px-2 cursor-move rounded-t hover:shadow-lg border dark:border-[#555] select-none touch-none bg-white dark:bg-[#444] w-auto animate-wiggle"
      :class="[`left-[${xBounding.toFixed(2)}px] top-[${yBounding.toFixed(2)}]`, { 'bg-green-500 animate-wiggle': hasBeenDroppedOnto }]"
      :style="[isDragging ? `position: absolute; left: ${x.toFixed(0)}px; top: ${y.toFixed(0)}px;` : '']"
    >
      <div v-if="meal" class="flex items-center justify-between">
        <template v-if="!showEdit">
          <span class="mr-auto dark:text-gray-300">{{ meal.name }}</span>
          <span class="flex items-stretch">
            <LayoutActionButton class="!bg-blue-500 flex items-center mr-2" @click="showMissingIngredientsForm = !showMissingIngredientsForm">
              <Icon name="carbon:list-checked" />
            </LayoutActionButton>
            <LayoutActionButton class="bg-yellow-500" @click="showEdit = true">Change</LayoutActionButton>
          </span>
        </template>
        <template v-else>
          <input v-model="meal.name" class="bg-white dark:bg-[#444] dark:text-gray-300 border border-primary dark:border-[#555] border-opacity-40 px-2 py-1 rounded" type="text">
          <LayoutActionButton class="ml-auto mr-1" @click="showEdit = false">
            Cancel
          </LayoutActionButton>
          <LayoutActionButton class="bg-green-500" @click="handleSubmitEditMealClick">
            Submit
          </LayoutActionButton>
        </template>
      </div>
      <div v-else class="flex items-center justify-between">
        <LayoutActionButton v-if="!showInput" @click="showInput = true">
          Add Meal
        </LayoutActionButton>
        <template v-else>
          <input v-model="newMealTitle" class="bg-white dark:bg-[#444] dark:text-gray-300 px-2 py-1 border rounded border-primary dark:border-[#555] border-opacity-40" type="text">
          <LayoutActionButton class="bg-green-500" @click="handleSubmitNewMealClick">
            Submit
          </LayoutActionButton>
        </template>
      </div>
    </div>
    <MealsMissingIngredientsForm v-if="props.meal && showMissingIngredientsForm" :meal="props.meal" />
  </div>
</template>
