import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fetchMealSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

export default defineEventHandler(async (event) => {
  const result = await getValidatedQuery(event, (query) => fetchMealSchema.safeParse(query))

  if (!result.success) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: result.error.issues
    })
  }

  // Get all meals where day.date is between startDate and endDate
  const meals = await prisma.meal.findMany({
    where: {
      day: {
        date: {
          gte: result.data.startDate,
          lte: result.data.endDate,
        }
      }
    }
  }) 

  return {
    status: 200,
    statusMessage: "OK",
    data: meals,
  }
})
