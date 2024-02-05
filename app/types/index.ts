export enum MealType {
  Breakfast,
  Lunch,
  Dinner,
}
export interface XY {
  x: number
  y: number
}
export interface Meal {
  name: string
  type: MealType
  date: Date
  missingIngredients: string[]
}
export interface Day {
  id: number
  date: Date
  breakfast?: Meal
  lunch?: Meal
  dinner?: Meal
}
export interface MissingIngredient {
  ingredient: string
  meal: string
}
