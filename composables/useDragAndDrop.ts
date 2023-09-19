import { useDraggable, useElementBounding } from "@vueuse/core"
import { Meal } from "~/types"

export const useDragAndDrop = () => {
  const dragMeal = (meal: Ref<HTMLElement | null>) => {
    const { x, y, isDragging } = useDraggable(meal)
    return { x, y, isDragging }
  }

  const watchForMeal = (area: Ref<HTMLElement | null>) => {
    function onDrop(draggedMeal: any) {
      // const targetMeal
    }
    useDropZone(area, onDrop)
  }

  const getMealPositions = (area: Ref<HTMLElement | null>) => {
    const { x, y } = useElementBounding(area)
    return { x, y }
  }

  return { dragMeal, watchForMeal, getMealPositions }
}