export type Meal = {
  name: string
  missingIngredients?: string[]
}
export type Day = {
  id: number,
  breakfast?: Meal,
  lunch?: Meal,
  dinner?: Meal
}