import { useDraggable, useElementBounding } from '@vueuse/core'
import type { XY } from '~/types'
import { useStore } from '~/store'

export const useDragAndDrop = () => {
  const store = useStore()
  const dragMeal = (meal: Ref<HTMLElement | null>) => {
    const onEnd = (xy: XY) => {
      store.droppedValue = xy
      x.value = 0
      y.value = 0
    }
    const { x, y, isDragging } = useDraggable(meal, {
      onEnd: () => {
        const xy: XY = { x: x.value, y: y.value }
        onEnd(xy)
      },
    })
    return { x, y, isDragging }
  }
  const getMealPositions = (area: Ref<HTMLElement | null>) => {
    const { x, y, left, right, bottom, top } = useElementBounding(area)
    return { x, y, left, right, bottom, top }
  }

  return { dragMeal, getMealPositions }
}
