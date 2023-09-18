import { defineStore } from 'pinia'
import { MealType, type Meal } from '@/types'
export const useStore = defineStore('store', {
  state: () => ({
    calendarDaysToShow: 7,
    meals: [] as Meal[]
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