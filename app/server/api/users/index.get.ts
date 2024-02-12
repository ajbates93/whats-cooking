import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const users = await prisma.user.findMany()
    return {
      status: 200,
      statusMessage: "OK",
      data: users,
    }
  } catch {
    return createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: { message: 'Failed to fetch Users' },
    })
  }
})
