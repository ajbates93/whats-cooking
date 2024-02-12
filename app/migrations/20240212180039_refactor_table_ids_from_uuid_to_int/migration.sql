/*
  Warnings:

  - The primary key for the `Day` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Day` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Ingredient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Meal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Meal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `ShoppingList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `ShoppingList` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `mealID` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dayID` on the `Meal` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_ShoppingListIngredients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_ShoppingListIngredients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_mealID_fkey";

-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_dayID_fkey";

-- DropForeignKey
ALTER TABLE "_ShoppingListIngredients" DROP CONSTRAINT "_ShoppingListIngredients_A_fkey";

-- DropForeignKey
ALTER TABLE "_ShoppingListIngredients" DROP CONSTRAINT "_ShoppingListIngredients_B_fkey";

-- AlterTable
ALTER TABLE "Day" DROP CONSTRAINT "Day_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Day_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "mealID",
ADD COLUMN     "mealID" INTEGER NOT NULL,
ADD CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "dayID",
ADD COLUMN     "dayID" INTEGER NOT NULL,
ADD CONSTRAINT "Meal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ShoppingList" DROP CONSTRAINT "ShoppingList_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ShoppingList_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_ShoppingListIngredients" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_ShoppingListIngredients_AB_unique" ON "_ShoppingListIngredients"("A", "B");

-- CreateIndex
CREATE INDEX "_ShoppingListIngredients_B_index" ON "_ShoppingListIngredients"("B");

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_dayID_fkey" FOREIGN KEY ("dayID") REFERENCES "Day"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_mealID_fkey" FOREIGN KEY ("mealID") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShoppingListIngredients" ADD CONSTRAINT "_ShoppingListIngredients_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShoppingListIngredients" ADD CONSTRAINT "_ShoppingListIngredients_B_fkey" FOREIGN KEY ("B") REFERENCES "ShoppingList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
