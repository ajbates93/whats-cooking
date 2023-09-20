<script setup lang="ts">
import { onKeyStroke, useDropZone } from '@vueuse/core'
import { useDragAndDrop } from '@/composables/useDragAndDrop'
import type { Meal, Day } from '@/types'
import { useStore } from '@/store'
type Props = {
  day: Day,
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

const newMealTitle = ref("")

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
  if (newValue && props.meal) {
    store.draggedMeal = props.meal
  }
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
  <div :style="isDragging ? `height: ${drag?.clientHeight}px` : ''">

    <div ref="drag" class="my-3 transition py-2 px-2 cursor-move rounded hover:shadow-lg border select-none touch-none bg-white w-auto animate-wiggle"
      :class="[`left-[${xBounding.toFixed(2)}px] top-[${yBounding.toFixed(2)}]`, { 'bg-green-400 animate-wiggle': hasBeenDroppedOnto}]"
      :style="[isDragging ? `position: absolute; left: ${x.toFixed(0)}px; top: ${y.toFixed(0)}px;` : '']">
      <div v-if="meal" class="flex items-center justify-between">
        <span v-if="!showEdit" class="mr-auto">{{ meal.name }} <span class="text-xs">{{ x.toFixed(2) }}, {{ y.toFixed(2) }}, isDragging: {{ isDragging }}</span></span>
        <button v-if="!showEdit" class="bg-gray-400 text-white px-2 py-1 rounded" @click="showEdit = true">Change</button>
        <input v-if="showEdit" class="bg-white border border-primary border-opacity-40 px-2 py-1 rounded" type="text" v-model="meal.name" />
        <button v-if="showEdit" class="bg-gray-400 text-white px-2 py-1 rounded ml-auto mr-1" @click="showEdit = false">Cancel</button>
        <button v-if="showEdit" class="bg-green-500 text-white px-2 py-1 rounded" @click="handleSubmitEditMealClick">Submit</button>
      </div>
      <div class="flex items-center justify-between" v-else>
        <button v-if="!showInput" class="bg-gray-400 text-white px-2 py-1 rounded" @click="showInput = true">Add Meal</button>
        <input v-if="showInput" class="bg-white px-2 py-1 border rounded border-primary border-opacity-40" type="text" v-model="newMealTitle" />
        <button v-if="showInput" class="bg-green-500 text-white px-2 py-1 rounded" @click="handleSubmitNewMealClick">Submit</button>
      </div>
    </div>
  </div>
</template>