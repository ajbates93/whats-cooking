import { defineStore } from 'pinia'
import { MealType, type Meal, XY } from '@/types'
export const useStore = defineStore('store', {
  state: () => ({
    calendarDaysToShow: 5,
    meals: [] as Meal[],
    droppedValue: {} as XY,
    draggedValue: {} as XY,
    droppedMeal: {} as Meal,
    draggedMeal: {} as Meal
  }),
  getters: {
  },
  actions: {
    addMeal(meal: Meal) {
      const exists = this.meals.findIndex(x => x.date.toLocaleDateString() === meal.date.toLocaleDateString() && x.type === meal.type)

      if (exists !== -1)
        this.meals[exists] = meal
      else
        this.meals.push(meal)
    },
    swapMeals(draggedMeal: Meal, targetMeal: Meal) {
      const draggedIdx = this.meals.findIndex(x => x.date.toLocaleDateString() === draggedMeal.date.toLocaleDateString() && x.type === draggedMeal.type)
      const targetIdx = this.meals.findIndex(x => x.date.toLocaleDateString() === targetMeal.date.toLocaleDateString() && x.type === targetMeal.type)
      if (draggedIdx === -1 || targetIdx === -1 || draggedIdx === targetIdx)
        return

      const temp = JSON.parse(JSON.stringify(this.meals[draggedIdx]))
      const tempDragged = JSON.parse(JSON.stringify(this.meals[targetIdx]))
      const tempXY = JSON.parse(JSON.stringify(this.droppedValue))
      this.meals[draggedIdx].name = this.meals[targetIdx].name
      this.meals[draggedIdx].missingIngredients = this.meals[targetIdx].missingIngredients
      this.meals[targetIdx].name = temp.name
      this.meals[targetIdx].missingIngredients = temp.missingIngredients
      this.draggedValue = this.droppedValue

      console.log(`Meals swapped: ${temp.name} and ${tempDragged.name}`)
    },
    seedMeals() {
      const today = new Date()
      const tomorrow = new Date()
      const dayAfterTomorrow = new Date()
      tomorrow.setDate(today.getDate() + 1)
      dayAfterTomorrow.setDate(today.getDate() + 2)

      this.addMeal({ type: MealType.Breakfast, name: "Granola", date: today })
      this.addMeal({ type: MealType.Lunch, name: "Eggy Bread", date: today })
      this.addMeal({ type: MealType.Dinner, name: "Fajitas", date: today })
      this.addMeal({ type: MealType.Breakfast, name: "Granola", date: tomorrow })
      this.addMeal({ type: MealType.Lunch, name: "Pasta Salad", date: tomorrow })
      this.addMeal({ type: MealType.Dinner, name: "Tahini Salad", date: tomorrow })
      this.addMeal({ type: MealType.Breakfast, name: "Smoothie", date: dayAfterTomorrow })
      this.addMeal({ type: MealType.Lunch, name: "Veggie Wrap", date: dayAfterTomorrow })
      this.addMeal({ type: MealType.Dinner, name: "Chili Con Carne", date: dayAfterTomorrow })
      console.log('seed meals called')
    }
  }
})