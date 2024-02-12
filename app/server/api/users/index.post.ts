import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  passwordHash: z.string()
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) => createUserSchema.safeParse(body))

  if (!result.success) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: result.error.issues
    })
  }
  
  // Check is user already exists before creating
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username: result.data.username },
        { email: result.data.email }
      ]
    }
  })

  if (existingUser) {
    return createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      data: 'User already exists with that username or email'
    })
  }
  
  // Data is validated, create the user
  const user = await prisma.user.create({
    data: {
      username: result.data.username,
      email: result.data.email,
      passwordHash: result.data.passwordHash
    }
  })

  const { passwordHash, ...safeUserData } = user 
  return safeUserData
})
