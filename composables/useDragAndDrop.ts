import { useDraggable, useElementBounding } from "@vueuse/core"
import { XY } from "~/types"
import { useStore } from "~/store"

export const useDragAndDrop = () => {
  const store = useStore()
  const dragMeal = (meal: Ref<HTMLElement | null>) => {
    const droppedValue = ref<XY>()
    const onEnd = (xy: XY) => {
      store.droppedValue = xy
    }
    const { x, y, isDragging } = useDraggable(meal, {
      onEnd: () => {
        const xy: XY = { x: x.value, y: y.value }
        onEnd(xy)
      }
    })
    return { x, y, isDragging }
  }
  const getMealPositions = (area: Ref<HTMLElement | null>) => {
    const { x, y } = useElementBounding(area)
    return { x, y }
  }

  return { dragMeal, getMealPositions }
}