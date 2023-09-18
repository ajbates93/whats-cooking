export enum MealType {
  Breakfast,
  Lunch,
  Dinner
}
export type Meal = {
  name: string
  type: MealType,
  date: Date,
  missingIngredients?: string[]
}
export type Day = {
  id: number,
  date: Date,
  breakfast?: Meal,
  lunch?: Meal,
  dinner?: Meal
}