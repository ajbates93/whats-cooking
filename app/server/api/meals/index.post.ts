import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createMealSchema = z.object({
  type: z.enum(['breakfast', 'lunch', 'dinner']),
  date: z.coerce.date(),
  name: z.string()
})

export default defineEventHandler(async (event) => {

  // Create a new meal. If the day does not exist, create it as well in the day table
  const result = await readValidatedBody(event, (body) => createMealSchema.safeParse(body))

  if (!result.success) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: result.error.issues
    })
  }

  let dayId;

  // Check if day exists
  let day = await prisma.day.findFirst({
    where: {
      date: result.data.date
    } 
  })

  if (!day) {
    // Create day
    day = await prisma.day.create({
      data: {
        date: result.data.date,
      }
    })
  }
  dayId = day.id;
  // Create meal
  const meal = await prisma.meal.create({
    data: {
      type: result.data.type,
      name: result.data.name,
      dayID: dayId 
    }
  })

  return {
    status: 200,
    statusMessage: "OK",
    data: meal,
  }
})
